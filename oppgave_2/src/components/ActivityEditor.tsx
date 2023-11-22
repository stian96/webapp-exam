"use client"

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"

import "../style/form.scss"

import { Goal } from "@/types/classes/goal"
import { SessionTemplate } from "@/types/classes/sessionTemplate"
import { SessionEditDto } from "@/types/DTO/sessionEditDto"
import { SessionActivityDto } from "@/types/sessionActivity"

type ActivityEditorProps = {
  activityId: string
}

const ActivityEditor = ({ activityId }: ActivityEditorProps) => {
  const isApiCalled = useRef(false)
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
        setSessionIntensity(activity.session.intensityParam)
        setIsIntensityValid(
          validateStringMeasurement(activity.session.intensityParam),
        )
      }
      if (activity.session.wattParam !== null) {
        setSessionWatt(activity.session.wattParam)
        setIsWattValid(validateStringMeasurement(activity.session.wattParam))
      }
      if (activity.session.speedParam !== null) {
        setSessionSpeed(activity.session.speedParam)
        setIsSpeedValid(validateStringMeasurement(activity.session.speedParam))
      }
      if (activity.session.pulseParam !== null) {
        setSessionPulse(activity.session.pulseParam)
        setIsPulseValid(validateStringMeasurement(activity.session.pulseParam))
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

    if (result.status == 404) {
      return
    }

    const goals = JSON.parse(result.message) as Goal[]

    setDbGoals(goals)
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

      setSubmitButtonText("Changes Saved!")
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

    console.log(`Wrote the template '${activityId}' to the database.`)
  }

  useEffect(() => {
    if (!isApiCalled.current) {
      isApiCalled.current = true
      return
    }

    void getActivity(activityId)
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className="form flex w-full flex-col space-y-4"
    >
      <div className={`flex flex-col`}>
        <label htmlFor="sessionDate" className="mb-1">
          Date:
        </label>
        <input
          id="sessionDate"
          type="date"
          value={sessionDate}
          onChange={handleDateChange}
          className={`form__dateInput --default`}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="sessionName" className="mb-1">
          Template name:
        </label>
        <input
          id="sessionName"
          type="text"
          value={sessionName}
          onChange={handleNameTextChange}
          placeholder="Enter a name..."
          className={`form__input ${
            isQuestionValid
              ? "border-green-400 text-green-600"
              : "border-red-600 text-red-600"
          }`}
        />
      </div>

      <div className="flex flex-row">
        <div className="flex flex-grow flex-col pr-2">
          <label htmlFor="sessionIntensity" className="mb-1">
            Intensity:
          </label>
          <input
            id="sessionIntensity"
            type="text"
            value={sessionIntensity}
            onChange={handleIntensityTextChange}
            placeholder="Enter a measurement..."
            className={`form__input ${
              isIntensityValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            }`}
          />
        </div>

        <div className="flex flex-grow flex-col px-2">
          <label htmlFor="sessionWatt" className="mb-1">
            Watts:
          </label>
          <input
            id="sessionWatt"
            type="text"
            value={sessionWatt}
            onChange={handleWattTextChange}
            placeholder="Enter a measurement..."
            className={`form__input ${
              isWattValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            }`}
          />
        </div>

        <div className="flex flex-grow flex-col px-2">
          <label htmlFor="sessionSpeed" className="mb-1">
            Speed:
          </label>
          <input
            id="sessionSpeed"
            type="text"
            value={sessionSpeed}
            onChange={handleSpeedTextChange}
            placeholder="Enter a measurement..."
            className={`form__input ${
              isSpeedValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            }`}
          />
        </div>

        <div className="flex flex-grow flex-col pl-2">
          <label htmlFor="sessionPulse" className="mb-1">
            Pulse:
          </label>
          <input
            id="sessionPulse"
            type="text"
            value={sessionPulse}
            onChange={handlePulseTextChange}
            placeholder="Enter a measurement..."
            className={`form__input ${
              isPulseValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            }`}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="sessionType" className="mb-1">
          Type of activity:
        </label>
        <select
          id="sessionType"
          value={sessionType}
          onChange={handleTypeDropdownChange}
          className={`form__select rounded focus:scale-105`}
        >
          <option value="cycling">Cycling</option>
          <option value="triathlon">Triathlon</option>
          <option value="running">Running</option>
          <option value="swimming">Swimming</option>
          <option value="skiing">Skiing</option>
          <option value="strength">Strength</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={`flex flex-row items-center space-x-4`}>
        <label htmlFor="goal">Select Goal:</label>
        <select
          id="goal"
          value={goalId}
          onChange={handleGoalDropdownChange}
          className={`form__select ${
            goalId != "" ? "--enabled" : "--disabled"
          } flex-grow rounded focus:scale-105`}
        >
          <option value="" disabled>
            Select a goal...
          </option>
          {dbGoals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name ? `${goal.id} ${goal.name}` : `${goal.id}`}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className={`form__button ${
          submitButtonText === "Changes Saved!" ? "--saved" : ""
        }
        ${submitButtonText.startsWith("Error") ? "--error" : ""}`}
      >
        {submitButtonText}
      </button>
    </form>
  )
}

export default ActivityEditor
