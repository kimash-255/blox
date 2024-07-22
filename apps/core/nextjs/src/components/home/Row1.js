import React from "react";
import Card from "./Card"; // Update the import path as needed
import {
  faTachometerAlt,
  faBriefcase,
  faUserPlus,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const Row1 = () => {
  return (
    <div className="flex flex-wrap px-4">
      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <Card
          title="System Uptime"
          amount="99.8%"
          percentage="+0.2%"
          percentageColor="text-lime-500"
          icon={faTachometerAlt}
          iconBg="bg-gradient-to-tl from-green-400 to-blue-500"
          bgColor="bg-white"
        />
      </div>

      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <Card
          title="Active Projects"
          amount="124"
          percentage="+12%"
          percentageColor="text-lime-500"
          icon={faBriefcase}
          iconBg="bg-gradient-to-tl from-green-400 to-blue-500"
          bgColor="bg-white"
        />
      </div>

      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <Card
          title="New Users"
          amount="450"
          percentage="+8%"
          percentageColor="text-lime-500"
          icon={faUserPlus}
          iconBg="bg-gradient-to-tl from-green-400 to-blue-500"
          bgColor="bg-white"
        />
      </div>

      <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
        <Card
          title="Revenue"
          amount="KSh 12M"
          percentage="-3%"
          percentageColor="text-red-600"
          icon={faWallet}
          iconBg="bg-gradient-to-tl from-green-400 to-blue-500"
          bgColor="bg-white"
        />
      </div>
    </div>
  );
};

export default Row1;
