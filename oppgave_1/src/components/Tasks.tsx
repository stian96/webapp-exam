import { type ReactNode } from "react"

import { type Task } from "@/types"
import TaskText from "@/components/Text"

export default function Tasks({ tasks, children, currentTaskIndex }:
  { tasks: Task[], children: ReactNode, currentTaskIndex: number }) {
    if (tasks.length === 0 || currentTaskIndex < 0 || currentTaskIndex >= tasks.length) {
      return null;
    }

  const task = tasks[currentTaskIndex];
  return (
    <section>

      <article key={task.id}>
        <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
        <p>{task.type}</p>
        <h3>{task.text}</h3>
        <p>{task.data}</p>
        {children}
      </article>

    </section>
  )
}
