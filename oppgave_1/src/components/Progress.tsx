"use client"

import type { MouseEvent } from "react"
import { useState } from "react"
import { type Task, type Attempts } from "../types/index"
import { Icons } from "@/components/icons"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Progress = ({
  tasks, attempts, onShowResults, isAnswerShown, isCorrectAnswer, currentTaskIndex, setCurrentTaskIndex
}: {
  tasks: Task[],
  attempts: Attempts,
  onShowResults: () => void,
  isAnswerShown: boolean,
  isCorrectAnswer: boolean,
  currentTaskIndex: number,
  setCurrentTaskIndex: (index: number) => void;
}) => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setCurrentTaskIndex(currentTaskIndex + 1);
    setErrorMessage(null);
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    if (currentTaskIndex === 0) {
      toast.error('Du er på den første oppgaven og kan ikke gå tilbake.')
      //setErrorMessage('Du er på den første oppgaven og kan ikke gå tilbake.');
    } else {
      setCurrentTaskIndex(currentTaskIndex - 1);
      setErrorMessage(null); // Clear the error message when it's valid to go back
    }
  }

  const isLastQuestion = currentTaskIndex === tasks.length - 1;

  return (
    <footer className="footer-container border-t-slate-300">

      {/*{errorMessage && <p className="error-message">{errorMessage}</p>}*/}
      <ToastContainer position="bottom-center" autoClose={6500} />

      <button onClick={prev} className="btn-prev">
        <Icons.chevronLeft size={22} />
        Vis forrige oppgave
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

export default Progress

// SRC for toast-implementation:
// NPM.(2023).React-Toastify. https://www.npmjs.com/package/react-toastify?activeTab=readme
// Innocent,C.(2023).Using React-Toastify to style your toast messages. LogRocket:Frontend Analytics.
// https://blog.logrocket.com/using-react-toastify-style-toast-messages/