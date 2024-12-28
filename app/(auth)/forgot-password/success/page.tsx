import book from "@/assets/images/bookIcon.png";
import Image from "next/image";
import success from "@/assets/images/success.png";
import { Button } from "@/components/ui/button";
export default function ResetSuccess() {
	return (
		<div id="resetPage__left" className="flex flex-col">
			<div id="logo" className="flex mt-[21px] justify-center">
				<h6 className="text-center text-2xl font-bold ">
					<span className=" text-center font-bold text-xl text-[#820B8A]">
						Onboard
					</span>
					Me
				</h6>
			</div>
			<div
				id="resetPage__form"
				className="flex flex-col h-[461px] gap-5 w-full self-center mt-[15%]">
				{/* <Image className="self-center" src={success} alt="success" /> */}
				<h4 className="mb-[20px] text-2xl font-medium  text-center text-wrap self-center">
					Your password has been reset successfully
				</h4>
				<div className="flex justify-center items-center gap-4 ">
					<p className="font-bold">Redirecting, please wait....</p>
					<div className=" loader  justify-center" />
				</div>
			</div>
		</div>
	);
}
