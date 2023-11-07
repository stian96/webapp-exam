import { type Error, type Result } from '@/types'

export default async function <T>(
  url: string,
  options = {} as RequestInit & { body?: Partial<T> }
): Promise<Result<T>> {
  const defaultOptions: Partial<RequestInit> = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await fetch(url, { ...defaultOptions, ...options })
    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json')

    const data = isJson ? ((await response.json()) as Result<T>) : null

    if (!response.ok || !data?.status) {
      const error = {
        status: false,
        error: data?.error ? data.error : response.statusText,
      }
      throw error
    }

    const result = data ? data : { status: true, data: {} }
    return result as Result<T>
  } catch (error) {
    throw error as Error
  }
}
