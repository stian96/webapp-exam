export const create = async (): Promise<Result<string>> => {
  
    //TODO write the code that creates an individual user and then forEach each user check if exists then write to database if so.
    let newUsersWrittenToDatabase = 0
    let usersExistingInDatabase = 0


    return { status: true, data: `New users written to database: ${newUsersWrittenToDatabase}. Users already existing in database: ${usersExistingInDatabase}` }
}

const createUser = () => {
    //TODO write code to create a single user object.
}