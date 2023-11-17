import Popup from "reactjs-popup"
import "../style/popup.scss"


const EditPopup = () => {

    const handleSave = () => {
        // TODO: Implement logic to save the changes.

    }

    const handleChange = () => {
    }

    return(
    <>
        <Popup trigger={<button className="button float-right">Edit</button>} modal>
            <div className="modal">
                <button className="modal__close float-right">
                    &times;
                </button>
                <h1 className="modal__header">Edit Performer</h1>
                <div className="modal__content flex flex-col mt-16">
                    <label className="modal__content-label">Name:</label>
                    <input className="modal__content-input" type="text" name="name" placeholder="..." value={``} />
                    <label className="modal__content-label">Gender:</label>
                    <input className="modal__content-input" type="text" name="gender" placeholder="..." value={``} />
                    <label className="modal__content-label">Sport:</label>
                    <input className="modal__content-input" type="text" name="sport" placeholder="..." value={``} /> 
                </div>
                <div className="modal__actions">
                    <button className="modal__actions-button" onClick={() =>
                        handleSave()
                    }>Save</button>
                </div>
            </div>
        </Popup>
    </>
    )
}

export default EditPopup;