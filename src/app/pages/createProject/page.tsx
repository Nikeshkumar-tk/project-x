"use client"

// components/DynamicInputForm.js
import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

const DynamicInputForm = () => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      items: [{ name: '', date: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('projects_name')} placeholder="Projects Name" />
          <input {...register('projects_description')} placeholder="Projects Description" />
            <input {...register('mentor_name')} placeholder="Mentor Name" />
      {fields.map((item, index) => (
        <div key={item.id}>
        

          <input
            {...register(`items[${index}].name`)}
            defaultValue={item.name}
          />
          <Controller
            control={control}
            name={`items[${index}].date`}
            render={({ field }) => (
              <input type="date" {...field} placeholder="Select date" />
            )}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          append({ name: '', date: '' });
        }}
      >
        Add Item
      </button>

      <button type="submit">Submit</button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
};

export default DynamicInputForm;


// import React, { useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { format } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"
// import { useForm, useFieldArray,Controller } from 'react-hook-form';
// import * as z from "zod"
// import { createProjectSchema } from "@/lib/validations"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// // const formSchema = z.object({
// //   username: z.string().min(2, {
// //     message: "Username must be at least 2 characters.",
// //   }),
// // })

// export function createProject() {
//   // const [date, setDate] = React.useState<Date>()
//   // const [timelineEntries, setTimelineEntries] = useState([{}]);
//   // const form = useForm<z.infer<typeof createProjectSchema>>({
//   //   resolver: zodResolver(createProjectSchema),
  
//   // })

//   // // 2. Define a submit handler.
//   // function onSubmit(values: any) {
//   //   // Do something with the form values.
//   //   // ✅ This will be type-safe and validated.
//   //   console.log(values)
//   // }
//   const { register, control, handleSubmit, reset } = useForm<z.infer<typeof createProjectSchema>>({
//     resolver: zodResolver(createProjectSchema),
//     defaultValues: {
//       timelines: [{ description: '', event_date: '' }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'timelines',
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };
  


//   return (
//     // <Form {...form}>
//     //   <form
//     //     onSubmit={form.handleSubmit(onSubmit)}
//     //     className="m-5 space-y-5 p-5"
//     //   >
//     //     <FormField
//     //       control={form.control}
//     //       name="projects_name"
//     //       render={({ field }) => (
//     //         <FormItem>
//     //           <FormLabel> Project name</FormLabel>
//     //           <FormControl>
//     //             <Input placeholder="projects_name" {...field} />
//     //           </FormControl>
//     //           {/* <FormDescription>
//     //             This is your public display name.
//     //           </FormDescription> */}
//     //           <FormMessage />
//     //         </FormItem>
//     //       )}
//     //     />
//     //     <FormField
//     //       control={form.control}
//     //       name="projects_description"
//     //       render={({ field }) => (
//     //         <FormItem>
//     //           <FormLabel> Project Description</FormLabel>
//     //           <FormControl>
//     //             <Input placeholder="projects_description" {...field} />
//     //           </FormControl>
//     //           {/* <FormDescription>
//     //             This is your public display name.
//     //           </FormDescription> */}
//     //           <FormMessage />
//     //         </FormItem>
//     //       )}
//     //     />
//     //     <FormField
//     //       control={form.control}
//     //       name="mentor_name"
//     //       render={({ field }) => (
//     //         <FormItem>
//     //           <FormLabel> Mentor name</FormLabel>
//     //           <FormControl>
//     //             <Input placeholder="mentor_name" {...field} />
//     //           </FormControl>
//     //           {/* <FormDescription>
//     //             This is your public display name.
//     //           </FormDescription> */}
//     //           <FormMessage />
//     //         </FormItem>
//     //       )}
//     //     />
        
        
//     //      {/* Timeline */}
         
        

//     //     <br />
//     //     <Button type="submit">Submit</Button>
//     //   </form>
//     // </Form>
//     <form onSubmit={handleSubmit(onSubmit)}>
//     {fields.map((item, index) => (
//       <div key={item.id}>
//         <input
//           {...register(`items[${index}].name`)}
//           defaultValue={item.name}
//         />
//         <Controller
//           control={control}
//           name={`items[${index}].date`}
//           render={({ field }) => (
//             <input type="date" {...field} placeholder="Select date" />
//           )}
//         />
//         <button type="button" onClick={() => remove(index)}>
//           Remove
//         </button>
//       </div>
//     ))}
//     <button
//       type="button"
//       onClick={() => {
//         append({ description: '', event_date: '' });
//       }}
//     >
//       Add Item
//     </button>

//     <button type="submit">Submit</button>
//     <button type="button" onClick={() => reset()}>
//       Reset
//     </button>
//   </form>

//   )
// }
// export default createProject
