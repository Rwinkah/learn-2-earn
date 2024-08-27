import { CustomIcon } from "@/app/types";
import React from "react";

const OnboardMeMessageIcon: React.FC<CustomIcon> = ({
	size = 22,
	pathFill = "#8D8990",
	spaceFill = "none",
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 22 23"
		fill={spaceFill}
		xmlns="http://www.w3.org/2000/svg">
		<g clipPath="url(#clip0_703_541)">
			<g clipPath="url(#clip1_703_541)">
				<path
					d="M3.70068 18.1667C3.40068 18.1667 3.13818 18.0417 2.91318 17.7917C2.68818 17.5417 2.57568 17.25 2.57568 16.9167V6.08337C2.57568 5.75004 2.68818 5.45837 2.91318 5.20837C3.13818 4.95837 3.40068 4.83337 3.70068 4.83337H16.4507C16.7507 4.83337 17.0132 4.95837 17.2382 5.20837C17.4632 5.45837 17.5757 5.75004 17.5757 6.08337V16.9167C17.5757 17.25 17.4632 17.5417 17.2382 17.7917C17.0132 18.0417 16.7507 18.1667 16.4507 18.1667H3.70068ZM10.0757 11.875L3.70068 7.22921V16.9167H16.4507V7.22921L10.0757 11.875ZM10.0757 10.625L16.3757 6.08337H3.79443L10.0757 10.625ZM3.70068 7.22921V6.08337V16.9167V7.22921Z"
					fill={pathFill}
				/>
			</g>
		</g>
		<defs>
			<clipPath id="clip0_703_541">
				<rect
					width={size}
					height={size}
					fill={pathFill}
					transform="translate(0 0.5)"
				/>
			</clipPath>
			<clipPath id="clip1_703_541">
				<rect
					width={size}
					height={size}
					fill={pathFill}
					transform="translate(0 0.5)"
				/>
			</clipPath>
		</defs>
	</svg>
);

export default OnboardMeMessageIcon;
