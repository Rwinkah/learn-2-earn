import sign from "@/public/obmLoginBack.jpg";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main id="Auth-Page" className="w-full text-white bg-black  h-[100vh]">
			<ToastContainer containerId={"authentication"} />
			<div className="flex items-center h-full">
				<div
					id="signPage__left"
					className="container w-full pt-5 lg:w-1/2 flex flex-col justify-center items-center max-w-[500px]">
					<div
						id="logo"
						className="flex mt-[21px] w-full mb-10  items-center justify-center">
						<h6 className="font-medium text-3xl">
							{/* Welcome to <span className="text-primary">OnboardMe</span> */}
						</h6>
					</div>
					<div id="signPage__left__form" className="w-full">
						{children}
					</div>
				</div>
				<div
					id="signPage__right"
					className=" items-center flex justify-center lg:flex lg:w-1/2 h-full p-[1rem]">
					<Image
						src={sign}
						className="h-2/3 w-2/3"
						width={600}
						height={450}
						alt="sign-image"
					/>
				</div>
			</div>
		</main>
	);
}
