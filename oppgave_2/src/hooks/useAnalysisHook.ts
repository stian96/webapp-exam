import { IntervalResultAnalysis } from "@/types/performance/intervalResult";
import { useRef, useState } from "react";

const useAnalysisHook = () => {

    const [filteredColumns, setFilteredColumns] = useState<number[]>([])
    const [averageValues, setAverageValues] = useState<number[]>([])
    const [intervalResults, setIntervalResults] = useState<
        IntervalResultAnalysis[]
    >([])
    const isApiPopulated = useRef(false)
    const isAveragesCalculated = useRef(false)

    const colNames: string[] = [
      "Intensity Min",
      "Intensity Max",
      "Intensity Avg",
      "Pulse Min",
      "Pulse Max",
      "Pulse Avg",
      "Speed Min",
      "Speed Max",
      "Speed Avg",
      "Watt Min",
      "Watt Max",
      "Watt Avg"
    ]

    const pushNewValue = (newValue: number) => {
        setAverageValues((prevAverageValues: number[]) => [...prevAverageValues, newValue])
    }

    const calculateColumnStats = () => {
        if (intervalResults.length > 0 && !isAveragesCalculated.current) {

        const values = {
            intensityMin: [],
            intensityMax: [],
            intensityAvg: [],
            pulseMin: [],
            pulseMax: [],
            pulseAvg: [],
            speedMin: [],
            speedMax: [],
            speedAvg: [],
            wattMin: [],
            wattMax: [],
            wattAvg: [],
        }

        for (const interval of intervalResults) {
            values["intensityMin"].push(interval.intensity.min)
            values["intensityMax"].push(interval.intensity.max)
            values["intensityAvg"].push(interval.intensity.average)
            values["pulseMin"].push(interval.pulse.min)
            values["pulseMax"].push(interval.pulse.max)
            values["pulseAvg"].push(interval.pulse.average)
            values["speedMin"].push(interval.speed.min)
            values["speedMax"].push(interval.speed.max)
            values["speedAvg"].push(interval.speed.average)
            values["wattMin"].push(interval.watt.min)
            values["wattMax"].push(interval.watt.max)
            values["wattAvg"].push(interval.watt.average)
        }

        Object.keys(values).forEach((key, index) => {
            const averageVal =
            values[key].reduce((sum: any, value: any) => sum + value, 0) / values[key].length

            pushNewValue(averageVal.toFixed(1))
        })
        
        isAveragesCalculated.current = true
    }
    }

    const toggleFilteredColumn = (colNumber) => {
        if (filteredColumns.includes(colNumber)) {
          setFilteredColumns(filteredColumns.filter((col) => col !== colNumber))
        } else {
          setFilteredColumns([...filteredColumns, colNumber])
        }
      }
    
      const resetColumns = () => {
        setFilteredColumns([])
    }
    
    const isReportExists = async (activityId: string) => {
        try {
          const response = await fetch(
            `/api/reports/getReportByActivityId/${activityId}`,
            {
              method: "get",
            },
          )
    
          const data = await response.json()
          const isSuccess = data.status
          const body = data.message
    
          if (isSuccess == 200) {
            console.log(`${activityId} exists.`)
            return { success: true, message: body }
          } else {
            console.log(`${activityId} does not exist.`)
            return { success: false, message: `${activityId} does not exist.` }
          }
        } catch (error) {
          return { success: false, message: error }
        }
      }
    
      const getIntervalResults = async (reportId: string, activityId: string) => {
        try {
          const response = await fetch(
            `/api/reports/getIntervalResultsByReportId/${reportId}`,
            {
              method: "get",
            },
          )
    
          const data = await response.json()
          const isSuccess = data.status
          const message = data.message
    
          if (isSuccess == 200) {
            await deserialiseIntervalResultsResponse(message, activityId)
    
            console.log(`Results for ${reportId} exists.`)
            return { success: true, message: `${reportId} exists.` }
          } else {
            console.log(`Results for ${reportId} do not exist.`)
            return {
              success: false,
              message: `Results for ${reportId} do not exist.`,
            }
          }
        } catch (error) {
          return { success: false, message: error }
        }
      }
    
      const populateIntervalResults = async (activityIdList: string[]) => {
        for (const activityId of activityIdList) {
          const { success, message } = await isReportExists(activityId)
    
          if (success) {
            const { id } = JSON.parse(message)
    
            await getIntervalResults(id, activityId)
          }
        }
    
        isApiPopulated.current = true
      }
    
      const deserialiseIntervalResultsResponse = (
        responseMessage: string,
        activityId: string,
      ) => {
        const intervalList: IntervalResultAnalysis[] = JSON.parse(
          responseMessage,
        ).map((intervalResult: any) => ({
          id: intervalResult.id,
          activityId: activityId,
          interval: intervalResult.intervalId,
          duration: intervalResult.duration,
          intensity: {
            min: intervalResult.intensityMin,
            max: intervalResult.intensityMax,
            average: intervalResult.intensityAvg,
          },
          pulse: {
            min: intervalResult.pulseMin,
            max: intervalResult.pulseMax,
            average: intervalResult.pulseAvg,
          },
          speed: {
            min: intervalResult.speedMin,
            max: intervalResult.speedMax,
            average: intervalResult.speedAvg,
          },
          watt: {
            min: intervalResult.wattMin,
            max: intervalResult.wattMax,
            average: intervalResult.wattAvg,
          },
        }))
    
        setIntervalResults((prevState) => [...prevState, ...intervalList])
    }

    return { averageValues, intervalResults, filteredColumns, isApiPopulated, colNames, populateIntervalResults, toggleFilteredColumn, resetColumns, setAverageValues, calculateColumnStats };
};

export default useAnalysisHook;