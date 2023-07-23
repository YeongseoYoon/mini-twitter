import Head from "next/head";
import useSWR from "swr";
import { Tweet, User } from "@prisma/client";
import Layout from "@/libs/components/layout";
import TweetCard from "@/libs/components/TweetCard/TweetCard";
import { useState } from "react";
import useMutation from "@/libs/client/useMutation";

interface Tweets extends Tweet {
  user: User;
  _count: {
    favorites: number;
  };
  isLiked: boolean;
}

interface TweetsResponse {
  ok: boolean;
  tweets: Tweets[];
}

const Home = () => {
  const { data } = useSWR<TweetsResponse>("/api/tweets");
  const [selectedTweetId, setSelectedTweetId] = useState<string | null>(null);
  const [toggleFavoriteButton] = useMutation(
    `/api/tweets/${selectedTweetId}/fav`
  );
  const onFavoriteButtonClick = (tweetId: string) => {
    setSelectedTweetId(tweetId);
    toggleFavoriteButton({});
  };

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
          isLiked={tweet?.isLiked}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />
      ))}
    </Layout>
  );
};

export default Home;
