import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { Tweet, User } from "@prisma/client";
import Layout from "@/libs/components/layout";
import useUser from "@/libs/client/useUser";
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
  useUser();
  const { data } = useSWR<TweetsResponse>("/api/tweets");
  return (
    <Layout>
      <Head>
        <title>홈 / 트위터</title>
      </Head>
      {data?.tweets?.map((tweet) => (
        <Link
          href={`/tweet/${tweet?.id}`}
          key={tweet?.id}
          className="flex flex-col justify-center w-full"
        >
          <TweetCard
            user={tweet?.user}
            favorites={tweet?._count.favorites}
            content={tweet?.content}
          />
        </Link>
      ))}
    </Layout>
  );
};

export default Home;
