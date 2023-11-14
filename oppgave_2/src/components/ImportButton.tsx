// ImportButton.tsx
import React from "react"

import useImportUsersHook from "@/hooks/useImportUsersHook"

const ImportButton = () => {
  const { importAllUsers } = useImportUsersHook()

  return (
    <button
      className="rounded-md bg-orange-500 px-4 py-2 text-white"
      onClick={importAllUsers}
    >
      Import Users
    </button>
  )
}

export default ImportButton
