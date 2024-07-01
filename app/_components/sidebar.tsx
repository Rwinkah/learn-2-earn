"use client";
import Image from "next/image";
import { GearIcon, HomeIcon, BookmarkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import book from "@/assets/images/bookIcon.png";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { SelectScrollable } from "./select-scroll";
import UseMediaQuery from "@/lib/use-media-query";



export default function Sidebar() {
  const pathname = usePathname();
  const isHomeActive = pathname.includes("/home");
  const isSettingsActive = pathname.includes("/settings");
  const isTabletAbove = UseMediaQuery("(min-width: 1025px)");

  const NavBar = [
    {
      icon: HomeIcon,
      id: 'home',
      link: '/home'
    },
    {
      icon: GearIcon,
      id: 'settings',
      link: '/settings'
    }
  ]
 

  return (

    <>
      {!isTabletAbove ? (
        <div className="shadow  h-fit fixed z-500 bottom-0 left-0 right-0 mt-[3rem]">
          <div className="bg-[#FFF] w-full flex justify-around items-center h-[6rem]">
            <Link href={"/home"}>
             <div className="flex items-center justify-start p-2 cursor-pointer">
             <HomeIcon width={40} height={40}/> 
            </div>
            </Link>

            <Link href={"/settings"}>
              <div className="flex items-center justify-start p-2 cursor-pointer">
              <GearIcon width={40} height={40}/> 
            </div>
            </Link>


            </div>
        </div>
      ):
    <div className=" min-h-screen h-full bg-black w-full border-r-[1px] border-r-gray-500">
      <div id="logo" className="flex p-5 pt-6 items-center justify-center  text-2xl">
        {/* <Image className="" src={book} alt="logo" /> */}
        <h6 className="self-center mt-2 ml-[4px] font-semibold text-white">
          <span className="font-medium text-primaryLight ">Onboard</span>
          Me
        </h6>
      </div>

      <div className='p-4  text-white flex flex-col gap-4'>

      </div>
      <div className="p-5 h-[80vh]  mt-[25px] flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <Link href={"/home"}>
            <Button
              variant={isHomeActive ? "default" : "ghost"}
              className={`w-full justify-center items-center flex gap-[12px] flex-wrap rounded-xl   text-white text-xl`}
            >
              <HomeIcon />
              Home
            </Button>
          </Link>
          <Link href="">
          <Button
              variant="ghost"
              className={`w-full  flex gap-[12px] flex-wrap rounded-xl  items-center justify-center text-xl text-white `}
            >
              <GearIcon />
              Upcoming Lessons
            </Button></Link>
            <Link href="">
          <Button
              variant="ghost"
              className={`w-full  flex gap-[12px] flex-wrap rounded-xl  items-center justify-center text-xl text-white `}
            >
              <GearIcon />
               Learning Tracks
            </Button></Link>
            <Link href="">
          <Button
              variant="ghost"
              className={`w-full  flex gap-[12px] flex-wrap rounded-xl  items-center justify-center text-xl text-white `}
            >
              <GearIcon />
                Reward System
            </Button></Link>
            <Link href="">
          <Button
              variant="ghost"
              className={`w-full  flex gap-[12px] flex-wrap rounded-xl  items-center justify-center text-xl text-white `}
            >
              <GearIcon />
                Search
            </Button></Link>
          <Link href={"/settings"}>
            <Button
              variant={isSettingsActive ? "default" : "ghost"}
              className={`w-full  flex gap-[12px] flex-wrap rounded-xl  items-center justify-center text-xl text-white `}
            >
              <GearIcon />
              Settings
            </Button>

          </Link>

        </div>
        <Link className="bottom-4" href={"/login"}>
          <Button className="  w-full flex gap-[12px] rounded-xl items-center justify-center text-xl bg-inherit text-white">
            <LogOut width="20" height="20" />
            Log out
          </Button>
        </Link>
      </div>
    </div>}
    </>
    

  );
}
