

"use client"

import "@/style/report.scss"
import React, { useState, useEffect } from 'react';
import { type Interval} from '@/types/performance/interval'
import { type IntervalResult, type ReportIntervalResult } from '@/types/performance/intervalResult';

type ReportIntervalProps = {
  
  intervals: IntervalResult[],
  onIntervalChange: (intervalResult : ReportIntervalResult[]) => void;

}

const ReportIntervals = ({  intervals, onIntervalChange}: ReportIntervalProps) => {
  console.log("Rendering ReportIntervals")
  console.log("intervals received", intervals)

  const [intervalReports, setIntervalReports] = useState<ReportIntervalResult[]>(
    intervals.map(interval =>  ({
      id:'',
      intervalId: interval.interval.id ?? '',
      duration: 0,
      intensityMin: 0,
      intensityMax: 0,
      intensityAvg: 0,
      pulseMin: 0,
      pulseMax: 0,
      pulseAvg: 0,
      speedMin: 0,
      speedMax: 0,
      speedAvg: 0,
      wattMin: 0,
      wattMax: 0,
      wattAvg: 0,
  }))
  );

  
  const handleChangeMeasurements = (
    intervalIndex: number,
    measurementType: keyof ReportIntervalResult,
    value: number
  ) => {
      setIntervalReports(prev => prev.map((result, index) => {
          if (index !== intervalIndex) return result;
          return { ...result, [measurementType]: value };
      }));
  };



  useEffect(() => {
      onIntervalChange(intervalReports);
  }, [intervalReports, onIntervalChange]);


  const measurementTypes = ['Intensity', 'Pulse', 'Speed', 'Watt'];

 console.log("properties in intervals:", intervalReports)

//SRC:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
  return (
    <form className="form flex w-full flex-col items-center space-y-5" >
      {intervalReports.map((report, intervalIndex) => (
        <fieldset key={`interval-${intervalIndex}`} className="interval-container">
          <h3 className="text-center">Interval {intervalIndex + 1}</h3>
          <table className="measurements-table">
            <div className="measurements-header">
              <div className="header-cell"></div>
              <div className="header-cell">Min</div>
              <div className="header-cell">Max</div>
              <div className="header-cell">Avg</div>
            </div>
            {measurementTypes.map((type) => (
              <label key={type} className="measurements-row">
                <label htmlFor={`interval-${intervalIndex}-${type.toLowerCase()}Min`} className="measurements-label">{type}:</label>
                <input
                  id={`interval-${intervalIndex}-${type.toLowerCase()}Min`}
                  type="number"
                  value={report[`${type.toLowerCase()}Min`]}
                  onChange={(e) => { handleChangeMeasurements(intervalIndex, `${type.toLowerCase()}Min`, parseInt(e.target.value)); }}
                />

                <input

                  id={`interval-${intervalIndex}-${type.toLowerCase()}Max`}
                  type="number"
                  value={report[`${type.toLowerCase()}Max`]}
                  onChange={(e) => { handleChangeMeasurements(intervalIndex, `${type.toLowerCase()}Max`, parseInt(e.target.value)); }}
                />
                <input
                  id={`interval-${intervalIndex}-${type.toLowerCase()}Avg`}
                  type="number"
                  value={report[`${type.toLowerCase()}Avg`]}
                  onChange={(e) => { handleChangeMeasurements(intervalIndex, `${type.toLowerCase()}Avg`, parseInt(e.target.value)); }}
                />
              </label>
            ))}
          </table>
          <div className="measurements-row">
            <div className="measurements-label"> Time:</div>
            <input
              id={`interval-${intervalIndex}-duration`}
              type="number"
              value={report.duration}
              onChange={(e) => { handleChangeMeasurements(intervalIndex, 'duration', parseInt(e.target.value)); }}
            />
          </div>
        </fieldset>
      ))}
    </form>

  
  )


}

export default ReportIntervals;