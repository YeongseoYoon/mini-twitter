import { User } from "@prisma/client";

import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line, RiHeart3Line } from "react-icons/ri";
import { LuShare } from "react-icons/lu";

interface TweetCardProps {
  content: string;
  user: User;
  favorites: number;
}

const TweetCard = ({ content, favorites, user }: TweetCardProps) => {
  return (
    <div>
      <div className="max-w-xl px-4 pt-4 bg-white rounded-xl">
        <div className="w-full">
          <div className="flex flex-row">
            <div className="flex-shrink-0 mr-4 basis-12">
              <img
                className="rounded-full h-11 w-11"
                src={user?.avatar || ""}
              />
            </div>
            <div className="w-full">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-start">
                    <span className="block font-bold text-black mr-2 max-w-[120px] truncate">
                      {user?.name}
                    </span>
                    <span className="block font-normal text-gray-500 max-w-[120px] truncate">
                      {"@" + user?.email?.split("@")[0]}
                    </span>
                  </div>
                  <BsThreeDots
                    size="11"
                    className="inline-block w-[17px] h-auto text-gray-400 cursor-pointer"
                  />
                </div>
                <p className="block my-3 leading-snug text-gray-600 text-[14px] break-words">
                  {content}
                </p>
              </div>
              <div className="flex">
                <div className="grid w-full grid-cols-3 mb-2 text-xl text-gray-500">
                  <div className="mr-5 cursor-pointer hover:underline">
                    <RiChat1Line className="inline-flex" size="17" />
                    <div className="inline-flex overflow-hidden text-[13px]">
                      {}
                    </div>
                  </div>
                  <div className="mr-5 cursor-pointer hover:underline">
                    <RiHeart3Line className="inline-flex" size="17" />
                    <div className="inline-flex overflow-hidden text-[13px]">
                      {favorites}
                    </div>
                  </div>
                  <div className="mr-5 cursor-pointer hover:underline">
                    <LuShare className="inline-flex" size="17" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border border-b-0 border-gray-200" />
    </div>
  );
};

export default TweetCard;
