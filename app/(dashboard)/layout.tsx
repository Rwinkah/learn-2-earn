import { ToastContainer } from "react-toastify";
import ClientLayout from "./client-layout";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ClientLayout>
			<ToastContainer />
			{children}
		</ClientLayout>
	);
}
