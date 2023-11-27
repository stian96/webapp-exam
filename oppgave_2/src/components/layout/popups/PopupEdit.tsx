import InputEdit from "../../data/InputEdit"
import "@/style/popup.scss"
import { Performer } from "@/types/performer"

type PopupProps = {
  header: string
  inputElements: string[]
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSave: () => void
  close: () => void
  errors: Record<string, string>
  currentPerformer: Performer
}

const PopupEdit = ({
  header,
  inputElements,
  handleChange,
  handleSave,
  close,
  errors,
  currentPerformer
}: PopupProps) => {
    
  return (
    <div className="modal h-full overflow-auto">
      <button className="modal__close float-right" onClick={close}>
        &times;
      </button>
      <h1 className="modal__header">{header}</h1>
      <div className="modal__content">
        <InputEdit 
          elements={inputElements} 
          handleChange={handleChange} 
          errors={errors}
          performer={currentPerformer}
        />
      </div>
      <div className="modal__actions">
        <button
          className="modal__actions-button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default PopupEdit