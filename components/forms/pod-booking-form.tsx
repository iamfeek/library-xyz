"use client";

import { cn } from "@/utils";
import {
  availableDurations,
  availablePods,
  availableTimings,
  getMinutesTillClosing,
  getNextAvailableTimeslot,
  isTodayBookable,
} from "@/utils/form-constants";
import { validateNRICFIN } from "@/utils/nric-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type PodNumber = (typeof availablePods)[number]["number"];
const PodNumbers: [PodNumber, ...PodNumber[]] = [
  availablePods[0].number,
  ...availablePods.slice(1).map((p) => p.number),
];

const schema = z.object({
  name: z.string().min(1, "You have to enter a name"),
  nric: z
    .string()
    .length(9, "NRIC is 9 characters")
    .refine(validateNRICFIN, "Invalid NRIC"),
  podNumber: z.enum(PodNumbers, {
    errorMap: () => {
      return { message: "You have to choose a pod" };
    },
  }),
  date: z.string().datetime("You have to pick a date"),
  timeslot: z.enum(
    [
      availableTimings[0].time.toString(),
      ...availableTimings.slice(1).map((d) => d.time.toString()),
    ],
    {
      errorMap: () => ({
        message: "You have to choose a time",
      }),
    }
  ),
  durationInMinutes: z.enum(
    [
      availableDurations[0].minutes.toString(),
      ...availableDurations.slice(1).map((d) => d.minutes.toString()),
    ],
    {
      errorMap: () => ({
        message: "You have to choose a duration",
      }),
    }
  ),
});

export type PodBookingSchemaType = z.infer<typeof schema>;

export function PodBookingForm() {
  const [nextAvailableTimeslot, setNextAvailableTimeslot] = useState(0);
  const [minutesTillClosing, setMinutesTillClosing] = useState(0);

  const router = useRouter();
  const form = useForm<PodBookingSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      nric: "",
      podNumber: "",
      date: "",
      timeslot: "",
      durationInMinutes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookingId = Math.floor(Math.random() * 90000) + 10000;

        localStorage.setItem(bookingId.toString(), JSON.stringify(values));
        router.push(`/acknowledgement/${bookingId}`);
      }, 1800);
    });
  }

  const watchSelectedDate = form.watch("date");
  const watchSelectedTimeslot = form.watch("timeslot");

  useEffect(() => {
    if (watchSelectedDate) {
      setNextAvailableTimeslot(
        getNextAvailableTimeslot(new Date(watchSelectedDate))
      );
    }
  }, [watchSelectedDate]);

  useEffect(() => {
    if (watchSelectedTimeslot) {
      setMinutesTillClosing(
        getMinutesTillClosing(Number(watchSelectedTimeslot))
      );
    }
  }, [watchSelectedTimeslot]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="What's your name?" {...field} />
                </FormControl>
                <FormDescription>
                  This name should match your national identification.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nric"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NRIC</FormLabel>
                <FormControl>
                  <Input placeholder="SXXXXXXXA" {...field} />
                </FormControl>
                <FormDescription>
                  Stored in a 256-bit encrypted database.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="podNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pod</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a pod" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availablePods.map((pod) => (
                      <SelectItem key={pod.number} value={pod.number}>
                        Pod {pod.number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="podNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pod Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Choose a pod"
                    {...field}
                    value={(function () {
                      if (!field.value) return "";

                      const chosenPod = availablePods.find(
                        (pod) => pod.number === field.value
                      );

                      return chosenPod!.name;
                    })()}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(selectedDate: Date | undefined) => {
                          if (selectedDate) {
                            field.onChange(selectedDate.toISOString());
                          }
                        }}
                        disabled={[
                          ...(isTodayBookable() ? [] : [new Date()]),
                          { before: new Date() },
                        ]}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeslot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timeslot</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!watchSelectedDate}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a timeslot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableTimings.map((time) => (
                      <SelectItem
                        key={time.time}
                        value={time.time.toString()}
                        disabled={time.time < nextAvailableTimeslot}
                      >
                        {time.display}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="durationInMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!watchSelectedTimeslot}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a pod" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableDurations.map((d) => (
                      <SelectItem
                        key={d.minutes}
                        value={d.minutes.toString()}
                        disabled={d.minutes > minutesTillClosing}
                      >
                        {d.display}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Submit
        </Button>
      </form>
    </Form>
  );
}
