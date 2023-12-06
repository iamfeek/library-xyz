"use client";

import { PodBookingSchemaType } from "@/components/forms/pod-booking-form";
import { availablePods, availableDurations } from "@/utils/form-constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBookingById } from "../../../../utils/get-booking-by-id";
import { add, addMinutes, format, parse } from "date-fns";
import {
  formatDateToTimeslotDisplay,
  parseTimeslotToDate,
} from "@/utils/timeslot-utils";

export default function BookingAcknowledgementPage() {
  const [booking, setBooking] = useState<PodBookingSchemaType | null>();
  const [fetching, setFetching] = useState(true);
  const [errorCode, setErrorCode] = useState("");

  const params = useParams();

  useEffect(() => {
    try {
      const booking = getBookingById(params.bookingId as string);
      setBooking(booking);
      setFetching(false);
    } catch (e: any) {
      setFetching(false);
      setErrorCode(e.message);
    }
  }, [params]);

  const renderBookingInformation = () => {
    if (fetching) {
      return <div className="p-4 mt-6">Loading...</div>;
    }

    if (errorCode) {
      return <div className="px-4 mt-6">Something went wrong</div>;
    }

    if (booking) {
      return (
        <div className="mt-6 border-t border-gray-100 lg:px-4">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {booking.name}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Pod
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Pod {booking.podNumber} -{" "}
                {
                  availablePods.find((pod) => pod.number === booking.podNumber)
                    ?.name
                }
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Booking date
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {format(new Date(booking.date), "MMMM do, yyyy")}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Booking time
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formatDateToTimeslotDisplay(
                  parseTimeslotToDate(booking.timeslot)
                )}{" "}
                to{" "}
                {formatDateToTimeslotDisplay(
                  addMinutes(
                    parseTimeslotToDate(booking.timeslot),
                    Number(booking.durationInMinutes)
                  )
                )}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Duration
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {
                  availableDurations.find(
                    (dur) => dur.minutes === Number(booking.durationInMinutes)
                  )!.display
                }
              </dd>
            </div>
          </dl>
        </div>
      );
    }
  };

  return (
    <div className="shadow-md rounded-lg">
      <div className="pt-4 px-4">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Booking Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          We hope to serve you well.
        </p>
      </div>

      {renderBookingInformation()}
    </div>
  );
}
