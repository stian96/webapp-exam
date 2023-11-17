//"use client"

import { useState } from "react"
import type { FormEvent, MouseEvent } from "react"
import { type Task, type Stats, type AnswerStatus, type Type } from "@/types"

type AnswerProps = {
  task: Task;
  onCorrectAnswer: (taskType: Type) => void;
  onIncorrectAnswer: (taskType: Type) => void;
  remainingAttempts: number;
  totalAttempts: number;
  onShowAnswer: () => void;

}

export default function Answer({
  task,
  onCorrectAnswer,
  onIncorrectAnswer,
  remainingAttempts,
  totalAttempts,
  onShowAnswer
}: AnswerProps) {
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
  const [attemptMade, setAttemptMade] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false);

  const calculateCorrectAnswer = (task: Task): number | null => {
    const [num1, num2] = task.data.split('|').map(Number);

    switch (task.type) {
      case 'add':
        return num1 + num2;
      case 'subtract':
        return num1 - num2;
      case 'multiply':
        return num1 * num2;
      case 'divide':
        return num1 / num2;
      default:
        return null;
    }
  };

  const correctAnswer = calculateCorrectAnswer(task);

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const userAnswer = Number(answer);
    const correctAnswerNumber = Number(correctAnswer);

    if (userAnswer === correctAnswerNumber) {
      setMessage('Bra jobbet!');
      setIsCorrectAnswer(true);
      onCorrectAnswer(task.type);

    } else {
      setMessage('Prøv igjen!');
      setAttemptMade(true);
      onIncorrectAnswer(task.type);
    }
  };

  const update = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const number = value === "" ? NaN : Number(value);
    if (!isNaN(number)) {
      setAnswer(number.toString());
    } else {
      setAnswer('');
    }
    setMessage(null);
  }
  const handleShowAnswer = () => {

    console.log('Show Answer Clicked');
    setShowAnswer(true);
    onShowAnswer();
  };
  const inputId = `answer-${task.id}`;
  return (
    <div>
      <label htmlFor={inputId}>Svar</label>
      <input
        id={inputId}
        name={"answer"}
        type="text"
        placeholder="Sett svar her"
        onChange={update}
        value={answer}
      />
      {/*{9 + 2 === answer ? "Bra jobbet!" : null}*/}
      {/*{correctAnswer === answer ? <div>Bra jobbet!</div> : null}*/}
      <button onClick={send} className="btn-send">Send</button>
      {isCorrectAnswer && message && <div>{message}</div>}

      {attemptMade && (
        <p>{remainingAttempts} of {totalAttempts} attempts remaining</p>
      )}
      <div>
        {!showAnswer && remainingAttempts === 0 && (
          <button onClick={() => { setShowAnswer(true); handleShowAnswer }}
            className="btn-show-answer">Se svaret</button>
        )}
        {showAnswer && correctAnswer !== null && (
          <div>Riktig svar er: {correctAnswer}</div>
        )}
      </div>
    </div>
  )
}
