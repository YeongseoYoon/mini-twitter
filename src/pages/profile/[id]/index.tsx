import Head from "next/head";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { Tweet, User } from "@prisma/client";
import useSWR, { SWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { RxCalendar } from "react-icons/rx";

import { Layout } from "@/libs/components";
import { makeFormattedDate } from "@/libs/utils";
import { UserWithoutPassword } from "@/types";
import { client } from "@/libs/server";
import { withSsrSession } from "@/libs/server/withSession";

interface Profile extends UserWithoutPassword {
  tweets: Tweet[];
  _count: {
    favorites: number;
  };
  isLiked: boolean;
}

interface ProfileResponse {
  isSuccess: Boolean;
  profile: Profile;
}

const Profile = ({ initialProfile }: { initialProfile: Profile }) => {
  const router = useRouter();
  const { data, mutate } = useSWR<ProfileResponse>(
    initialProfile.id ? `/api/users/profile/${initialProfile.id}` : null
  );
  const { trigger } = useSWRMutation(
    "/api/log-out",
    () =>
      fetch("/api/users/log-out", {
        method: "POST",
      }),
    {
      onSuccess: () => {
        alert("로그아웃 되었습니다!");
        router.push("/log-in");
      },
      onError: () => {
        alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
      },
    }
  );

  return (
    <Layout>
      <Head>
        <title>{data?.profile?.name} / 트위터</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-between w-full h-52">
          <div className="w-full h-[50%] bg-gray-300"></div>
          <div className="relative w-full h-[50%] px-4 pt-3">
            <div className="justify-between w-full">
              <div className="absolute flex justify-center p-1 items-center bg-white w-20 h-20 rounded-full bottom-[64px] left-6">
                <img
                  className="w-full h-full rounded-full"
                  src={data?.profile?.avatar || ""}
                />
              </div>
              <div className="flex items-center mt-2">
                <div className="ml-auto ">
                  <button className="h-auto px-2 py-2 ml-2 text-xs font-bold border-2 border-gray-300 rounded-full cursor-pointer first-letter:w-auto">
                    Set Up Profile
                  </button>
                  <button
                    onClick={() => {
                      trigger();
                    }}
                    className="w-auto h-auto px-2 py-2 ml-2 text-xs font-bold border-2 border-gray-300 rounded-full cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="text-base font-bold">{data?.profile?.name}</div>
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
const Page: NextPage<{ profile: Profile }> = ({ profile }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [`/api/users/profile/${profile.id}`]: { ok: true, profile },
        },
      }}
    >
      <Profile initialProfile={profile} />
    </SWRConfig>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
}: NextPageContext) {
  const profile = await client.user.findUnique({
    where: { id: req?.session.user?.id },
  });
  return {
    props: {
      profile: JSON.parse(JSON.stringify(profile)),
    },
  };
});

export default Page;
