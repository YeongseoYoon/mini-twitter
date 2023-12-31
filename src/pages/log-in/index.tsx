import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useMutation } from "@/libs/client";
import { Layout, Button } from "@/libs/components";
import MutationResult from "@/types";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [login, { loading, data }] =
    useMutation<MutationResult>("/api/users/log-in");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const onValid = (loginFormData: LoginFormData) => {
    if (loading) return;
    login(loginFormData);
  };

  const router = useRouter();
  useEffect(() => {
    if (data?.isSuccess) {
      router.replace("/");
    } else if (data?.error) {
      alert(data?.error);
    }
  }, [data, router]);

  return (
    <Layout>
      <Head>
        <title>트위터 로그인 / 트위터</title>
      </Head>
      <div className="justify-between mt-auto mb-auto ml-auto mr-auto pb-[46px] min-w-[364px] max-w-[364px] px-[30px]">
        <div className="my-[19px]">
          <h1 className="font-bold leading-[30px] text-[25px] break-all">
            트위터에 로그인하기
          </h1>
        </div>
        <Button
          text="Google 로그인"
          type="light"
          logo={<FcGoogle size="17px" />}
        />
        <Button
          text="Github 로그인"
          type="light"
          logo={<FaGithub size="17px" />}
        />
        <div className="flex items-center mt-4 mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <div className="mx-4 text-black">또는</div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onValid)}>
          <div className="relative mb-3">
            <input
              {...register("email", {
                required: "올바른 이메일을 입력해 주세요.",
              })}
              type="email"
              className={`flex items-center justify-center w-full h-12 p-3 mt-2 text-sm border focus:border-sky-500 border-gray-200 outline-none rounded-xl bg-white/0 ${
                errors?.email &&
                "bg-red-50 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              }`}
              placeholder="이메일"
            />
            {errors?.email && (
              <div className="mb-3 ml-2 text-red-500 text-normal ">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="relative mb-3">
            <input
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
              })}
              className={`flex items-center justify-center w-full h-12 p-3 mt-2 text-sm border focus:border-sky-500 border-gray-200 outline-none rounded-xl bg-white/0 ${
                errors.password &&
                "bg-red-50 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              }`}
              placeholder="비밀번호"
              type="password"
            />
            {errors.password && (
              <div className="mb-3 ml-2 text-red-500 text-normal ">
                {errors.password.message}
              </div>
            )}
          </div>
          <Button text="로그인" type="dark" />
        </form>
        <div className="text-gray-600 mt-[38px] text-[14px] leading-[19px] break-words">
          <span>계정이 없으신가요? </span>
          <span className="cursor-pointer text-sky-500">
            <Link href="/create-account">가입하기</Link>
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
