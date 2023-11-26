import { useEffect, useState } from "react"
import { hasReachedCompetitionLimit, hasReachedNonCompetitionLimit } from "@/lib/utils"
import { type GoalsGroupedByYear } from "@/app/api/goals/getGoals/route"
import { addNewGoalToDB } from "@/lib/dbOperation"
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

  const addNewGoals = (goal: Goal) => {
    const date = goal.date as Date
    let year = date ? date.getFullYear().toString() : ""

    const existingGoalsForYear = allGoals[year] || []
    const competitionGoalCount = existingGoalsForYear.filter(c => c.isCompetition).length;
    const nonCompetitionGoalCount = existingGoalsForYear.filter(c => !c.isCompetition).length;

    if (hasReachedCompetitionLimit(goal.isCompetition, competitionGoalCount)) {
        alert(`Maximum of 3 competition goals reached for the year: ${year}`);
        return;
    } 
    else if (hasReachedNonCompetitionLimit(goal.isCompetition, nonCompetitionGoalCount)) {
        alert(`Maximum of 3 non-competition goals reached for the year: ${year}`);
        return;
    }
 
    let goalForDB = {
      ...goal,
      date: date.toISOString(),
      goalNotCompetition: goal.isCompetition ? undefined : goal.goalNotCompetition,
      goalCompetition: goal.isCompetition ? goal.goalCompetition : undefined
    }
    
    const updatedGoals = {
      ...allGoals,
      [year]: [...existingGoalsForYear, goalForDB],
    }
    setAllGoals(updatedGoals)
    addNewGoalToDB({goal: goalForDB, performerId, year})
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
      <div className="goals mx-5">
        <div className="goals__body">
          <div className="goals__body-header flex justify-between">
            <span className="goals__body-header-data">Goals</span>
            <button className="goals__body-header-button" onClick={handleClick}>
              Create
            </button>
          </div>
          <div className="goals__body-content">
            <div className="mx-4 flex w-auto flex-col py-2">
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
