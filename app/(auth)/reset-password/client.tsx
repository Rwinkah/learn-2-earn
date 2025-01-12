"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import IconInput from "@/app/_components/icon-input";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ResetConfirmHandler } from "@/app/utils/auth";
import { ToastContainer } from "react-toastify";
import { flushSync } from "react-dom";

const strongPasswordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

const resetSchema = z
	.object({
		// Validate password field
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long") // Minimum length check
			.regex(
				strongPasswordRegex,
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
			),

		// Validate confirm password field
		confirmPassword: z.string(),
	})
	// Ensure that both passwords match
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"], // This points to the confirmPassword field for the error
	});
export default function Client() {
	const [disabled, setIsDisabled] = useState<boolean>(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const uid = searchParams.get("uid");
	const token = searchParams.get("token");

	const [isValid, setIsValid] = useState<boolean>(true);
	const form = useForm<z.infer<typeof resetSchema>>({
		resolver: zodResolver(resetSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: z.infer<typeof resetSchema>) {
		if (uid && token) {
			try {
				const response = await ResetConfirmHandler(
					uid,
					values.password,
					token,
					setIsDisabled,
					router.push
				); // Wait for the handler to finish
				// You can optionally handle success here if needed
			} catch (error) {
				// Handle any error that occurred during the reset process
				console.error("Password reset failed:", error);
			}
		}
	}

	useEffect(() => {
		// Check if uid and token are present
		if (!uid || !token) {
			setIsValid(false);
			// Optionally redirect the user
			setTimeout(() => {
				router.push("/"); // Redirect to the homepage or a relevant page
			}, 30000); // 3-second delay before redirecting
		}
	}, [uid, token, router]);

	return (
		<div>
			{isValid ? (
				<Form {...form}>
					<ToastContainer />
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="mb-10">
							<h1 className="font-bold text-[40px]">Reset your password</h1>
							<p className=" text-gray-500">
								Choose a new password for your onboardMe account. Take your
								time, pick something secure.
							</p>
						</div>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-medium">New password</FormLabel>
									<FormControl>
										<IconInput
											className="border-2 h-14 rounded-[8px]"
											placeholder="Enter your new password"
											{...field}
										/>
									</FormControl>
									{form.formState.errors.password && (
										<p className="text-red-500 text-sm">
											{form.formState.errors.password.message}
										</p>
									)}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="mt-8">
									<FormLabel className="font-medium">
										Confirm password
									</FormLabel>

									<FormControl>
										<IconInput
											className="border-2 h-14 rounded-[8px]"
											placeholder="Confirm your new password"
											{...field}
										/>
									</FormControl>
									{form.formState.errors.confirmPassword && (
										<p className="text-red-500 text-sm">
											{form.formState.errors.confirmPassword.message}
										</p>
									)}
								</FormItem>
							)}
						/>
						<Button
							disabled={disabled}
							className="mt-[30px]  rounded-3xl w-[100%] bg-primary text-white"
							type="submit">
							Submit
						</Button>
					</form>
				</Form>
			) : (
				<h1 className="text-[60px] font-bold text-center">
					Invalid reset link. Please try again{" "}
				</h1>
			)}
		</div>
	);
}
