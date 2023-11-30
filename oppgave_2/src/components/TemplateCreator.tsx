"use client"

import "../style/form.scss"

import React, { useRef } from "react"

import useTemplateCreatorHook from "@/hooks/useTemplateCreatorHook"

// Code based on React documentation found here:
// https://legacy.reactjs.org/docs/forms.html

// Reference: I also used ChatGPT V3.5 quite a bit when creating the subforms.
// I've written comments where I've used it. The code it produced was heavily edited,
// but it gave me a good starting point.
type TemplateCreatorProps = {
  isTemplateCreator: boolean
  performerIdString?: string
}

const TemplateCreator = ({
  isTemplateCreator,
  performerIdString,
}: TemplateCreatorProps) => {
  const {
    sessionName,
    sessionIntensity,
    sessionWatt,
    sessionSpeed,
    sessionPulse,
    sessionType,
    performerId,
    dbPerformers,
    dbQuestions,
    tags,
    intervals,
    questions,
    existingQuestions,
    isQuestionValid,
    isIntensityValid,
    isWattValid,
    isSpeedValid,
    isPulseValid,
    isCheckboxSelected,
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
    writeToDatabase,
    useEffect,
  } = useTemplateCreatorHook()

  const isGoalsApiCalled = useRef(false)

  useEffect(() => {
    if (!isGoalsApiCalled.current) {
      isGoalsApiCalled.current = true
      return
    }

    if (!isTemplateCreator) {
      void getGoalsApiResponse(performerIdString)
      void getTemplateApiResponse(performerIdString)
    }
  }, [])

  // Reference: ChatGPT V3.5. I can't comment directly into the following but the subforms but
  // I used it to create starting points for me to use to implement the tags, intervals, questions,
  // and existing questions sections near the bottom.
  return (
    <form
      onSubmit={(event) =>
        isTemplateCreator
          ? handleSubmitTemplate(event)
          : handleSubmitNonTemplate(event, performerIdString)
      }
      className="form flex w-full flex-col space-y-4"
    >
      <div
        className={`${isTemplateCreator ? "hidden" : ""} ${
          dbTemplates.length === 0 ? "hidden" : ""
        } flex flex-row items-center space-x-4`}
      >
        <input
          id="checkboxTemplate"
          type="checkbox"
          className="form__checkbox"
          onChange={handleTemplateCheckboxChange}
          checked={isTemplateCheckboxSelected}
        />
        <label htmlFor="checkboxTemplate">Based On Template</label>

        <label htmlFor="goal">Select Template:</label>
        <select
          id="template"
          value={templateId}
          onChange={handleTemplateDropdownChange}
          disabled={!isTemplateCheckboxSelected}
          className={`form__select ${
            isTemplateCheckboxSelected && templateId != ""
              ? "--enabled"
              : "--disabled"
          } flex-grow rounded focus:scale-105`}
        >
          <option value="" disabled>
            Select a template...
          </option>
          {dbTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.slug}
            </option>
          ))}
        </select>
      </div>

      <div className={`${isTemplateCreator ? "hidden" : ""} flex flex-col`}>
        <label htmlFor="sessionDate" className="mb-1">
          Date:
        </label>
        <input
          id="sessionDate"
          type="date"
          value={sessionDate}
          onChange={handleDateChange}
          className={`form__dateInput ${
            isDateValid
              ? "border-green-400 text-green-600"
              : "border-red-600 text-red-600"
          }`}
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
            disabled={isTemplateCheckboxSelected}
            placeholder="Enter a measurement..."
            className={`form__input ${
              isIntensityValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            } ${isTemplateCheckboxSelected ? "bg-gray-500" : ""}`}
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
            disabled={isTemplateCheckboxSelected}
            onChange={handleWattTextChange}
            placeholder="Enter a measurement..."
            className={`form__input ${
              isWattValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            } ${isTemplateCheckboxSelected ? "bg-gray-500" : ""}`}
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
            disabled={isTemplateCheckboxSelected}
            placeholder="Enter a measurement..."
            className={`form__input ${
              isSpeedValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            } ${isTemplateCheckboxSelected ? "bg-gray-500" : ""}`}
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
            disabled={isTemplateCheckboxSelected}
            onChange={handlePulseTextChange}
            placeholder="Enter a measurement..."
            className={`form__input ${
              isPulseValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            } ${isTemplateCheckboxSelected ? "bg-gray-500" : ""}`}
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
          disabled={isTemplateCheckboxSelected}
          onChange={handleTypeDropdownChange}
          className={`form__select rounded focus:scale-105 ${
            isTemplateCheckboxSelected ? "bg-gray-500" : ""
          }`}
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

      <div
        className={`${
          isTemplateCreator ? "" : "hidden"
        } flex flex-row items-center space-x-4`}
      >
        <input
          id="checkboxPerformer"
          type="checkbox"
          className="form__checkbox"
          onChange={handleCheckboxChange}
          checked={isCheckboxSelected}
        />
        <label htmlFor="checkboxPerformer">Unique to Performer</label>

        <label htmlFor="performer">Select Performer:</label>
        <select
          id="performer"
          value={performerId}
          onChange={handlePerformerDropdownChange}
          disabled={!isCheckboxSelected}
          className={`form__select ${
            isCheckboxSelected && performerId != "" ? "--enabled" : "--disabled"
          } flex-grow rounded focus:scale-105`}
        >
          <option value="" disabled>
            Select a performer...
          </option>
          {dbPerformers.map((performer) => (
            <option key={performer.id} value={performer.id}>
              {performer.id} - {performer.userId}
            </option>
          ))}
        </select>
      </div>

      <div className="subform">
        <span>Tags:</span>
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center space-x-4">
            <label htmlFor={`tag-${index + 1}`} className="flex-shrink-0">
              Tag {index + 1}:
            </label>
            <input
              type="text"
              id={`tag-${index + 1}`}
              value={tag}
              className="form__input --default"
              onChange={(e) => {
                handleTagChange(index, e.target.value)
              }}
              placeholder="Enter a tag..."
            />
            {index == 0 && (
              <button
                type="button"
                onClick={handleAddAdditionalTag}
                className="subform__button --add w-1/5 flex-shrink-0"
              >
                Add Additional Tag
              </button>
            )}
            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  handleRemoveTag(index)
                }}
                className="subform__button w-1/5 flex-shrink-0"
              >
                Remove Tag
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="subform">
        <span>Intervals:</span>
        {intervals.map((interval, index) => (
          <div key={index} className="flex items-center space-x-4">
            <label htmlFor={`duration-${index + 1}`}>Duration:</label>
            <input
              type="text"
              id={`duration-${index + 1}`}
              value={interval.duration}
              className="form__input --default"
              onChange={(e) => {
                handleIntervalChange(index, "duration", e.target.value)
              }}
              placeholder="Enter duration..."
            />

            <label htmlFor={`intensity-${index + 1}`}>Intensity:</label>
            <input
              type="text"
              id={`intensity-${index + 1}`}
              value={interval.intensity}
              className="form__input --default"
              onChange={(e) => {
                handleIntervalChange(index, "intensity", e.target.value)
              }}
              placeholder="Enter intensity..."
            />

            {index === 0 && (
              <button
                type="button"
                onClick={handleAddInterval}
                className="subform__button --add w-1/5 flex-shrink-0"
              >
                Add Interval
              </button>
            )}

            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  handleRemoveInterval(index)
                }}
                className="subform__button w-1/5 flex-shrink-0"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="subform">
        <span>Questions:</span>
        {questions.map((question, index) => (
          <div key={index} className="flex items-center space-x-4">
            <label htmlFor={`text-${index + 1}`}>Question:</label>
            <input
              type="text"
              id={`text-${index + 1}`}
              value={question.question}
              className="form__input --default"
              onChange={(e) => {
                handleQuestionChange(index, "question", e.target.value)
              }}
              placeholder="Enter a question..."
            />

            <label htmlFor={`type-${index + 1}`}>Type:</label>
            <select
              id={`type-${index + 1}`}
              value={question.type}
              onChange={(e) => {
                handleQuestionChange(index, "type", e.target.value)
              }}
              className="form__select rounded focus:scale-105"
            >
              <option value="text">Text</option>
              <option value="radio:range">1 to 10</option>
              <option value="radio:mood">Emojis</option>
            </select>

            {index === 0 && (
              <button
                type="button"
                onClick={handleAddQuestion}
                className="subform__button --add w-1/5 flex-shrink-0"
              >
                Add Question
              </button>
            )}

            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  handleRemoveQuestion(index)
                }}
                className="subform__button w-1/5 flex-shrink-0"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="subform">
        <span>Existing Questions:</span>
        {existingQuestions.map((existingQuestion, index) => (
          <div key={index} className="flex items-center space-x-4">
            <label htmlFor={`existing-question-${index + 1}`}>Question:</label>
            <select
              id={`existing-question-${index + 1}`}
              value={existingQuestions[index]}
              className="form__input --default"
              onChange={(e) => {
                handleExistingQuestionChange(index, e)
              }}
            >
              <option value="" disabled>
                Select a question...
              </option>
              {dbQuestions.map((question) => (
                <option key={question.id} value={question.id}>
                  {question.question} - {question.type}
                </option>
              ))}
            </select>

            {index === 0 && (
              <button
                type="button"
                onClick={handleAddExistingQuestion}
                className="subform__button --add w-1/5 flex-shrink-0"
              >
                Add Existing Question
              </button>
            )}

            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  handleRemoveExistingQuestion(index)
                }}
                className="subform__button w-1/5 flex-shrink-0"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div
        className={`${
          isTemplateCreator ? "hidden" : ""
        } flex flex-row items-center space-x-4`}
      >
        <input
          id="checkboxGoal"
          type="checkbox"
          className="form__checkbox"
          onChange={handleGoalCheckboxChange}
          checked={isGoalCheckboxSelected}
        />
        <label htmlFor="checkboxGoal">Specific Goal</label>

        <label htmlFor="goal">Select Goal:</label>
        <select
          id="goal"
          value={goalId}
          onChange={handleGoalDropdownChange}
          disabled={!isGoalCheckboxSelected}
          className={`form__select ${
            isGoalCheckboxSelected && goalId != "" ? "--enabled" : "--disabled"
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
          submitButtonText === "Template Saved!" ? "--saved" : ""
        }
        ${submitButtonText.startsWith("Error") ? "--error" : ""}`}
      >
        {submitButtonText}
      </button>
    </form>
  )
}

export default TemplateCreator
