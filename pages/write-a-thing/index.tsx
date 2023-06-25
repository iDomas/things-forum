import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthState } from "@/lib/enum/AuthState";
import { useUserContext } from "@/lib/userContext";
import { ControllerFieldState, ControllerRenderProps, FieldValues, useForm, UseFormStateReturn } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactElement, JSXElementConstructor } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { insertNewPost } from "@/lib/database";
import { Post } from "@/lib/model/db/Post";
import { toast } from "@/components/ui/use-toast";

const WriteAThingPage = ({ }) => {
    const userContext = useUserContext();

    return userContext.authState === AuthState.LOGGED_IN ? <UserLoggedInComponent /> : <UserNotLoggedInComponent />
}

const UserLoggedInComponent = ({ }) => {
    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h2 className="text-3xl font-bold tracking-tight">Write a Thing</h2>
            <span className="border-b-2 border-slate-200 my-4"></span>
            <FormComponent />
        </main>
    )
}

const UserNotLoggedInComponent = ({ }) => {
    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h2 className="text-3xl font-bold tracking-tight">You must be logged in!</h2>
            <p>Only logged in users can write a thing.</p>
        </main>
    )
}

const FormSchema = z.object({
    title: z.string({
            required_error: "Title is required."
        }).min(10, { 
            message: 'Text must be at least 10 characters long'
        }).max(100, {
            message: 'Text must be at most 100 characters long'
        }).trim(),
    content: z.string({
            required_error: "Content is required."
        }).min(50, {
            message: 'Text must be at least 50 characters long'
        }).max(1000, {
            message: 'Text must be at most 1000 characters long'
        }).trim()
});

const FormComponent = ({ }) => {
    const userContext = useUserContext();

    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            title: '',
            content: ''
        },
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        const post: Post = {
            title: data.title,
            content: data.content,
            topics: []
        }
        insertNewPost({ post, userContext })
            .then(() => {
                form.reset();
                toast({
                    title: "Success!",
                    description: "Your post has been submitted.",
                })
            })
            .catch((error) => {
                toast({
                    title: "Error!",
                    description: "Your post could not be submitted.",
                })
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField 
                    control={form.control}
                    name={"content"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Content" 
                                    className="h-24 min-h-fit max-h-80"
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <Button type="submit" className="mt-4">Submit</Button>
            </form>
        </Form>
    )
}

export default WriteAThingPage;