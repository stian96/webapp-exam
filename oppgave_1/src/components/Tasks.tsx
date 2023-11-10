import { type ReactNode } from "react"

import { type Task } from "@/types"
import TaskText from "@/components/Text"

export default function Tasks({ tasks, children }: { tasks: Task[], children: ReactNode }) {

  return (
    <section>
      {tasks.map((task) => (
        <article key={task.id}>
          <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
          <p>{task.type}</p>
          <h3>{task.text}</h3>
          <p>{task.data}</p>
          {children}
        </article>
      ))}

    </section>
  )
}
