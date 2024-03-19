interface ITimeSlot {
    startTime: Date;
    endTime: Date;
}


export function timeValidation(timeComing: ITimeSlot, timeAvailable: ITimeSlot[]): boolean {
      
      const comingStartTime = new Date(timeComing.startTime);
      const comingEndTime = new Date(timeComing.endTime);
  
      return timeAvailable.some(timeFrame => {
          const frameStartTime = new Date(timeFrame.startTime);
          const frameEndTime = new Date(timeFrame.endTime);
  
          return frameStartTime.getTime() === comingStartTime.getTime() &&
                 frameEndTime.getTime() === comingEndTime.getTime();
      });
}
