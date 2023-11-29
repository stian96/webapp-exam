import Header from "@/components/layout/Header"
import CreatePerformer from "@/components/CreatePerformer"
import Link from "next/link"

const CreatePerformerPage = () => {
  return (
    <>
      <Link href="/">
        <Header title="Create Performer" />
      </Link>
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <CreatePerformer/>
      </div>
    </>
  )
}

export default CreatePerformerPage