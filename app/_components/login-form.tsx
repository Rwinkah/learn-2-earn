"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "../_context/auth-context";
import { useUser } from "../_context/user-context";
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
import { ToastContainer } from "react-toastify";
import { LoginSchema, loginSchema } from "../types";
import { useState } from "react";
import { LoginHandler } from "../utils/auth";

export function LoginForm() {
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const { login } = useAuth();
	const { updateUser } = useUser();
	const { push } = useRouter();
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	return (
		<Form {...form}>
			<ToastContainer />
			<form
				onSubmit={form.handleSubmit((values) =>
					LoginHandler(values, setIsDisabled, login, updateUser, push)
				)}
				className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-sm">Username</FormLabel>
							<FormControl>
								<Input
									className="rounded-3xl bg-transparent border-gray-500 border-[1px] outline-none"
									placeholder="vitalikbut@gmail.com"
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
									className="rounded-3xl bg-transparent border-gray-500 border-[1px] outline-none"
									type="password"
									placeholder="************"
									{...field}
								/>
							</FormControl>
							<a
								className=" self-end text-primary font-medium text-sm"
								href="/login">
								Forgot password?
							</a>
							<h3 className="text-center pt-[40px]">
								Don&apos;t have an account?{" "}
								<Link
									className="text-primary font-medium underline"
									href="/signup">
									Sign up
								</Link>
							</h3>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={isDisabled}
					className="border w-[100%] rounded-3xl font-semibold text-sm h-[50px] text-white bg-primary border-none"
					type="submit">
					Login
				</Button>
			</form>
		</Form>
	);
}
