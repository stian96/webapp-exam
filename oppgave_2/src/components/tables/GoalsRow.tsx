import GoalsData from "./GoalsData"

type GoalsRowProps = {
    firstField: string,
    buttonText: string
}

const GoalsRow = ({ firstField, buttonText }: GoalsRowProps) => {
    return (
    <>
        <tr className="goals__body-row flex justify-between p-4">
            <td className="goals__body-row-data">
                { firstField }
            </td> 
            <button className="goals__body-row-button" type="button">{ buttonText }</button>
        </tr>
        <tr className="goals__body-inner-row">
            <td colSpan={2}>
                <GoalsData />
            </td>
        </tr>
    </>
    )
}
export default GoalsRow