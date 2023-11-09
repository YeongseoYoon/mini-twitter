import { Nanum_Gothic } from "next/font/google";
import { SWRConfig } from "swr";
import "@/styles/globals.css";
import { makeClassName } from "@/libs/utils";

const nanumGothic = Nanum_Gothic({
  variable: "--nanumGothic",
  weight: ["400", "700"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: any) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <main
        className={makeClassName(nanumGothic.className, nanumGothic.variable)}
      >
        <Component {...pageProps} />
      </main>
    </SWRConfig>
  );
}
