// ImportButton.tsx
import "../style/form.scss"

import React from "react"

import useImportUsersHook from "@/hooks/useImportUsersHook"

const ImportButton = () => {
  const { importAllUsers, importButtonText } = useImportUsersHook()

  return (
    <button
      className={`form__button ${
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
