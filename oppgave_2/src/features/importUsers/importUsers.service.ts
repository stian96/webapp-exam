import { SessionActivity } from './../../types/sessions/sessionActivity';
import { ActivityDto, type PerformerDto } from "@/types/DTO/importUsers";
import { isPerformerExist, writePerformers } from "./importUsers.repository"
import { Performer } from "@/types/performer";
import { SessionActivity } from "@/types/sessions/sessionActivity";
import { Goal } from "@/types/goal";


export const writePerformersFromImport = async (jsonString: string): Promise<Result<string>> => {
  
    //TODO write the code that creates an individual user and then forEach each user check if exists then write to database if so.
    let newUsersWrittenToDatabase = 0
    let usersExistingInDatabase = 0
    
    try {


        const performers: PerformerDto[] = JSON.parse(jsonString) as PerformerDto[];

        // For loop instead of for each here - for each isn't great with async.
        for (const performer of performers) {
            const resultPerformerExists = await isPerformerExist(performer);

            if (resultPerformerExists.success) {

                usersExistingInDatabase++
            } else {
                const resultPerformerWritten = await writePerformers(performer);

                if (resultPerformerWritten.success) {
                    console.log("success writing")
                    newUsersWrittenToDatabase++
                } 
            }
        }    
    } catch (error) {
        return { status: false, data: "Error writing to database." }
    }

    return { status: true, data: `New users written to database: ${newUsersWrittenToDatabase}. Users already existing in database: ${usersExistingInDatabase}` }
}

export const createPerformerFromDto = (performerDto: PerformerDto): Performer => {
    const performer: Performer = {
        id: performerDto.id,
        userId: performerDto.userId,
        gender: performerDto.gender,
        sport: performerDto.sport,
        heartRate: performerDto.meta.heartrate,
        watt: performerDto.meta.watt,
        speed: performerDto.meta.speed
    }

    return performer
}

export const createSessionActivityFromDto = (performerDto: PerformerDto): SessionActivity[] => {

    const activities: SessionActivity[] = []

    performerDto.activities.forEach((activity) => {
        const sessionActivity: SessionActivity = {
        }

        activities.push(sessionActivity)
    })
    const sessionActivity: SessionActivity = {

        id          String     @id @default(cuid())
        date        DateTime
        session     Sessions   @relation(fields: [sessionId], references: [id])
        sessionId   String
        goal        Goals      @relation(fields: [goalId], references: [id])
        goalId      String
        performer   Performers @relation(fields: [performerId], references: [id])
        performerId String
        report      Reports?
        id: cuid(),
        date: activityDto.goalId,
        session: performerDto.gender,
        sport: performerDto.sport,
        heartRate: performerDto.meta.heartrate,
        watt: performerDto.meta.watt,
        speed: performerDto.meta.speed
    }

    return sessionActivity
}

// tags

// questions

// intervals

export const createGoalFromDto = (performerDto: PerformerDto): Goal => {
    const goal: Goal = {
        id: performerDto.activities[0].goal,
        name: performerDto.activities[0].name,
        date: performerDto.activities[0].date,
        goal: performerDto.activities[0].goal,
        comments: performerDto.activities[0].
    }

    return goal
}

function cuid() {
    throw new Error("Function not implemented.");
}
