"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import IconInput from "@/app/_components/icon-input";
import axios from "axios";

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
import { toast, ToastContainer } from "react-toastify";
import { SignupSchema, signUpSchema } from "@/app/types";
import { SignupHandler } from "@/app/utils/auth";
import { Mail, User } from "lucide-react";
// import 'react-toastify/dist/ReactToastify.css';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SignupForm() {
	const { push } = useRouter();
	const form = useForm<SignupSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			displayName: "",
			email: "",
			password: "",
			passwordConfirm: "",
		},
	});

	return (
		<Form {...form}>
			<ToastContainer />
			<form
				onSubmit={form.handleSubmit((values) => SignupHandler(values, push))}
				className="space-y-8 w-full h-full">
				<FormField
					control={form.control}
					name="displayName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-sm">Username</FormLabel>
							<FormControl>
								<IconInput
									nopreview
									leftIcon={User}
									className="rounded-[8px] h-14 bg-transparent border-gray-500 border-[1px] outline-none"
									placeholder="vitalik"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-sm">Email</FormLabel>
							<FormControl>
								<IconInput
									nopreview
									type="email"
									leftIcon={Mail}
									className="rounded-[8px] h-14 bg-transparent border-gray-500 border-[1px] outline-none"
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
							<FormLabel className="font-medium text-sm">Password</FormLabel>
							<FormControl>
								<IconInput
									className="rounded-[8px] h-14 bg-transparent border-gray-500 border-[1px] outline-none"
									placeholder="************"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="passwordConfirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-sm">
								Confirm Password
							</FormLabel>
							<FormControl>
								<IconInput
									className="rounded-[8px] h-14 bg-transparent border-gray-500 border-[1px] outline-none"
									placeholder="************"
									{...field}
								/>
							</FormControl>

							<h3 className="text-center pt-[40px]">
								Have an account?{" "}
								<Link
									className="text-primary font-medium underline"
									href="/login">
									Login
								</Link>
							</h3>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className="border w-[100%] rounded-3xl font-semibold text-sm h-[50px] text-white bg-primary border-none"
					type="submit">
					Create Account
				</Button>
			</form>
		</Form>
	);
}
