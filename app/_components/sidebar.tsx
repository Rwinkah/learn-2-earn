"use client";
import { GearIcon, HomeIcon, BookmarkIcon } from "@radix-ui/react-icons";
import Cookies from "js-cookie";
import mainLogo from "@/assets/images/onboardMeLogo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import UseMediaQuery from "@/lib/use-media-query";
import OnboardMeHomeIcon from "@/assets/images/onboardMeHomeIcon";
import OnboardMeCalendarIcon from "@/assets/images/onboardMeCalendarIcon";
import OnboardMeMessageIcon from "@/assets/images/onboardMeMessageIcon";
import { useState } from "react";
import OnboardMeTracksIcon from "@/assets/images/onboardMeTracks";
import OnboardMeRewardIcon from "@/assets/images/onboardMeRewardIcon";
import Image from "next/image";

export default function Sidebar() {
	const pathname = usePathname();
	const isTabletAbove = UseMediaQuery("(min-width: 1025px)");

	const NavItems = [
		{
			title: "home",
			link: "/home",
		},
		{
			title: "profile",
			link: "/profile",
		},
		{
			title: "messages",
			link: "/messages",
		},
		{
			title: "create-lessons",
			link: "/create-lessons",
		},
	];

	const isActive = NavItems.some((item) =>
		pathname.includes(item.title.toLowerCase())
	);

	const NavBar = [
		{
			icon: HomeIcon,
			id: "home",
			link: "/home",
		},
		{
			icon: GearIcon,
			id: "profile",
			link: "/profile",
		},
	];

	return (
		<>
			{!isTabletAbove ? (
				<div className="shadow  h-fit fixed z-500 bottom-0 left-0 right-0 mt-[3rem]">
					<div className="bg-black w-full flex justify-around items-center h-[6rem]">
						<Link href={"/home"}>
							<div className="flex items-center justify-start p-2 cursor-pointer">
								<HomeIcon width={40} height={40} color="white" />
							</div>
						</Link>

						<Link href={"/profile"}>
							<div className="flex items-center justify-start p-2 cursor-pointer">
								<GearIcon width={40} height={40} color="white" />
							</div>
						</Link>
					</div>
				</div>
			) : (
				<div className=" text-[#8D8990] text-[18px] min-h-screen h-full bg-[#130C16] min-w-[270px] w-full border-r-[1px] border-r-[#66666666]">
					<div
						id="logo"
						className="flex  pt-6 pb-2 max-h-[85px] items-center justify-normal  border-b-[#66666666] p-10 ">
						{/* <Image className="" src={book} alt="logo" /> */}
						<h6 className="self-center mt-2 ml-[4px] font-semibold flex items-center gap-2">
							<Image src={mainLogo} alt="logo" />
							<span className="font-medium text-[#DCD0E6] ">OnboardMe</span>
						</h6>
					</div>

					<div className="p-4   flex flex-col gap-4"></div>
					<div className=" h-[80vh]  mt-[25px] flex flex-col justify-between">
						<div className="flex flex-col p-5 gap-6">
							<Link href={"/home"}>
								<Button
									// onClick={}
									variant={
										pathname.includes("home") ? "activeSidebar" : "ghostSidebar"
									}
									className={`w-full justify-normal  items-center flex gap-[12px] flex-wrap rounded-xl   `}>
									<OnboardMeHomeIcon
										pathFill={pathname.includes("home") ? "#C455FF" : "#8D8990"}
									/>
									Home
								</Button>
							</Link>
							<Link href="/create-lesson">
								<Button
									// onClick={() => handleNavClick("upcoming")}
									variant={
										pathname.includes("create-lesson")
											? "activeSidebar"
											: "ghostSidebar"
									}
									className={`w-full  flex gap-[12px] flex-wrap rounded-xl  items-center justify-normal   `}>
									<OnboardMeCalendarIcon
										pathFill={
											pathname.includes("create-lesson") ? "#C455FF" : "#8D8990"
										}
									/>
									Create Lessons
								</Button>
							</Link>
							<Link href="">
								<Button
									// onClick={() => handleNavClick("tracks")}
									variant={
										pathname.includes("tracks")
											? "activeSidebar"
											: "ghostSidebar"
									}
									className={`w-full  flex gap-[12px] flex-wrap rounded-xl  items-center justify-normal   `}>
									<OnboardMeTracksIcon
										pathFill={
											pathname.includes("tracks") ? "#C455FF" : "#8D8990"
										}
									/>
									Learning Tracks
								</Button>
							</Link>
							<Link href="">
								<Button
									// onClick={() => handleNavClick("rewards")}
									variant={
										pathname.includes("rewards")
											? "activeSidebar"
											: "ghostSidebar"
									}
									className={`w-full  flex gap-[12px] flex-wrap rounded-xl  items-center justify-normal   `}>
									<OnboardMeRewardIcon
										pathFill={
											pathname.includes("rewards") ? "#C455FF" : "#8D8990"
										}
									/>
									Reward System
								</Button>
							</Link>
							<Link href="">
								<Button
									// onClick={() => handleNavClick("message")}
									variant={
										pathname.includes("message")
											? "activeSidebar"
											: "ghostSidebar"
									}
									className={`w-full  flex gap-[12px] flex-wrap rounded-xl  items-center justify-normal   `}>
									<OnboardMeMessageIcon
										pathFill={
											pathname.includes("message") ? "#C455FF" : "#8D8990"
										}
									/>
									Messages
								</Button>
							</Link>
						</div>
						<div className="flex flex-col gap-4 ">
							<Link href={"/profile"}>
								<Button
									// onClick={() => handleNavClick("profile")}
									variant={
										pathname.includes("profile")
											? "activeSidebar"
											: "ghostSidebar"
									}
									className={`w-full  flex gap-[12px] flex-wrap rounded-xl  items-center justify-normal   `}>
									<GearIcon />
									Profile
								</Button>
							</Link>
							<Link className="bottom-4" href={"/login"}>
								<Button
									variant={"ghostSidebar"}
									onClick={() => {
										localStorage.removeItem("access_token");
										localStorage.removeItem("refresh_token");
										Cookies.remove("access_token");
										Cookies.remove("refresh_token");
									}}
									className=" text-[#CF413C] w-full flex gap-[12px] rounded-xl items-center justify-normal  bg-inherit ">
									<LogOut width="20" height="20" />
									Log out
								</Button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
