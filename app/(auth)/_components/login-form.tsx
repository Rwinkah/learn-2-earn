"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/_context/auth-context";
import { useUser } from "@/app/_context/user-context";
import { User } from "lucide-react";
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
import { LoginSchema, loginSchema } from "@/app/types";
import { useState } from "react";
import { LoginHandler } from "@/app/utils/auth";
import IconPasswordInput from "@/app/_components/password-input";

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
								<IconPasswordInput
									LeftIcon={User}
									noPreview
									className="rounded-[8px] bg-transparent border-gray-500 border-[1px] h-14 outline-none"
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
								<IconPasswordInput
									className="rounded-[8px] bg-transparent border-gray-500 border-[1px] h-14 outline-none"
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
