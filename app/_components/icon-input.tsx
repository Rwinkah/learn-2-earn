import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	noLeft?: boolean;
	leftIcon?: LucideIcon;
	nopreview?: boolean;
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
	({ className, noLeft, leftIcon, nopreview, type, ...props }, ref) => {
		const [isPasswordVisible, setIsPasswordVisible] = useState(false);

		useEffect(() => {
			if (nopreview) {
				setIsPasswordVisible(true);
			}
		}, [nopreview]);

		const togglePasswordVisibility = () => {
			setIsPasswordVisible((visible) => !visible);
		};

		return (
			<div
				className={`${className} flex items-center justify-center p-2 relative border-0 w-full`}>
				{!noLeft && (
					<div className="ml-4">
						{leftIcon ? (
							React.createElement(leftIcon, { size: 20 })
						) : (
							<Lock size={20} />
						)}
					</div>
				)}
				<Input
					{...props}
					ref={ref}
					type={isPasswordVisible ? "text" : "password"}
					className="pr-10 bg-transparent h-full border-none w-full"
				/>
				{!nopreview && (
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className="hover:border-none bg-transparent focus:outline-none flex items-center pr-4 text-gray-500">
						{isPasswordVisible ? (
							<EyeOffIcon className="w-5 h-5" />
						) : (
							<EyeIcon className="w-5 h-5" />
						)}
					</button>
				)}
			</div>
		);
	}
);

IconInput.displayName = "IconInput";

export default IconInput;
