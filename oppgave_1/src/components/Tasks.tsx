import { type ReactNode } from "react"
import { type Task } from "@/types"
import TaskText from "@/components/Text"

export default function Tasks({ tasks, children, currentTaskIndex }:
  { tasks: Task[], children: ReactNode, currentTaskIndex: number }) {
  if (tasks.length === 0 || currentTaskIndex < 0 || currentTaskIndex >= tasks.length) {
    return null;
  }
  const taskTypes = {
    add: "Addisjon",
    divide: "Divisjon",
    multiply: "Multiplikasjon",
    subtract: "Subtraksjon"
  };

  const task = tasks[currentTaskIndex];
  const taskTypeDescription = taskTypes[task.type] || "Ukjent oppgavetype";

  return (
    <section>
      <article key={task.id}>
        <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
        <h3>{"Type oppgave: "}{taskTypeDescription}</h3>
        <h2>{task.text}</h2>
        <p>{task.data}</p>
        {children}
      </article>
    </section>
  )
}
