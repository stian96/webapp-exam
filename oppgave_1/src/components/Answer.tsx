
import { useState } from "react"
import type { FormEvent, MouseEvent } from "react"
import { type Task, type Type } from "@/types"

type AnswerProps = {
  task: Task;
  onCorrectAnswer: (taskType: Type) => void;
  onIncorrectAnswer: (taskType: Type, taskId: string) => void;
  remainingAttempts: number;
  totalAttempts: number;
  onShowAnswer: (taskType: Type) => void;

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

    if (userAnswer !== correctAnswerNumber) {

      setMessage('Prøv igjen!');
      setAttemptMade(true);
      onIncorrectAnswer(task.type, task.id);


    } else {
      setMessage('Bra jobbet!');
      setIsCorrectAnswer(true);
      onCorrectAnswer(task.type);

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
    if (remainingAttempts === 0) {
      setShowAnswer(true);
      onShowAnswer(task.type);
    }
  };


  //console.log('anser is', showAnswer)

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

      <button onClick={send} className="btn-send">Send</button>
      {message && <div>{message}</div>}

      {/* TODO: attemptMade er NaN når man henter tilfeldige oppgaver */}
      {attemptMade && (
        <p>{remainingAttempts} av {totalAttempts} forsøk gjenstår</p>
      )}
      <div>
        {!showAnswer && remainingAttempts === 0 && (
          <button onClick={handleShowAnswer}
            className="btn-show-answer">Se svaret</button>
        )}
        {showAnswer && correctAnswer !== null && (
          <div>Riktig svar er: {correctAnswer}</div>
        )}
      </div>
    </div>
  )
}
