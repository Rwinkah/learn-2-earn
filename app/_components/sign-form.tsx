"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import loading from '@/assets/images/LOADING.png';
import Image from "next/image";
import close from "@/assets/images/close_button.png";
import arrow from "@/assets/images/leftArrow.png";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectCourse } from "./select-course";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const signupSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  matNo: z.string(),
  level: z.number(),
  firstSem: z.array(z.string()),
  secSem: z.array(z.string()),
});

interface signupProp {
  step: number;
}

const courseListFirst = [
  "CPE579",
  "CPE513",
  "CPE563",
  "CPE573",
  "CPE503",
  "CPE511",
  "CPE533",
  "CPE531",
  "CPE537",
];
const courseListSecond = [
  "CPE556",
  "CPE544",
  "CPE524",
  "CPE514",
  "CPE516",
  "CPE503",
  "CPE518",
  "CPE552",
  "CPE528",
];
export function SignupForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [firstS, setFirstS] = useState<string[]>([]);
  const [secondS, setSecondS] = useState<string[]>([]);

  function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values);
  }

  const handleRemove = (
    index: number,
    setCourse: React.Dispatch<React.SetStateAction<string[]>>,
    course: string[]
  ) => {
    const newCourse = course.filter((_, i) => i !== index);
    setCourse(newCourse);
  };
  function onProceed(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    switch (step) {
      case 1:
        setStep(2);
        break;
      case 2:
        setStep(3);
        break;
      case 3:
        setStep(4)
      default:
        break;
    }
  }

  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      matNo: "",
      level: 500,
    },
  });

  if (step === 1) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h3 className="flex">
            {" "}
            <span className=" block bg-primary h-2 mt-2 mr-2 w-2 rounded-3xl" />
            Step 1 of 3
          </h3>
          <h1 className="text-4xl font-bold"> Create an account</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Uniben email address</FormLabel>
                <FormControl>
                  <Input
                    className="focus:outline-none rounded-3xl"
                    placeholder="student-lastname@eng.uniben.edu"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create a Password</FormLabel>
                <FormControl>
                  <Input
                    className=" focus:outline-none rounded-3xl"
                    placeholder="**********"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <h3 className="font-normal text-sm">
            {" "}
            <Checkbox
              id="terms"
              className="mr-2"
              checked={isChecked}
              onClick={(e) => {
                setIsChecked(!isChecked);
              }}
            />{" "}
            I agree to the{" "}
            <a className="underline" href="">
              Terms & Privacy
            </a>
          </h3>
          <Button
            disabled={isChecked === true ? false : true}
            className="rounded-3xl border w-[100%] bg-primary text-white"
            type="submit"
            onClick={onProceed}
          >
            Submit
          </Button>
        </form>
      </Form>
    );
  } else if (step === 2) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h3 onClick={() => setStep(1)} className="flex">
            {" "}
            <Image
              src={arrow}
              className="h-2 w-1.5 mt-2 mr-4"
              alt="back-arrow"
            />{" "}
            Step 2 of 3
          </h3>
          <h1 className="text-4xl font-bold">Create an account</h1>
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> First name</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:outline-none rounded-3xl"
                      placeholder="Osato"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:outline-none rounded-3xl"
                      placeholder="**********"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="matNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matric number</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-3xl focus:outline-none"
                    placeholder="**********"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Level</FormLabel> */}
                <FormControl>
                  {/* <Input className="rounded-3xl" placeholder="**********"  {...field} /> */}
                  {/* <select
                    className=" pl-4 w-[100%] h-[48px] focus:outline-none border-grey border rounded-3xl"
                    name="level"
                    id="level placeholder='select level'"
                  >
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                  </select> */}
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="rounded-3xl border w-[100%] bg-primary text-white"
            type="submit"
            onClick={onProceed}
          >
            Continue
          </Button>
        </form>
      </Form>
    );
  } else if (step === 3) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h3 onClick={() => setStep(1)} className="flex">
            {" "}
            <Image
              src={arrow}
              className="h-2 w-1.5 mt-2 mr-4"
              alt="back-arrow"
            />{" "}
            Step 3 of 3
          </h3>
          <h1 className="text-4xl font-bold">Create an account</h1>
          <FormField
            control={form.control}
            name="firstSem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First semester</FormLabel>
                <FormControl>
                  {/* <Input className="rounded-3xl" placeholder="**********"  {...field} /> */}
                  {/* <select className=" pl-4 w-[100%] h-[48px] focus:outline-none border-grey border rounded-3xl"  name="level" id="level">
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                        <option value="300">300</option>
                                        <option value="400">400</option>
                                        <option value="500">500</option>
                                        </select> */}
                  <SelectCourse
                    course={firstS}
                    setCourse={setFirstS}
                    courseList={courseListFirst}
                  />
                </FormControl>
                {firstS && (
                  <div className="flex flex-wrap w-[100%] gap-1">
                    {firstS.map((value, index) => (
                      <Button
                        key={index}
                        className=" gap-2 rounded-none h-[30px] text-[14px] font-medium w-[7.45rem] flex space-evenly text-primary [border px-1.5 py-1 bg-[#ECDBEE]"
                      >
                        {value}{" "}
                        <Image
                          src={close}
                          alt="close"
                          onClick={() => handleRemove(index, setFirstS, firstS)}
                        />
                      </Button>
                    ))}
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secSem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Second semester</FormLabel>
                <FormControl>
                  {/* <Input className="rounded-3xl" placeholder="**********"  {...field} /> */}
                  {/* <select className=" pl-4 w-[100%] h-[48px] focus:outline-none border-grey border rounded-3xl"  name="level" id="level">
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                        <option value="300">300</option>
                                        <option value="400">400</option>
                                        <option value="500">500</option>
                                        </select> */}
                  <SelectCourse
                    course={secondS}
                    courseList={courseListSecond}
                    setCourse={setSecondS}
                  />
                </FormControl>
                {secondS && (
                  <div className="flex flex-wrap w-[100%] gap-1">
                    {secondS.map((value, index) => (
                      <Button
                        key={index}
                        className=" gap-2 rounded-none h-[30px] text-[14px] font-medium w-[7.45rem] flex space-evenly text-primary[border px-1.5 py-1 bg-[#ECDBEE]"
                      >
                        {value}
                        <Image
                          src={close}
                          alt="close"
                          onClick={() =>
                            handleRemove(index, setSecondS, secondS)
                          }
                        />
                      </Button>
                    ))}
                  </div>
                )}
              </FormItem>
            )}
          />
          <Button
            className="rounded-3xl border w-[100%] bg-primary text-white"
            type="submit"
            onClick={onProceed}
          >
            Finish
          </Button>
        </form>
      </Form>
    );
  } else if (step === 4) {
    setTimeout(() => {
      window.location.href = '/home'
    }, 5000)
    console.log('loading/.==.')

    return (
      <div className="w-full justify-center items-center flex flex-col">
        <Image src={loading} alt="loading" className="animate-spin"/>
        <p className="text-center w-[15rem] font-medium text-base ">Please hold on while we create your CPE E-Library account</p>
      </div>
    )
  }
}
