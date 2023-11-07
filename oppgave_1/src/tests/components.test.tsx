import React from "react"
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react"

import Answer from "@/components/Answer"
import Button from "@/components/Button"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import useProgress from "@/hooks/useProgress"
import { Task } from "@/types"

describe("Button Component", () => {
  it("renders a button with children", () => {
    render(<Button classNames="custom-class">Click me</Button>)
    const button = screen.getByText("Click me")
    expect(button).toHaveClass("custom-class")
    expect(button).toBeInTheDocument()
  })

  it("applies custom classNames to the button", () => {
    render(<Button classNames={["class1", "class2"]}>Custom Button</Button>)
    const button = screen.getByText("Custom Button")
    expect(button).toHaveClass("class1")
    expect(button).toHaveClass("class2")
  })
})

describe("Progress Component", () => {
  const tasks: Task[] = [
    {
      id: "123",
      text: "Skriv resultatet av regneoperasjonen",
      data: "9|2",
      type: "add",
    },
    {
      id: "234",
      text: "Skriv resultatet av regneoperasjonen",
      data: "3|2",
      type: "add",
    },
    {
      id: "356",
      text: "Skriv resultatet av regneoperasjonen",
      data: "3|2",
      type: "multiply",
    },
  ]
  it("renders with default state and buttons", () => {
    render(<Progress tasks={tasks} />)

    const currentTask = screen.getByText("123")
    expect(currentTask).toBeInTheDocument()

    const nextButton = screen.getByText("Neste")
    expect(nextButton).toBeInTheDocument()

    const prevButton = screen.getByText("Forrige")
    expect(prevButton).toBeInTheDocument()
  })

  it('increments the state when "Neste" is clicked', () => {
    render(<Progress tasks={tasks} />)
    const nextButton = screen.getByText("Neste")

    fireEvent.click(nextButton)

    const updatedTask = screen.getByText("234")
    expect(updatedTask).toBeInTheDocument()
  })

  it('decrements the state when "Forrige" is clicked', () => {
    render(<Progress tasks={tasks} />)
    const nextButton = screen.getByText("Neste")
    const prevButton = screen.getByText("Forrige")

    fireEvent.click(nextButton)
    fireEvent.click(prevButton)

    const updatedTask = screen.getByText("123")
    expect(updatedTask).toBeInTheDocument()
  })

  it("renders the provided text", () => {
    const text = "This is a test task text."
    render(<TaskText text={text} />)
    const taskTextElement = screen.getByText(text)

    expect(taskTextElement).toBeInTheDocument()
  })

  it("applies the correct CSS class", () => {
    const text = "This is a test task text."
    render(<TaskText text={text} />)
    const taskTextElement = screen.getByText(text)

    expect(taskTextElement).toHaveClass("text-sm text-slate-400")
  })

  it("renders the header text correctly", () => {
    render(<Header />)
    const headerElement = screen.getByText("Oppgave 1")

    expect(headerElement).toBeInTheDocument()
  })

  it("updates the answer correctly", () => {
    render(<Answer />)
    const inputElement = screen.getByPlaceholderText("Sett svar her")

    fireEvent.input(inputElement, { target: { value: "11" } })

    expect(inputElement.value).toBe("11")
  })

  it('displays "Bra jobbet!" when the answer is correct', () => {
    render(<Answer />)
    const inputElement = screen.getByPlaceholderText("Sett svar her")
    const sendButton = screen.getByText("Send")

    fireEvent.input(inputElement, { target: { value: "11" } })
    fireEvent.click(sendButton)

    const successMessage = screen.getByText("Bra jobbet!")
    expect(successMessage).toBeInTheDocument()
  })
  it("renders a list of tasks correctly", () => {
    render(<Tasks>{null}</Tasks>)

    for (const task of tasks) {
      const taskElement = screen.getByText(task.text)
      const typeElement = screen.getByText(task.type)
      const dataElement = screen.getByText(task.data)

      expect(taskElement).toBeInTheDocument()
      expect(typeElement).toBeInTheDocument()
      expect(dataElement).toBeInTheDocument()
    }
  })
  it("initializes with count as 0 and returns the current task", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    expect(result.current.count).toBe(0)
    expect(result.current.current).toEqual(tasks[0])
  })

  it("updates count when next is called", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    act(() => {
      result.current.next()
    })

    expect(result.current.count).toBe(1)
    expect(result.current.current).toEqual(tasks[1])
  })

  it("updates count when prev is called", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    act(() => {
      result.current.prev()
    })

    expect(result.current.count).toBe(tasks.length - 1)
    expect(result.current.current).toEqual(tasks[tasks.length - 1])
  })
})
