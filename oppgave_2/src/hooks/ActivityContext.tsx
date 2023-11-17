"use client"
import { createContext, useState, ReactNode } from "react"

type ActivityContextType = {
    selectedActivities: number[],
    toggleActivity: (activityId: number) => void
}

interface ActivityProviderProps {
    children: ReactNode
}

const defaultContext: ActivityContextType = {
    selectedActivities: [],
    toggleActivity: () => {}
}

// This context was created to avoid 4 levels of props drilling.
export const ActivityContext = createContext<ActivityContextType>(defaultContext)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
    const [selectedActivities, setSelectedActivities] = useState<number[]>([])

    const toggleActivity = (activityId: number) => {
        setSelectedActivities(prev => {
            const isAlreadySelected = prev.includes(activityId)
            if (isAlreadySelected) {
                return prev.filter(id => id !== activityId)
            }
            else {
                return [...prev, activityId]
            }
        })
    }

    return (
        <ActivityContext.Provider value={{ selectedActivities, toggleActivity }}>
            {children}
        </ActivityContext.Provider>
    )
}