import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { LoginSchema, OnboardUser, SignupSchema } from "../types";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function LoginHandler(
	values: LoginSchema,
	setIsDisabled: (value: boolean) => void,
	login: () => void,
	updateUser: (user: any) => void,
	push: (href: string, options?: any) => void
) {
	toast.promise(
		new Promise(async (resolve, reject) => {
			try {
				const response = await axios.post(`${apiUrl}/login-user/`, {
					values,
				});
				setIsDisabled(true);

				// Set authentication tokens
				localStorage.setItem("access_token", response.data.access);
				localStorage.setItem("refresh_token", response.data.refresh);
				Cookies.set("access_token", response.data.access, { expires: 1 });
				Cookies.set("refresh_token", response.data.refresh, { expires: 1 });

				// Display success messages
				resolve(`Welcome!, ${response.data.username}`);

				// Update authentication state
				login();

				//update user state
				const loggedUser: OnboardUser = {
					username: response.data.username,
					email: response.data.email,
					oxp: response.data.oxp,
					completed_quiz: response.data.completed_quiz,
				};

				updateUser(loggedUser);
				Cookies.set("user", JSON.stringify(loggedUser), { expires: 1 });

				setTimeout(() => {
					push("/home"); // Replace with your desired path
				}, 3000);
			} catch (error: any) {
				reject(`Login attempt failed,	 ${error.response.data.error ?? ""} `);
				console.error("Login attempt failed, an error occurred", error);
			} finally {
				setTimeout(() => {
					setIsDisabled(false);
				});
			}
		}),
		{
			pending: "Logging in, please wait",
			success: {
				render({ data }: any) {
					return data;
				},
			},
			error: {
				render({ data }: any) {
					return data;
				},
			},
		}
	);
}

// export async function SignupHandler(
// 	values: SignupSchema,
// 	push: (href: string, options?: any) => void
// ) {
// 	if (values.password !== values.passwordConfirm) {
// 		toast.error("Passwords do not match!");
// 		return;
// 	}

// 	const response = await axios.post(`${apiUrl}/create-user`, { values });
// 	if (response.status === 201) {
// 		toast.success("User created successfully, now redirecting to login page");
// 	} else {
// 		toast.error("User could not be created, an error has occured");
// 	}
// 	setTimeout(() => {
// 		push("/login"); // Replace with your desired path
// 	}, 2000);
// }

export async function SignupHandler(
	values: SignupSchema,
	push: (href: string, options?: any) => void
) {
	toast.promise(
		new Promise(async (resolve, reject) => {
			try {
				if (values.password !== values.passwordConfirm) {
					resolve("Passwords do not match!");
					console.log("passwrods dont match");
					return;
				}

				const response = await axios.post(`${apiUrl}/create-user`, { values });
				console.log(response.data);

				resolve("User created successfully");
				setTimeout(() => {
					push("/home"); // Replace with your desired path
				}, 3000);
			} catch (error: any) {
				const errorMessage =
					error.response?.data?.error ?? "An unknown error occurred";
				reject(`Signup  failed: ${errorMessage}`);
				console.error("Signup  failed, an error occurred", error);
			}
		}),

		{
			pending: "Creating account, please wait",
			success: {
				render() {
					return "Account created  successfully";
				},
			},
			error: {
				render({ data }: any) {
					return data;
				},
			},
		}
	);
}
