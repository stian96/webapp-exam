// ImportButton.tsx
import React from "react"

import useImportUsersHook from "@/hooks/useImportUsersHook"

const ImportButton = () => {
  const { handleClickFromApiDto } = useImportUsersHook()

  return <button onClick={handleClickFromApiDto}>Import Users</button>
}

export default ImportButton
