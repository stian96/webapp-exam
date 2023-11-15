import { type ReactNode } from "react"

import { type Task } from "@/types"
import TaskText from "@/components/Text"

export default function Tasks({ tasks, children, currentTaskIndex }:
  { tasks: Task[], children: ReactNode, currentTaskIndex: number }) {
  if (tasks.length === 0) return null;

  const task = tasks[currentTaskIndex];
  return (
    <section>
      <article key={task.id}>
        <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
        <h3>{"Type oppgave: "}
          {
            task.type === "add" ? "Addisjon" :
              task.type === "divide" ? "Divisjon" :
                task.type === "multiply" ? "Multiplikasjon" :
                  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                  task.type === "subtract" ? "Subtraksjon" :
                    "Ukjent oppgavetype"
          }
        </h3>
        <h2>{task.text}</h2>
        <p>{task.data}</p>
        {children}
      </article>
    </section>
  )
}
