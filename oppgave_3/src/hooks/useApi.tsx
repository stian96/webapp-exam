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

  /** TASK_2_START */
  /**
   * I would change error feedback to be more user friendly by changing the button text to
   * a suitable string value when an error arises (also when a button press is successful).
   * An alternative would be to implement a <p> element that is shown when the status is
   * 'error', but I personally prefer feedback in the button because it's more compact.
   *
   * I would also remove the 'setTimeout' because it could be difficult for users to understand
   * exactly what went wrong with their request. They could also have missed the error message,
   * and assumed that it was successful. Additionally, those with screen readers etc. may have
   * trouble reading elements if they're only temporary.
   *
   * I would handle each error code differently, so that error code 404 might display something
   * akin to 'Error - Poll not found', 400 could be 'Error - '&¤#/' is not a valid question'
   * (specifically targetting exactly what part of the request was invalid).
   *
   * I would also change the button colour to a traffic light system, with a successful request
   * turning the button green, while an error would turn the button red. This could be done in many
   * different ways, such as a state holding a hex colour code, or a class such as
   * className={`${ isError ? '--error' : ''}`}, and then have the CSS file apply a colour based
   * on whether the element has an '--error' or '--success' class. Additionally, tailwind could
   * be used to check if the string starts with 'Error' or 'Success', but this is less flexible.
   *
   * An example in oppgave 2 is found in 'src/hooks/useTemplateCreatorHook.ts',
   * 'src/components/TemplateCreator.tsx', and 'src/style/form.scss'.
   *
   * In useTemplateCreatorHook the state function 'setSubmitButtonText' is used many times, based
   * on both http codes returned from a request, and also by client-side validation. Some examples
   * of button text include "Error - Template Name Already Exists", "Template Saved!",
   * "Error - No performer selected.", "Error - Some tags are invalid.", and "Error writing to database.".
   *
   * On line 554 of TemplateCreator we can see that there's an example of a ternary operation which
   * sets the class as '--saved' when button text is "Template Saved!", or '--error' when the button
   * text starts with "Error".
   *
   * In 'src/style/form.scss' we can see on line 65 that elements with the class '.--saved' have a
   * background colour of green, while '.--error' is dark red.
   */
  /** TASK_2_END */
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
