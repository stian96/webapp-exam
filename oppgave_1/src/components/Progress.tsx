"use client"

import type { MouseEvent } from "react"

import { type Task } from "../types/index"

export default function Progress({ isAnswerShown, isCorrectAnswer, currentTaskIndex, setCurrentTaskIndex }:
  { tasks: Task[], isAnswerShown: boolean, isCorrectAnswer: boolean, currentTaskIndex: number, setCurrentTaskIndex: (index: number) => void; }) {


  const next = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setCurrentTaskIndex(currentTaskIndex + 1)
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setCurrentTaskIndex(currentTaskIndex - 1)
  }
  console.log({ isCorrectAnswer, isAnswerShown });
  return (
    <footer className="border-t-slate-300">
      {/*<p>Task ID: {tasks[currentTaskIndex]?.id ?? 'No ID'}</p>*/}
      <button onClick={prev} className="btn-prev">
        Vis forrige oppgave
      </button>
      {(isCorrectAnswer || isAnswerShown) && (
        <button onClick={next} className="btn-next">
          Vis neste oppgave
        </button>)}
    </footer>
  )
}
