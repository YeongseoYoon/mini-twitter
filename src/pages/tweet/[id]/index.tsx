import Layout from "@/libs/components/layout";
import Head from "next/head";

import { BsThreeDots } from "react-icons/bs";

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
              <div className="ml-1.5 text-sm leading-tight">
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
          <img className="mt-2 border border-gray-100 rounded-2xl dark:border-gray-700" />
          <p className="text-gray-500 py-1 my-0.5 text-[14px] whitespace-nowrap break-words cursor-pointer">
            10:05 AM · Dec 19, 2020
            <div className="inline-flex overflow-hidden px-[4px]">
              <span>·</span>
            </div>
            <div className="inline-flex overflow-hidden">
              <span className="text-gray-700 font-bold leading-[15px] py-1 my-0.5 text-[14px] whitespace-nowrap break-words">
                2.1M
              </span>
            </div>
            <div className="inline-flex overflow-hidden px-[4px]">
              <span>Views</span>
            </div>
          </p>
          <div className="my-1 border border-b-0 border-gray-200 dark:border-gray-600"></div>
          <div className="flex mt-3 text-gray-500 dark:text-gray-400">
            <div className="flex items-center mr-6">
              <span className="ml-3">615</span>
            </div>
            <div className="flex items-center mr-6">
              <span className="ml-3">93 people are Tweeting about this</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TweetDetail;
