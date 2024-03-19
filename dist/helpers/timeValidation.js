"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeValidation = void 0;
function timeValidation(timeComing, timeAvailable) {
    // Convert startTime and endTime from strings to Date objects
    const comingStartTime = new Date(timeComing.startTime);
    const comingEndTime = new Date(timeComing.endTime);
    return timeAvailable.some(timeFrame => {
        // Ensure timeFrame.startTime and timeFrame.endTime are Date objects
        // This might already be the case if timeAvailable is fetched from a database that stores these as dates,
        // but it's safe to convert them again to be sure.
        const frameStartTime = new Date(timeFrame.startTime);
        const frameEndTime = new Date(timeFrame.endTime);
        return frameStartTime.getTime() === comingStartTime.getTime() &&
            frameEndTime.getTime() === comingEndTime.getTime();
    });
}
exports.timeValidation = timeValidation;
