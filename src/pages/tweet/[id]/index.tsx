import Layout from "@/libs/components/layout";
import Head from "next/head";

import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line, RiHeart3Line } from "react-icons/ri";
import { LuShare } from "react-icons/lu";

const TweetDetail = () => {
  return (
    <Layout>
      <Head>
        <title>홈 / 트위터</title>
      </Head>
      <div className="flex items-center justify-center">
        <div className="max-w-xl p-4 bg-white dark:bg-gray-800 dark:border-gray-800 rounded-xl">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img className="rounded-full h-11 w-11" />
              <div className="ml-4 text-sm leading-tight">
                <span className="block font-bold text-black dark:text-white ">
                  Visualize Value
                </span>
                <span className="block font-normal text-gray-500 dark:text-gray-400">
                  @visualizevalue
                </span>
              </div>
            </div>
            <BsThreeDots
              size="11"
              className="inline-block w-[17px] h-auto text-gray-400 cursor-pointer"
            />
          </div>
          <p className="block mt-3 leading-snug text-black text-[16px] break-words">
            “No one ever made a decision because of a number. They need a
            story.” — Daniel Kahneman
          </p>

          <div className="text-gray-500 text-[14px] whitespace-nowrap break-words my-[15px]">
            <div className="inline-flex overflow-hidden cursor-pointer hover:underline">
              <span>10:05 AM · Dec 19, 2020</span>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full border border-b-0 border-gray-200" />
            <div className="py-4 mr-5 cursor-pointer hover:underline">
              <div className="inline-flex overflow-hidden font-bold text-[13px]">
                33
              </div>
              <span className="ml-1 text-[13px]  text-gray-500">Comments</span>
            </div>
            <div className="py-4 mr-5 cursor-pointer hover:underline">
              <div className="inline-flex overflow-hidden font-bold text-[13px]">
                30
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
                <RiHeart3Line />
              </div>
              <div className="flex items-center justify-center py-4 cursor-pointer">
                <LuShare />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TweetDetail;
