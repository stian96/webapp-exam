import Header from "@/components/layout/Header"
import QuestionCreator from "@/components/QuestionCreator"
import Link from "next/link"

const CreateQuestionPage = () => {
  return (
    <>
      <Link href="/">
        <Header title={"Create Question"} />
      </Link>
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <QuestionCreator />
      </div>
    </>
  )
}

export default CreateQuestionPage
