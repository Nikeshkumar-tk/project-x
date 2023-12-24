"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function createProject() {
  const [date, setDate] = React.useState<Date>()
  const [timelineEntries, setTimelineEntries] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const addTimelineEntry = () => {
    setTimelineEntries([...timelineEntries, ""]);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-5 space-y-5 p-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Project name</FormLabel>
              <FormControl>
                <Input placeholder="projects name" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Project Description</FormLabel>
              <FormControl>
                <Input placeholder="projects" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Mentor name</FormLabel>
              <FormControl>
                <Input placeholder="projects" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <label
            htmlFor="datePicker"
            className="text-white-700 block text-sm font-medium"
          >
            Select a Date:
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
         {/* Timeline */}
         <div className="space-y-3">
          <label className="text-white-700 block text-sm font-medium">
            Timeline:
          </label>
          {timelineEntries.map((entry, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Timeline entry"
                value={entry}
                onChange={(e) => {
                  const updatedEntries = [...timelineEntries];
                  updatedEntries[index] = e.target.value;
                  setTimelineEntries(updatedEntries);
                }}
                className="p-2 border rounded"
              />
            </div>
          ))}
          <Button type="button" onClick={addTimelineEntry}>
            Add Timeline Entry
          </Button>
        </div>

        <br />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
export default createProject
