"use client"
import Image from "next/image"
import RespContainer from "./resp_container"
import book from "@/assets/images/bookIcon.png"

export default function Header() {
    return (
        <RespContainer hide={false} class_full="hidden" class_sm="flex mb-20 items-center">
            <Image src={book} alt="LOGO" width={24} height={24}/>
            <h1 className="pl-4 font-normal text-xl pt-2">OnboardMe</h1>
        </RespContainer>
    )
}