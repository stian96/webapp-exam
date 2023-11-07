import { getQuestions } from '@/lib/helper'

import QuestionPage from './QuestionPage'

export default async function PollQuestions(props) {
  const id = props.params.id
  const data = await getQuestions(props.params.id as string)

  return <QuestionPage data={data} id={id} />
}
