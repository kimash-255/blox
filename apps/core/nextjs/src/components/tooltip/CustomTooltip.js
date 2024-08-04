import React, { useRef, useState, useEffect } from "react";
import { computePosition, autoPlacement } from "@floating-ui/react";

const CustomTooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyles, setTooltipStyles] = useState({});
  const referenceRef = useRef(null);
  const tooltipRef = useRef(null);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  useEffect(() => {
    if (isVisible && referenceRef.current && tooltipRef.current) {
      computePosition(referenceRef.current, tooltipRef.current, {
        placement: "top-end",
        middleware: [autoPlacement()],
      }).then(({ x, y, middlewareData }) => {
        setTooltipStyles({
          position: "absolute",
          top: `${y - 50}px`,
        });
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={referenceRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className="relative flex items-center w-full"
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={tooltipStyles}
          className="shadow-soft-md bg-150 bg-x-25 leading-pro bg-gradient-to-tl from-purple-700 to-pink-500 hover:shadow-soft-2xl hover:scale-102 text-white text-xs font-medium py-2 px-4 rounded-lg shadow-lg relative"
        >
          {content}
          <div className="absolute w-3 h-3 bg-purple-700 transform rotate-45 -bottom-1 right-1"></div>
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
