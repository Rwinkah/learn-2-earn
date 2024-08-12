import LessonForm from "./client";

export default function page() {
	return (
		<div className="p-8 flex flex-col gap-8 h-[80vh] overflow-y-scroll">
			<h1 className="font-bold text-2xl text-white">Create lesson</h1>
			<LessonForm />
		</div>
	);
}
