import book from "@/assets/images/bookIcon.png";
import Image from "next/image";
import success from "@/assets/images/success.png";
import { Button } from "@/components/ui/button";
export default function ResetSuccess() {
  return (
    <div id="resetPage__left" className="flex flex-col">
      <div id="logo" className="flex mt-[21px]">
        <Image className="ml-[89px]" src={book} alt="logo" />
        <h6 className="font-light">
          <span className="font-medium text-[#820B8A]">Onboard</span>Me
        </h6>
      </div>
      <div
        id="resetPage__form"
        className="flex flex-col h-[461px] w-[374px] self-center mt-[15%]"
      >
        <Image className="self-center" src={success} alt="success" />
        <h4 className="mb-[20px] w-[12rem] text-center text-wrap self-center">
          Your password has been reset successfully
        </h4>
        <Button className="self-center border rounded-3xl bg-[#820b8A] text-white w-[13rem]">
          Login
        </Button>
      </div>
    </div>
  );
}
