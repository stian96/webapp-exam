import Popup from "reactjs-popup"
import PopupCont from "./PopupContent"

import "../../../style/popup.scss"

type GoalsPopupProps = {
    editClicked: boolean
    setEditClicked: (value: boolean) => void 
}

const GoalsPopup = ({ editClicked, setEditClicked }: GoalsPopupProps) => {
    const inputFields: string[] = ["Name", "Date", "Goal", "Comment"]

    const close = () => setEditClicked(!editClicked)

    return (
        <div className={`overlay ${editClicked ? 'overlay-active': ''}`}>
            <Popup open={editClicked} closeOnDocumentClick onClick={close}>
                <PopupCont header={"Edit Goal"} inputElements={inputFields} close={close} />
            </Popup>
        </div>
    )
}

export default GoalsPopup