import { ButtonType } from "./Button.type";

interface ButtonProps {
  text: string;
  type: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  logo?: React.ReactNode;
}

const Button = ({ text, type, logo, onClick }: ButtonProps) => {
  const getButtonStyle = () => {
    if (type === "dark") {
      return "bg-black text-white";
    } else if (type === "light") {
      return "bg-white text-black";
    } else if (type === "blueDark") {
      return "bg-sky-500 text-white";
    } else if (type === "blueLight") {
      return "bg-white text-sky-500";
    }
  };
  return (
    <div className="cursor-pointer w-[300px] h-[40px] my-[11px] mx-auto">
      <div
        className={`flex justify-center w-full h-full border border-zinc-300 rounded-[40px] ${getButtonStyle()}`}
      >
        <button
          onClick={onClick}
          className="flex w-[260px] m-auto justify-center font-bold text-[14px]"
        >
          {logo && <div className="flex items-center mr-2">{logo}</div>}
          {text}
        </button>
      </div>
    </div>
  );
};

export default Button;
