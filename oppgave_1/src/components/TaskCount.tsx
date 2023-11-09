import React from 'react';

type CountProps = {
    taskCount: string;
    onTaskCountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TaskCount = ({ taskCount, onTaskCountChange }: CountProps) => {
    return (
        <div>
            <label htmlFor="taskCount">Skriv inn ønsket antall oppgaver:</label>
            <input
                type="text"
                id="taskCount"
                value={taskCount}
                onChange={onTaskCountChange}
                pattern="\d*"
                inputMode="numeric"
            />
        </div>
    );
};

export default TaskCount;
