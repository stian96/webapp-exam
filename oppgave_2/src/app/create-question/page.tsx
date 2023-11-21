import Header from "@/components/layout/Header"
import QuestionCreator from "@/components/QuestionCreator"

const CreateQuestionPage = () => {
  return (
    <>
      <Header />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <QuestionCreator />
      </div>
    </>
  )
}

export default CreateQuestionPage
