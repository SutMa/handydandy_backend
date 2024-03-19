"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWithinRange = exports.parseTimeRange = exports.isTimeSlotValid = void 0;
function parseTimeRange(timeRange) {
    if (typeof timeRange !== 'string') {
        console.error('Invalid or missing timeRange:', timeRange);
        return { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 }; // Return a default or error value
    }
    const [start, end] = timeRange.split("-");
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    return { startHour, startMinute, endHour, endMinute };
}
exports.parseTimeRange = parseTimeRange;
function isWithinRange(time, startHour, startMinute, endHour, endMinute) {
    const startTime = new Date(time);
    startTime.setHours(startHour, startMinute, 0, 0);
    const endTime = new Date(time);
    endTime.setHours(endHour, endMinute, 0, 0);
    return time >= startTime && time <= endTime;
}
exports.isWithinRange = isWithinRange;
function isTimeSlotValid(timeComing, timeAvailable) {
    const timeComingDate = new Date(timeComing.date);
    timeComingDate.setHours(0, 0, 0, 0); // Normalize to start of the day for date comparison
    const { startHour, startMinute, endHour, endMinute } = parseTimeRange(timeComing.timeRange);
    const time = new Date(timeComing.date); // Use the exact date and time for range comparison
    return timeAvailable.some(slot => {
        const slotDate = new Date(slot.date);
        slotDate.setHours(0, 0, 0, 0); // Normalize to start of the day for date comparison
        if (slotDate.getTime() === timeComingDate.getTime()) {
            const { startHour: slotStartHour, startMinute: slotStartMinute, endHour: slotEndHour, endMinute: slotEndMinute } = parseTimeRange(slot.timeRange);
            return isWithinRange(time, slotStartHour, slotStartMinute, slotEndHour, slotEndMinute);
        }
        return false;
    });
}
exports.isTimeSlotValid = isTimeSlotValid;
