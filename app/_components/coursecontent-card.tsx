import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";

interface CourseDetails {
  name: string;
  image: any;
  size: string;
  link: string;
}

export default function CourseContent({
  name,
  image,
  size,
  link,
}: CourseDetails) {
  if (!name) {
    return <h3>Sorry, unavailable</h3>;
  }

  return (
    <Card className="bg-transparent border-none max-w-[143px] shadow-none">
      <CardHeader className="p-0 max-w-[143px]">
        <CardTitle className="text-primary text-2xl font-bold">
          <img src={image} alt="book image" />
        </CardTitle>
        <CardDescription className="font-medium truncate">
          {name}{" "}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between p-0 w-full">
        <Button variant="link" size="sm" className="p-0" asChild>
          <Link href={link} download>
            <DownloadIcon />
          </Link>
        </Button>
        {size}
      </CardFooter>
    </Card>
  );
}
