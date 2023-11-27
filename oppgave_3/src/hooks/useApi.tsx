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

  // The 'setStatus' method of displaying the message isn't user friendly. Firstly, a timer
  // restricts the message to only appear for 1.5 seconds, secondly, the message is displayed
  // in JSON format. This would confuse people without a developer background. A better way of
  // displaying error feedback would either be to have a specific <p> or <span> element that
  // is only shown when 'status' != 'idle', or to display this feedback on the button that was
  // pressed, along with changing the colour to something akin to the traffic light colours
  // (red for error, green for success).
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

  // This code will work, but ideally should be wrapped with an async function to avoid
  // any unexpected behaviours.
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
