"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ForgotClient() {
	const [sent, setSent] = useState(false);
	return (
		<>
			<h1 className="font-bold text-[40px] mb-[0.5rem]">Reset Password</h1>
			{!sent && (
				<h3 className="font-normal text-[16px] mb-[56px]">
					Enter your email address and a password reset link would be sent to
					you.
				</h3>
			)}
			{sent && (
				<h3 className="font-normal text-[16px] mb-[56px]">
					A password reset link has been sent.
				</h3>
			)}
			<Label className="font-medium text-[14px]"> email address</Label>
			<Input
				className="mt-[10px] rounded-3xl"
				defaultValue="student.lastname@eng.uniben.edu"
			/>
			{sent && (
				<h3 className="font-medium text-[14px] mt-[0.5rem]">
					Didnt get a link?{" "}
					<a className="text-primary" href="">
						Send link again
					</a>
					.
				</h3>
			)}
			<Button
				className="mt-[30px] border rounded-3xl w-[100%] bg-primary text-white"
				onClick={() => setSent(true)}>
				{!sent && <h6>Send link</h6>}
				{sent && <h6>Finish</h6>}
			</Button>
		</>
	);
}
