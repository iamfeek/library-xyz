import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";
import Datepicker from "react-tailwindcss-datepicker";

export const DatePickerField = (props: any) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const computeMinDate = () => {
    // Library XYZ closes at 8pm and bookings are at intervals of 30mins
    // if user comes in at 731pm, next available booking should be for tomorrow.

    const now = dayjs();
    const currentHour = now.hour();
    const currentMinute = now.minute();
    if (currentHour >= 20 || (currentHour === 19 && currentMinute >= 30)) {
      return now.add(1, "day");
    }

    return now;
  };

  const minDate = computeMinDate();
  return (
    <Datepicker
      {...field}
      {...props}
      asSingle={true}
      value={{ startDate: field.value, endDate: field.value }}
      displayFormat="D MMMM YYYY"
      placeholder="Date of booking"
      inputClassName="relative w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      onChange={(val) => {
        setFieldValue(field.name, val ? val.startDate : "");
      }}
      minDate={minDate}
      startWeekOn="mon"
    />
  );
};
