import Header from "@/components/layout/Header"
import TemplateCreator from "@/components/TemplateCreator"
import Link from "next/link"

const CreateTemplatePage = () => {
  return (
    <>
      <Link href="/">
        <Header title={"Create Template"} />
      </Link>
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <TemplateCreator isTemplateCreator={true} />
      </div>
    </>
  )
}

export default CreateTemplatePage
