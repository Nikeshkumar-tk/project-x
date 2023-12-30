'use client'
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { projectSchema } from "@/lib/validations";
import { Button } from "../../../components/ui/button";

const DynamicInputForm = () => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "timelines",
  });

  const onSubmit = (data) => {
    fetch("http://localhost:3000/api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(data);
  };

  return (
    <div className=" my-4">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-3/4 ">
          <div className="flex flex-col space-y-2">
            <label htmlFor="projects_name" className="text-sm font-medium text-gray-200">Projects Name</label>
            <input {...register("projects_name")} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="projects_description" className="text-sm font-medium text-gray-200">Projects Description</label>
            <input {...register("projects_description")} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="mentor_name" className="text-sm font-medium text-gray-200">Mentor Name</label>
            <input {...register("mentor_name")} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          {fields.map((item, index) => (
            <div key={item.id} className="flex flex-col space-y-2">
              <label htmlFor={`timelines[${index}].name`} className="text-sm font-medium text-gray-200">Timeline Name</label>
              <input {...register(`timelines[${index}].name`)} defaultValue={item.name} className="w-full p-2 border border-gray-300 rounded" />
              <label htmlFor={`timelines[${index}].date`} className="text-sm font-medium text-gray-200">Timeline Date</label>
              <div className="flex items-center space-x-4">
                <Controller
                  control={control}
                  name={`timelines[${index}].date`}
                  render={({ field }) => (
                    <input type="date" {...field} className="p-2 border border-gray-300 rounded" />
                  )}
                />
                <Button type="button" onClick={() => remove(index)} className="p-2 bg-red-800 text-white rounded">
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" onClick={() => append({ name: "", date: "" })} className=" bg-blue-900 hover:bg-blue-700 text-white ">
            Add Timeline
          </Button>
          <div className="flex items-center space-x-4">
            <Button type="submit" className=" bg-green-800 hover:bg-green-700 text-white ">Submit</Button>
            <Button type="button" onClick={() => reset()} className=" hover:bg-red-900 bg-red-800 text-white ">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicInputForm;
