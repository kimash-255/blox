import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchData } from "@/utils/Api";
import { toast } from "react-toastify";
import { useData } from "@/contexts/DataContext";
import { useRouter } from "next/router";
import { faApp, faEnvelope, faCog } from "@fortawesome/free-solid-svg-icons"; // Add the icons you need

const DocDetail = ({ config }) => {
  const { data, setData } = useData();
  const router = useRouter();
  const { id } = router.query;
  const [endpoint, setEndpoint] = useState("");

  useEffect(() => {
    if (id) {
      setEndpoint(`${config.endpoint}/${id}`);
    }
  }, [id]);

  useEffect(() => {
    const fetchData1 = async () => {
      if (!endpoint) return;
      try {
        const response = await fetchData({}, endpoint);
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        toast.error(`Failed to fetch data, ${error.message || error}`);
      }
    };

    fetchData1();
  }, [endpoint, setData]);

  return (
    <div className="mx-4 -mt-32">
      <div
        className="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl"
        style={{
          backgroundImage: `url('/img/curved-images/curved0.jpg')`,
          backgroundPositionY: "50%",
        }}
      >
        <span className="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
      </div>
      <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-auto max-w-full px-3">
            <div className="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
              <img
                src="/img/bruce-mars.jpg"
                alt="profile_image"
                className="w-full shadow-soft-sm rounded-xl"
              />
            </div>
          </div>
          <div className="flex-none w-auto max-w-full px-3 my-auto">
            <div className="h-full">
              <h5 className="mb-1">Alec Thompson</h5>
              <p className="mb-0 font-semibold leading-normal text-sm">
                CEO / Co-Founder
              </p>
            </div>
          </div>
          <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
            <div className="relative right-0">
              <ul
                className="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl"
                nav-pills=""
                role="tablist"
              >
                <li className="z-30 flex-auto text-center">
                  <a
                    className="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700"
                    nav-link=""
                    role="tab"
                    aria-selected="true"
                  >
                    <FontAwesomeIcon icon={faApp} className="text-slate-700" />
                    <span className="ml-1">App</span>
                  </a>
                </li>
                <li className="z-30 flex-auto text-center">
                  <a
                    className="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700"
                    nav-link=""
                    role="tab"
                    aria-selected="false"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-slate-700"
                    />
                    <span className="ml-1">Messages</span>
                  </a>
                </li>
                <li className="z-30 flex-auto text-center">
                  <a
                    className="z-30 block w-full px-0 py-1 mb-0 transition-colors border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700"
                    nav-link=""
                    role="tab"
                    aria-selected="false"
                    active=""
                  >
                    <FontAwesomeIcon icon={faCog} className="text-slate-700" />
                    <span className="ml-1">Settings</span>
                  </a>
                </li>
                <div
                  className="z-10 absolute text-slate-700 rounded-lg bg-inherit flex-auto text-center bg-none border-0 block"
                  moving-tab=""
                  nav-link=""
                >
                  <a
                    className="z-30 block w-full px-0 py-1 mb-0 transition-colors border-0 rounded-lg ease-soft-in-out text-slate-700 bg-white text-white shadow-soft-xxs"
                    nav-link=""
                    role="tab"
                    aria-selected="false"
                    active=""
                  >
                    -
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {config.fields.map((item, index) => (
          <div key={index} className="w-full sm:mt-0">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
              <div
                className={`flex items-center justify-center h-14 w-14 rounded-full bg-opacity-75 ${
                  item.bgColor ? item.bgColor : "bg-orange-600"
                }`}
                style={{ backgroundColor: item.bgColor }}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="h-8 w-8 text-white"
                />
              </div>
              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">
                  {data[item.data]}
                </h4>
                <div className="text-gray-500">{item.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocDetail;
