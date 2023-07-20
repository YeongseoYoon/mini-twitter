import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex justify-center min-w-[576px] max-w-5xl w-full">
      <div className="flex flex-col justify-center">
        <Header />
        <main className="flex flex-col min-w-[576px] items-center flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
