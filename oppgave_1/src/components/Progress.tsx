"use client"

import { useState } from "react"
import type { MouseEvent } from "react"

import { type Task } from "../types/index"

export default function Progress({ tasks, isCorrectAnswer, currentTaskIndex, setCurrentTaskIndex }:
  { tasks: Task[], isCorrectAnswer: boolean, currentTaskIndex: number, setCurrentTaskIndex: (index: number) => void; }) {


  const next = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setCurrentTaskIndex(currentTaskIndex + 1)
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setCurrentTaskIndex(currentTaskIndex - 1)
  }

  return (
    <footer className="mt-4 border-t-slate-300">
      {/*<p>{currentTask ? currentTask.id : "No ID"}</p>*/}
      <button onClick={prev} className="bg-teal-700 text-white">
        Vis forrige oppgave
      </button>
      {isCorrectAnswer && (
        <button onClick={next} className="bg-purple-700 text-white">
          Vis neste oppgave oppgave
        </button>)}
    </footer>
  )
}
