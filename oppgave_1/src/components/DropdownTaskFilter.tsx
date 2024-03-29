import React from 'react';

type TaskFilterProps = {
    selectedType: string;
    handleTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const DropdownTaskFilter = ({ selectedType, handleTypeChange }: TaskFilterProps) => {

    return (
        <div>
            <label htmlFor="chooseTaskType">Velg oppgavetype:</label>
            <select id="chooseTaskType" value={selectedType} onChange={handleTypeChange}>
                <option value="add">Addisjon</option>
                <option value="divide">Divisjon</option>
                <option value="multiply">Multiplikasjon</option>
                <option value="subtract">Subtraksjon</option>
            </select>
        </div>
    );

}
export default DropdownTaskFilter;