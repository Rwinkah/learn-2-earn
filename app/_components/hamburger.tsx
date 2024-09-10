"use client";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import eth from "@/public/eth.jpeg";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SidebarCloseIcon, X } from "lucide-react";

import OnboardMeCalendarIcon from "@/assets/images/onboardMeCalendarIcon";
import OnboardMeHomeIcon from "@/assets/images/onboardMeHomeIcon";
import OnboardMeRewardIcon from "@/assets/images/onboardMeRewardIcon";
import OnboardMeTracksIcon from "@/assets/images/onboardMeTracks";
import { LogOut } from "lucide-react";
import GearIcon from "@radix-ui/react-icons";
import OnboardMeMessageIcon from "@/assets/images/onboardMeMessageIcon";
import { useUser } from "../_context/user-context";
import { useAuth } from "../_context/auth-context";
export default function Hamburger() {
	const [open, setOpen] = useState(false);
	const { onboardUser, updateUser } = useUser();
	const { logout } = useAuth();
	const handleLinkClick = () => {
		setOpen(false);
	};

	const logoutFunc = () => {
		logout();
		updateUser(null);
		handleLinkClick();
	};
	return (
		<div className="3/2xl:hidden">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button className="" variant={"link"} onClick={() => setOpen(!open)}>
						{!open && (
							<HamburgerMenuIcon color={"#e545ed"} width={32} height={32} />
						)}
						{open && <X color={"#e545ed"} size={32} />}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="mt-4 p-0 border-0 w-[100vw] z-9999 h-[100vh] md:h-[40vh] flex justify-items-start  rounded-none md:border-[0.5px] bg-[#111115] border-t-[0.5px] border-solid border-gray-500">
					<div className="bg-[#111115]  flex flex-col p-5 ">
						<Link href={"/profile"} onClick={handleLinkClick}>
							<div className=" w-fit ] flex gap-4 text-2xl font-semibold mt-10">
								<div className="rounded-full w-11 h-11 overflow-hidden flex">
									<Image
										src={eth}
										alt={"profile picture"}
										className="w-11 h-11"
									/>
								</div>
								<div>
									<p className="text-[#F5F5F5] font-medium text-base">
										{onboardUser?.username ?? "User not logged in"}
									</p>
									<h6 className="text-sm font-light text-[#A3A3A3]">
										{onboardUser?.email ?? "User not logged in"}
									</h6>
								</div>
							</div>
						</Link>

						<ul className="gap-8 pt-10 font-bold flex text-white flex-col text-lg">
							<Link
								key="home"
								onClick={handleLinkClick}
								href={"/home"}
								className=" w-full items-center  flex gap-2">
								<OnboardMeHomeIcon />
								Home
							</Link>
							<Link
								key="create-lesson"
								className=" w-full items-center  flex gap-2"
								onClick={handleLinkClick}
								href={"/create-lesson"}>
								<OnboardMeCalendarIcon size={24} />
								Create lesson
							</Link>
							<Link
								key="tracks"
								className=" w-full items-center  flex gap-2"
								onClick={handleLinkClick}
								href={"/"}>
								<OnboardMeTracksIcon size={24} />
								Learning Tracks
							</Link>
							<Link
								key="reward"
								className=" w-full items-center  flex gap-2"
								onClick={handleLinkClick}
								href={"/"}>
								<OnboardMeRewardIcon size={24} />
								Reward System
							</Link>
							<Link
								key="messages"
								className=" w-full items-center  flex gap-2"
								onClick={handleLinkClick}
								href={""}>
								<OnboardMeMessageIcon size={24} />
								Messages
							</Link>
							<Link
								key={"logout"}
								className=" w-full items-center font-bold flex text-white   text-lg  gap-2"
								onClick={logoutFunc}
								href={"/login"}>
								<LogOut color="red" size={22} />
								Log out
							</Link>
						</ul>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
