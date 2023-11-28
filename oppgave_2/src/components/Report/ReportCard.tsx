"use client"
import "@/style/card.scss"
import "@/style/report.scss"
import { Icons } from "@/components/icons"
import React, { useState } from 'react';
import AnswerQuestion from "./AnswerQuestion";
import Comment from "./Comment";
import { SessionStatusEnum } from "@/enums/sessionStatusEnum";

type ReportCardProps = {
    id: string;
};

type Measurement = {
    Min: string;
    Max: string;
    Avg: string;
};

type Measurements = {
    Intensity: Measurement;
    Pulse: Measurement;
    Speed: Measurement;
    Watt: Measurement;
    Time: string;
};

const ReportCard = ({ id }: ReportCardProps) => {
    const [status, setStatus] = useState<string>('');

    const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    }

    const getStatusString = (statusEnumValue: SessionStatusEnum): string => {
      switch (statusEnumValue) {
        case SessionStatusEnum.NO:
          return 'Session not completed';
        case SessionStatusEnum.LOW:
          return 'Session completed, but with poor quality';
        case SessionStatusEnum.NORMAL:
          return 'Session completed as expected';
        case SessionStatusEnum.HIGH:
          return 'Break-through session';
        default:
          return 'Unknown';
      }
    }

    const [measurements, setMeasurements] = useState<Measurements>({
        Intensity: { Min: '', Max: '', Avg: '' },
        Pulse: { Min: '', Max: '', Avg: '' },
        Speed: { Min: '', Max: '', Avg: '' },
        Watt: { Min: '', Max: '', Avg: '' },
        Time: ''
    });
    const handleChangeMeasurements = (
        event: React.ChangeEvent<HTMLInputElement>,
        category: keyof Measurements,
        type?: keyof Measurement
    ) => {
        const value = event.target.value;

        setMeasurements((prev) => {
            if (category === 'Time') {
                return { ...prev, [category]: value };
            }

            const updatedCategory = type ? { ...prev[category], [type]: value } : prev[category];
            return { ...prev, [category]: updatedCategory };
        });
    };


      console.log("handled enum", status)

    return (
        <div className="card relative">

            <div className="card__header">
                <Icons.clipboard size={22} />
                <p className="card__title">Report {id}</p>
            </div>

            <div className="text-center mb-4">
                <label htmlFor={`status-select-${id}`} className="font-semibold block mb-2">Select report status: </label>
                <select id={`status-select-${id}`} name={`status-${id}`} value={status} onChange={handleChangeStatus} className="rounded text-black">
                    <option value="">-- Please choose a status...--</option>
                    {Object.values(SessionStatusEnum).map((enumValue) => {
                    
                        const statusString = getStatusString(enumValue as SessionStatusEnum);
                        return (
                            <option key={enumValue} value={enumValue}>
                                {statusString}
                            </option>
                        );
                    })}
                </select>
            </div>
            {/*SRC: https://react.dev/reference/react-dom/components/select*/}


            <div className="grid grid-cols-1 gap-4 mb-4">
                {Object.entries(measurements).map(([category, values]) =>
                    category !== 'Time' ? (
                        <div key={category}>
                            <h3 className="font-semibold text-center">{category}</h3>
                            <div className="flex flex-row justify-center gap-2">
                                {Object.entries(values).map(([type, value]) => (
                                    <div key={type} className="flex flex-col">
                                        <label htmlFor={`${category}-${type}-${id}`} className="text-sm">{type}:</label>
                                        <input
                                            id={`${category}-${type}-${id}`}
                                            name={`${category}-${type}-${id}`}
                                            type="text"
                                            value={value}
                                            onChange={(e) => { handleChangeMeasurements(e, category as keyof Measurements, type as keyof Measurement); }}
                                            className="input-field"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div key="time" className="text-center">
                            <label htmlFor={`time-${id}`} className="text-sm">Time:</label>
                            <input
                                id={`time-${id}`}
                                name={`time-${id}`}
                                type="text"
                                value={measurements.Time}
                                onChange={(e) => { handleChangeMeasurements(e, 'Time'); }}
                                className="input-field"
                            />
                        </div>
                    )
                )}
            </div>

            <AnswerQuestion reportId={id} />
            <Comment reportId={id} />
            <button className="save-button" onClick={() => {
                //handleSave()
            }}>Save
            </button>
        </div>
    )

}
export default ReportCard;