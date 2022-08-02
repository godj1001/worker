import {useEffect, useState} from "react";

export enum ScheduleStatus {
    FREE = 'free',
    WORKING = 'working',
    RELAX='relax'
}


interface ScheduleTime {

}

const statusTime = {
    [ScheduleStatus.WORKING]: 10,
    [ScheduleStatus.RELAX]: 10
}

export const useScheduleHooks = () => {
    const [startTime,setStartTime] = useState(0)
    const [scheduleStatus,setScheduleStatus] = useState(ScheduleStatus.FREE)
    const [scheduleTime,setScheduleTime] = useState<ScheduleTime>({})
    const [startCountDown,setStartCountDown] = useState(false)
    const nextStatus = (status: ScheduleStatus) => {
        if(status === ScheduleStatus.RELAX){
            return ScheduleStatus.WORKING
        }
        return ScheduleStatus.RELAX
    }
    
    useEffect(() => {
        if(!startCountDown) return
         const timer = setInterval(() => {
            
            setStartTime(c =>{ 
                if(c <= 1){
                    setScheduleStatus(nextStatus(scheduleStatus))
                    if(scheduleStatus === ScheduleStatus.RELAX){
                        clearInterval(timer)
                    }
                    return 0
                }
                return Math.max(c-1,0)
            })
        },1000)
        return () => clearInterval(timer)
    },[startCountDown])

    useEffect(() => {
        if(scheduleStatus === ScheduleStatus.FREE) return ;
        const time  = statusTime[scheduleStatus]
        setStartTime(time)
        if(time){
            setStartCountDown(true)
        }
    },[scheduleStatus])

    return {
        startTime,
        scheduleStatus,
        setScheduleStatus
    }
}