import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Row2 = () => {
  return (
    <div className="flex flex-wrap mt-6 px-4">
      <div className="w-full px-3 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                <div className="flex flex-col h-full">
                  <p className="pt-2 mb-1 font-semibold">
                    Streamline Operations
                  </p>
                  <h5 className="font-bold">Blox ERP Overview</h5>
                  <p className="mb-4 text-sm">
                    Blox ERP integrates all your business processes into a
                    single platform. From accounting and HR to sales and
                    inventory management, discover how Blox ERP can enhance your
                    operational efficiency.
                  </p>
                  <a className="mt-auto mb-0 text-sm font-semibold leading-normal group text-slate-500">
                    Learn More
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"
                    />
                  </a>
                </div>
              </div>
              <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
                <div className="h-full bg-gradient-to-tl from-blue-700 to-teal-500 rounded-xl">
                  <img
                    src="/img/shapes/waves-white.svg"
                    className="absolute top-0 hidden w-1/2 h-full lg:block"
                    alt="waves"
                  />
                  <div className="relative flex items-center justify-center h-full">
                    <img
                      className="relative z-20 w-full pt-6"
                      src="/img/illustrations/rocket-white.png"
                      alt="erp-dashboard"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
        <div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4">
          <div className="relative h-full overflow-hidden bg-cover rounded-xl">
            <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80"></span>
            <div className="relative z-10 flex flex-col flex-auto h-full p-4">
              <h5 className="pt-2 mb-6 font-bold text-white">
                Optimize Your Business
              </h5>
              <p className="text-white">
                Experience the power of Blox ERP. Automate tasks, improve
                decision-making, and enhance productivity across your entire
                organization.
              </p>
              <a className="mt-auto mb-0 text-sm font-semibold leading-normal text-white group">
                Discover More
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row2;
