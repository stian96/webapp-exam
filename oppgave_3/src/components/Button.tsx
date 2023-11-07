type ButtonProps = {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  classNames?: string[]
  type?: 'button' | 'submit'
  successMessage?: string
  onClick?: () => void
  children: React.ReactNode
}

export function Button({
  isLoading = false,
  isError = false,
  isSuccess = false,
  type = 'button',
  successMessage = 'Sendt',
  onClick,
  classNames,
  children,
}: ButtonProps) {
  const style = `${classNames?.join(' ')}`

  if (isLoading) {
    return (
      <button type={type} disabled className={style}>
        Laster ..
      </button>
    )
  }

  if (isError) {
    return (
      <button type={type} disabled className={`${style} error`}>
        {children}
      </button>
    )
  }

  if (isSuccess) {
    return (
      <button type={type} disabled className={`${style} success`}>
        {successMessage}
      </button>
    )
  }

  return (
    <button type={type} onClick={onClick} className={style}>
      {children}
    </button>
  )
}
