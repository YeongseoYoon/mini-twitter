import { useRouter } from "next/router";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const isFooter = ![
    "/log-in",
    "/create-account",
    "/create-account/registration",
  ].includes(router.pathname);

  return (
    <div className="flex justify-center min-w-[576px] max-w-5xl min-h-screen w-full m-auto">
      <div className="flex flex-col justify-center">
        <Header />
        <main className="flex flex-col min-w-[576px] flex-grow items-center flex-1">
          {children}
        </main>
        {isFooter && <Footer />}
      </div>
    </div>
  );
}
