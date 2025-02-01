"use client";
import Image from "next/image";
import Footer from "../_components/footer";
import RespContainer from "../_components/resp_container";
import Sidebar from "../_components/sidebar";
import Header from "../_components/header";
import eth from "@/public/eth.jpeg";
import { useUser } from "../_context/user-context";
import { useLeaderboard } from "../_context/leader-context";
import { LeaderboardUser } from "../types";
export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	const user = useUser();
	const { Leaderboard } = useLeaderboard();

	const sortedLeaderboard = Leaderboard.sort(
		(a, b) => b.onboardXP - a.onboardXP
	);
	console.log("sorted leaderboard :", sortedLeaderboard);

	return (
		<main className="flex  text-[#B2AFB4] gap-0 h-[100vh] bg-[#130C16] min-w-full justify-center overflow-hidden">
			<RespContainer
				class_full="3/2xl:flex hidden"
				hide={true}
				class_sm="bg-black">
				<Sidebar />
			</RespContainer>

			<RespContainer
				id="current-page"
				hide={false}
				class_full="flex flex-col min-w-full 3/2xl:w-[950px]  pb-10 justify-between min-h-full h-auto bg-[#08020A] border-l-[1px] border-[#66666666]"
				class_sm="  w-full pb-5 mb-20 bg-black">
				<div
					id="layout-wrapper"
					className=" flex flex-col justify-between ml-0 min-w-full">
					<div id="content-wrapper" className="mt-5  flex flex-col min-w-full ">
						<Header />
						{children}
					</div>
					<Footer />
				</div>
			</RespContainer>
			<RespContainer hide={true} class_sm="display-none">
				<div className=" 3/2xl:flex  2xl:min-w-[300px] p-4 h-[100vh] bg-[#130c16] text-white border-l border-[#66666666]  hidden flex-col gap-8 items-center w-full">
					<div className=" w-full p-2 pb-6 flex flex-col gap-8">
						<div className=" w-fit ] flex gap-4 text-2xl font-semibold mb-10">
							<div className="rounded-full w-11 h-11 overflow-hidden flex">
								<Image
									src={eth}
									alt={"profile picture"}
									className="w-11 h-11"
								/>
							</div>
							<div>
								<p className="text-[#F5F5F5] font-medium text-base">
									{user.onboardUser?.username ?? "User not logged in"}
								</p>
								<h6 className="text-sm font-light text-[#A3A3A3]">
									{user.onboardUser?.email ?? "User not logged in"}
								</h6>
							</div>
						</div>
					</div>
					<div id="leaderboard" className="p-4 flex flex-col gap-8 w-full ">
						<h2 className="text-white text-2xl font-semibold m-auto ">
							Leaderboard
						</h2>
						<div className="w-full h-[400px]  overflow-y-scroll border-[#66666666] flex flex-col  items-center">
							{sortedLeaderboard.length > 0 ? (
								<div className="w-full text-sm flex flex-col gap-4">
									{sortedLeaderboard.map(
										(object: LeaderboardUser, index: any) => (
											<span
												key={index}
												className="flex  border-[1px] w-full rounded-lg shadow-inner shadow-[primaryColor] justify-between p-4 border-b border-[#66666666]">
												<span
													className="text-white  overflow-hidden "
													title={object.user.username}>
													<p>
														{index + 1}.{" "}
														{object.user.username.length > 7
															? `${object.user.username.slice(0, 7)}...`
															: object.user.username}
													</p>
												</span>
												<span className="text-white">
													{object.onboardXP} OXP
												</span>
											</span>
										)
									)}
								</div>
							) : (
								<div className="loader" />
							)}
						</div>
					</div>
				</div>
			</RespContainer>
		</main>
	);
}
