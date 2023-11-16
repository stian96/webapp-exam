export type Task = {
  id: string
  text: string
  type: "add" | "divide" | "multiply" | "subtract"
  data: `${number}|${number}`
}

export type Type = "add" | "subtract" | "multiply" | "divide"

export type QueryParamsRandomTask = {
  taskType?: string
  count?: number
}
export type QueryParamsTask = {
  taskType?: string
  count?: string
}

export type Attempts = Record<string, number>;

//Forelesning Webapp-06:https://github.com/mariuswallin/webapp-2023/blob/main/webapp-06/src/types/index.ts