"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/auth-context";
import { useUser } from "../_context/user-context";
import { LoginSchema, loginSchema } from "../types";
import { LoginHandler } from "../utils/auth";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import IconInput from "./icon-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { User } from "lucide-react";

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
								<IconInput
									nopreview={true}
									leftIcon={User}
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
								<IconInput
									className="rounded-3xl h-10 bg-transparent border-gray-500 border-[1px] outline-none"
									type="password"
									placeholder="************"
									{...field}
								/>
							</FormControl>
							<a
								className=" self-end text-primary font-medium text-sm"
								href="/forgot-password">
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
