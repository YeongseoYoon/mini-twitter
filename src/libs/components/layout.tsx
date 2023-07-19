import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex justify-center overflow-y-auto">
      <div className="flex flex-col max-w-[1100px] justify-center">
        <Header />
        <main className="flex flex-col items-center flex-1 ">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
