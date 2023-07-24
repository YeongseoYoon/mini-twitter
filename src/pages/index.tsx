import Head from "next/head";
import useSWR from "swr";
import { Tweet } from "@prisma/client";
import Layout from "@/libs/components/layout";
import TweetCard from "@/libs/components/TweetCard/TweetCard";
import { UserWithoutPassword } from "@/types/type";

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

export default Home;
