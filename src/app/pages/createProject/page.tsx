'use client'
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { projectSchema } from "@/lib/validations";

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
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-3/4">
        <input {...register("projects_name")} placeholder="Projects Name" className="w-full p-2 border border-gray-300 rounded" />
        <input {...register("projects_description")} placeholder="Projects Description" className="w-full p-2 border border-gray-300 rounded" />
        <input {...register("mentor_name")} placeholder="Mentor Name" className="w-full p-2 border border-gray-300 rounded" />
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-4">
            <input {...register(`timelines[${index}].name`)} defaultValue={item.name} className="flex-grow p-2 border border-gray-300 rounded" />
            <Controller
              control={control}
              name={`timelines[${index}].date`}
              render={({ field }) => (
                <input type="date" {...field} className="p-2 border border-gray-300 rounded" />
              )}
            />
            <button type="button" onClick={() => remove(index)} className="p-2 bg-red-500 text-white rounded">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ name: "", date: "" })} className="p-2 bg-blue-500 text-white rounded">
          Add Item
        </button>
        <div className="flex items-center space-x-4">
          <button type="submit" className="flex-grow p-2 bg-green-500 text-white rounded">Submit</button>
          <button type="button" onClick={() => reset()} className="p-2 bg-yellow-500 text-white rounded">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default DynamicInputForm;
