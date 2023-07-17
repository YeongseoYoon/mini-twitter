export default function Header() {
  return (
    <header className="flex justify-center w-full h-[53px] pl-4 pr-4">
      <div className="basis-1/2"></div>
      <div className="flex items-center self-center min-w-[32px]">
        <img
          className="w-[30px] h-[30px]"
          src="https://abs.twimg.com/favicons/favicon.ico"
          alt="Twitter Icon"
        />
      </div>
      <div className="basis-1/2"></div>
    </header>
  );
}
