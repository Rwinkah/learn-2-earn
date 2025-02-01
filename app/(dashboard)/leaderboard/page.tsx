"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeaderboard } from "@/app/_context/leader-context";
import { LeaderboardUser } from "@/app/types";
import OnboardMeGoldMedalIcon from "@/assets/images/onboardMeGoldMedal";
import OnboardMeSilverMedalIcon from "@/assets/images/onboardMeSilverMedal";
import OnboardMeBronzeMedalIcon from "@/assets/images/onboardMeBronzeMedal";

export default function Page() {
	const { Leaderboard, WeeklyLeaderboard } = useLeaderboard();

	function SetMedal(index: number) {
		index++;
		if (index == 1) {
			return (
				<span>
					<OnboardMeGoldMedalIcon size={36} />
				</span>
			);
		} else if (index == 2) {
			return (
				<span>
					<OnboardMeSilverMedalIcon size={36} />
				</span>
			);
		} else if (index == 3) {
			return (
				<span>
					<OnboardMeBronzeMedalIcon size={36} />
				</span>
			);
		} else {
			return <span className="font-medium text-white">{index}</span>;
		}
	}

	return (
		<div className="w-full flex flex-col items-center h-full">
			<div className="flex gap-20 flex-col items-center  w-full h-full ">
				<div
					id="leaderboard_header"
					className="text-white font-bold text-[40px]">
					LEADERBOARD
				</div>

				<div className="w-full mx-10 h-full">
					<Tabs defaultValue="weekly">
						<TabsList className="flex items-center">
							<TabsTrigger className="md:text-[24px] font-bold" value="weekly">
								Weekly Scores{" "}
							</TabsTrigger>
							<TabsTrigger className="md:text-[24px] font-bold" value="all">
								All Time Scores
							</TabsTrigger>
						</TabsList>

						<div className="flex-col h-[400px] md:h-[550px]  lg:pb-0 lg:h-[700px] overflow-y-scroll">
							{" "}
							<TabsContent
								value="weekly"
								className="flex flex-col items-center">
								{WeeklyLeaderboard.sort((a, b) => b.total_xp - a.total_xp).map(
									(object: WeeklyLeaderboardResponse, index: any) => (
										<div
											key={index}
											className="flex flex-col pb-10 gap-4 mt-5 w-full items-center px-10">
											{" "}
											<div
												key={index}
												className=" max-w-[750px] border border-[#D9D9D933] flex justify-between items-center gap-5  w-full h-[65px]  p-4  font-medium text-white ">
												<div className="w-10">{SetMedal(index)}</div>
												<div className="w-full flex justify-between items-center">
													<div>{object.username}</div>
													<div>{object.total_xp} OXP</div>
												</div>
											</div>
										</div>
									)
								)}
							</TabsContent>
							<TabsContent value="all" className="flex flex-col items-center">
								{Leaderboard.sort((a, b) => b.onboardXP - a.onboardXP).map(
									(object: LeaderboardUser, index: number) => (
										<div
											key={index}
											className="flex pb-10 flex-col gap-4 mt-5 w-full items-center px-10">
											{" "}
											<div
												key={index}
												className=" max-w-[750px] border border-[#D9D9D933] flex justify-between items-center gap-5  w-full h-[65px]  p-4  font-medium text-white ">
												<div className="w-10">{SetMedal(index)}</div>
												<div className="w-full flex justify-between items-center">
													<div>{object.user.username}</div>
													<div>{object.onboardXP} OXP</div>
												</div>
											</div>
										</div>
									)
								)}
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
