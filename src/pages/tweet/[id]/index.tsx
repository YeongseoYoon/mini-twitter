import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line, RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { LuShare } from "react-icons/lu";
import { Tweet } from "@prisma/client";
import Layout from "@/libs/components/layout";
import { makeFormattedDate } from "@/libs/utils/makeFormattedDate";
import { makeClassName } from "@/libs/utils/makeClassName";
import { UserWithoutPassword } from "@/types/type";

interface TweetDetail extends Tweet {
  user: UserWithoutPassword;
  _count: {
    favorites: number;
  };
}

interface TweetDetailResponse {
  isSuccess: boolean;
  tweet: TweetDetail;
  isLiked: boolean;
}

type TweetDetailProps = {
  id: string;
};

const TweetDetail = ({ id }: TweetDetailProps) => {
  const { data } = useSWR<TweetDetailResponse>(`/api/tweets/${id}`);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    setFavoriteCount(data?.tweet._count.favorites || 0);
    setIsLiked(data?.isLiked || false);
  }, [data?.tweet._count.favorites, data?.isLiked]);

  const { trigger } = useSWRMutation(
    `/api/tweets/${data?.tweet.id}/fav`,
    () =>
      fetch(`/api/tweets/${data?.tweet.id}/fav`, {
        method: "POST",
      }),
    {
      onSuccess: () => {
        setIsLiked(!isLiked);
        setFavoriteCount(favoriteCount + (favoriteCount ? -1 : 1));
      },
    }
  );

  return (
    <Layout>
      <Head>
        <title>{data?.tweet.content} / 트위터</title>
      </Head>
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-xl">
          <div className="px-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <img
                  className="rounded-full h-11 w-11"
                  src={data?.tweet?.user?.avatar || ""}
                />
                <div className="ml-4 text-sm leading-tight">
                  <span className="block font-bold text-black ">
                    {data?.tweet?.user.name}
                  </span>
                  <span className="block font-normal text-gray-500">
                    {"@" + data?.tweet?.user?.email?.split("@")[0]}
                  </span>
                </div>
              </div>
              <BsThreeDots
                size="11"
                className="inline-block w-[17px] h-auto text-gray-400 cursor-pointer"
              />
            </div>
            <p className="block mt-3 leading-snug text-black text-[16px] break-words">
              {data?.tweet?.content}
            </p>

            <div className="text-gray-500 text-[14px] whitespace-nowrap break-words my-[15px]">
              <div className="inline-flex overflow-hidden cursor-pointer hover:underline">
                <span>
                  {makeFormattedDate(data?.tweet?.createdAt || "").fullDate}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full border border-b-0 border-gray-200" />
              <div className="py-4 mr-5 cursor-pointer hover:underline">
                <div className="inline-flex overflow-hidden font-bold text-[13px]">
                  {}
                </div>
                <span className="ml-1 text-[13px]  text-gray-500">
                  Comments
                </span>
              </div>
              <div className="py-4 mr-5 cursor-pointer hover:underline">
                <div className="inline-flex overflow-hidden font-bold text-[13px]">
                  {favoriteCount}
                </div>
                <span className="ml-1 text-[13px]  text-gray-500">Likes</span>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full border border-b-0 border-gray-200" />
              <div className="grid w-full grid-cols-3 text-xl h-14">
                <div className="flex items-center justify-center py-4 = cursor-pointer">
                  <RiChat1Line />
                </div>
                <div className="flex items-center justify-center py-4 cursor-pointer">
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
                </div>
                <div className="flex items-center justify-center py-4 cursor-pointer">
                  <LuShare />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({
  query: { id },
}: GetServerSidePropsContext) => {
  return {
    props: {
      id,
    },
  };
};

export default TweetDetail;
