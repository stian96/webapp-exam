import { type NextApiRequest, type NextApiResponse } from 'next'
import { type Poll, type Result } from '@/types'

import * as pollService from './poll.service'

// The MVC architecture, while tried and tested, isn't the ideal choice for projects that 
// are using Next JS 13. This is because Next JS has its own architecture that should be 
// followed, which allows developers to easily implement pages (including client side 
// rendered pages), API routes, and react components, while decreasing development time.
// In Next JS 13 the API routes inside 'src/app/api' remain serverless and can be used with 
// client side react components that contain useState, useEffect, etc.

// Here we can see that the only validation present is that -something- is sent as a title and 
// slug. This isn't the greatest solution as it is a security risk, as well as making the database 
// susceptible to dirty data (e.g. a title that is just the character '~' is valid in this case).

/** TASK_1_START */
/**
 * The first change I would make would be to take the 'features' directory, complete with the 
 * controller, service, and repository, and refactor/reimplement it for Next JS 13. I would 
 * first start by creating a 'api' directory in 'src/app', and then create a 'poll/createPoll' 
 * and 'poll/getPoll/[slug]' folder (API endpoints) based off the repository class. I would 
 * then implement the prisma queries using the GET and POST functions.
 * 
 * Secondly, I would then create verification functionality for these API endpoints. If the 
 * title and slug weren't suitable (e.g. no A-Z/A-Æ characters, or just composed of symbols
 * or spaces) then a NextResponse to return 400 together with a reason for the bad request.
 * 
 * Thirdly, I would move the functionality in the controller and service to a custom hook so 
 * that it is reusable. It would also be easy to test both with dummy data and also a dummy 
 * database.
 * 
 * An example of a similar implementation can be found in oppgave 2.
 * In 'src/hooks/useImportUsersHook' there are similar functions to be found, with each user 
 * to be imported is first checked in the database to see if the data already exists. Based on 
 * the status code, the function 'isUserExists' returns a boolean. The status code is saved both 
 * as a state, and as a string (which can be displayed either as button text, popup/alert text, 
 * or a paragraph/span. Additionally it can be used to log in the console.). 
 * 
 * An example of the API endpoint implementation (Next JS 13) can be found in oppgave 2 as well.
 * In 'src/app/api/users/getUserById/[userId]' and 'src/app/api/users/importUser' are located 
 * the code that retrieves a user (to check if it exists, much like the 'exists' function in 
 * the repository class). Though this class lacks validation (due to time constraints), it still 
 * serves as an example as to how a developer can create a Next JS 13 API endpoint.
 * 
 * The importUser endpoint is implemented as a single transaction, where imported data is written 
 * to many different tables. The complexity of this API endpoint is abstracted away from other 
 * developers, but documentation (using Swagger) is provided to demonstrate the format of a suitable 
 * request. Though writing a poll to the database is much more simple, this class demonstrates that 
 * data can be written in several differing ways depending on the request (e.g. if a certain value 
 * doesn't exist then it can either be skipped, or a default value can be generated).
 */
/** TASK_1_END */
export const createPoll = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Poll>>
) => {
  const { title, slug } = req.body

  if (!title || !slug) {
    res.status(400).json({
      status: false,
      error: { message: 'Missing required fields' },
    })
    return
  }

  const createdPoll = await pollService.create({
    title,
    slug,
  })

  if (!createdPoll.status) {
    res.status(500).json({
      status: false,
      error: createdPoll.error,
    })
    return
  }

  res.status(201).json({
    status: true,
    data: createdPoll.data,
  })
}
