import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CourseData from "@/data/coursedata";

export default function TabLib() {
  return (
    <div className="pt-2">
      <Label className="font-medium text-[#807E7E] text-xl ">
        Find all your offline downloads here:
      </Label>
      <div className=" pt-8">
        {CourseData.map((item) => (
          <Accordion type="single" collapsible key={item.title + item.desc}>
            <AccordionItem value={item.title} key={item.title}>
              <AccordionTrigger>
                {item.title} ({item.desc})
              </AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
