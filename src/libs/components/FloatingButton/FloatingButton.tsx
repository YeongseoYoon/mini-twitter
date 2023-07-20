import Link from "next/link";
import React from "react";
import { FiFeather } from "react-icons/fi";

export default function FloatingButton() {
  return (
    <div className="sticky right-2">
      <Link
        href="/write"
        className="flex items-center justify-center text-white transition-colors bg-orange-400 border-0 border-transparent rounded-full shadow-xl cursor-pointer hover:bg-orange-500 aspect-square w-14"
      >
        <FiFeather />
      </Link>
    </div>
  );
}
