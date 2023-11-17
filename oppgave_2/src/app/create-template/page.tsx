import Header from "@/components/Header"
import TemplateCreator from "@/components/TemplateCreator"

const CreateTemplatePage = () => {
  return (
    <>
      <Header />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <TemplateCreator />
      </div>
    </>
  )
}

export default CreateTemplatePage