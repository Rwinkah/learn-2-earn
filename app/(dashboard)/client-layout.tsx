"use client";
import Image from "next/image";
import Footer from "../_components/footer";
import RespContainer from "../_components/resp_container";
import Sidebar from "../_components/sidebar";
import { BookIcon, BookXIcon, UserCircle } from "lucide-react";
import Header from "../_components/header";
import Link from "next/link";
import { GearIcon, HomeIcon } from "@radix-ui/react-icons";
import eth from "@/public/eth.jpeg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "../_context/user-context";
import { OnboardUser } from "../types";
export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	const user = useUser();

	return (
		<main
			className="lg:grid grid-cols-3 text-[#B2AFB4] gap-0 h-[100vh] bg-[#130C16] max-w-[1440px] overflow-hidden"
			style={{ gridTemplateColumns: "18% 64% 18%" }}>
			<RespContainer class_full="" hide={true} class_sm="bg-black">
				<Sidebar />
			</RespContainer>

			<RespContainer
				id="current-page"
				hide={false}
				class_full="flex flex-col min-w-full pb-10 justify-between min-h-full h-auto bg-[#08020A] border-l-[1px] border-[#66666666]"
				class_sm="  w-full pb-5 mb-20 bg-black">
				<div
					id="layout-wrapper"
					className=" flex flex-col justify-between ml-0 min-w-full">
					<div id="content-wrapper" className="mt-5  flex flex-col min-w-full ">
						<Header />
						{children}
					</div>
					<Footer />
				</div>
			</RespContainer>
			<RespContainer hide={true} class_sm="display-none">
				<div className=" h-[100vh] bg-[#130c16] text-white border-l border-[#66666666]  flex flex-col gap-8 items-center w-full">
					<div className=" w-full p-6 pb-6 flex flex-col gap-8">
						<div className=" w-fit ] flex gap-4 text-2xl font-semibold mb-10">
							<div className="rounded-full w-11 h-11 overflow-hidden flex">
								<Image
									src={eth}
									alt={"profile picture"}
									className="w-11 h-11"
								/>
							</div>
							<div>
								<p className="text-[#F5F5F5] font-medium text-base">
									{user.onboardUser?.username ?? "User not logged in"}
								</p>
								<h6 className="text-sm font-light text-[#A3A3A3]">
									{user.onboardUser?.email ?? "User not logged in"}
								</h6>
							</div>
						</div>
					</div>
					<div className=" p-6 flex flex-col gap-8 w-full">
						<h2 className="text-white text-2xl font-semibold ">Leaderboard</h2>
						<div className="w-full   h-[60vh] ] border-[#66666666] flex flex-col justify-center items-center">
							<h2 className="text-xl text-bold text-center">
								No information available
							</h2>
						</div>
					</div>
				</div>
			</RespContainer>
		</main>
	);
}
