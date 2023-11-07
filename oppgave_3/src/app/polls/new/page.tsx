'use client'

import { useRef, useState } from 'react'
import { createPoll } from '@/api/polls'
import PageWrapper from '@/components/PageWrapper'
import Title from '@/components/Title'
import useApi from '@/hooks/useApi'
import { type Poll, type PollCreateInput } from '@/types'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'

export default function PollCreate() {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement>(null)
  const slugRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<PollCreateInput>({
    title: '',
    slug: '',
  })
  const { isLoading, isError, isSuccess, error, data, run } = useApi<Poll>({})

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await run(createPoll, form)
    if (result?.data) {
      router.push(`/polls/${result.data.id}/edit`)
    }
  }

  return (
    <PageWrapper
      isLoading={isLoading}
      isError={isError}
      error={error}
      classNames={['poll-create']}
    >
      <Title title={`Lag ny poll ${form.title ? `- ${form.title}` : ''}`} />
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">
          <input
            id="title"
            type="text"
            ref={titleRef}
            data-testid="title"
            value={form.title}
            placeholder="Tittel"
            onChange={(event) => {
              setForm((prev) => ({ ...prev, title: event.target.value }))
            }}
          />
        </label>
        <label htmlFor="slug">
          <input
            id="slug"
            type="text"
            ref={slugRef}
            data-testid="slug"
            value={form.slug}
            placeholder="Slug"
            onChange={(event) => {
              setForm((prev) => ({ ...prev, slug: event.target.value }))
            }}
          />
        </label>
        <Button
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          classNames={['create']}
          type="submit"
        >
          Send
        </Button>
      </form>
    </PageWrapper>
  )
}
