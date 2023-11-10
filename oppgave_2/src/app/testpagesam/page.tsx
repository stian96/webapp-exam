import importAllUsers from "@/features/importUsers/importUsers.controller"

const TestPage = async () => {
  const response = await importAllUsers()
  const result = response as { status: number; message: string }

  return (
    <main>
      <div>
        The API GET request finished with status code {result.status}. The
        message is "{result.message}"
      </div>
    </main>
  )
}

export default TestPage
