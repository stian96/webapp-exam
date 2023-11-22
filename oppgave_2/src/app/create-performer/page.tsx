import Header from "@/components/layout/Header"
import CreatePerformer from "@/components/CreatePerformer"

const CreatePerformerPage = () => {
  return (
    <>
      <Header />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <CreatePerformer/>
      </div>
    </>
  )
}

export default CreatePerformerPage