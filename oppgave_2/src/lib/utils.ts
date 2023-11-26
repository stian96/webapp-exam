import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""
  if (process.env.APP_URL) return `https://${process.env.APP_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const validDateFormat = (date: string): boolean => {
  const validPattern = /^\d{4}-\d{2}-\d{2}$/
  return validPattern.test(date)
}

const MAX_LIMIT = 3

export const maxLimitForNonCompetition = (competition: boolean, competitionCount: number): boolean => {
  return (competition && competitionCount >= MAX_LIMIT)
}


export const maxLimitForCompetition = (nonCompetition: boolean, nonCompetitionCount: number): boolean => {
  return (nonCompetition && nonCompetitionCount >= MAX_LIMIT)

}



