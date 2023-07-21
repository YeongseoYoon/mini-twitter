import Head from "next/head";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import Layout from "@/libs/components/layout";
import MutationResult from "@/types/type";
import { useEffect } from "react";
import { useRouter } from "next/router";

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

  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.replace("/");
    } else if (data?.error) {
      alert(data?.error);
    }
  }, [data, router]);

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
                      {...register("content", {
                        required: "내용은 한 글자 이상 입력되어야 합니다.",
                      })}
                      className="block w-full p-3 outline-none resize-none"
                      placeholder="무슨일이 일어나고 있나요?"
                      rows={4}
                    />
                    {errors?.content && (
                      <div className="mb-3 ml-2 text-red-500 text-normal ">
                        {errors.content.message}
                      </div>
                    )}
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
