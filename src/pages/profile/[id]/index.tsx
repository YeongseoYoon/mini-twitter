import Head from "next/head";
import { useRouter } from "next/router";
import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line, RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { LuShare } from "react-icons/lu";
import { Tweet, User } from "@prisma/client";
import Layout from "@/libs/components/layout";
import useSWR from "swr";

interface ProfileResponse {
  ok: Boolean;
  profile: User;
}

const Profile = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<ProfileResponse>(
    router.query.id ? `/api/users/profile/${router.query.id}` : null
  );

  return (
    <Layout>
      <Head>
        <title>{data?.profile.name} / 트위터</title>
      </Head>
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-xl py-4 bg-white rounded-xl">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                className="rounded-full h-11 w-11"
                src={data?.profile.avatar || ""}
              />
              <div className="ml-4 text-sm leading-tight">
                <span className="block font-bold text-black ">{}</span>
                <span className="block font-normal text-gray-500">{}</span>
              </div>
            </div>
            <BsThreeDots
              size="11"
              className="inline-block w-[17px] h-auto text-gray-400 cursor-pointer"
            />
          </div>
          <p className="block mt-3 leading-snug text-black text-[16px] break-words">
            {}
          </p>

          <div className="text-gray-500 text-[14px] whitespace-nowrap break-words my-[15px]">
            <div className="inline-flex overflow-hidden cursor-pointer hover:underline">
              <span>{}</span>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full border border-b-0 border-gray-200" />
            <div className="py-4 mr-5 cursor-pointer hover:underline">
              <div className="inline-flex overflow-hidden font-bold text-[13px]">
                {}
              </div>
              <span className="ml-1 text-[13px]  text-gray-500">Comments</span>
            </div>
            <div className="py-4 mr-5 cursor-pointer hover:underline">
              <div className="inline-flex overflow-hidden font-bold text-[13px]">
                {}
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
              <div className="flex items-center justify-center py-4 cursor-pointer"></div>
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

export default Profile;
