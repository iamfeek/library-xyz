"use client";

import { useParams, useRouter } from "next/navigation";
import {
  PodBookingType,
  availablePods,
  duration,
} from "../../booking/components/PodBookingForm";
import { useEffect, useState } from "react";
import { getBookingById } from "./getBookingById";

export default function BookingAcknowledgementPage() {
  const [booking, setBooking] = useState<PodBookingType | null>();
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
      return "Loading...";
    }

    if (errorCode) {
      return `Something went wrong...`;
    }

    if (booking) {
      return (
        <div className="mt-6 border-t border-gray-100">
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
                Date
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {booking.date}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Pod Location
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
                Duration
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {
                  duration.find(
                    (dur) => dur.minutes === Number(booking.durationInMinutes)
                  )!.display
                }
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Timeslot
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {booking.timeslot}
              </dd>
            </div>
          </dl>
        </div>
      );
    }
  };

  return (
    <div className="shadow-md rounded-lg">
      <div className="pt-4 px-4 sm:px-0">
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
