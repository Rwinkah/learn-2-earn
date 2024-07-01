import book from "@/assets/images/bookIcon.png";
import Image from "next/image";
import ResetForm from "./client";
export default function PasswordReset() {
  return (
    <div id="resetPage__left" className="flex flex-col w-[100%]">
      <div id="logo" className="flex mt-[21px]">
        <Image className="ml-[89px]" src={book} alt="logo" />
        <h6 className="font-light">
          <span className="font-medium text-[#820B8A]">Onboard</span>Me 
        </h6>
      </div>
      <div
        id="resetPage__form"
        className=" h-[461px] mt-[89px] w-[374px] self-center"
      >
        <h1 className="text-[40px] font-bold mb-[8px]">Reset Password</h1>
        <h4 className="mb-[56px]">
          osato.omorodion@eng.uniben.edu type in your new password for reset
        </h4>
        <ResetForm />
      </div>
    </div>
  );
}
