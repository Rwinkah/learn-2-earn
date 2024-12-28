import ForgotForm from "./client";
export default function PasswordReset() {
	return (
		<div id="resetPage__left" className="flex flex-col w-[100%]">
			<div id="logo" className="flex mt-[21px] justify-center">
				<h6 className="text-center font-bold text-xl">
					<span className=" text-center font-bold text-xl text-[#820B8A]">
						onboard
					</span>
					Me
				</h6>
			</div>
			<div
				id="resetPage__form"
				className=" h-[461px] mt-[89px] w-[374px] self-center">
				<h1 className="text-[40px] font-bold mb-[8px]">Reset Password</h1>
				<h4 className="mb-[30px]">
					Enter your email address to recieve a link to reset your password
				</h4>
				<ForgotForm />
			</div>
		</div>
	);
}
