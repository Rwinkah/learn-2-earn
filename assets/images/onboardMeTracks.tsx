import { CustomIcon } from "@/app/types";
import React from "react";

const OnboardMeTracksIcon: React.FC<CustomIcon> = ({
	size = 22,
	pathFill = "#8D8990",
	spaceFill = "none",
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 20 20"
		fill={spaceFill}
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M9.24832 4.16613L9.17384 4.08337H9.0625H3.8125C3.43005 4.08337 3.10208 4.25128 2.83692 4.55409C2.575 4.8532 2.4375 5.19894 2.4375 5.58337V16.4167C2.4375 16.8011 2.575 17.1469 2.83692 17.446L3.025 17.2813L2.83692 17.446C3.10208 17.7488 3.43005 17.9167 3.8125 17.9167H16.5625C16.9351 17.9167 17.2582 17.7466 17.5264 17.4485C17.7953 17.1498 17.9375 16.8032 17.9375 16.4167V6.83337C17.9375 6.44687 17.7953 6.1003 17.5264 5.80155C17.2582 5.50353 16.9351 5.33337 16.5625 5.33337H10.2988L9.24832 4.16613ZM9.53293 7.00062L9.60741 7.08337H9.71875H16.3125V16.1667H4.0625V5.83337H8.48241L9.53293 7.00062Z"
			fill={pathFill}
			stroke={pathFill}
			strokeWidth="0.5"
		/>
	</svg>
);

export default OnboardMeTracksIcon;
