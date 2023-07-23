import { Tweet, User } from "@prisma/client";
import useSWR from "swr";
import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line, RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { LuShare } from "react-icons/lu";
import useMutation from "@/libs/client/useMutation";
import { makeClassName } from "@/libs/utils/makeClassName";
import Link from "next/link";
import { useState } from "react";

interface TweetCardProps {
  id: string;
  content: string;
  user: User;
  favoriteCount: number;
}

interface TweetWithUser extends Tweet {
  user: User;
}
interface TweetCardDetailResponse {
  ok: boolean;
  tweet: TweetWithUser;
  isLiked: boolean;
}

const TweetCard = ({ content, favoriteCount, user, id }: TweetCardProps) => {
  const [favorite, setFavorite] = useState(favoriteCount);
  const { data, mutate } = useSWR<TweetCardDetailResponse>(
    id ? `/api/tweets/${id}` : null
  );
  const [toggleFavoriteButton] = useMutation(`/api/tweets/${id}/fav`);
  const onFavoriteButtonClick = () => {
    if (!data) return;
    setFavorite(favorite + (favorite ? -1 : 1));
    mutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleFavoriteButton({});
  };
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
                      onClick={onFavoriteButtonClick}
                      className={makeClassName(
                        "p-3  flex flex-row rounded-md items-center hover:bg-gray-100 justify-center ",
                        data?.isLiked
                          ? "text-red-500  hover:text-red-600"
                          : "text-gray-400  hover:text-gray-500"
                      )}
                    >
                      {data?.isLiked ? (
                        <RiHeart3Fill className="inline-flex" size="17" />
                      ) : (
                        <RiHeart3Line className="inline-flex" size="17" />
                      )}
                    </button>

                    <div className="inline-flex items-center overflow-hidden text-[13px]">
                      {favorite}
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
