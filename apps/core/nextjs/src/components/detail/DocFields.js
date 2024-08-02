import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DocFields = ({ config, data }) => (
  <div className="grid grid-cols-2 gap-4 py-8">
    {config.fields.map((item, index) => (
      <div key={index} className="w-full px-3 mb-2">
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-4">
            <div className="flex flex-row justify-between -mx-3">
              <div className="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p className="mb-0 font-sans text-sm font-semibold leading-normal">
                    {item.title}
                  </p>

                  {item.type === "linkselect" ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`/${item.endpoint}/${data[item.data]}`}
                    >
                      <h5 className="mb-0 font-bold">{data[item.data]}</h5>
                    </a>
                  ) : (
                    <h5 className="mb-0 font-bold">{data[item.data]}</h5>
                  )}
                </div>
              </div>
              <div className="px-3 text-right flex justify-end">
                <div className="flex items-center justify-center w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="h-8 w-8 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default DocFields;
