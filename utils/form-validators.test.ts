import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { isTodayBookable } from './form-validators';

describe("isTodayBookable", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    });

    afterEach(() => {
        vi.useRealTimers();
    })

    it("should return false if current time is exactly 7:30 PM", () => {
        const date = new Date(2023, 1, 1, 19, 30);
        vi.setSystemTime(date);

        expect(isTodayBookable()).toBe(false)
    })

    it("should return true if current time is before 7:30 PM", () => {
        const date = new Date(2023, 1, 1, 18, 30);
        vi.setSystemTime(date);

        expect(isTodayBookable()).toBe(true)
    })
})
