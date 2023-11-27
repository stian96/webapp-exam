import { getQuestions } from '@/lib/helper'

import QuestionPage from './QuestionPage'

// Considering that typescript is used here then a type/interface should be defined for
// the props. Data types supplied via the prop should also be designated. (e.g. type
// PollQuestionsProps = { id: string }). The parameters of PollQuestions should also be
// changed (PollQuestions({ id }: PollQuestionsProps)).
export default async function PollQuestions(props) {
  const id = props.params.id
  const data = await getQuestions(props.params.id as string)

  return <QuestionPage data={data} id={id} />
}
