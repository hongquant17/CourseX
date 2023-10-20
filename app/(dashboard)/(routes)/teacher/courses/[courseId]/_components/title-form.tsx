"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

export const TitleForm = ({
    initialData,
    courseId
}: TitleFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const {isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <div>
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
                Title Form
            </div>
        </div>
    )
}