import { type ReactNode } from "react"

import { type Task } from "@/types"

export default function Tasks({ tasks, children }: { tasks: Task[], children: ReactNode }) {

  return (
    <section>
      {tasks.map((task) => (
        <article key={task.id}>
          <p>{task.type}</p>
          <h3>{task.text}</h3>
          <p>{task.data}</p>
        </article>
      ))}
      {children}
    </section>
  )
}
