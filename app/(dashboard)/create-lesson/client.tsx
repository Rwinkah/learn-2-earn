"use client";
import { z } from "zod";
import axios from "axios";
// import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import Link from "next/link";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	// SelectGroup,
	SelectItem,
} from "@/components/ui/select";
import { Captions, PanelTop } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast, ToastContainer } from "react-toastify";

const lessonContentSchema = z.object({
	title: z.string({ required_error: "A required field" }),
	body: z.string({ required_error: "A required field" }),
});

const quizQuestion = z.object({
	question: z.string(),
	answer: z.string(),
	alt1: z.string(),
	alt2: z.string(),
});

const LessonTags = z.object({
	tag: z.string(),
});
const lessonSchema = z.object({
	title: z.string({ required_error: "A required field" }),
	description: z.string(),
	lesson_intro: lessonContentSchema,
	lesson_body: lessonContentSchema,
	lesson_summary: lessonContentSchema,
	difficulty: z.enum(["Normie", "Amateur", "Intermediate", "Expert", "Idolo"]),
	tags: z.array(LessonTags),
	quiz: z.array(quizQuestion),
});
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function LessonForm() {
	const { push } = useRouter();
	const form = useForm<z.infer<typeof lessonSchema>>({
		resolver: zodResolver(lessonSchema),
		// defaultValues: {
		// 	title: "",
		// 	lesson_intro: { title: "", body: "" },
		// 	lesson_body: { title: "", body: "" },
		// 	lesson_summary: { title: "", body: "" },
		// 	difficulty: "Normie",
		// 	quiz: [],
		// },
	});
	async function handleSubmit(values: z.infer<typeof lessonSchema>) {
		try {
			const refreshToken = localStorage.getItem("refresh_token");

			if (!refreshToken) {
				push("/login");
				throw new Error("No auth tokens found");
			}

			const newTokenResponse = await axios.post(`${apiUrl}/token-refresh/`, {
				refresh: refreshToken,
			});

			let newAccessToken = "";
			if (newTokenResponse.status === 200) {
				newAccessToken = newTokenResponse.data.access;
				localStorage.setItem("access_token", newAccessToken);
			} else {
				console.error(
					"an error has occured, status code ",
					newTokenResponse.status
				);
				push("/login");
				return;
			}
			const createResponse = await axios.post(
				`${apiUrl}/create-lesson/`,
				{
					values,
				},
				{
					headers: {
						Authorization: `Bearer ${newAccessToken}`,
					},
				}
			);
			if (createResponse.status === 201) {
				toast.success("Lesson created successfully");
				// window.location.reload();
				console.log("sent values", values);
			} else {
				toast.error("Lesson could not be created, an error has occurred");
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error("Error creating lesson:", error);
		}
		console.log(values);
		toast("clicked");
		console.log("submit clicked");
	}
	const { control } = form;
	const {
		fields: tagFields,
		append: appendTag,
		remove: removeTag,
	} = useFieldArray({
		control: form.control,
		name: "tags",
	});

	const {
		fields: quizFields,
		append: appendQuiz,
		remove: removeQuiz,
	} = useFieldArray({
		control: control,
		name: "quiz",
	});

	return (
		<>
			<ToastContainer />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="text-white font-medium border-[2px] flex flex-col gap-10 rounded-lg border-[#66666666] shadow-2xl p-8">
					<div className="gap-6 shadow-inner  border-[#66666666]	 border-[2px] p-4 rounded-lg ">
						<h2 className="font-bold  flex gap-2 text-xl mb-5">
							<Captions color="#d01cd0" /> Basic info
						</h2>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="flex gap-4 items-center justify-between">
									<FormLabel className="mt-2">Lesson title</FormLabel>
									<FormControl className="max-w-[600px]">
										<Input
											className="m-0 border-solid bg-transparent  border-[#66666666]  border-[1px]"
											placeholder="Name your lesson"
											{...field}
										/>
									</FormControl>
									{/* <FormMessage>Tell us the name of your lesson</FormMessage> */}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="flex gap-4 items-center justify-between">
									<FormLabel className="mt-2"> Description</FormLabel>
									<FormControl className="max-w-[600px]">
										<Input
											className="m-0 border-solid bg-transparent  border-[#66666666]  border-[1px]"
											placeholder="Write a short description"
											{...field}
										/>
									</FormControl>
									{/* <FormMessage>Tell us the name of your lesson</FormMessage> */}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="difficulty"
							render={({ field }) => (
								<FormItem className="flex gap-4 items-center justify-between">
									<FormLabel className="mt-2">Difficulty</FormLabel>
									<FormControl className="max-w-[600px]">
										<Select
											// {...field}
											value={field.value}
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<SelectTrigger className="m-0 lg:w-[600px] border-solid bg-transparent  border-[#66666666]  border-[1px]">
												<SelectValue placeholder="Select difficulty level" />
											</SelectTrigger>
											<SelectContent className="bg-black flex flex-col p-4 gap-4 text-white">
												<SelectItem className="mb-4" value="Normie">
													Normie
												</SelectItem>
												<SelectItem className="mb-4" value="Amateur">
													Amateur
												</SelectItem>
												<SelectItem className="mb-4" value="Intermediate">
													Intermediate
												</SelectItem>
												<SelectItem className="mb-4" value="Expert">
													Expert
												</SelectItem>
												<SelectItem className="mb-4" value="Idolo">
													Idolo
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<div className="gap-6 shadow-inner  border-[#66666666]	 border-[2px] p-4 rounded-lg ">
						<h2 className="font-bold  flex gap-2 text-xl mb-5">
							<PanelTop color="#d01cd0" /> Intro section
						</h2>
						<FormField
							control={form.control}
							name="lesson_intro.title"
							render={({ field }) => (
								<FormItem className="flex gap-4 items-center justify-between">
									<FormLabel className="mt-2">Intro subtitle</FormLabel>
									<FormControl className="max-w-[600px]">
										<Input
											className="m-0 border-solid bg-transparent  border-[#66666666]  border-[1px]"
											placeholder="Title for your intro"
											{...field}
										/>
									</FormControl>
									{/* <FormMessage>Tell us the name of your lesson</FormMessage> */}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lesson_intro.body"
							render={({ field }) => (
								<FormItem className="flex gap-4 items-center justify-between">
									<FormLabel className="mt-2">Intro content</FormLabel>
									<FormControl className="max-w-[600px]">
										<Textarea
											className="m-0 border-solid bg-transparent  border-[#66666666]  border-[1px]"
											placeholder="Content for your intro"
											{...field}
										/>
									</FormControl>
									{/* <FormMessage>Tell us the name of your lesson</FormMessage> */}
								</FormItem>
							)}
						/>
					</div>
					<div className="gap-6 shadow-inner  border-[#66666666]	 border-[2px] p-4 rounded-lg ">
						<h2 className="font-bold  flex gap-2 text-xl mb-5">
							<PanelTop color="#d01cd0" /> Middle section
						</h2>
						<FormField
							control={form.control}
							name="lesson_body.title"
							render={({ field }) => (
								<FormItem className="flex gap-4 items-center justify-between">
									<FormLabel className="mt-2">Middle subtitle</FormLabel>
									<FormControl className="max-w-[600px]">
										<Input
											className="m-0 border-solid bg-transparent  border-[#66666666]  border-[1px]"
											placeholder="Title for your main content"
											{...field}
										/>
									</FormControl>
									{/* <FormMessage>Tell us the name of your lesson</FormMessage> */}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lesson_body.body"
							render={({ field }) => (
								<FormItem className="flex gap-4 items-center justify-between">
									<FormLabel className="mt-2">Middle content</FormLabel>
									<FormControl className="max-w-[600px]">
										<Textarea
											className="m-0 border-solid bg-transparent  border-[#66666666]  border-[1px]"
											placeholder="Content for your main body"
											{...field}
										/>
									</FormControl>
									{/* <FormMessage>Tell us the name of your lesson</FormMessage> */}
								</FormItem>
							)}
						/>
					</div>
					<div className="gap-6 shadow-inner  border-[#66666666]	 border-[2px] p-4 rounded-lg ">
						<h2 className="font-bold  flex gap-2 text-xl mb-5">
							<PanelTop color="#d01cd0" /> Summary section
						</h2>
						<FormField
							control={form.control}
							name="lesson_summary.title"
							render={({ field }) => (
								<FormItem className="flex gap-4 items-center justify-between">
									<FormLabel className="mt-2">Summary title</FormLabel>
									<FormControl className="max-w-[600px]">
										<Input
											className="m-0 border-solid bg-transparent  border-[#66666666]  border-[1px]"
											placeholder="Title for your summary content"
											{...field}
										/>
									</FormControl>
									{/* <FormMessage>Tell us the name of your lesson</FormMessage> */}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lesson_summary.body"
							render={({ field }) => (
								<FormItem className="flex gap-4 items-center justify-between">
									<FormLabel className="mt-2">Summary body</FormLabel>
									<FormControl className="max-w-[600px]">
										<Textarea
											className="m-0 border-solid bg-transparent  border-[#66666666]  border-[1px]"
											placeholder="Content for your summary"
											{...field}
										/>
									</FormControl>
									{/* <FormMessage>Tell us the name of your lesson</FormMessage> */}
								</FormItem>
							)}
						/>
					</div>
					<div className="gap-6 shadow-inner border-[#66666666] border-[2px] p-4 rounded-lg">
						<h2 className="font-bold flex gap-2 text-xl mb-5">
							<Captions color="#d01cd0" /> Quiz Questions
						</h2>
						{quizFields.map((field, index) => (
							<div key={field.id} className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name={`quiz.${index}.question`}
									render={({ field }) => (
										<FormItem className="flex gap-4 items-center justify-between">
											<FormLabel className="mt-2">Question</FormLabel>
											<FormControl className="max-w-[600px]">
												<Input
													className="m-0 border-solid bg-transparent border-[#66666666] border-[1px]"
													placeholder="Quiz question"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`quiz.${index}.answer`}
									render={({ field }) => (
										<FormItem className="flex gap-4 items-center justify-between">
											<FormLabel className="mt-2">Answer</FormLabel>
											<FormControl className="max-w-[600px]">
												<Input
													className="m-0 border-solid bg-transparent border-[#66666666] border-[1px]"
													placeholder="Correct answer"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`quiz.${index}.alt1`}
									render={({ field }) => (
										<FormItem className="flex gap-4 items-center justify-between">
											<FormLabel className="mt-2">Alternative 1</FormLabel>
											<FormControl className="max-w-[600px]">
												<Input
													className="m-0 border-solid bg-transparent border-[#66666666] border-[1px]"
													placeholder="Alternative answer 1"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`quiz.${index}.alt2`}
									render={({ field }) => (
										<FormItem className="flex gap-4 items-center justify-between">
											<FormLabel className="mt-2">Alternative 2</FormLabel>
											<FormControl className="max-w-[600px]">
												<Input
													className="m-0 border-solid bg-transparent border-[#66666666] border-[1px]"
													placeholder="Alternative answer 2"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button
									type="button"
									onClick={() => removeQuiz(index)}
									className="mt-2 max-w-[200px] bg-red-500 text-white rounded">
									Remove Question
								</Button>
							</div>
						))}
						<Button
							type="button"
							onClick={() =>
								appendQuiz({ question: "", answer: "", alt1: "", alt2: "" })
							}
							className="mt-4 max-w-[200px] bg-green-500 text-white rounded">
							Add Question
						</Button>
					</div>
					<div className="gap-6 shadow-inner border-[#66666666] border-[2px] p-4 rounded-lg">
						<h2 className="font-bold flex gap-2 text-xl mb-5">
							<Captions color="#d01cd0" /> Lesson Tags
						</h2>
						{tagFields.map((field, index) => (
							<div key={field.id} className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name={`tags.${index}.tag`}
									render={({ field }) => (
										<FormItem className="flex gap-4 items-center justify-between">
											<FormLabel className="mt-2">Tag</FormLabel>
											<FormControl className="max-w-[600px]">
												<Input
													className="m-0 border-solid bg-transparent border-[#66666666] border-[1px]"
													placeholder="Add relevant tag"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<Button
									type="button"
									onClick={() => removeTag(index)}
									className="mt-2 max-w-[200px] bg-red-500 text-white rounded">
									Remove Tag
								</Button>
							</div>
						))}
						<Button
							type="button"
							onClick={() => appendTag({ tag: "" })}
							className="mt-4 max-w-[200px] bg-green-500 text-white rounded">
							Add Tag
						</Button>
					</div>
					<Button className="font" type="submit">
						Create lesson
					</Button>
				</form>
			</Form>{" "}
		</>
	);
}
