"use client";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import edit from "@/assets/images/EditIcon.png";
import save from '@/assets/images/save-solid.svg'
import Image from "next/image";
import { Edit, Edit2Icon, Save } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CourseContent from "../../data/course-info";
import CourseSettings from "./course-settings";
import RespContainer from "./resp_container";

const settingsSchema = z.object({
  email: z.string().email("invalid email"),
  firstName: z.string(),
  lastName: z.string(),
  matNo: z.string(),
  password: z.string(),
  firstSem: z.array(z.string()),
  secSem: z.array(z.string()),
  level: z.number(),
  chPassOld: z.string(),
  chPassNew: z.string(),
  chPassConf: z.string(),
});
interface settingsProp {
  page: number;
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

export function SettingsForm({ page }: settingsProp) {
  const [isChecked, setIsChecked] = useState(false);
  const [firstS, setFirstS] = useState<string[]>([]);
  const [secondS, setSecondS] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  function onSubmit(values: z.infer<typeof settingsSchema>) {}

  const handleRemove = (
    index: number,
    setCourse: React.Dispatch<React.SetStateAction<string[]>>,
    course: string[]
  ) => {
    const newCourse = course.filter((_, i) => i !== index);
    setCourse(newCourse);
  };
  function onProceed(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      setStep(1);
    }

    console.log(step);
  }

  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      matNo: "",
    },
  });

  if (page === 1) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <RespContainer hide={false}>
            <Button
              className="border-[1.5px] h-[46px] flex gap-2 rounded-3xl mt-8 w-[185px] outline-[#820B8A] text-primary border-primary bg-white"
              onClick={()=>setIsEdit(!isEdit)}
              >
              
               {isEdit &&   <Image src= {edit} alt="edit" width={16} height={16}/>}    
               {isEdit ?  'Edit information' : 'Save information'}
               {!isEdit &&   <Image src= {save} alt="save" width={16} height={16}/>}

            </Button>
          <div className="flex flex-wrap mt-[20px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#515151]">
                    {" "}
                    Uniben email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEdit}
                      className="bg-[#F2F2F2] h-[46px] border-[1.5px] focus:outline-none rounded-3xl"
                      placeholder="student-lastname@eng.uniben.edu"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

          </div>
          <RespContainer class_full="flex mt-[20px] flex-wrap" class_sm="flex-col flex-wrap" hide={false}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="mr-[12px]">
                  <FormLabel className="text-sm"> First name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEdit}
                      className="h-[46px] w-[318px] border-[1.5px] focus:outline-none rounded-3xl"
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
                <FormItem className="">
                  <FormLabel className="text-sm"> Last name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEdit}
                      className=" border-[1.5px] h-[46px] w-[318px] focus:outline-none rounded-3xl "
                      placeholder="Omorodion"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </RespContainer>
          <RespContainer class_full="flex mt-[20px] flex-wrap" class_sm="flex-col flex-wrap" hide={false}>
            <FormField
              control={form.control}
              name="matNo"
              render={({ field }) => (
                <FormItem className="mr-[12px]">
                  <FormLabel className="text-sm"> Matric number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEdit}
                      className=" border-[1.5px] h-[46px] w-[318px] focus:outline-none rounded-3xl"
                      placeholder="Osato"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </RespContainer>
          </RespContainer>
        </form>
      </Form>
    );
  } else if (page === 2) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="s justify-between space-y-4 w-[89%] ">
            <h3 className="text-xl font-bold mt-[40px] mb-2">
              Change password
            </h3>
            <span className="text-base font-normal text-[#515151] mt-2 mb-10">
              You will be logged out of all sessions to protect your account
            </span>
            <FormField
              control={form.control}
              name="chPassOld"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Old password</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:outline-none rounded-3xl "
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chPassNew"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> New password</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:outline-none rounded-3xl"
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="matNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
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
            <Button className="border bg-[#820B8A] rounded-3xl w-[100%] text-white h-[46PX]">
              Change Password
            </Button>
          </div>
        </form>
      </Form>
    );
  } else if (page === 3) {
    return <CourseSettings></CourseSettings>;
  }
}
