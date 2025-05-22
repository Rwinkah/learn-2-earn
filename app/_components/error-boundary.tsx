"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ErrorFallback({
	error,
	resetErrorBoundary,
}: {
	error: Error;
	resetErrorBoundary: () => void;
}) {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<div className="flex flex-col items-center justify-center p-4 bg-transparent border border-border-400  rounded-lg">
			<h2 className="text-lg font-semibold mb-2 text-center">
				Oops! Something went wrong
			</h2>
			<p className="text-sm mb-4 text-center">
				We&apos;re working on fixing this. Please try again later.
			</p>
			<Button onClick={resetErrorBoundary} className="mb-4">
				Try again
			</Button>
			<button
				onClick={() => setShowDetails(!showDetails)}
				className="text-sm text-primary underline"
				type="button">
				{showDetails ? "Hide" : "Show"} technical details
			</button>
			{showDetails && (
				<pre className="mt-4 p-2 bg-background-secondary rounded text-xs overflow-auto max-w-full">
					<code>{error.stack}</code>
				</pre>
			)}
		</div>
	);
}
