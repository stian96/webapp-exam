import { isPerformerExist, writePerformers } from "./importUsers.repository"

type Interval = {
    id: string
    duration: number
    intensity: number
}

type Question = {
    id: string
    question: string
    type: string
}

type Activity = {
    date: string
    name?: string
    tags?: string[]
    goalId?: string
    questions?: Question[]
    intervals: Interval[]
}

type Meta = {
    heartrate: number
    watt: number
    speed: number
}

type Performer = {
    id: string
    userId: string
    gender: string
    sport: string
    meta: Meta
    activities: Activity[]
}

export const writePerformersFromImport = async (jsonString: string): Promise<Result<string>> => {
  
    //TODO write the code that creates an individual user and then forEach each user check if exists then write to database if so.
    let newUsersWrittenToDatabase = 0
    let usersExistingInDatabase = 0
    
    try {


        const performers: Performer[] = JSON.parse(jsonString) as Performer[];

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



