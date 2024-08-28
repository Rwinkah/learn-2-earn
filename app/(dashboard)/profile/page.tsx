import { ToastContainer } from "react-toastify";
import ProfileClient from "./client";

export default function page() {
	return (
		<div className="p-8 flex flex-col gap-8 h-[80vh] overflow-y-scroll">
			<ToastContainer containerId={9} />
			<ProfileClient />
		</div>
	);
}
