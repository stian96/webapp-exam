import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { type PerformerDto } from '@/types/DTO/importUsers';
import { SessionEditDto } from '@/types/DTO/sessionEditDto';
import { SessionActivityDto } from '@/types/sessionActivity';
import { Goal } from 'lucide-react';
import { GoalsByYear } from '@/types/classes/goal';

const useActivityEditorHook = () => {
  const [sessionName, setSessionName] = useState<string>("")
  const [isQuestionValid, setIsNameValid] = useState<boolean>(false)
  const [sessionType, setSessionType] = useState<string>("cycling")
  const [sessionDate, setSessionDate] = useState<string>("")
  const [sessionIntensity, setSessionIntensity] = useState<string>("")
  const [sessionWatt, setSessionWatt] = useState<string>("")
  const [sessionSpeed, setSessionSpeed] = useState<string>("")
  const [sessionPulse, setSessionPulse] = useState<string>("")
  const [isIntensityValid, setIsIntensityValid] = useState<boolean>(false)
  const [isWattValid, setIsWattValid] = useState<boolean>(false)
  const [isSpeedValid, setIsSpeedValid] = useState<boolean>(false)
  const [isPulseValid, setIsPulseValid] = useState<boolean>(false)
  const [goalId, setGoalId] = useState<string>("")
  const [dbGoals, setDbGoals] = useState<Goal[]>([])
  const [activityResult, setActivityResult] = useState<SessionActivityDto>()
  const [submitButtonText, setSubmitButtonText] =
    useState<string>("Save Changes")

  // Function for validating a string to check that it is only composed of integers, is not empty, and is larger than 0.
  const validateStringMeasurement = (stringMeasurement: string) => {
    const isMeasurementValid =
      stringMeasurement.trim() !== "" && /^\d+$/.test(stringMeasurement)

    const integerValue = parseInt(stringMeasurement, 10)
    return isMeasurementValid && integerValue > 0
  }

  // Function for validating a string. It mustn't be empty, and must contain at least 3 unicode characters.
  const validateString = (string: string) => {
    const isStringValid = string.trim() !== "" && /\p{L}{3,}/u.test(string)

    return isStringValid
  }

  const handleNameTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSessionName = event.target.value

    setSessionName(event.target.value)

    setSessionName((prevSessionName) => {
      const isStringValid = validateString(newSessionName)
      setIsNameValid(isStringValid)
      return prevSessionName
    })
  }

  const handleIntensityTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSessionIntensity = event.target.value

    setSessionIntensity(newSessionIntensity)

    setSessionIntensity((prevSessionIntensity) => {
      const isStringValid = validateStringMeasurement(newSessionIntensity)
      setIsIntensityValid(isStringValid)
      return prevSessionIntensity
    })
  }

  const handleWattTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSessionWatt = event.target.value

    setSessionWatt(newSessionWatt)

    setSessionWatt((prevSessionWatt) => {
      const isStringValid = validateStringMeasurement(newSessionWatt)
      setIsWattValid(isStringValid)
      return prevSessionWatt
    })
  }

  const handleSpeedTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSessionSpeed = event.target.value

    setSessionSpeed(newSessionSpeed)

    setSessionSpeed((prevSessionSpeed) => {
      const isStringValid = validateStringMeasurement(newSessionSpeed)
      setIsSpeedValid(isStringValid)
      return prevSessionSpeed
    })
  }

  const handlePulseTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSessionPulse = event.target.value

    setSessionPulse(newSessionPulse)

    setSessionPulse((prevSessionPulse) => {
      const isStringValid = validateStringMeasurement(newSessionPulse)
      setIsPulseValid(isStringValid)
      return prevSessionPulse
    })
  }

  const handleGoalDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGoalId(event.target.value)
  }

  const handleTypeDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSessionType(event.target.value)
  }

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSessionDate(e.target.value)
  }

  const populateValuesFromActivity = (activity: SessionActivityDto) => {

    if (activity.date !== null) {
      setSessionDate(new Date(activity.date).toISOString().split("T")[0])
    }
    if (activity.session.name !== null) {
      setSessionName(activity.session.name)
      setIsNameValid(validateString(activity.session.name))
    }

    if (activity.session !== null) {
      if (activity.session.type !== null) {
        setSessionType(activity.session.type)
      }
      if (activity.session.intensityParam !== null) {
        const intensity = activity.session.intensityParam.toString()
        setSessionIntensity(intensity)
        setIsIntensityValid(
          validateStringMeasurement(intensity),
        )
      }
      if (activity.session.wattParam !== null) {
        const watt = activity.session.wattParam.toString()
        setSessionWatt(watt)
        setIsWattValid(validateStringMeasurement(watt))
      }
      if (activity.session.speedParam !== null) {
        const speed = activity.session.speedParam.toString()
        setSessionSpeed(speed)
        setIsSpeedValid(validateStringMeasurement(speed))
      }
      if (activity.session.pulseParam !== null) {
        const pulse = activity.session.pulseParam.toString()
        setSessionPulse(pulse)
        setIsPulseValid(validateStringMeasurement(pulse))
      }
    }

    if (activity.goal.id !== null) {
      setGoalId(activity.goal.id)
    }
  }

  const getGoalsApiResponse = async (performerId: string) => {
    const response = await fetch(
      `/api/goals/getGoals?performerId=${performerId}`,
      {
        method: "get",
      },
    )

    const data = await response.json()
    const result = data as { status: number; message: string }

    console.log(result.message)
    if (result.status == 404) {
      return
    }

    const goals = JSON.parse(result.message) as GoalsByYear

    const currentYear = new Date().getFullYear().toString();
    const goalsCurrentYear: Goal[] | undefined = goals[currentYear];

    if (goalsCurrentYear) {
      setDbGoals(goalsCurrentYear)
    }
  }

  const getActivity = async (activityId: string) => {
    try {
      const response = await fetch(
        `/api/sessions/getSessionById/${activityId}`,
        {
          method: "get",
        },
      )

      const data = await response.json()
      const isSuccess = data.status
      const message = data.message

      if (isSuccess == 200) {
        deserialiseActivityResultResponse(message)

        console.log(`Results for ${performerId} exists.`)
        return { success: true, message: `${performerId} exists.` }
      } else {
        console.log(`Results for ${performerId} do not exist.`)
        return {
          success: false,
          message: `Results for ${performerId} do not exist.`,
        }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  const deserialiseActivityResultResponse = (responseMessage: string) => {
    const activity: SessionActivityDto = JSON.parse(responseMessage)

    setActivityResult(activity)

    void getGoalsApiResponse(activity.performerId)

    populateValuesFromActivity(activity)
  }

  const isFormValid = (): boolean => {
    // If inputs are not valid.
    if (
      !isQuestionValid ||
      !isIntensityValid ||
      !isWattValid ||
      !isSpeedValid ||
      !isPulseValid
    ) {
      setSubmitButtonText("Error - Some inputs are invalid.")
      return false
    }

    return true
  }

  const writeToDatabase = async () => {
    const sessionActivity = new SessionEditDto(
      activityResult.sessionId,
      activityResult.id,
      new Date(sessionDate),
      sessionName,
      parseInt(sessionIntensity, 10),
      parseInt(sessionWatt, 10),
      parseInt(sessionSpeed, 10),
      parseInt(sessionPulse, 10),
      sessionType,
      goalId,
    )

    try {
      const response = await fetch("/api/sessions/updateSession", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionActivity),
      })

      const responseData = await response.json()
      const { status } = responseData

      if (status == 400) {
        setSubmitButtonText("Error - Can't change activity based on templates.")
      } else {
        setSubmitButtonText("Changes Saved!")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const isFormValidBool: boolean = isFormValid()

    if (isFormValidBool) {
      console.log("Form is valid. Attempting to write to database.")
      await writeToDatabase()
    } else {
      console.log("Form is not valid.")
    }

    console.log(`Wrote the template to the database.`)
  }

  return { 
    handleSubmit,
    sessionDate,
    handleDateChange,
    getActivity,
    sessionName,
    handleNameTextChange,
    isQuestionValid,
    sessionIntensity,
    handleIntensityTextChange,
    isIntensityValid,
    sessionWatt,
    handleWattTextChange,
    isWattValid,
    sessionSpeed,
    handleSpeedTextChange,
    isSpeedValid,
    sessionPulse,
    handlePulseTextChange,
    isPulseValid,
    sessionType,
    handleTypeDropdownChange,
    goalId,
    handleGoalDropdownChange,
    dbGoals,
    submitButtonText
   };
};

export default useActivityEditorHook