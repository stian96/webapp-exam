type GoalsRowProps = {
    firstField: string,
    buttonText: string
}

const GoalsRow = ({ firstField, buttonText }: GoalsRowProps) => {
    return (
        <tr>
            <td className="goals__body-data flex justify-between p-4">
                { firstField }
                <button className="goals__body-button" type="button">{ buttonText }</button>
            </td>  
        </tr>
    )
}
export default GoalsRow