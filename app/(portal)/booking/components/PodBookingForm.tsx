"use client";

import { classNames } from "@/utils/classnames";
import { Field, Form, Formik, FormikErrors, FormikTouched } from "formik";
import * as yup from "yup";
import { DatePickerField } from "./DatePickerField";
import { useRouter } from "next/navigation";

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

export const duration = [
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

const availableTimings = ["12pm", "12:30pm", "1pm", "1:30pm"];

const PodBookingSchema = yup.object({
  name: yup.string().required("Name is required"),
  nric: yup.string().required("NRIC is required"),
  podNumber: yup
    .string()
    .oneOf(availablePods.map((pod) => pod.number))
    .required("You have to pick a pod"),
  // date format from datepicker: YYYY-MM-DD
  date: yup.string().required("You have to pick a date"),
  timeslot: yup
    .string()
    .oneOf(availableTimings)
    .required("You have to pick a timeslot"),
  durationInMinutes: yup.number().required("You have to pick a duration"),
});

export type PodBookingType = yup.InferType<typeof PodBookingSchema>;

export const FieldError = (props: { message: string }) => {
  return (
    <div className="text-sm text-red-500 font-semibold">{props.message}</div>
  );
};

export const PodBookingForm = () => {
  const router = useRouter();
  const renderError = (
    errors: FormikErrors<PodBookingType>,
    touched: FormikTouched<PodBookingType>,
    fieldName: keyof PodBookingType
  ) => {
    if (errors[fieldName] && touched[fieldName]) {
      return (
        <div className="text-sm text-red-500 font-semibold">
          {errors[fieldName]}
        </div>
      );
    }

    return null;
  };

  return (
    <Formik
      initialValues={{
        name: "",
        nric: "",
        podNumber: "",
        date: undefined,
        timeslot: "",
        durationInMinutes: "",
      }}
      validationSchema={PodBookingSchema}
      onSubmit={(values) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const bookingId = Math.floor(Math.random() * 90000) + 10000;

            localStorage.setItem(bookingId.toString(), JSON.stringify(values));
            router.push(`/acknowledgement/${bookingId}`);

            resolve(void 0);
          }, 4000);
        });
      }}
      className=""
    >
      {({ errors, touched, values, isValid, dirty, isSubmitting }) => {
        return (
          <Form>
            <div className="grid grid-cols-1 gap-4 shadow-md rounded-lg px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <Field
                      name="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="you@example.com"
                    />
                    {renderError(errors, touched, "name")}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="nric"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    NRIC
                  </label>
                  <div className="mt-2">
                    <Field
                      name="nric"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="SXXXXXXXA"
                    />
                    {renderError(errors, touched, "nric")}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="Pod Number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pod Number
                  </label>
                  <div className="mt-2">
                    <Field
                      name="podNumber"
                      as="select"
                      className={classNames(
                        values.podNumber === ""
                          ? "text-gray-400"
                          : "text-gray-900",
                        "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      )}
                    >
                      <option disabled value={""} className="hidden">
                        Pick your pod
                      </option>
                      {availablePods.map((pod) => (
                        <option
                          key={pod.number}
                          value={pod.number}
                          className="text-gray-900"
                        >
                          Pod {pod.number}
                        </option>
                      ))}
                    </Field>
                    {renderError(errors, touched, "podNumber")}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Pod Location
                  </label>
                  <div className="mt-2">
                    <input
                      disabled
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                      value={(function () {
                        if (!values.podNumber) return "";

                        const chosenPod = availablePods.find(
                          (pod) => pod.number === values.podNumber
                        );

                        return chosenPod?.name;
                      })()}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Date
                  </label>
                  <div className="mt-2">
                    <DatePickerField name="date" />
                    {renderError(errors, touched, "date")}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Timeslot
                  </label>
                  <div className="mt-2">
                    <Field
                      name="timeslot"
                      as="select"
                      className={classNames(
                        values.timeslot === ""
                          ? "text-gray-400"
                          : "text-gray-900",
                        "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      )}
                    >
                      <option disabled value="" className="hidden">
                        Pick your timeslot
                      </option>
                      {availableTimings.map((timing) => (
                        <option
                          key={timing}
                          value={timing}
                          className="text-gray-900"
                        >
                          {timing}
                        </option>
                      ))}
                    </Field>
                    {renderError(errors, touched, "timeslot")}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Duration
                  </label>
                  <div className="mt-2">
                    <Field
                      name="durationInMinutes"
                      as="select"
                      className={classNames(
                        values.durationInMinutes === ""
                          ? "text-gray-400"
                          : "text-gray-900",
                        "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      )}
                    >
                      <option disabled value="" className="hidden">
                        Pick your duration
                      </option>
                      {duration.map((d) => (
                        <option
                          key={d.minutes}
                          value={d.minutes}
                          className="text-gray-900"
                        >
                          {d.display}
                        </option>
                      ))}
                    </Field>
                    {renderError(errors, touched, "durationInMinutes")}
                  </div>
                </div>
              </div>

              <div className="relative my-2">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                {/* <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    Continue
                  </span>
                </div> */}
              </div>
              <button
                type="submit"
                className={classNames(
                  isSubmitting
                    ? "bg-gray-500 hover:bg-gray-500 focus-visible:outline-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 cursor-pointer",
                  "rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-fit"
                )}
              >
                {isSubmitting ? "Booking..." : "Book now"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
