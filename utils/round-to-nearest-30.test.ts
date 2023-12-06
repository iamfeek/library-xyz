import { describe, it, expect } from 'vitest';
import { roundToNearest30 } from './round-to-nearest-30';

describe("roundToNearest30", () => {
    it("should round up to the nearest 30 minutes", () => {
        const date1 = new Date(2023, 1, 1, 12, 15);
        const roundedDate1 = roundToNearest30(date1);
        expect(roundedDate1.getHours()).toBe(12);
        expect(roundedDate1.getMinutes()).toBe(30);

        const date2 = new Date(2023, 1, 1, 12, 45);
        const roundedDate2 = roundToNearest30(date2);
        expect(roundedDate2.getHours()).toBe(13);
        expect(roundedDate2.getMinutes()).toBe(0);

        const date3 = new Date(2023, 1, 1, 12, 0);
        const roundedDate3 = roundToNearest30(date3);
        expect(roundedDate3.getHours()).toBe(12);
        expect(roundedDate3.getMinutes()).toBe(0);
    });

    it("should return the same date if it is already rounded to the nearest 30 minutes", () => {
        const date = new Date(2023, 1, 1, 12, 30);
        const roundedDate = roundToNearest30(date);
        expect(roundedDate).toEqual(date);
    });
});