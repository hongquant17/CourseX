"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="md:items-center md:justify-center h-full p-6">
      <Link
        href={`/teacher/courses`}
        className="w-fit flex items-center text-sm hover:opacity-75
                          transition"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to course management
      </Link>
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 pb-20">
      <div>
        <h1 className="text-2xl">Đặt tên cho khóa học</h1>
        <p className="text-sm text-slate-600">
          Hãy đặt cho khóa học của bạn một cái tên. Bạn có thể chỉnh sửa sau.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên khóa học</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Ví dụ: 'Phát triển ứng dụng Web'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Một tiêu đề thu hút, ngắn gọn sẽ gây ấn tượng đầu tiên tốt
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/courses">
                <Button type="button" variant="ghost">
                  Hủy bỏ
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Tiếp tục
              </Button>
            </div>
          </form>
        </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
