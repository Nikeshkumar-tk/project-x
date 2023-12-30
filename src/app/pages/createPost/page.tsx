"use client"

import React, { useState } from 'react';

const PostForm: React.FC = () => {
    const [postName, setPostName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<FileList | null>(null);
    const [type, setType] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ postName, description, image, type });
    };

    return (

        <div className="">
            <div className="text-center font-bold text-xl mt-6">Create Post</div>

            <div className=" flex justify-center">
                <form onSubmit={handleSubmit} className="space-y-6 shadow-md rounded-md p-8 w-3/4" >
                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-lg text-gray-100">Post Name</label>
                        <input type="text" value={postName} onChange={(e) => setPostName(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-lg text-gray-100">Description</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-lg text-gray-100">Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files)} className="px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-lg text-gray-100">Type</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md">
                            <option value="error">Error</option>
                            <option value="doubt">Doubt</option>
                            <option value="news">News</option>
                        </select>
                    </div>

                    <button type="submit" className="px-4 py-2 text-white bg-blue-800 rounded-md hover:bg-blue-700">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default PostForm;



// optional version but have issues in form

// import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import {
//   Form,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
//   FormMessage,
//   FormField,
// } from "@/components/ui/form";

// type Inputs = {
//   postName: string;
//   description: string;
//   image: FileList;
//   type: 'error' | 'doubt' | 'news';
// };

// const PostForm: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
//   const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <FormItem>
//         <FormLabel>Post Name</FormLabel>
//         <FormControl {...register('postName', { required: true })} className="block w-full p-2 border border-gray-300 rounded-md" />
//         {errors.postName && <FormMessage>This field is required</FormMessage>}
//       </FormItem>

//       <FormItem>
//         <FormLabel>Description</FormLabel>
//         <FormControl {...register('description', { required: true })} className="block w-full p-2 border border-gray-300 rounded-md" />
//         {errors.description && <FormMessage>This field is required</FormMessage>}
//       </FormItem>

//       <FormItem>
//         <FormLabel>Image</FormLabel>
//         <FormControl {...register('image', { required: true })} type="file" className="block w-full p-2 border border-gray-300 rounded-md" />
//         {errors.image && <FormMessage>This field is required</FormMessage>}
//       </FormItem>

//       <FormItem>
//         <FormLabel>Type</FormLabel>
//         <FormControl {...register('type', { required: true })} as="select" className="block w-full p-2 border border-gray-300 rounded-md">
//           <option value="error">Error</option>
//           <option value="doubt">Doubt</option>
//           <option value="news">News</option>
//         </FormControl>
//         {errors.type && <FormMessage>This field is required</FormMessage>}
//       </FormItem>

//       <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Submit</button>
//     </Form>
//   );
// }

// export default PostForm;

