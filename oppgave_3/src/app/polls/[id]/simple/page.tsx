'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getPollQuestions, publishPoll } from '@/api/polls'
import { createQuestion } from '@/api/questions'
import { Button } from '@/components/Button'
import PageWrapper from '@/components/PageWrapper'
import useApi from '@/hooks/useApi'
import { type Option, type Poll, type Question } from '@/types'

const addDefaultQuestion = (id: string) => ({
  id: '',
  question: '',
  pollId: id,
  options: [{ option: '' }, { option: '' }, { option: '' }, { option: '' }],
})

/*
  This component could be separated into smaller more reusable components.
  For example, we could created a 'QuestionComponent' and a 'OptionsComponent'.
  This would make the main component 'PollQuestionEdit' more clean and easier
  to understand and maintain. For more details on the separation, have a look
  at the return statement.
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

  const pageIsLoading =
    createLoading || pollPublishLoading || isLoading || isFetching

  const [question, setQuestion] = useState<Question>({} as Question)

  useEffect(() => {
    const handler = async () => {
      if (id) {
        const response = await run(getPollQuestions, id)
        if (response?.data?.questions && response.data.questions.length > 0) {
          setQuestion(response.data.questions[0])
        } else {
          setQuestion(addDefaultQuestion(id))
        }
      }
    }
    handler()
  }, [id, run, setQuestion])

  const handleQuestion = (event: any) => {
    if (question) {
      setQuestion((prev) => ({
        ...prev,
        question: event.target.value,
      }))
    }
  }

  const handleOption = (index: number, option: Option) => {
    const optionsClone = [...question.options]
    optionsClone[index] = option
    setQuestion((prev) => ({
      ...prev,
      options: optionsClone,
    }))
  }

  const onSubmit = async (event: any) => {
    event?.preventDefault()
    const response = await create(createQuestion, question)
    if (response?.status) {
      router.refresh()
    }
  }

  return (
    <PageWrapper
      isLoading={pageIsLoading}
      isError={isError || createIsError || pollPublishIsError}
      error={error || createError || pollPublishError}
      classNames={['poll-question-id']}
      renderChildren={false}
    >
      <h1>{data?.title}</h1>
      {question && question.options ? (
        <form onSubmit={onSubmit}>
          <section className="poll-questions">
            {/* This could be separated to a own 'QuestionComponent' */}
            <label
              htmlFor={`question-${question.id ?? '1'}`}
              className="question"
            >
              <input
                id={`question-${question.id ?? '1'}`}
                placeholder="Hva er spørsmålet?"
                data-testid="question"
                type="text"
                value={question.question}
                onChange={handleQuestion}
              />
            </label>
            {/* -------------------------------------------------- */}
            <section className="options">
              {/* And this could be separated to a own 'Options' component */}
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
                      handleOption(optionIndex, {
                        option: event.target.value,
                      })
                    }}
                  />
                </label>
              ))}
              {/* -------------------------------------------------- */}
            </section>
          </section>
          <Button
            classNames={['create']}
            isLoading={pageIsLoading}
            isError={createIsError}
            isSuccess={isSuccess}
            type="submit"
          >
            Send
          </Button>
          <Button
            classNames={['create']}
            isLoading={pageIsLoading}
            isError={pollPublishIsError}
            isSuccess={publishSuccess}
            onClick={() => publish(() => publishPoll(query.id as string), null)}
            successMessage={'Publisert'}
          >
            Publiser
          </Button>
        </form>
      ) : null}
    </PageWrapper>
  )
}
