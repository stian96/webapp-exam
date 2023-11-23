import { type ReactNode } from "react"
import { type Task } from "@/types"
import TaskText from "@/components/Text"

type TasksProps = {
  tasks: Task[]
  children: ReactNode
  currentTaskIndex: number
}

const Tasks = ({ tasks, children, currentTaskIndex }: TasksProps) => {

  if (validateTaskLength(tasks.length, currentTaskIndex)) {
    return null
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

const validateTaskLength = (size: number, currIndex: number): boolean => {
  return (size === 0 || currIndex < 0 || currIndex >= size)
} 

export default Tasks
