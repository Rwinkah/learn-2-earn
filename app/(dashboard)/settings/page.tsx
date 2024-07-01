import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsForm } from "@/app/_components/settings-form";

export const metadata: Metadata = {
  title: "Settings",
  openGraph: { title: "Settings" },
  twitter: { title: "Settings" },
};

export default function page() {
  return (
    <>
      <h1 className="font-bold text-4xl mb-0s">Account settings</h1>
      <Tabs defaultValue="profile" className="w-full min-h-[87vh]">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <SettingsForm page={1} />
        </TabsContent>
        <TabsContent value="password">
          <SettingsForm page={2} />
        </TabsContent>
        <TabsContent value="courses">
          <SettingsForm page={3} />
        </TabsContent>
      </Tabs>
    </>
  );
}
