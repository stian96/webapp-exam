import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiHandler, Error, Result } from '@/types'

type Status = 'loading' | 'idle' | 'error' | 'success'

export default function useApi<T>({
  cb,
  renderOnMount = false,
}: {
  cb?: () => Promise<Result<T>>
  renderOnMount?: boolean
}) {
  const cbRef = useRef(cb)

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<Error>()
  const [data, setData] = useState<T>()

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  const isFetching = renderOnMount && status === 'loading'

  const run = useCallback(async (fetcher: ApiHandler<T>, inputData: any) => {
    setStatus('loading')
    try {
      const result = (await fetcher(inputData)) as unknown as Result<T>
      if (!result.status) {
        setError(result.error)
        return
      }
      setData(result?.data)
      setStatus('success')
      return result
    } catch (error) {
      setError(error as Error)
      setStatus('error')
      setTimeout(() => {
        setStatus('idle')
      }, 1500)
    }
  }, [])

  useEffect(() => {
    if (renderOnMount && cbRef.current) {
      run(cbRef.current, null)
    }
  }, [run, renderOnMount])

  return {
    isLoading,
    isError,
    isSuccess,
    isFetching,
    error,
    run,
    data,
  }
}
