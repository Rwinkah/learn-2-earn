"use client";

import { Button } from "@/components/ui/button";
import { UserIcon, WalletIcon } from "lucide-react";
import { Metadata } from "next";
import { useUser } from "@/app/_context/user-context";

export const metadata: Metadata = {
	title: "profile",
	openGraph: { title: "profile" },
	twitter: { title: "profile" },
};

export default function ProfileClient() {
	const user = useUser();
	return (
		<div className="w-full">
			<div className="p-8 flex flex-col gap-20 ">
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
					<div className="lg:flex-row flex flex-col justify-between gap-10 pt-7 pb-5">
						<div className="w-full flex flex-col gap-2 ">
							<p className="text-white text-xs font-semibold ">Display name</p>
							<p className="text-sm text-white border-[ border-[#66666666] flex p-2 border-[2px] rounded-lg ">
								{user.onboardUser?.username}
							</p>
						</div>
						<div className="  w-full flex flex-col gap-2">
							<p className="text-white text-xs font-semibold">Email Address</p>
							<p className="text-sm text-gray-400 border-[ border-[#66666666] flex p-2 border-[2px] rounded-lg ">
								{user.onboardUser?.email}
							</p>
						</div>
					</div>
					<div className="flex lg:flex-row flex-col justify-between gap-10 ">
						<div className="w-full flex   items-center gap-2">
							<p className="text-white text-xs font-semibold">OnboardXP</p>
							<p className="text-sm flex p-2  rounded-lg text-[#d01cd0] ">
								{user.onboardUser?.oxp}XP
							</p>
						</div>
						<div className="w-full pt-5 flex  items-center gap-2">
							<p className="text-white text-xs font-semibold">
								Completed quizzes
							</p>
							<p className="text-sm flex p-2  rounded-lg text-[#d01cd0] ">
								{user.onboardUser?.completed_quiz.length} courses completed
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

				<Button className="w-1/3 min-w-[150px] font-semibold">
					Edit profile
				</Button>
			</div>
		</div>
	);
}
