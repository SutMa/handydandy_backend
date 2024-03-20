"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeValidation = void 0;
function timeValidation(timeComing, timeAvailable) {
    const comingStartTime = new Date(timeComing.startTime);
    const comingEndTime = new Date(timeComing.endTime);
    return timeAvailable.some(timeFrame => {
        const frameStartTime = new Date(timeFrame.startTime);
        const frameEndTime = new Date(timeFrame.endTime);
        return frameStartTime.getTime() === comingStartTime.getTime() &&
            frameEndTime.getTime() === comingEndTime.getTime();
    });
}
exports.timeValidation = timeValidation;
