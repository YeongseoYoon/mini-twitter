import Head from "next/head";
import useSWR from "swr";
import { Tweet, User } from "@prisma/client";
import Layout from "@/libs/components/layout";
import TweetCard from "@/libs/components/TweetCard/TweetCard";

interface Tweets extends Tweet {
  user: User;
  _count: {
    favorites: number;
  };
}

interface TweetsResponse {
  ok: boolean;
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
          key={tweet?.id}
          id={tweet?.id}
          user={tweet?.user}
          favoriteCount={tweet?._count.favorites}
          content={tweet?.content}
        />
      ))}
    </Layout>
  );
};

export default Home;
