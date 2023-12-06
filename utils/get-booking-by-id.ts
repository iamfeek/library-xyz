import { PodBookingSchemaType } from "@/components/forms/pod-booking-form";

export const getBookingById = (bookingId: string): PodBookingSchemaType => {
    const stringifiedBooking = localStorage.getItem(bookingId);

    if (!stringifiedBooking) {
        throw new Error("BOOKING_NOT_FOUND")
    }

    return JSON.parse(stringifiedBooking) as PodBookingSchemaType;
}