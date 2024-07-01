import lightBook from '@/assets/images/lightBook.png'
import Image from "next/image"

export default function SelectOption() {
    return (
        <select className=" border-none pl-4 w-[100%] h-[48px] focus:outline-none border-grey border rounded-3xl bg-black text-white appearance-none"  name="firstSem" id="firstSem placeholder='select courses'">
            <option className='border-none appearance-none' value="100"> 100</option>
            <option className='border-none appearance-none' value="200">200</option>
            <option className='border-none appearance-none' value="300">300</option>
            <option className='border-none appearance-none' value="400">400</option>
            <option className='border-none appearance-none' value="500">500</option>
            </select>
)
}

