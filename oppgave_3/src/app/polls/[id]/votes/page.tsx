import React from 'react'
import { getPollData } from '@/lib/helper'

export default async function PollQuestions(props) {
  const id = props.params.id
  const data = await getPollData(id as string)
  return <p className="wrapper">{JSON.stringify(data)}</p>
}
