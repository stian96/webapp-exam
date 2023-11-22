"use client"

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"

import "../style/form.scss"

import useActivityEditorHook from "@/hooks/useActivityEditorHook"
import { Goal } from "@/types/classes/goal"
import { SessionTemplate } from "@/types/classes/sessionTemplate"
import { SessionEditDto } from "@/types/DTO/sessionEditDto"
import { SessionActivityDto } from "@/types/sessionActivity"

type ActivityEditorProps = {
  activityId: string
}

const ActivityEditor = ({ activityId }: ActivityEditorProps) => {
  const {
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
    submitButtonText,
  } = useActivityEditorHook()
  const isApiCalled = useRef(false)

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
