"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "react-query"
import { toast } from "sonner"
import { z } from "zod"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { projectSchema } from "@/lib/validations"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "./ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

type ProjectSchema = z.infer<typeof projectSchema>

export function AddProject() {
    const [openDialog, setOpenDialog] = useState(false)
    const createProjectMutation = useMutation(async (data: ProjectSchema) => {
        const response = await fetch("/api/project", {
            method: "POST",
            body: JSON.stringify(data),
        })
        return await response.json()
    })

 
    const { register, control, handleSubmit, reset } = useForm<
    z.infer<typeof projectSchema>
  >({
    defaultValues: {},
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "timelines",
  })


    const onSubmit = (formData: ProjectSchema) => {
        createProjectMutation.mutate(formData, {
            onSuccess() {
                toast.success("Project Created Successfully")
                setOpenDialog(false)
            },
            onError() {
                toast.error("Something went wrong while adding project")
            },
        })
    }

    return (
        <>
        <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("projects_name")} placeholder="Projects Name" />
      <input
        {...register("projects_description")}
        placeholder="Projects Description"
      />
      <input {...register("mentor_name")} placeholder="Mentor Name" />
      {fields.map((item, index) => (
        <div key={item.id}>
          <input
            {...register(`timelines[${index}].name`)}
            defaultValue={item.name}
          />
          <Controller
            control={control}
            name={`timelines[${index}].date`}
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
          append({ name: "", date: "" })
        }}
      >
        Add Item
      </button>

      <button type="submit">Submit</button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </form>
              
            </DialogContent>
        </Dialog>
        <Button  onClick={() => setOpenDialog(true)}>Add Project</Button>
        </>
    )
}
