import Link from "next/link";
import useSWR from "swr";
import { User } from "@prisma/client";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { FiFeather } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";

interface UserResponse {
  ok: Boolean;
  profile: User;
}

export default function footer() {
  const { data } = useSWR<UserResponse>("/api/users/me");
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
        <Link
          href={`/profile/${data?.profile?.id}`}
          className="flex items-center justify-center cursor-pointer"
        >
          <div>
            <HiOutlineUser size="24px" />
          </div>
        </Link>
      </div>
    </footer>
  );
}
