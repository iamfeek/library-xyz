import { getHours, getMinutes, addDays, format, parse, isPast, differenceInMinutes } from "date-fns";
import { roundToNearest30 } from "./round-to-nearest-30";

export const availablePods = [
    {
        number: "1",
        name: "Red Pod",
    },
    {
        number: "2",
        name: "Green Pod",
    },
    {
        number: "3",
        name: "Blue Pod",
    },
    {
        number: "4",
        name: "Yellow Pod",
    },
    {
        number: "5",
        name: "Pink Pod",
    },
    {
        number: "6",
        name: "Orange Pod",
    },
    {
        number: "7",
        name: "Purple Pod",
    },
    {
        number: "8",
        name: "Brown Pod",
    },
];

export const availableDurations = [
    {
        minutes: 30,
        display: "30 mins",
    },
    {
        minutes: 60,
        display: "1 hour",
    },
    {
        minutes: 90,
        display: "1.5 hours",
    },
    {
        minutes: 120,
        display: "2 hours",
    },
];

export const availableTimings = [
    {
        time: 230,
        display: "2:30 AM"
    },
    {
        time: 330,
        display: "3:30 AM"
    },
    {
        time: 1200,
        display: "12 PM"
    },
    {
        time: 1230,
        display: "12:30 PM"
    },
    {
        time: 1300,
        display: "01:00 PM"
    },
    {
        time: 1330,
        display: "01:30 PM"
    },
    {
        time: 1400,
        display: "02:00 PM"
    },
    {
        time: 1430,
        display: "02:30 PM"
    },
    {
        time: 1500,
        display: "03:00 PM"
    },
    {
        time: 1530,
        display: "03:30 PM"
    },
    {
        time: 1600,
        display: "04:00 PM"
    },
    {
        time: 1630,
        display: "04:30 PM"
    },
    {
        time: 1700,
        display: "05:00 PM"
    },
    {
        time: 1730,
        display: "05:30 PM"
    },
    {
        time: 1800,
        display: "06:00 PM"
    },
    {
        time: 1830,
        display: "06:30 PM"
    },
    {
        time: 1900,
        display: "07:00 PM"
    },
    {
        time: 1930,
        display: "07:30 PM"
    }
]

export const isTodayBookable = () => {
    // Library XYZ closes at 8pm and bookings are at intervals of 30mins
    // if user comes in at 731pm, next available booking should be for tomorrow.

    const now = new Date();
    const currentHour = getHours(now);
    const currentMinute = getMinutes(now);
    if (currentHour >= 20 || (currentHour === 19 && currentMinute >= 30)) {
        // if (currentHour >= 23 || (currentHour === 23 && currentMinute >= 59)) {
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