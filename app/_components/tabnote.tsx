"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import RespContainer from "./resp_container";
import Image from "next/image";
import sadFace from '@/assets/images/sad_face.svg'
import UseMediaQuery from "@/lib/use-media-query";

export default function TabNote() {
  const isTabletAbove = UseMediaQuery("(min-width: 1025px)");
  return (
    <div>
      {/* <div className="flex">
        <RespContainer hide={true} class_full="mt-5">
          <Label className="font-medium text-[#807E7E] text-xl pt-2 mr-14">
            Upload all your personal notes here
          </Label>
        </RespContainer>

        <Button className="border rounded-3xl mt-3 text-white bg-primary">
          Upload new note
        </Button>
        <Button className="border rounded-3xl ml-8 mt-3 text-white bg-primary">
          Type new note
        </Button>
      </div> */}
      <RespContainer hide={false} class_full='flex text-6xl gap-3 mt-[30vh]' class_sm=" flex flex-col text-3xl gap-10 items-center">
        <h1 className={`${isTabletAbove ? '': 'w text-center mt-[25vh]'} `}>Sorry, this feature is currently unavialable </h1>

         <Image src={sadFace} alt="sadface" width={isTabletAbove ? 80: 100} height={isTabletAbove ? 80: 100}/>

      </RespContainer>
    </div>
  );
}
