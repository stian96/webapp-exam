"use client"

import type { MouseEvent } from "react"
import { useState } from "react"
import { type Task, type Attempts } from "../types/index"
import { Icons } from "@/components/icons"



export default function Progress({
  tasks, attempts, onShowResults, isAnswerShown, isCorrectAnswer, currentTaskIndex, setCurrentTaskIndex
}: {
  tasks: Task[],
  attempts: Attempts,
  onShowResults: () => void,
  isAnswerShown: boolean,
  isCorrectAnswer: boolean,
  currentTaskIndex: number,
  setCurrentTaskIndex: (index: number) => void;
}) {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setCurrentTaskIndex(currentTaskIndex + 1);
    setErrorMessage(null);
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    if (currentTaskIndex === 0) {

      setErrorMessage('Du er på den første oppgaven og kan ikke gå tilbake.');
    } else {
      setCurrentTaskIndex(currentTaskIndex - 1);
      setErrorMessage(null); // Clear the error message when it's valid to go back
    }
  }

  const isLastQuestion = currentTaskIndex === tasks.length - 1;

  return (
    <footer className="footer-container border-t-slate-300">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button onClick={prev} className="btn-prev">
        <Icons.chevronLeft size={22} />
        <span>Vis forrige oppgave</span>
      </button>

      {isLastQuestion ? (
        (isCorrectAnswer || isAnswerShown) && (
          <button onClick={onShowResults} className="btn-next">
            <span>Vis resultater</span>
          </button>
        )
      ) : (
        (isCorrectAnswer || isAnswerShown) && (
          <button onClick={next} className="btn-next">
            Vis neste oppgave
            <Icons.chevronRight size={22} />
          </button>
        )
      )}

    </footer>
  )
}
