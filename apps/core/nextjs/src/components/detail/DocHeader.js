import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../buttons/Primary";
import Link from "next/link";
import DeleteButton from "../buttons/Delete";
import PrimaryButton1 from "../buttons/Primary1";

const DocHeader = ({
  config,
  data,
  tabs,
  handleEditClick,
  handleSaveClick,
  handleTabClick,
  handleDelete,
  selectedTab,
  isEditing,
  id,
}) => (
  <>
    <div
      className="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-32 rounded-2xl"
      style={{
        backgroundImage: `url('/img/curved-images/curved0.jpg')`,
        backgroundPositionY: "50%",
      }}
    >
      <span className="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
    </div>
    <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-12 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
      <div className="flex flex-wrap -mx-3">
        <div className="flex-none w-auto max-w-full px-3">
          <div className="text-base ease-soft-in-out h-8.5 w-8.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
            <img
              src="/img/favicon.png"
              alt="profile_image"
              className="w-full shadow-soft-sm rounded-xl"
            />
          </div>
        </div>
        <div className="flex-none w-auto max-w-full px-3 my-auto">
          <div className="h-full">
            <h5 className="mb-1"> Details Page</h5>
            <p className="mb-0 font-semibold leading-normal text-sm">
              {data?.id}
            </p>
          </div>
        </div>
        <div className="w-fit max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0">
          <div className="relative right-0 flex flex-row items-center">
            <ul className="relative flex flex-wrap p-1 list-none bg-transparent">
              {tabs.map((tab) => (
                <li
                  key={tab.name}
                  className="z-30 flex-auto text-center cursor-pointer"
                >
                  <a
                    onClick={() => handleTabClick(tab.name)}
                    className={`z-30 block w-full px-4 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out ${
                      selectedTab === tab.name
                        ? "bg-white text-slate-700"
                        : "bg-inherit text-slate-700"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={tab.icon}
                      className="text-slate-700"
                    />
                    <span className="ml-1">{tab.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <div onClick={handleEditClick}>
                    <PrimaryButton1
                      text="Close"
                      className="flex items-center justify-center p-1"
                    />
                  </div>
                  <button type="button" onClick={handleSaveClick}>
                    <PrimaryButton1
                      text="Save"
                      className="flex items-center justify-center p-1"
                    />
                  </button>
                </>
              ) : (
                <>
                  {config?.isList && (
                    <Link href={`/${data.app}/${data.id}`}>
                      <PrimaryButton1
                        text={`Go to ${data.name} list`}
                        className="flex items-center justify-center p-1"
                      />
                    </Link>
                  )}
                  {config?.customize && (
                    <Link href={`/documents/${id}/edit`}>
                      <PrimaryButton1
                        text="Customize"
                        className="flex items-center justify-center p-1"
                      />
                    </Link>
                  )}
                  <div onClick={handleEditClick}>
                    <PrimaryButton1
                      text="Edit"
                      className="flex items-center justify-center p-1"
                    />
                  </div>

                  <div onClick={handleDelete}>
                    <DeleteButton />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default DocHeader;
