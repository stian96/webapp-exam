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

import { describe, it, expect, vi } from 'vitest';
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
  
  it("renders with default state and navigation buttons", () => {
    render(<Progress tasks={tasks} isCorrectAnswer={false} currentTaskIndex={0} setCurrentTaskIndex={() => {}} />);
    const prevButton = screen.getByText("Vis forrige oppgave");
    expect(prevButton).toBeInTheDocument();
   
  });
  
  it('increments the state when "Neste" is clicked', () => {
    const setCurrentTaskIndex = vitest.fn();
    render(<Progress tasks={tasks} isCorrectAnswer={true} currentTaskIndex={0} setCurrentTaskIndex={setCurrentTaskIndex} />);
    const nextButton = screen.getByRole('button', { name: /vis neste oppgave/i });
    fireEvent.click(nextButton);
    expect(setCurrentTaskIndex).toHaveBeenCalledWith(1);
  });

  //SRC: OpenAI.(2023).ChatGPT(GPT-4).[Large language model]. https://chat.openai.com/chat
  it('decrements the state when "Forrige" is clicked', () => {
    let testCurrentTaskIndex = 1; 
  const mockSetCurrentTaskIndex = (index) => {
    testCurrentTaskIndex = index; 
  };

  render(
    <Progress 
      tasks={tasks} 
      isCorrectAnswer={false} 
      currentTaskIndex={testCurrentTaskIndex} 
      setCurrentTaskIndex={mockSetCurrentTaskIndex} 
    />
  );

  const prevButton = screen.getByText("Vis forrige oppgave");
  fireEvent.click(prevButton);

  expect(testCurrentTaskIndex).toBe(0); 
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

    expect(taskTextElement).toHaveClass("text-sm md:text-base lg:text-lg")
  })

  it("renders the header text correctly", () => {
    render(<Header />)
    const headerElement = screen.getByText("Matematikkoppgaver")

    expect(headerElement).toBeInTheDocument()
  })

  it("updates the answer correctly", () => {
    render(<Answer task={{
      id: "1",
      text: "Tekstsvar",
      type: "add",
      data: "6|5"
    }} onCorrectAnswer={function (): void {
      throw new Error("Function not implemented.")
    }} />)
    const inputElement = screen.getByPlaceholderText("Sett svar her") as HTMLInputElement

    fireEvent.input(inputElement, { target: { value: "11" } })

    expect(inputElement.value).toBe("11")
  })

  it('displays "Bra jobbet!" when the answer is correct', () => {
    const task: Task = {
      id: "1",
      text: "Teksoppgave",
      type: "add",
      data: `6|5`,

    };
    render(<Answer task={task} onCorrectAnswer={() => { }} />)
    const inputElement = screen.getByPlaceholderText("Sett svar her")
    const sendButton = screen.getByText("Send")

    fireEvent.input(inputElement, { target: { value: "11" } })
    fireEvent.click(sendButton)

    const successMessage = screen.getByText("Bra jobbet!")
    expect(successMessage).toBeInTheDocument()
  })
  it("renders the current task correctly", () => {
    const tasks: Task[] = [
      { id: '1', type: 'add', text: '1 + 1', data: '2|3' },
      { id: '2', type: 'subtract', text: '3 - 1', data: '5|3' },
    ];
    render(<Tasks tasks={tasks} currentTaskIndex={0}>{null}</Tasks>)

    const typeElement = screen.getByText(/Addisjon/i);
    const dataElement = screen.getByText(tasks[0].data);
    const taskTextElement = screen.getByText(tasks[0].text);

    expect(taskTextElement).toBeInTheDocument();
    expect(typeElement).toBeInTheDocument();
    expect(dataElement).toBeInTheDocument();

    expect(screen.queryByText(tasks[1].text)).not.toBeInTheDocument()

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
    expect(result.current.current).toEqual(tasks[0])
  })

  
  it("updates count when prev is called", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    act(() => {
      result.current.prev()
    })

    expect(result.current.count).toBe(-1)
    expect(result.current.current).toEqual(tasks[0])
  })
})
