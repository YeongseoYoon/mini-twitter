import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
export default function footer() {
  return (
    <footer className="border-t border-[#eff3f4]">
      <div className="grid grid-cols-4 h-14">
        <div className="flex items-center justify-center">
          <AiOutlineHome size="24px" className="cursor-pointer" />
        </div>
        <div className="flex items-center justify-center">
          <AiOutlineSearch size="24px" className="cursor-pointer" />
        </div>
        <div className="flex items-center justify-center">
          <MdOutlineLocalPostOffice size="24px" className="cursor-pointer" />
        </div>
        <div className="flex items-center justify-center">
          <HiOutlineUser size="24px" className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
