'use client'

import Link from 'next/link'
import { getPolls } from '@/api/polls'
import PageWrapper from '@/components/PageWrapper'
import Title from '@/components/Title'
import useApi from '@/hooks/useApi'
import { type Poll } from '@/types'

export default function Polls() {
  const {
    isLoading,
    isError,
    isFetching,
    error,
    data: pollsData,
  } = useApi<Poll[]>({ renderOnMount: true, cb: getPolls })

  return (
    <PageWrapper
      isLoading={isFetching || isLoading}
      isError={isError}
      error={error}
      classNames={['poll wrapper padding']}
    >
      <header>
        <Title title="Polls" />
        <Link className="link create" href={`/polls/new`}>
          Lag ny poll
        </Link>
      </header>
      {pollsData?.length ? (
        <section className="data-table" data-testid="data-table">
          <ul>
            {pollsData.map((data) => (
              <li key={data.id}>
                <section className="left">
                  <span>{data.title}</span>
                </section>
                <section className="right">
                  <Link href={`/polls/${data.id}/edit`}>Endre</Link>
                  <Link href={`/polls/${data.id}`}>Se</Link>
                </section>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p>Ingen polls</p>
      )}
    </PageWrapper>
  )
}
