"use client";
import Image from "next/image";
import RespContainer from "./resp_container";
import book from "@/assets/images/bookIcon.png";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Hamburger from "./hamburger";

export default function Header() {
	return (
		<RespContainer
			hide={false}
			class_full="flex w-full p-10 lg:p-[70px] lg:pt-[30px] justify-between items-center"
			class_sm="flex justify-between mb-10 lg:mb-20 items-center pl-4 w-full">
			<div
				id="searchBox"
				className="lg:p-3 p-[2px] pl- w-2/3  rounded-3xl  lg:w-[507px] bg-[#130c16] flex items-center lg:gap-4">
				<Search
					color="#666666"
					className="w-[22] lg:w-6 pl-2 lg:pl-0 lg:h-6 h-[22]"
				/>
				<Input
					placeholder="find related content"
					className="text-[#A3A3A3] text-xs lg:text-base active:border-none active:outline-none border-none bg-transparent"
				/>
			</div>
			<RespContainer
				class_full=""
				class_sm="flex justify-center items-center"
				hide={true}>
				<Switch className="  border-[#130c16]" />
			</RespContainer>
			<RespContainer hide={false} class_sm="mr-4">
				<Hamburger />
			</RespContainer>
		</RespContainer>
	);
}
