import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { RxCalendar } from "react-icons/rx";
import { RiChat1Line } from "react-icons/ri";
import Layout from "@/libs/components/layout";
import { makeFormattedDate } from "@/libs/utils/makeFormattedDate";
import { UserWithoutPassword } from "@/types/type";

interface ProfileResponse {
  ok: Boolean;
  profile: UserWithoutPassword;
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
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-between w-full h-52">
          <div className="w-full h-[50%] bg-gray-300"></div>
          <div className="relative w-full h-[50%] px-4 pt-3">
            <div className="justify-between w-full">
              <div className="absolute flex justify-center p-1 items-center bg-white w-20 h-20 rounded-full bottom-[64px] left-6">
                <img
                  className="w-full h-full rounded-full"
                  src={data?.profile.avatar || ""}
                />
              </div>
              <div className="flex items-center mt-2 mr-2">
                <button className="w-auto h-auto px-2 py-2 ml-auto text-xs font-bold border-2 border-gray-300 rounded-full">
                  Set Up Profile
                </button>
              </div>
            </div>
            <div className="text-base font-bold">{data?.profile.name}</div>
            <div className="text-sm font-bold text-gray-500">
              {"@" + data?.profile?.email?.split("@")[0]}
            </div>
            <div className="flex flex-row my-2 text-sm text-gray-500 align-middle item-center">
              <div className="flex items-center mr-1">
                <RxCalendar />
              </div>
              {"Joined " +
                makeFormattedDate(data?.profile?.createdAt || "").month +
                " " +
                makeFormattedDate(data?.profile?.createdAt || "").year}
            </div>
          </div>
        </div>
        <div className="w-full mt-10">
          <div className="text-gray-500 text-[14px] whitespace-nowrap break-words my-[15px]" />
          <div className="flex flex-wrap">
            <div className="w-full border border-b-0 border-gray-200" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
