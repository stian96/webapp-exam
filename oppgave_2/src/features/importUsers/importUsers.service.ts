import { type PerformerDto } from "@/types/DTO/importUsers";
import { isPerformerExist, writePerformers } from "./importUsers.repository"
import { type Performer } from "@/types/performer";


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
