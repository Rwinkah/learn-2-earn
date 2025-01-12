import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconInputType
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"className" | "placeholder"
	> {
	className?: string;
	noLeft?: boolean;
	LeftIcon?: LucideIcon;
	placeholder?: string;
	noPreview?: boolean;
}

export default function IconInput(props: IconInputType) {
	useEffect(() => {
		if (props.noPreview) {
			setIsPasswordVisible(true);
		}
	}, [props.noPreview]);

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	function InputType() {
		if (props.type) {
			return props.type;
		}

		return isPasswordVisible ? "text" : "password";
	}

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};
	return (
		<div
			className={`${props.className} flex items-center justify-center p-2relative border-0 w-full`}>
			{props.noLeft !== true ? (
				props.LeftIcon ? (
					<props.LeftIcon className="ml-4" size={20} />
				) : (
					<Lock className="ml-4" size={20} /> // Render Lock by default
				)
			) : null}{" "}
			<Input
				{...props}
				// type={isPasswordVisible ? "text" : "password"}
				type={InputType()}
				placeholder={props.placeholder ?? "Enter your password"}
				className="pr-10 bg-transparent h-full  border-none" // Add padding to the right to make room for the icon
			/>
			{!props.noPreview && (
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className=" hover:border-none  bg-transparent focus:outline-none  flex items-center pr-4 text-gray-500">
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
