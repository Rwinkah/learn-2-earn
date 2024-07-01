import sign from "@/assets/images/auth.jpg";
import Image from "next/image";
import book from "@/assets/images/bookIcon.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="Auth-Page" className="w-full  h-[100vh]">
      <div className="flex items-center h-full">
        <div
          id="signPage__left"
          className="container w-full pt-5 lg:w-1/2 flex flex-col justify-center items-center max-w-[500px]"
        >
          <div
            id="logo"
            className="flex mt-[21px] w-full mb-20 items-center justify-center"
          >
            <Image src={book} alt="logo" />
            <h6 className="font-light text-3xl">
              <span className="font-medium text-primary"></span> OnboardMe
            </h6>
          </div>
          <div id="signPage__left__form" className="w-full">
            {children}
          </div>
        </div>
        <div
          id="signPage__right"
          className="hidden lg:flex lg:w-1/2 h-full p-[1rem]"
        >
          <Image
            src={sign}
            className="h-full w-full"
            width={600}
            height={450}
            alt="sign-image"
          />
        </div>
      </div>
    </main>
  );
}
