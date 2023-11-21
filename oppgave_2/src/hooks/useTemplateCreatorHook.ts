import { type ChangeEvent, type FormEvent, useEffect, useState, useRef } from 'react';
import { type Performer } from '@/types/performer';
import { getQuestionTypeEnum, type Question } from '@/types/question';
import { SessionTemplate } from '@/types/classes/sessionTemplate';
import { type Interval } from '@/types/performance/interval';
import { QuestionTypeEnum } from '@/enums/questionTypeEnum';
import { isDate } from 'util/types';
import { Goal } from '@/types/classes/goal';

const useTemplateCreatorHook = () => {
  const isApiCalled = useRef(false)
  const [sessionDate, setSessionDate] = useState<string>("");
  const [sessionName, setSessionName] = useState<string>("")
  const [sessionIntensity, setSessionIntensity] = useState<string>("")
  const [sessionWatt, setSessionWatt] = useState<string>("")
  const [sessionSpeed, setSessionSpeed] = useState<string>("")
  const [sessionPulse, setSessionPulse] = useState<string>("")
  const [sessionType, setSessionType] = useState<string>("cycling")
  const [performerId, setPerformerId] = useState<string>("")
  const [dbPerformers, setDbPerformers] = useState<Performer[]>([])
  const [templateId, setTemplateId] = useState<string>("")
  const [dbTemplates, setDbTemplates] = useState<SessionTemplate[]>([])
  const [goalId, setGoalId] = useState<string>("")
  const [dbGoals, setDbGoals] = useState<Goal[]>([])
  const [dbQuestions, setDbQuestions] = useState<Question[]>([])
  const [tags, setTags] = useState([""])
  const [intervals, setIntervals] = useState([{ duration: "", intensity: "" }])
  const [questions, setQuestions] = useState([{ question: "", type: "text" }])
  const [existingQuestions, setExistingQuestions] = useState<string[]>([""])
  const [isBasedOnTemplate, setIsBasedOnTemplate] = useState<boolean>(false)
  const [isDateValid, setIsDateValid] = useState<boolean>(false)
  const [isQuestionValid, setIsNameValid] = useState<boolean>(false)
  const [isIntensityValid, setIsIntensityValid] = useState<boolean>(false)
  const [isWattValid, setIsWattValid] = useState<boolean>(false)
  const [isSpeedValid, setIsSpeedValid] = useState<boolean>(false)
  const [isPulseValid, setIsPulseValid] = useState<boolean>(false)
  const [isGoalCheckboxSelected, setIsGoalCheckboxSelected] = useState<boolean>(false)
  const [isTemplateCheckboxSelected, setIsTemplateCheckboxSelected] = useState<boolean>(false)
  const [isCheckboxSelected, setIsCheckboxSelected] = useState<boolean>(false)
  const [submitButtonText, setSubmitButtonText] =
    useState<string>("Save Template")

  // Function for validating a string. It mustn't be empty, and must contain at least 3 unicode characters.
  const validateString = (string: string) => {
    const isStringValid = string.trim() !== "" && /\p{L}{3,}/u.test(string)

    return isStringValid
  }

  // Function for validating a string to check that it is only composed of integers, is not empty, and is larger than 0.
  const validateStringMeasurement = (stringMeasurement: string) => {
    const isMeasurementValid =
      stringMeasurement.trim() !== "" && /^\d+$/.test(stringMeasurement)

    const integerValue = parseInt(stringMeasurement, 10)
    return isMeasurementValid && integerValue > 0
  }

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSessionDate(e.target.value);
    setIsDateValid(true)
  };

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

  const handleTypeDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSessionType(event.target.value)
  }

  const handlePerformerDropdownChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerformerId(event.target.value)
  }

  const handleGoalDropdownChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setGoalId(event.target.value)
  }

  const handleTemplateDropdownChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setTemplateId(event.target.value)

    populateValuesFromTemplate(event.target.value)
  }

  const populateValuesFromTemplate = (templateId: string) => {
    const template = dbTemplates.find(item => item.id === templateId)

    if (template != null) {
      setSessionName(template.name)
      setIsNameValid(true)
      setSessionType(template.type)
      setSessionIntensity(template.intensityParam)
      setIsIntensityValid(true)
      setSessionWatt(template.wattParam)
      setIsWattValid(true)
      setSessionSpeed(template.speedParam)
      setIsSpeedValid(true)
      setSessionPulse(template.pulseParam)
      setIsPulseValid(true)
    }
  }

  const handleCheckboxChange = () => {
    setIsCheckboxSelected(!isCheckboxSelected)
  }

  const handleGoalCheckboxChange = () => {
    setIsGoalCheckboxSelected(!isGoalCheckboxSelected)
  }

  const handleTemplateCheckboxChange = () => {
    setIsTemplateCheckboxSelected(!isTemplateCheckboxSelected)
  }

  // Reference: ChatGPT V3.5
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  // Reference: ChatGPT V3.5
  const handleAddAdditionalTag = () => {
    setTags([...tags, ""])
  }

  // Reference: ChatGPT V3.5
  const handleRemoveTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  // Reference: ChatGPT V3.5
  const handleIntervalChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newIntervals = intervals.map((interval, i) =>
      i === index ? { ...interval, [field]: value } : interval,
    )
    setIntervals(newIntervals)
  }

  // Reference: ChatGPT V3.5
  const handleAddInterval = () => {
    setIntervals([...intervals, { duration: "", intensity: "" }])
  }

  // Reference: ChatGPT V3.5
  const handleRemoveInterval = (index: number) => {
    const newIntervals = [...intervals]
    newIntervals.splice(index, 1)
    setIntervals(newIntervals)
  }

  // Reference: ChatGPT V3.5
  const handleQuestionChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newQuestions = questions.map((question, i) =>
      i === index ? { ...question, [field]: value } : question,
    )
    setQuestions(newQuestions)
  }

  // Reference: ChatGPT V3.5
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", type: "text" }])
  }

  // Reference: ChatGPT V3.5
  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
  }

  // Reference: ChatGPT V3.5
  const handleExistingQuestionChange = (
    index: number,
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const newExistingQuestions = [...existingQuestions]
    newExistingQuestions[index] = event.target.value
    setExistingQuestions(newExistingQuestions)

    console.log(existingQuestions)
  }

  // Reference: ChatGPT V3.5
  const handleAddExistingQuestion = () => {
    setExistingQuestions([...existingQuestions, ""])
  }

  // Reference: ChatGPT V3.5
  const handleRemoveExistingQuestion = (index: number) => {
    const newExistingQuestions = [...existingQuestions]
    newExistingQuestions.splice(index, 1)
    setExistingQuestions(newExistingQuestions)
  }

  const getUsersApiResponse = async () => {
    const response = await fetch(`/api/users/getUsers`, {
      method: "get",
    })

    const data = await response.json()
    const result = data as { status: number; message: string }

    const users = JSON.parse(result.message) as Performer[]

    setDbPerformers(users)
  }

  const getQuestionsApiResponse = async () => {
    const response = await fetch(`/api/questions/getQuestions`, {
      method: "get",
    })

    const data = await response.json()
    const result = data as { status: number; message: string }

    const questions = JSON.parse(result.message) as Question[]

    setDbQuestions(questions)
  }

  const getGoalsApiResponse = async (performerId: string) => {

    const response = await fetch(`/api/goals/getGoals?performerId=${performerId}`, {
      method: "get",
    })

    const data = await response.json()
    const result = data as { status: number; message: string }

    const goals = JSON.parse(result.message) as Goal[]

    setDbGoals(goals)
  }

  const getTemplateApiResponse = async () => {

    const response = await fetch(`/api/sessions/getSessionTemplates`, {
      method: "get",
    })

    const data = await response.json()
    const result = data as { status: number; message: string }

    console.log(result.message)
    const templates = JSON.parse(result.message) as SessionTemplate[]

    setDbTemplates(templates)
  }

  const isFormValid = (isTemplate: boolean): boolean => {
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

    if (!isTemplate) {
      // If the form isn't a template, but a date hasn't been chosen
      if (
        !isDateValid
        ) {
        setSubmitButtonText("Error - Some inputs are invalid.")
        return false
      }
    }
    

    // If user has selected that template is unique to a user but hasn't selected one.
    if (
      isCheckboxSelected && performerId == ""
      ) {
      setSubmitButtonText("Error - No performer selected.")
      return false
    }

    // If user has selected that they wish to include a goal but hasn't selected one.
    if (
      isGoalCheckboxSelected && goalId == ""
      ) {
      setSubmitButtonText("Error - No goal selected.")
      return false
    }

    for (const tag of tags) {
      if (tag != "") {
        const isValidTag = validateString(tag)

        if (!isValidTag) {
          setSubmitButtonText("Error - Some tags are invalid.")
          return false
        }
      }
    }

    // Goes through all intervals. Checks to see if they aren't empty, then checks that they are integers.
    for (const interval of intervals) {
      if (interval.duration != "" && interval.intensity != "") {
        const isValidDuration = validateStringMeasurement(interval.duration)
        const isValidIntensity = validateStringMeasurement(interval.intensity)

        if (!isValidDuration || !isValidIntensity) {
          setSubmitButtonText("Error - Some intervals are invalid.")
          return false
        }
      } 
    }

    // Goes through all questions and checks that they are valid (at least 3 utf-8 characters)
    for (const question of questions) {
      if (question.question != "") {
        const isValidQuestion = validateString(question.question)

        if (!isValidQuestion) {
          setSubmitButtonText("Error - Some questions are invalid.")
          return false
        }
      }
    }

    return true
  }

  const handleSubmitTemplate = async (event: FormEvent) => {
    event.preventDefault()

    const isFormValidBool: boolean = isFormValid(true)

    if (isFormValidBool) {
      console.log("Form is valid. Attempting to write to database.")
      await writeTemplateToDatabase()
    } else {
      console.log("Form is not valid.")
    }

    console.log(
      `Wrote the template '${sessionName}' to the database.`,
    )
  }

  const handleSubmitNonTemplate = async (event: FormEvent, performerId: string) => {
    event.preventDefault()

    const isFormValidBool: boolean = isFormValid(false)

    if (isFormValidBool) {
      console.log("Form is valid. Attempting to write to database.")
      await writeNonTemplateToDatabase(performerId)
    } else {
      console.log("Form is not valid.")
    }

    console.log(
      `Wrote the template '${sessionName}' to the database.`,
    )
  }

  const isSlugExists = async (slug: string) => {
    try {
      const response = await fetch(`/api/sessions/getSessionBySlug/${slug}`, {
        method: "get",
      })

      const data = await response.json()
      const isSuccess = data.status

      if (isSuccess == 200) {
        console.log(`${slug} exists.`)
        return { success: true, message: `${slug} exists.` }
      } else {
        console.log(`${slug} does not exist.`)
        return { success: false, message: `${slug} does not exist.` }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  const writeTemplateToDatabase = async () => {
    const questionsList: Question[] = []
    const intervalList: Interval[] = []
    let uniquePerformer: string | null = null;


    for (const question of questions) {
      const questionTypeEnum = getQuestionTypeEnum(question.type)

      if (questionTypeEnum == undefined) {
        console.log("Question type could not be deserialised.")
        return
      }

      const questionForList: Question = {
        id: "",
        question: question.question,
        type: questionTypeEnum,
      }

      questionsList.push(questionForList)
    }
    
    for (const question of existingQuestions) {

      const questionForList: Question = {
        id: question,
        question: "",
        type: QuestionTypeEnum.TEXT,
      }

      questionsList.push(questionForList)
    }

    for (const interval of intervals) {

      const intervalForList: Interval = {
        id: "",
        duration: parseInt(interval.duration, 10),
        intensity: parseInt(interval.intensity, 10),
      }

      intervalList.push(intervalForList)
    }

    // If performer is selected then value is changed from null to the stringId of the performer.
    if (isCheckboxSelected) {
      uniquePerformer = performerId
    }

    // Creates a slug in the format "name_of_template-uniqueto-123123-12sdf-4124-gfgfd4"
    let slugForTemplate =  `${sessionName}-${isCheckboxSelected ? `-uniqueto-${performerId}` : "-notunique"}`
    slugForTemplate = slugForTemplate.toLowerCase().replace(/ /g, '_');

    console.log(intervalList)
    const sessionTemplate = new SessionTemplate("", sessionName, sessionType, tags, questionsList, intervalList, uniquePerformer, slugForTemplate, parseInt(sessionIntensity, 10), parseInt(sessionWatt, 10), parseInt(sessionSpeed, 10), parseInt(sessionPulse, 10), null, null)

    try {
      const data = await isSlugExists(slugForTemplate)
      const isSuccess = data.success

      if (isSuccess) {
        setSubmitButtonText("Error - Template Name Already Exists ")
        return
      }

      const response = await fetch("/api/sessions/createSessionTemplate", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionTemplate),
      })

      setSubmitButtonText("Template Saved!")

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const writeNonTemplateToDatabase = async (performerIdString: string) => {
    const questionsList: Question[] = []
    const intervalList: Interval[] = []
    let uniquePerformer: string | null = null;
    let chosenGoalId: string | null = null;

    for (const question of questions) {
      const questionTypeEnum = getQuestionTypeEnum(question.type)

      if (questionTypeEnum == undefined) {
        console.log("Question type could not be deserialised.")
        return
      }

      const questionForList: Question = {
        id: "",
        question: question.question,
        type: questionTypeEnum,
      }

      questionsList.push(questionForList)
    }
    
    for (const question of existingQuestions) {

      const questionForList: Question = {
        id: question,
        question: "",
        type: QuestionTypeEnum.TEXT,
      }

      questionsList.push(questionForList)
    }

    for (const interval of intervals) {

      const intervalForList: Interval = {
        id: "",
        duration: parseInt(interval.duration, 10),
        intensity: parseInt(interval.intensity, 10),
      }

      intervalList.push(intervalForList)
    }

    // If performer is selected then value is changed from null to the stringId of the performer.
    if (isBasedOnTemplate) {
      uniquePerformer = performerId
    }

    if (isGoalCheckboxSelected) {
      chosenGoalId = goalId
    }

    // Creates a slug in the format "name_of_template-uniqueto-123123-12sdf-4124-gfgfd4"
    let slugForTemplate =  `${sessionName}--uniqueto-${performerIdString}`
    slugForTemplate = slugForTemplate.toLowerCase().replace(/ /g, '_');

    const sessionTemplate = new SessionTemplate("", sessionName, sessionType, tags, questionsList, intervalList, performerIdString, slugForTemplate, parseInt(sessionIntensity, 10), parseInt(sessionWatt, 10), parseInt(sessionSpeed, 10), parseInt(sessionPulse, 10), new Date(sessionDate), chosenGoalId)

    try {
      const data = await isSlugExists(slugForTemplate)
      const isSuccess = data.success

      if (isSuccess) {
        setSubmitButtonText("Error - Template Name Already Exists ")
        return
      }

      const response = await fetch("/api/sessions/createSessionTemplate", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionTemplate),
      })

      setSubmitButtonText("Template Saved!")

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!isApiCalled.current) {
      isApiCalled.current = true
      return
    }

    void getUsersApiResponse()
    void getQuestionsApiResponse()
  }, [])

  return { 
    sessionName, 
    setSessionName, 
    sessionIntensity, 
    setSessionIntensity,
    sessionWatt,
    setSessionWatt,
    sessionSpeed,
    setSessionSpeed,
    sessionPulse,
    setSessionPulse,
    sessionType,
    setSessionType,
    performerId,
    setPerformerId,
    dbPerformers,
    setDbPerformers,
    dbQuestions,
    setDbQuestions,
    tags,
    setTags,
    intervals,
    setIntervals,
    questions,
    setQuestions,
    existingQuestions,
    setExistingQuestions,
    isQuestionValid,
    setIsNameValid,
    isIntensityValid,
    setIsIntensityValid,
    isWattValid,
    setIsWattValid,
    isSpeedValid,
    setIsSpeedValid,
    isPulseValid,
    setIsPulseValid,
    isCheckboxSelected,
    setIsCheckboxSelected,
    submitButtonText,
    sessionDate,
    isDateValid,
    isGoalCheckboxSelected,
    handleGoalCheckboxChange,
    handleGoalDropdownChange,
    dbGoals,
    goalId,
    isTemplateCheckboxSelected,
    handleTemplateCheckboxChange,
    handleTemplateDropdownChange,
    dbTemplates,
    templateId,
    handleDateChange,
    setSubmitButtonText,
    validateString,
    validateStringMeasurement,
    handleNameTextChange,
    handleIntensityTextChange,
    handleWattTextChange,
    handleSpeedTextChange,
    handlePulseTextChange,
    handleTypeDropdownChange,
    handlePerformerDropdownChange,
    handleCheckboxChange,
    handleTagChange,
    handleAddAdditionalTag,
    handleRemoveTag,
    handleIntervalChange,
    handleAddInterval,
    handleRemoveInterval,
    handleQuestionChange,
    handleAddQuestion,
    handleRemoveQuestion,
    handleExistingQuestionChange,
    handleAddExistingQuestion,
    handleRemoveExistingQuestion,
    getUsersApiResponse,
    getQuestionsApiResponse,
    getGoalsApiResponse,
    getTemplateApiResponse,
    handleSubmitNonTemplate,
    handleSubmitTemplate,
    writeToDatabase: writeTemplateToDatabase,
    useEffect
  };

};

export default useTemplateCreatorHook;