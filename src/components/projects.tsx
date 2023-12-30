'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { projectSchema } from "@/lib/validations";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type ProjectSchema = z.infer<typeof projectSchema>;

export function AddProject() {
  const [openDialog, setOpenDialog] = useState(false);
  const createProjectMutation = useMutation(async (data: ProjectSchema) => {
    const response = await fetch("/api/project", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await response.json();
  });

  const { register, control, handleSubmit, reset } = useForm<ProjectSchema>({
    defaultValues: {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "timelines",
  });

  const onSubmit = (formData: ProjectSchema) => {
    createProjectMutation.mutate(formData, {
      onSuccess() {
        toast.success("Project Created Successfully");
        setOpenDialog(false);
        ()=>{reset()}
      },
      onError() {
        toast.error("Something went wrong while adding project");
      },
    });
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="projects_name" className="text-sm font-medium text-gray-300">Projects Name</label>
              <Input {...register("projects_name")} 
              // placeholder="Projects Name" 
              className="p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="projects_description" className="text-sm font-medium text-gray-300">Projects Description</label>
              <Input {...register("projects_description")} 
              // placeholder="Projects Description"
               className="p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="mentor_name" className="text-sm font-medium text-gray-300">Mentor Name</label>
              <Input {...register("mentor_name")} 
              // placeholder="Mentor Name"
               className="p-2 border border-gray-300 rounded-md" />
            </div>
            {fields.map((item, index) => (
              <div key={item.id} className="flex space-x-4">
                <Input {...register(`timelines[${index}].name`)} defaultValue={item.name} className="flex-1 p-2 border border-gray-300 rounded-md" />
                <Controller
                  control={control}
                  name={`timelines[${index}].date`}
                  render={({ field }) => (
                    <input type="date" {...field} placeholder="Select date" className="flex-1 p-2 border border-gray-300 rounded-md" />
                  )}
                />
                <Button type="button" onClick={() => remove(index)} className="p-2 bg-red-800 text-white rounded-md">
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => {
                  append({ name: "", date: "" });
                }}
              >
                Add Item
              </Button>
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={() => reset()}>
                Reset
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Button onClick={() => setOpenDialog(true)}>Add Project</Button>
    </>
  );
}
