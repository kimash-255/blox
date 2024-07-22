import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

const SidebarList = ({ icon, text, link, active }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li className="mt-0.5 w-full">
      <Link
        href={link}
        className={`py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors ${
          isHovered || active ? "shadow-soft-xl bg-white" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 ${
            isHovered || active
              ? "shadow-soft-xl bg-gradient-to-tl from-purple-700 to-pink-500 text-white"
              : "shadow-soft-2xl"
          }`}
        >
          <FontAwesomeIcon
            icon={icon}
            style={{ color: isHovered || active ? "#FFFFFF" : "#701a75" }}
          />
        </div>
        <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
          {text}
        </span>
      </Link>
    </li>
  );
};

export default SidebarList;
