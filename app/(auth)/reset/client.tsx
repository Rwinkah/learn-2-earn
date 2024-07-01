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
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const resetSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

function onSubmit(values: z.infer<typeof resetSchema>) {
  console.log(values);
}

export default function ResetForm() {
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  className="rounded-3xl"
                  placeholder="**********"
                  type="password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  className="rounded-3xl"
                  type="password"
                  placeholder="**********"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className=" border w-[100%] rounded-3xl bg-[#820B8A] text-white">
          Submit
        </Button>
      </form>
    </Form>
  );
}
