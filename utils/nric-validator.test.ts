import { describe, it, expect } from 'vitest';
import { validateNRICFIN } from './nric-validator';

describe("validateNRICFIN", () => {
    it("should return false if the input is null or empty", () => {
        expect(validateNRICFIN("")).toBe(false);
    });

    it("should return false if the input length is not 9", () => {
        expect(validateNRICFIN("S1234567")).toBe(false);
        expect(validateNRICFIN("T123456789")).toBe(false);
    });

    it("should return false if the first letter is not S, T, F, or G", () => {
        expect(validateNRICFIN("A12345678")).toBe(false);
        expect(validateNRICFIN("B12345678")).toBe(false);
    });

    it("should return false if the last letter is not A - Z", () => {
        expect(validateNRICFIN("S1234567X")).toBe(false);
        expect(validateNRICFIN("T1234567Y")).toBe(false);
    });

    it("should return false if the check digit does not match the last letter", () => {
        expect(validateNRICFIN("S1234567A")).toBe(false);
        expect(validateNRICFIN("T1234567B")).toBe(false);
    });

    it("should return true if the NRIC/FIN is valid", () => {
        // https://samliew.com/nric-generator
        const validNrics = [
            "S8569512F",
            "S4884848F",
            "S7494854E"
        ];
        for (const validNric of validNrics) {
            expect(validateNRICFIN(validNric)).toBe(true)
        }
    });
});