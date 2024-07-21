import Link from "next/link";
import { ToastContainer } from "react-toastify";

const Layout = ({ children, gradientFrom, gradientTo, className = "" }) => {
  return (
    <div
      className={`min-h-screen w-full py-6 flex flex-col justify-center md:py-12 ${className}`}
    >
      <div className="relative py-3 mx-auto">
        <div
          className={`absolute inset-0 bg-gradient-to-tl from-${gradientFrom} to-${gradientTo} shadow-lg transform -skew-y-6 skew-y-0 -rotate-6 rounded-3xl`}
        ></div>
        <div className="relative px-4 py-8 md:px-8 bg-white shadow-lg rounded-3xl w-[300px] md:w-[400px]">
          <div className="text-2xl text-black font-semibold text-center"></div>
          <ToastContainer />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
