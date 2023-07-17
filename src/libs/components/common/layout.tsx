import Header from "./header";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between min-h-screen p-24">
        {children}
      </main>
    </>
  );
}
