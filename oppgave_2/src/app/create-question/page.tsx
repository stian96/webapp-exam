import Header from "@/components/Header"
import QuestionCreator from "@/components/QuestionCreator"

const CreateQuestionPage = () => {
  return (
    <>
      <Header />
      <div className="min-w-screen-sm mx-auto max-w-screen-lg">
        <QuestionCreator />
      </div>
    </>
  )
}

export default CreateQuestionPage