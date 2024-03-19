"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTimeSlotValid = void 0;
function isTimeSlotValid(timeComing, timeAvailable) {
    const comingDate = timeComing.date;
    const [comingStartTime, comingEndTime] = timeComing.timeRange.split('-').map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const dateCopy = new Date(comingDate.getTime()); // Clone the comingDate to avoid mutating the original
        dateCopy.setHours(hours, minutes, 0, 0); // Set time according to the timeRange
        return dateCopy;
    });
    return timeAvailable.some(({ date, timeRange }) => {
        const [slotStartTime, slotEndTime] = timeRange.split('-').map(time => {
            const [hours, minutes] = time.split(':').map(Number);
            const dateCopy = new Date(date.getTime()); // Clone the slot date
            dateCopy.setHours(hours, minutes, 0, 0); // Set time according to the timeRange
            return dateCopy;
        });
        // Now compare dates and times
        return comingDate.toDateString() === date.toDateString() && // Checks if the dates are the same
            comingStartTime >= slotStartTime &&
            comingEndTime <= slotEndTime; // Checks if the coming time range is within the slot time range
    });
}
exports.isTimeSlotValid = isTimeSlotValid;
