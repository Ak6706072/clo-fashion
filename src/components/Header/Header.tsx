import { LogIn } from "lucide-react";
import React, { use } from "react";
import { PATHS } from "../../constants/constants";
import { useGlobalContext } from "../../GlobalProvider/hooks";

type HeaderProps = {
  title: string;
  btnConfig: {
    title: string;
    onClick: () => void;
  };
};

function Header(props: HeaderProps) {
  const { userInfo, setInGlobalContext } = useGlobalContext();
  const { title, btnConfig } = props;

  return (
    <div className="flex justify-between p-[20px]">
      <div>{title}</div>

      {btnConfig?.title && (
        <div className="flex gap-2 cursor-pointer">
          <button
            className="bg-green-600 text-black p-[12px]"
            onClick={() => {
              if (typeof btnConfig?.onClick === "function") {
                btnConfig.onClick();
              }
            }}
          >
            Required Feature
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
