import { useRouter } from "next/router";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  return (
    <header className="max-w-[1100px] sticky top-0 bg-white flex w-full justify-center h-[53px] pl-4 pr-4">
      <div className="bg-white flex justify-center w-full h-[53px]">
        <div className="flex basis-1/2 min-w-[53px] min-h-[30px] items-center">
          {router.pathname === "/" || router.pathname === "/log-in" ? null : (
            <Link href="/" prefetch={false} className="cursor-pointer">
              <MdClose size="19px" />
            </Link>
          )}
        </div>
        <div className="flex items-center justify-center self-center min-w-[32px]">
          <FaTwitter size="25px" color="#1D9BF0" />
        </div>
        <div className="basis-1/2"></div>
      </div>
    </header>
  );
}
