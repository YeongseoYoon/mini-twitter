import Link from "next/link";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { FiFeather } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";

export default function footer() {
  return (
    <footer className="border-t bg-white sticky bottom-0 border-[#eff3f4]">
      <div className="grid grid-cols-4 h-14">
        <Link
          href="/"
          className="flex items-center justify-center cursor-pointer"
        >
          <div>
            <AiOutlineHome size="24px" />
          </div>
        </Link>
        <div className="flex items-center justify-center">
          <AiOutlineSearch size="24px" className="cursor-pointer" />
        </div>
        <Link
          href="/write"
          className="flex items-center justify-center cursor-pointer"
        >
          <div>
            <FiFeather size="24px" />
          </div>
        </Link>
        <div className="flex items-center justify-center">
          <HiOutlineUser size="24px" className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
