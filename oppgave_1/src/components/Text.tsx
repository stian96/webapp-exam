export default function TaskText(props: { text: string }) {
  const { text } = props
  return <p className="text-sm md:text-base lg:text-lg">{text}</p>
}
