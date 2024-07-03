"use client"
import Image from "next/image"
import RespContainer from "./resp_container"
import book from "@/assets/images/bookIcon.png"

export default function Header() {
    return (
        <RespContainer hide={false} class_full="hidden" class_sm="flex mb-20 items-center pl-4">
            <h1 className="pl-4 font-normal text-white text-2xl pt-2"><span className="text-primary  font-extrabold">Onboard</span>Me</h1>
        </RespContainer>
    )
}