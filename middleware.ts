import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	console.log("middlware working");
	const authToken = request.cookies.get("access_token"); // Adjust based on your auth logic
	console.log("Auth token:", authToken);
	if (!authToken) {
		const loginUrl = new URL("/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

// Specify the paths where the middleware should protect currently nextJS does not support specifyinig entire route groups at once
export const config = {
	matcher: [
		"/home",
		"/quiz/:path*",
		"/create-lesson",
		"/lessons/:path*",
		"/settings",
	],
};
