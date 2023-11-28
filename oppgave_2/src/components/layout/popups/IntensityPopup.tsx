import "@/style/popup.scss"

const IntensityPopup = () => {

    return (
        <div className="modal h-full overflow-auto">
            <button className="modal__close float-right" onClick={close}>
                &times;
            </button>
            <h1 className="modal__header">{"Intensity Popup"}</h1>
            <div className="modal__content">
                <h1>Intensity Popup</h1>
            </div>
            <div className="modal__actions">
                <button className="modal__actions-button">
                    Save
                </button>
            </div>
        </div>
    )

}

export default IntensityPopup