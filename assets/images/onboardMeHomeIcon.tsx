import { CustomIcon } from "@/app/types";
import React from "react";

const OnboardMeHomeIcon: React.FC<CustomIcon> = ({
	size = 22,
	pathFill = "#8D8990",
	spaceFill = "none",
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 22 22"
		fill={spaceFill}
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M11.6875 8.9375V2.75H19.25V8.9375H11.6875ZM2.75 11.6875V2.75H10.3125V11.6875H2.75ZM11.6875 19.25V10.3125H19.25V19.25H11.6875ZM2.75 19.25V13.0625H10.3125V19.25H2.75ZM4.125 10.3125H8.9375V4.125H4.125V10.3125ZM13.0625 17.875H17.875V11.6875H13.0625V17.875ZM13.0625 7.5625H17.875V4.125H13.0625V7.5625ZM4.125 17.875H8.9375V14.4375H4.125V17.875Z"
			fill={pathFill}
		/>
	</svg>
);

export default OnboardMeHomeIcon;
