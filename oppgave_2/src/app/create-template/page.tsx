import Header from "@/components/layout/Header"
import TemplateCreator from "@/components/TemplateCreator"

const CreateTemplatePage = () => {
  return (
    <>
      <Header />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <TemplateCreator isTemplateCreator={true} />
      </div>
    </>
  )
}

export default CreateTemplatePage
