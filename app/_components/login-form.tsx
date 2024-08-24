"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "../_context/auth-context";
import { useUser } from "../_context/user-context";
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
import { OnboardUser } from "../types";

const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
});
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function LoginForm() {
	const auth = useAuth();
	const user = useUser();
	const router = useRouter();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		try {
			const response = await axios.post(`${apiUrl}/login-user/`, { values });

			// Set authentication tokens
			localStorage.setItem("access_token", response.data.access);
			localStorage.setItem("refresh_token", response.data.refresh);
			Cookies.set("access_token", response.data.access);
			Cookies.set("refresh_token", response.data.refresh);

			// Display success messages
			toast.success("logged in succesfully");
			console.log(`${values.username} logged in successfully`);

			// Update authentication state
			auth.login();

			//update user state
			const loggedUser: OnboardUser = {
				username: response.data.username,
				email: response.data.email,
				oxp: response.data.oxp,
			};
			user.updateUser(loggedUser);
			setTimeout(() => {
				router.push("/home"); // Replace with your desired path
			}, 2000);
		} catch (error) {
			toast.error("login attempt failed, try again");
			console.error("Login attempt failed, an error occurred", error);
		}
		// console.log(values);
		// console.log("and then we have");
		// console.log({ ...values });
	}

	return (
		<Form {...form}>
			<ToastContainer />
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
								href="/forgot">
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
					className="border w-[100%] rounded-3xl font-semibold text-sm h-[50px] text-white bg-primary border-none"
					type="submit">
					Login
				</Button>
			</form>
		</Form>
	);
}
