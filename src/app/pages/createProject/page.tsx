"use client"
import React from 'react';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { createProjectSchema } from '@/lib/validations';
const DynamicInputForm = () => {
  const { register, control, handleSubmit, reset } = useForm <z.infer<typeof createProjectSchema>>({
    defaultValues: {
    
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'timelines',
  });

  const onSubmit = (data:any) => {
  fetch("http://localhost:3000/api/project",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
  })
  console.log(data)
 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('projects_name')} placeholder="Projects Name" />
          <input {...register('projects_description')} placeholder="Projects Description" />
            <input {...register('mentor_name')} placeholder="Mentor Name" />
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

