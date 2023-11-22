// ImportButton.tsx
import "../style/button.scss"

import React from "react"

import useImportUsersHook from "@/hooks/useImportUsersHook"

const ImportButton = () => {
  const { importAllUsers, importButtonText } = useImportUsersHook()

  return (
    <button
      className={`defaultButton ${
        importButtonText === "Imported Users!" ? "--saved" : ""
      }
    ${importButtonText.startsWith("Error") ? "--error" : ""}`}
      onClick={importAllUsers}
    >
      {importButtonText}
    </button>
  )
}

export default ImportButton
