import InputEdit from "../../data/InputEdit"
import "@/style/popup.scss"

type PopupProps = {
  header: string
  inputElements: string[]
  close: () => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSave: () => void
}

const PopupEdit = ({
  header,
  inputElements,
  close,
  handleChange,
  handleSave,
}: PopupProps) => {
    
  return (
    <div className="modal h-full overflow-auto">
      <button className="modal__close float-right" onClick={close}>
        &times;
      </button>
      <h1 className="modal__header">{header}</h1>
      <div className="modal__content">
        <InputEdit elements={inputElements} handleChange={handleChange} />
      </div>
      <div className="modal__actions">
        <button
          className="modal__actions-button"
          onClick={() => {
            close()
            handleSave()
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default PopupEdit