'use client'

import { getPollQuestions } from '@/api/polls'
import { createVote } from '@/api/votes'
import { Button } from '@/components/Button'
import PageWrapper from '@/components/PageWrapper'
import useApi from '@/hooks/useApi'
import useQuestion from '@/hooks/useQuestion'
import { type Poll, type Vote } from '@/types'
import React, { useEffect } from 'react'

export default function QuestionPage({ data, id }: any) {
  const {
    isLoading,
    isError,
    isFetching,
    error,
    run,
    data: poll,
  } = useApi<Poll>({})

  const { questions, setQuestions, votes, addVote } = useQuestion(
    data?.questions
  )

  const {
    isLoading: voteLoading,
    isError: voteIsError,
    error: voteError,
    run: vote,
    isSuccess,
  } = useApi<Vote>({})

  useEffect(() => {
    const handler = async () => {
      if (id) {
        const response = await run(getPollQuestions, id)
        if (response?.data?.questions) {
          setQuestions(response.data.questions)
        }
      }
    }
    handler()
  }, [id, run, setQuestions])

  const onSubmit = async (event: any) => {
    event?.preventDefault()
    vote(createVote, votes)
  }

  return (
    <PageWrapper
      isLoading={isFetching || isLoading || voteLoading}
      isError={isError || voteIsError}
      error={error || voteError}
      classNames={['poll-question-id']}
    >
      <h1>{poll?.title}</h1>
      <form onSubmit={onSubmit}>
        <section className="poll-votes">
          {questions.map((question, index) => (
            <React.Fragment key={`question-${question.id ?? index}`}>
              <label
                htmlFor={`question-${question.id ?? index}`}
                className="question"
              >
                <input
                  id={`question-${question.id ?? index}`}
                  data-testid="question"
                  type="text"
                  value={question.question}
                  disabled
                />
              </label>
              <section className="options">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={`option-${optionIndex}`}
                    htmlFor={`option-${optionIndex}-${index}`}
                    className="option"
                  >
                    <input
                      type="radio"
                      id={`option-${optionIndex}-${index}`}
                      placeholder="Alternativ"
                      name={`option-${index}`}
                      data-testid="option"
                      value={option.option}
                      onChange={() => {
                        addVote(option, question.id)
                      }}
                      checked={
                        votes.find(
                          (vote) =>
                            vote.option === option.option &&
                            vote.questionId === question.id
                        )
                          ? true
                          : false
                      }
                    />
                    <span>{option.option}</span>
                  </label>
                ))}
              </section>
            </React.Fragment>
          ))}
        </section>
        <Button
          classNames={['create']}
          isLoading={voteLoading}
          isError={voteIsError}
          isSuccess={isSuccess}
          type="submit"
        >
          Send
        </Button>
      </form>
    </PageWrapper>
  )
}
