import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Layout from "@/libs/components/layout";
import Button from "@/libs/components/Button/Button";
import useMutation from "@/libs/client/useMutation";

import MutationResult from "@/types/type";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Registration = () => {
  const [regist, { loading, data, error }] = useMutation<MutationResult>(
    "/api/users/create-account/registration"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>({
    mode: "onChange",
  });
  const password = watch("password");

  const emailValidate = (value: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(value) || "올바른 이메일 형식이 아닙니다.";
  };

  const passwordValidate = (value: string) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i;
    return (
      regex.test(value) ||
      "비밀번호는 영어, 숫자, 특수문자를 포함해 8-20자여야 합니다."
    );
  };

  const onValid = (registrationFormData: RegistrationFormData) => {
    if (loading) return;
    regist(registrationFormData);
  };

  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/create-account/registration" && data?.ok) {
      alert("회원가입이 성공적으로 진행되었습니다!");
      router.push("/log-in");
    } else if (
      router.pathname === "/create-account/registration" &&
      data?.error
    ) {
      alert(data?.error);
    }
  }, [data, router]);

  return (
    <Layout>
      <Head>
        <title>트위터 가입 / 트위터</title>
      </Head>
      <div className="mt-auto mb-auto ml-auto mr-auto pb-[46px] min-w-[364px] max-w-[364px] px-[30px]">
        <div className="my-[19px]">
          <h1 className="font-bold leading-[30px] text-[25px] break-all">
            계정을 생성하세요
          </h1>
        </div>

        <form onSubmit={handleSubmit(onValid)}>
          <div className="relative mb-3" data-te-input-wrapper-init>
            <input
              {...register("name", {
                required: "이름을 입력해 주세요.",
              })}
              type="text"
              placeholder="이름"
              className={`flex items-center justify-center w-full h-12 p-3 mt-2 text-sm border focus:border-sky-500 border-gray-200 outline-none rounded-xl bg-white/0 ${
                errors.name &&
                "bg-red-50 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              }`}
            />
            {errors.name && (
              <div className="mb-3 ml-2 text-red-500 text-normal">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="relative mb-3">
            <input
              {...register("email", {
                required: "올바른 이메일을 입력해 주세요.",
                validate: {
                  emailValidate,
                },
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
                validate: {
                  passwordValidate,
                },
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
          <div className="relative mb-3">
            <input
              {...register("passwordConfirm", {
                required: "위와 같은 비밀번호를 입력해 주세요.",
                validate: {
                  validate: (value) =>
                    value === password || "비밀번호가 일치하지 않습니다.",
                },
              })}
              type="password"
              className={`flex items-center justify-center w-full h-12 p-3 mt-2 text-sm border focus:border-sky-500 border-gray-200 outline-none rounded-xl bg-white/0 ${
                errors.passwordConfirm &&
                "bg-red-50 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              }`}
              placeholder="비밀번호 확인"
            />
            {errors.passwordConfirm && (
              <div className="mb-3 ml-2 text-red-500 text-normal ">
                {errors.passwordConfirm.message}
              </div>
            )}
          </div>
          <Button text="가입하기" type="dark" />
        </form>
      </div>
    </Layout>
  );
};

export default Registration;
