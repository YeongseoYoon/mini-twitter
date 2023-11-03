import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Layout, Button } from "@/libs/components";

const CreateAccount = () => {
  const router = useRouter();
  const onCreateAccountButtonClick = () => {
    router.push("/create-account/registration");
  };
  return (
    <Layout>
      <Head>
        <title>트위터 가입 / 트위터</title>
      </Head>
      <div className="mt-auto mb-auto ml-auto mr-auto pb-[46px] min-w-[364px] max-w-[364px] px-[30px]">
        <div className="my-[19px]">
          <h1 className="font-bold leading-[30px] text-[25px] break-all">
            지금 트위터에 가입하세요
          </h1>
        </div>
        <Button
          text="Google로 가입하기"
          type="light"
          logo={<FcGoogle size="17px" />}
        />
        <Button
          text="Github로 가입하기"
          type="light"
          logo={<FaGithub size="17px" />}
        />
        <div className="flex items-center mt-4 mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <div className="mx-4 text-black">또는</div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <Button
          text="계정 만들기"
          type="dark"
          onClick={onCreateAccountButtonClick}
        />
        <p className="text-gray-600 text-[12px] leading-[15px]">
          가입하시려면 <span className="text-sky-500">쿠키 사용</span>을 포함해{" "}
          <span className="text-sky-500">이용약관</span>과
          <span className="text-sky-500"> 개인정보처리방침</span>에 동의해야
          합니다.
        </p>
        <div className="text-gray-600 mt-[38px] text-[14px] leading-[19px] break-words">
          <span>이미 계정이 있으신가요? </span>
          <span className="cursor-pointer text-sky-500">
            <Link href="/log-in">로그인</Link>
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAccount;
