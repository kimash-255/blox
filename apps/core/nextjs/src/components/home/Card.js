import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({
  title,
  amount,
  percentage,
  percentageColor,
  icon,
  iconBg,
  bgColor,
}) => {
  return (
    <div
      className={`relative flex flex-col min-w-0 break-words ${bgColor} shadow-soft-xl rounded-2xl bg-clip-border`}
    >
      <div className="flex-auto p-4">
        <div className="flex flex-row -mx-3">
          <div className="flex-none w-2/3 max-w-full px-3">
            <div>
              <p className="mb-0 font-sans text-sm font-semibold leading-normal">
                {title}
              </p>
              <h5 className="mb-0 font-bold">
                {amount}
                <span
                  className={`text-sm leading-normal font-weight-bolder ${percentageColor}`}
                >
                  {percentage}
                </span>
              </h5>
            </div>
          </div>
          <div className="px-3 text-right basis-1/3">
            <div
              className={`flex items-center justify-center w-12 h-12 text-center rounded-lg ${iconBg}`}
            >
              <FontAwesomeIcon icon={icon} className="text-lg text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
