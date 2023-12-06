import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { formatDateToTimeslotDisplay, parseTimeslotToDate } from './timeslot-utils';

describe("parseTimeslotToDate", () => {
    it("should parse timeslot string (1430) to a valid date object", () => {
        const timeslot = "1430";
        const expectedDate = new Date();
        expectedDate.setHours(14);
        expectedDate.setMinutes(30);
        expectedDate.setSeconds(0);
        expectedDate.setMilliseconds(0);

        const result = parseTimeslotToDate(timeslot);

        expect(result).toEqual(expectedDate);
    });
});

describe("formatDateToTimeslotDisplay", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    });

    afterEach(() => {
        vi.useRealTimers();
    })
    it("should format 1430 to 2:30 PM display", () => {
        const date = new Date();
        date.setHours(14);
        date.setMinutes(30);
        date.setSeconds(0);
        date.setMilliseconds(0);

        const expectedTimeslot = "2:30 PM";

        const result = formatDateToTimeslotDisplay(date);

        expect(result).toEqual(expectedTimeslot);
    });


    it("should format 1230 to 12:30 PM display", () => {
        const date = new Date();
        date.setHours(12);
        date.setMinutes(30);
        date.setSeconds(0);
        date.setMilliseconds(0);

        const expectedTimeslot = "12:30 PM";

        const result = formatDateToTimeslotDisplay(date);

        expect(result).toEqual(expectedTimeslot);
    });

    it("should format 0230 to 2:30 AM display", () => {
        const date = new Date();
        date.setHours(2);
        date.setMinutes(30);
        date.setSeconds(0);
        date.setMilliseconds(0);

        const expectedTimeslot = "2:30 AM";

        const result = formatDateToTimeslotDisplay(date);

        expect(result).toEqual(expectedTimeslot);
    });
});