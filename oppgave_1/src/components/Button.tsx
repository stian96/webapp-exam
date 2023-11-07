import { cn } from "@/lib/utils"

export default function Button({
  children,
  classNames,
}: {
  children: any
  classNames: string | string[]
}) {
  return (
    <button type="button" className={cn("bg-slate-200 px-2 py-1", classNames)}>
      {children}
    </button>
  )
}
