"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string(),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm">
                Uniben email address
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-3xl"
                  placeholder="student-lastname@eng.uniben.edu"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm"> Password</FormLabel>
              <FormControl>
                <Input
                  className="rounded-3xl"
                  type="password"
                  placeholder="************"
                  {...field}
                />
              </FormControl>
              <a
                className=" self-end text-primary font-medium text-sm"
                href="/reset-password"
              >
                Forgot password?
              </a>
              <h3 className="text-center">
                Don&apos;t have an account?{" "}
                <Link
                  className="text-primary font-medium underline"
                  href="/signup"
                >
                  Sign up
                </Link>
              </h3>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="border w-[100%] rounded-3xl text-white bg-primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
