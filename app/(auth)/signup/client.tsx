"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const signUpSchema = z.object({
	displayName: z.string(),
	email: z.string().email("invalid email"),
	password: z.string(),
	passwordConfirm: z.string(),
});

export default function SignupForm() {
	const { push } = useRouter();
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			displayName: "",
			email: "",
			password: "",
			passwordConfirm: "",
		},
	});

	async function onSubmit(values: z.infer<typeof signUpSchema>) {
		if (values.password !== values.passwordConfirm) {
			toast.error("Passwords do not match!");
			return;
		}

		// fetch("http://localhost:8000/create-user", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		displayName: values.displayName,
		// 		email: values.email,
		// 		password: values.password,
		// 	}),
		// })
		// 	.then((response) => {
		// 		if (!response.ok) {
		// 			throw new Error("Network response was not ok");
		// 		}
		// 		return response.json();
		// 	})
		// 	.then((data) => {
		// 		toast.success("Account created successfully!");
		// 		// Handle successful account creation (e.g., redirect to login page)
		// 	})
		// 	.catch((error) => {
		// 		toast.error(`Error: ${error.message}`);
		// 	});

		const response = await axios.post(`${apiUrl}/create-user`, { values });
		if (response.status === 201) {
			toast.success("User created successfully, now redirecting to login page");
		} else {
			toast.error("User could not be created, an error has occured");
		}
		setTimeout(() => {
			push("/login"); // Replace with your desired path
		}, 2000);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-full h-full">
				<FormField
					control={form.control}
					name="displayName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-sm">Display</FormLabel>
							<FormControl>
								<Input
									className="rounded-3xl bg-transparent border-gray-500 border-[1px] outline-none"
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
							<FormLabel className="font-medium text-sm">Password</FormLabel>
							<FormControl>
								<Input
									className="rounded-3xl bg-transparent border-gray-500 border-[1px] outline-none"
									type="password"
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
								<Input
									className="rounded-3xl bg-transparent border-gray-500 border-[1px] outline-none"
									type="password"
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
