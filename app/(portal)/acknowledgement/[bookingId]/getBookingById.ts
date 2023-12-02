import { PodBookingType } from "../../booking/components/PodBookingForm";

export const getBookingById = (bookingId: string): PodBookingType => {
    const stringifiedBooking = localStorage.getItem(bookingId);

    if (!stringifiedBooking) {
        throw new Error("BOOKING_NOT_FOUND")
    }

    return JSON.parse(stringifiedBooking) as PodBookingType;
}