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
		<div
			id="Auth-Page"
			className="w-full overflow-y-scroll text-white bg-black h-full">
			<ToastContainer containerId={"authentication"} />
			<div className="flex h-full items-center">
				<div
					id="signPage__left"
					className="container w-full lg:w-1/2 flex flex-col xl:justify-center h-full pt-[10vh]  max-w-[500px]  overflw-y-scroll">
					<div id="signPage__left__form" className="w-full">
						{children}
					</div>
				</div>
				<div
					id="signPage__right"
					className="hidden 2xl:flex items-center  justify-center lg:flex lg:w-1/2 h-full p-[1rem]">
					<Image
						src={sign}
						className="h-2/3 w-2/3 "
						width={600}
						height={450}
						alt="sign-image"
					/>
				</div>
			</div>
		</div>
	);
}
