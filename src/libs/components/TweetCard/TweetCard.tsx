import Link from "next/link";
import { useEffect, useState } from "react";

import useSWRMutation from "swr/mutation";

import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line, RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { LuShare } from "react-icons/lu";
import { makeClassName } from "@/libs/utils/makeClassName";
import { UserWithoutPassword } from "@/types/type";

interface TweetCardProps {
  id: string;
  content: string;
  user: UserWithoutPassword;
  favoriteCount: number;
  isLiked: boolean;
}

const TweetCard = ({
  content,
  favoriteCount: initialFavoriteCount,
  user,
  id,
  isLiked: initialIsLiked,
}: TweetCardProps) => {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setFavoriteCount(initialFavoriteCount);
    setIsLiked(initialIsLiked);
  }, [initialFavoriteCount, initialIsLiked]);

  const { trigger } = useSWRMutation(
    `/api/tweets/${id}/fav`,
    () =>
      fetch(`/api/tweets/${id}/fav`, {
        method: "POST",
      }),
    {
      onSuccess: () => {
        setIsLiked(!isLiked);
        setFavoriteCount(isLiked ? favoriteCount - 1 : favoriteCount + 1);
      },
    }
  );

  return (
    <div className="flex flex-col justify-center w-full">
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
                <Link href={`/tweet/${id}`}>
                  <p className="block my-3 leading-snug text-gray-600 text-[14px] break-words">
                    {content}
                  </p>
                </Link>
              </div>
              <div className="flex">
                <div className="grid w-full grid-cols-3 mb-2 text-xl text-gray-500">
                  <div className="flex flex-row mr-5 cursor-pointer">
                    <button
                      className={
                        "p-3 flex flex-row rounded-md items-center hover:bg-gray-100 justify-center text-gray-400  hover:text-gray-500"
                      }
                    >
                      <RiChat1Line className="inline-flex" size="17" />
                    </button>

                    <div className="inline-flex overflow-hidden text-[13px]">
                      {}
                    </div>
                  </div>
                  <div className="flex flex-row mr-5 cursor-pointer">
                    <button
                      onClick={() => trigger()}
                      className={makeClassName(
                        "p-3  flex flex-row rounded-md items-center hover:bg-gray-100 justify-center ",
                        isLiked
                          ? "text-red-500  hover:text-red-600"
                          : "text-gray-400  hover:text-gray-500"
                      )}
                    >
                      {isLiked ? (
                        <RiHeart3Fill className="inline-flex" size="17" />
                      ) : (
                        <RiHeart3Line className="inline-flex" size="17" />
                      )}
                    </button>

                    <div className="inline-flex items-center overflow-hidden text-[13px]">
                      {favoriteCount}
                    </div>
                  </div>
                  <div className="flex flex-row mr-5 cursor-pointer">
                    <button
                      className={
                        "p-3 flex flex-row rounded-md items-center hover:bg-gray-100 justify-center text-gray-400  hover:text-gray-500"
                      }
                    >
                      <LuShare className="inline-flex" size="17" />
                    </button>

                    <div className="inline-flex overflow-hidden text-[13px]">
                      {}
                    </div>
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
