import { Error } from '@/types'

type PageWrapperProps = {
  isLoading: boolean
  isError: boolean
  error?: Error
  classNames?: string[]
  children: React.ReactNode
}

export default function PageWrapper({
  isLoading = false,
  isError = false,
  error,
  classNames,

  children,
}: PageWrapperProps) {
  const style = `wrapper page ${classNames?.join(' ')}`

  return (
    <section className={style}>
      {isLoading ? <p className="api-loading">Laster ...</p> : null}
      {isError ? <p className="api-error">{JSON.stringify(error)}</p> : null}
      {children}
    </section>
  )
}
