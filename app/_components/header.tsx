"use client";
import Image from "next/image";
import RespContainer from "./resp_container";
import book from "@/assets/images/bookIcon.png";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Header() {
	return (
		<RespContainer
			hide={false}
			class_full="flex w-full p-[70px] pt-[30px] justify-between items-center"
			class_sm="flex mb-20 items-center pl-4">
			<div
				id="searchBox"
				className="p-3  rounded-3xl  lg:w-[507px] bg-[#130c16] flex items-center gap-4">
				<Search color="#666666" />
				<Input
					placeholder="What are you looking for?"
					className="text-[#A3A3A3] active:border-none active:outline-none border-none bg-transparent"
				/>
			</div>
			<Switch className=" border-[#130c16]" />
		</RespContainer>
	);
}
