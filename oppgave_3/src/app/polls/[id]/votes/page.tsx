import React from 'react'
import { getPollData } from '@/lib/helper'

/* TASK_[3]_START */
/*
  Problem 1: The 'PollQuestion' page is currently located in 'app/polls/[id]/votes', causing a 
  404 error when trying to access the '/votes' route. This issue arises from a misunderstanding 
  of Next.js's filesystem-based routing, where the dynamic route '[id]' is not properly implemented.

  Solution 1: Relocate the page to 'app/votes' to align the file path with the expected URL, 
  thereby resolving the routing issue.

  Problem 2: After moving the 'PollQuestion' component to the correct location, the '/votes' 
  page displays raw JSON data, which is neither user-friendly nor secure.

  Solution 2: Enhance data presentation on the '/votes' page by formatting JSON data into a 
  more readable and visually appealing format, such as tables, lists, or cards.

  Alternative Solution: Noting that the data structure matches that on the 'polls/[id]/edit' 
  page, we could reused the components I mentioned for 'PollQuestion' and 'Options' from the 
  'app/polls/[id]/simple' page. These components can be adapted for displaying data on the 
  '/votes' page. Additionally, a new component could be created specifically for presenting 
  the contents of the votes arrays.
*/
/* TASK_[3]_END */

export default async function PollQuestions(props) {
  const id = props.params.id
  const data = await getPollData(id as string)
  return <p className="wrapper">{JSON.stringify(data)}</p>
}
