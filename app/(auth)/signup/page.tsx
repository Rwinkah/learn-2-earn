import SignupForm from "./client";

export default function signupPage() {
	return (
		<div className="flex gap-[75px] flex-col items-center w-full">
			<h1 className="font-semibold text-3xl">
				Sign up for <span className="text-primary ">OnboardMe</span>{" "}
			</h1>
			<SignupForm />
		</div>
	);
}
