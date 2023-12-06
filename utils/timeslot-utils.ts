import { format, parse } from "date-fns";

export function parseTimeslotToDate(timeslot: string) {
    // format = 1430
    const format = "HHmm";

    return parse(timeslot, format, new Date())
}

export function formatDateToTimeslotDisplay(date: Date) {
    const expectedFormat = "h:mm a"

    return format(date, expectedFormat)
}