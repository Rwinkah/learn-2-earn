import Image from "next/image";
import Footer from "../_components/footer";
import RespContainer from "../_components/resp_container";
import Sidebar from "../_components/sidebar";
import { BookIcon, BookXIcon, UserCircle } from "lucide-react";
import Header from "../_components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-3 gap-0 h-[100vh] w-[100vw] overflow-hidden" style={{ gridTemplateColumns: '25% 50% 25%' }}>
      <RespContainer class_full="  top-0 bottom-0" hide={false} >
        <Sidebar />
      </RespContainer>
 
      <RespContainer id="current-page" hide={false} class_full="flex flex-col min-w-full justify-between h-[100%] bg-black " class_sm="w-full pb-5 mb-20">
        <div
          id="layout-wrapper"
          className=" flex flex-col justify-between ml-0 min-w-full"
        >
          <div id="content-wrapper" className="mt-5 flex flex-col min-w-full ">
              <Header/>
            {children}
          </div>
          <Footer/>
        </div>
      </RespContainer>
      <RespContainer hide={true}>
        <div className=" h-[100vh] bg-black text-white border-l border-gray-500  flex flex-col gap-8 items-center w-full">
          <div className="border-b-[1px] border-gray-500 w-full p-6 flex flex-col gap-8">
            <h1 className='text-white text-2xl font-semibold mb-10'>Welcome <span className='text-primaryLight'>UcantCME</span></h1>  
            <span className='flex gap-2 items-center bg-[#070707] p-2 border-[1px] border-gray-500 h-20'>      
              <img src='/eth.jpeg' className='h-14 w-14 rounded-full border-2'/>
              <div >
                <h6 className="text-[18px] font-bold">UcantCME</h6>
                <h6 className="text-sm font-light text-primaryLight">0x12uj98pob5902329pl2</h6>
              </div>
            </span>
          </div>
          <div className='flex flex-col gap-8 w-full'>
            <h2 className='text-white text-2xl font-semibold self-center'>Leaderboard</h2>
            <div className="w-[90%] border-[1px] self-center h-[60vh] bg-[#070707] border-gray-500 flex flex-col justify-center items-center">
              <h2 className='text-3xl text-bold'>No information available</h2>
            </div>

          </div>
        </div>


      </RespContainer>
    </main>
  );
}
