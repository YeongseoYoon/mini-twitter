import Head from "next/head";

import Layout from "@/libs/components/layout";
import useUser from "@/libs/client/useUser";

const Home = () => {
  useUser();
  return (
    <Layout>
      <Head>
        <title>트위터 가입 / 트위터</title>
      </Head>
    </Layout>
  );
};

export default Home;
