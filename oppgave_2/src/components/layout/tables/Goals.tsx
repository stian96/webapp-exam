import { useEffect, useState } from "react"

import { type GoalsGroupedByYear } from "@/app/api/goals/getGoals/route"
import { saveGoalsToDb } from "@/lib/dbOperation"
import { Compare, GoalsRow } from "@/components"
import { fetchGoals } from "@/lib/api"
import { type Goal } from "@/types/classes/goal"
import GoalsCreatePopup from "../popups/GoalsCreatePopup"

import "@/style/goals.scss"

type GoalsProps = {
  performerId: string
}

const Goals = ({ performerId }: GoalsProps) => {
  const [allGoals, setAllGoals] = useState<GoalsGroupedByYear>({})
  const [isCreateClicked, setIsCreateClicked] = useState(false)

  useEffect(() => {
    const getGoalsData = async () => {
      const goalsGroupedByYear = (await fetchGoals(performerId)) as GoalsGroupedByYear
      if (!goalsGroupedByYear) {
        setAllGoals({})
      } else {
        setAllGoals(goalsGroupedByYear)
      }
    }
    getGoalsData()
  }, [])

  const filterAfterGoalDelete = (deletedGoalId: string) => {
    const filteredGoals = Object.fromEntries(
      Object.entries(allGoals).map(([year, goalsArray]) => [
          year, 
          goalsArray.filter(goal => goal.id !== deletedGoalId)
      ])
    )
    setAllGoals(filteredGoals)
  }

  const addNewGoals = (newGoal: Goal) => {
    // Find year for the new goal so we know what group to put it in.
    let year = ""
    if (newGoal.date) {
      year = newGoal.date.getFullYear().toString()
    }

    // Check if it already exists goals for the year, if not, initialise an empty list.
    const existingGoalsForYear = allGoals[year] || []
    const updatedGoals = {
      ...allGoals,
      [year]: [...existingGoalsForYear, newGoal],
    }
    setAllGoals(updatedGoals)
    // TODO: Implement method to save new goal to DB. 
  }

  const handleClick = () => {
    setIsCreateClicked(!isCreateClicked)
  }

  return (
    <>
      <GoalsCreatePopup
        createClicked={isCreateClicked}
        close={handleClick}
        onSave={addNewGoals}
      />
      <div className="goals w-full">
        <div className="goals__body">
          <div className="goals__body-header flex justify-between">
            <span className="goals__body-header-data">Goals</span>
            <button className="goals__body-header-button" onClick={handleClick}>
              Create
            </button>
          </div>
          <div className="goals__body-content">
            <div className="mx-auto flex w-11/12 flex-col pb-5">
              {Object.keys(allGoals).length === 0 ? (
                <p>No goals available</p>
              ) : (
                Object.entries(allGoals).map(([year, goalsArray]) => (
                  <GoalsRow
                    key={year}
                    performerId={performerId}
                    goalsArray={goalsArray}
                    year={year}
                    addNewGoals={addNewGoals}
                    onGoalDelete={filterAfterGoalDelete}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <Compare performerId={performerId} />
      </div>
    </>
  )
}

export default Goals
