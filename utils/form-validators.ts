import { differenceInMinutes, format, getHours, getMinutes, parse } from "date-fns";
import { roundToNearest30 } from "./round-to-nearest-30";

export const isTodayBookable = () => {
    // Library XYZ closes at 8pm and bookings are at intervals of 30mins
    // if user comes in at 731pm, next available booking should be for tomorrow.

    const now = new Date();
    const currentHour = getHours(now);
    const currentMinute = getMinutes(now);
    if (currentHour >= 20 || (currentHour === 19 && currentMinute >= 30)) {
        return false
    }

    return true;
};

export const getNextAvailableTimeslot = (relativeDate: Date) => {
    const now = new Date();
    if (relativeDate.getDate() > now.getDate()) return 1200

    const nearest30 = roundToNearest30(now);

    const hhmm = format(nearest30, "HHmm");
    return Number(hhmm);
}

export const getMinutesTillClosing = (timeslotIn24h: number) => {
    const sanitizedTimeslot = String(timeslotIn24h).length === 3 ? `0${timeslotIn24h}` : String(timeslotIn24h)
    const timeslotDate = parse(sanitizedTimeslot, "HHmm", new Date())

    const closingTime = parse("2000", "HHmm", new Date())

    return differenceInMinutes(closingTime, timeslotDate)
}