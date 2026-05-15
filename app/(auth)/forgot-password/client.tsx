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

import { useState } from "react";
import { ResetHandler } from "@/app/utils/auth";
import IconInput from "@/app/_components/icon-input";
import { Mail } from "lucide-react";
import { ToastContainer } from "react-toastify";

const forgetSchema = z.object({
	email: z.string().email(),
});

export default function ForgotForm() {
	const [currentState, setCurrentState] = useState<number>(0);
	async function onSubmit(values: z.infer<typeof forgetSchema>) {
		try {
			setCurrentState(1);
			console.log("onsubmit recieved", values);
			const response = await ResetHandler(values.email);
			if (response?.data.success) {
				setCurrentState(2);
			}
			if (!response?.data.success) {
				setCurrentState(0);
			}
		} catch (error) {
			console.error("An error has occured: ", error);
			setCurrentState(0);
		}
	}

	const form = useForm<z.infer<typeof forgetSchema>>({
		resolver: zodResolver(forgetSchema),
		defaultValues: {
			email: "",
		},
	});

	return (
		<Form {...form}>
			<ToastContainer />
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<IconInput
									noPreview
									LeftIcon={Mail}
									className="border-2 h-14 rounded-[8px]"
									placeholder="email@example.com"
									type="email"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<div>
					{currentState === 0 ? (
						<Button className="border-0 mt-5 w-[100%] rounded-3xl bg-[#820B8A] text-white">
							Submit
						</Button>
					) : currentState === 1 ? (
						<div className="flex justify-center">
							<div className="loader" />
						</div>
					) : (
						<div className="text-center mt-5 text-gray-500">
							<p>
								A reset link has been successfully sent to your email. If you
								dont see it, please check your spam folder.
							</p>
						</div>
					)}
				</div>
			</form>
		</Form>
	);
}
