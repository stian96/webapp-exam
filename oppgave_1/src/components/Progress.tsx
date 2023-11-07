"use client"

import { useState } from "react"
import type { MouseEvent } from "react"

import { type Task } from "@/types"

export default function Progress(props: { tasks: Task[] }) {
  const [state, setState] = useState(0)
  const currentTask = props.tasks[state]

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setState(state + 1)
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setState(state - 1)
  }

  return (
    <footer className="mt-4 border-t-slate-300">
      <p>{currentTask.id}</p>
      <button onClick={next} className="bg-purple-700 text-white">
        Forrige
      </button>
      <button onClick={prev} className="bg-teal-700 text-white">
        Neste
      </button>
    </footer>
  )
}
