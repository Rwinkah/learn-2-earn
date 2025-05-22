"use client";
import { Button } from "@/components/ui/button";

// Error boundaries must be Client Components

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const mode = process.env.NODE_ENV;
	return (
		// global-error must include html and body tags
		<html lang="en">
			<body>
				<h2>Something went wrong!</h2>

				{mode === "development" && (
					<>
						<p>{error.message}</p>
						<p>{error.stack}</p>
					</>
				)}

				<Button onClick={() => reset()}>Try again</Button>
			</body>
		</html>
	);
}
