import SignupForm from "./client";

export default function signupPage() {
	return (
		<div
			className="flex gap-10 lg:gap-[32px] h-full flex-col border-box p-10 lg:p-0 
		-center w-full">
			<h1 className="font-semibold text-xl lg:text-3xl text-center">
				Sign up for <span className="text-primary ">onboardMe</span>{" "}
			</h1>
			<SignupForm />
		</div>
	);
}
