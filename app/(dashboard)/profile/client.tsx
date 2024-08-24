import { Button } from "@/components/ui/button";
import { UserIcon, WalletIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Settings",
	openGraph: { title: "Settings" },
	twitter: { title: "Settings" },
};

export default function ProfileClient() {
	return (
		<div className="p-8 flex flex-col gap-20 h-[80vh] overflow-y-scroll">
			<h1 className="font-bold text-2xl text-white">User profile</h1>
			<div className="bg-white border-[2px] border-[#d01cd0] rounded-full w-fit h-fit p-4 flex items-center justify-center">
				<UserIcon width={"100px"} height={"100px"} />
			</div>

			<div className="gap-6 shadow-inner  border-[#66666666]	 border-[2px]  p-6 rounded-lg ">
				<div className="flex items-center gap-4 text-white">
					<div className="border-[2px] rounded-full border-[#d01cd0] p-2">
						<UserIcon color="#d01cd0" />
					</div>
					Basic details
				</div>
				<div className="flex justify-between gap-10 pt-5">
					<div className="w-full flex flex-col gap-2">
						<p className="text-white text-xs font-semibold">Display name</p>
						<p className="text-sm text-gray-400 border-[ border-[#66666666] flex p-2 border-[2px] rounded-lg ">
							My display name
						</p>
					</div>
					<div pt-5 className="w-full flex flex-col gap-2">
						<p className="text-white text-xs font-semibold">Email Address</p>
						<p className="text-sm text-gray-400 border-[ border-[#66666666] flex p-2 border-[2px] rounded-lg ">
							Email Address
						</p>
					</div>
				</div>
				<div className="flex justify-between gap-10 pt-5">
					<div className="w-full flex  items-center gap-2">
						<p className="text-white text-xs font-semibold">OnboardXP</p>
						<p className="text-sm flex p-2  rounded-lg text-[#d01cd0] ">0XP</p>
					</div>
					<div pt-5 className="w-full flex  items-center gap-2">
						<p className="text-white text-xs font-semibold">
							Completed quizzes
						</p>
						<p className="text-sm flex p-2  rounded-lg text-[#d01cd0] ">
							0 completed
						</p>
					</div>
				</div>
			</div>
			<div className="gap-6 shadow-inner  border-[#66666666]	 border-[2px]  p-6 rounded-lg ">
				<div className="flex items-center gap-4 text-white">
					<div className="border-[2px] rounded-full border-[#d01cd0] p-2">
						<WalletIcon color="#d01cd0" />
					</div>
					Wallet details
				</div>
				<div className="flex justify-between gap-10 pt-5">
					<div className="w-full flex flex-col gap-2">
						<p className="text-white text-xs font-semibold">Wallet address</p>
						<p className="text-sm text-gray-400 border-[ border-[#66666666] flex p-2 border-[2px] rounded-lg ">
							0x4pli....Lpjkh
						</p>
					</div>
				</div>
			</div>
			<div className="gap-6 shadow-inner  border-[#66666666]	 border-[2px]  p-6 rounded-lg ">
				<div className="flex items-center gap-4 text-white">
					<div className="border-[2px] rounded-full border-[#d01cd0] p-2">
						<UserIcon color="#d01cd0" />
					</div>
					Basic details
				</div>
				<div className="flex justify-between gap-10 pt-5">
					<div className="w-full flex flex-col gap-2">
						<p className="text-white text-xs font-semibold">Display name</p>
						<p className="text-sm text-gray-400 border-[ border-[#66666666] flex p-2 border-[2px] rounded-lg ">
							My display name
						</p>
					</div>
					<div pt-5 className="w-full flex flex-col gap-2">
						<p className="text-white text-xs font-semibold">Email Address</p>
						<p className="text-sm text-gray-400 border-[ border-[#66666666] flex p-2 border-[2px] rounded-lg ">
							Email Address
						</p>
					</div>
				</div>
			</div>

			<Button className="w-1/3 font-semibold">Edit profile</Button>
		</div>
	);
}
