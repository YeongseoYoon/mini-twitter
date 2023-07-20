import Head from "next/head";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import Layout from "@/libs/components/layout";
import MutationResult from "@/types/type";

interface TweetFormData {
  content: string;
}

const Write = () => {
  useUser();
  const [write, { loading, data }] = useMutation<MutationResult>("/api/tweets");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TweetFormData>({
    mode: "onChange",
  });

  const onValid = (tweetFormData: TweetFormData) => {
    if (loading) return;
    write(tweetFormData);
  };

  return (
    <Layout>
      <Head>
        <title>새 트윗 작성 / 트위터</title>
      </Head>
      <div className="flex w-full px-4">
        <form className="w-full" onSubmit={handleSubmit(onValid)}>
          <div className="flex flex-col w-full">
            <div className="flex flex-row">
              <div className="flex-shrink-0 basis-11">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <img className="rounded-full h-11 w-11" />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="px-4 bg-white">
                  <div className="w-full">
                    <textarea
                      className="block w-full p-3 outline-none resize-none"
                      placeholder="무슨일이 일어나고 있나요?"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end w-full my-2">
              <button className="px-4 h-8 text-white bg-sky-500 rounded-2xl w-15 text-[14px]">
                Tweet
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Write;
