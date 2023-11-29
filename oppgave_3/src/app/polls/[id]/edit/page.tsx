'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { getPollQuestions, publishPoll } from '@/api/polls'
import { createQuestion } from '@/api/questions'
import { Button } from '@/components/Button'
import PageWrapper from '@/components/PageWrapper'
import useApi from '@/hooks/useApi'
import useQuestion from '@/hooks/useQuestion'
import { type Poll, type Question } from '@/types'

/* 
  Since the project uses TS, you should always define the type for
  props in a component.

  Beyond this, the page appears to be a good candidate for testing,
  given its complexity. Critical functions (such as data retrieval
  and user interactions) should certainly have been tested well.
*/

export default function PollQuestionEdit(props) {
  const router = useRouter()
  const id = props.params.id as string

  const { isLoading, isError, isFetching, error, run, data } = useApi<Poll>({})

  const {
    isLoading: createLoading,
    isError: createIsError,
    error: createError,
    run: create,
    isSuccess,
  } = useApi<Question>({})

  const {
    isLoading: pollPublishLoading,
    isError: pollPublishIsError,
    error: pollPublishError,
    run: publish,
    isSuccess: publishSuccess,
  } = useApi({})

  const { handleOption, handleQuestion, questions, setQuestions } = useQuestion(
    data?.questions
  )

  // The handler function here should be defined outside of the useEffect function. This would
  // make it reusable, but also testable.
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
    const response = await create(createQuestion, questions)
    if (response?.status) {
      router.refresh()
    }
  }

  return (
    <PageWrapper
      isLoading={isFetching || isLoading || createLoading}
      isError={isError || createIsError || pollPublishIsError}
      error={error || createError || pollPublishError}
      classNames={['poll-question-id']}
    >
      <h1>{data?.title}</h1>
      <form onSubmit={onSubmit}>
        <section className="poll-questions">
          {questions.map((question, index) => (
            <React.Fragment key={`question-${question.id ?? index}`}>
              <label
                htmlFor={`question-${question.id ?? index}`}
                className="question"
              >
                <input
                  id={`question-${question.id ?? index}`}
                  placeholder="Hva er spørsmålet?"
                  data-testid="question"
                  type="text"
                  value={question.question}
                  onChange={(event) => {
                    handleQuestion(index, {
                      ...question,
                      question: event.target.value,
                    })
                  }}
                />
              </label>
              <section className="options">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={`option-${optionIndex}`}
                    htmlFor={`option-${optionIndex}`}
                    className="option"
                  >
                    <input
                      id={`option-${optionIndex}`}
                      placeholder="Alternativ"
                      data-testid="option"
                      type="text"
                      value={option.option}
                      onChange={(event) => {
                        handleOption(index, optionIndex, {
                          option: event.target.value,
                        })
                      }}
                    />
                  </label>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    handleOption(index, question.options.length, { option: '' })
                  }}
                >
                  Legg til alternativ
                </button>
              </section>
            </React.Fragment>
          ))}
          <button
            type="button"
            onClick={() => {
              handleQuestion(questions.length, {
                question: '',
                options: [],
                pollId: id,
              })
            }}
          >
            Legg til spørsmål
          </button>
        </section>
        <Button
          classNames={['create']}
          isLoading={createLoading}
          isError={createIsError}
          isSuccess={isSuccess}
          type="submit"
        >
          Send
        </Button>
        <Button
          classNames={['create']}
          isLoading={pollPublishLoading}
          isError={pollPublishIsError}
          isSuccess={publishSuccess}
          onClick={() => publish(() => publishPoll(id), null)}
          successMessage={'Publisert'}
        >
          Publiser
        </Button>
      </form>
    </PageWrapper>
  )
}
