

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


  return (
    <div>
    {intervalReports.map((report, intervalIndex) => (
      <div key={`interval-${intervalIndex}`} className="interval-container">
        <h3>Interval {intervalIndex + 1}</h3>
        <div className="measurements-table">
          <div className="measurements-header">
            <div className="header-cell"></div>
            <div className="header-cell">Min</div>
            <div className="header-cell">Max</div>
            <div className="header-cell">Avg</div>
          </div>
          {measurementTypes.map((type) => (
            <div key={type} className="measurements-row">
              <div className="measurements-label">{type}:</div>
              <input
                type="number"
                value={report[`${type.toLowerCase()}Min`]}
                onChange={(e) => {handleChangeMeasurements(intervalIndex, `${type.toLowerCase()}Min`, parseInt(e.target.value))}}
              />
              <input
                type="number"
                value={report[`${type.toLowerCase()}Max`]}
                onChange={(e) => {handleChangeMeasurements(intervalIndex, `${type.toLowerCase()}Max`, parseInt(e.target.value))}}
              />
              <input
                type="number"
                value={report[`${type.toLowerCase()}Avg`]}
                onChange={(e) => {handleChangeMeasurements(intervalIndex, `${type.toLowerCase()}Avg`, parseInt(e.target.value))}}
              />
            </div>
          ))}
        </div>
        <div className="measurements-row">
          <div className="measurements-label"> Time:</div>
          <input 
            type="number"
            value={report.duration}
            onChange={(e) => {handleChangeMeasurements(intervalIndex, 'duration', parseInt(e.target.value))}}/>
        </div>
      </div>
    ))}
  </div>

  
  )


}

export default ReportIntervals;