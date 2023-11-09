import { NextPage } from "next";
import Head from "next/head";
import useSWR, { SWRConfig } from "swr";
import { Tweet } from "@prisma/client";
import { Layout, TweetCard } from "@/libs/components";
import { UserWithoutPassword } from "@/types";
import { client } from "@/libs/server";
interface Tweets extends Tweet {
  user: UserWithoutPassword;
  _count: {
    favorites: number;
  };
  isLiked: boolean;
}

interface TweetsResponse {
  isSuccess: boolean;
  tweets: Tweets[];
}

const Home = () => {
  const { data } = useSWR<TweetsResponse>("/api/tweets");
  return (
    <Layout>
      <Head>
        <title>홈 / 트위터</title>
      </Head>
      {data?.tweets?.map((tweet) => (
        <TweetCard
          key={tweet.id}
          id={tweet.id}
          user={tweet.user}
          favoriteCount={tweet._count.favorites}
          content={tweet.content}
          isLiked={tweet.isLiked}
        />
      ))}
    </Layout>
  );
};

const Page: NextPage<{ tweets: Tweets[] }> = ({ tweets }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/tweets": {
            isSuccess: true,
            tweets,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const tweets = await client.tweet.findMany({
    include: {
      _count: {
        select: {
          favorites: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          createdAt: true,
        },
      },
    },
  });

  return {
    props: {
      tweets: JSON.parse(JSON.stringify(tweets)),
    },
  };
}

export default Page;
