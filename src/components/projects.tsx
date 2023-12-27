"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

    const form = useForm<ProjectSchema>({
        resolver: zodResolver(projectSchema.omit({ timelines: true })),
    })

    const onSubmit = (formData: ProjectSchema) => {
        createProjectMutation.mutate(formData, {
            onSuccess() {
                toast.success("Project Created Successfully")
                form.reset()
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="projects_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="projects_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mentor_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Mentor</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mentor" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
        <Button  onClick={() => setOpenDialog(true)}>Add Project</Button>
        </>
    )
}
