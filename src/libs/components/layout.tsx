import Header from "./header";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-[1100px] h-screen justify-center">
        <Header />
        <main className="flex flex-col items-center justify-between flex-1 h-screen ">
          {children}
        </main>
      </div>
    </div>
  );
}
