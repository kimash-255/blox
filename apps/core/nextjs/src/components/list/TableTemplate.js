import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { timeAgo } from "@/utils/DateFormat";
import PrimaryButton from "../buttons/Primary";

const TableTemplate = ({ tableConfig, onEdit, data }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  // Ensure the first field is id
  const fields = tableConfig.fields.filter((field) => field.id !== "id");
  const firstField = { id: "id", name: "ID", type: "text" };
  const updatedFields = [firstField, ...fields];

  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="flex flex-row justify-between p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6>{tableConfig.name}</h6>
            <div className="px-3 text-right">
              <Link href={`${currentPath}/new`}>
                <PrimaryButton text={"New"} />
              </Link>
            </div>
          </div>
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-4 overflow-x-auto">
              <table className="items-center w-full mb-2 px-4 align-top border-gray-200 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    {updatedFields.map((field, index) => (
                      <th
                        key={index}
                        className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                      >
                        {field.name}
                      </th>
                    ))}
                    <th className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Modified At
                    </th>
                    <th className="px-2 py-3 font-semibold capitalize align-middle bg-transparent border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      {updatedFields.map((field, fieldIndex) => (
                        <td
                          key={fieldIndex}
                          className="p-2 align-middle bg-transparent border-t whitespace-nowrap shadow-transparent"
                        >
                          {field.id === "id" ? (
                            <Link href={`${currentPath}/${item.id}`}>
                              <div className="text-blue-500 hover:underline">
                                {item.id}
                              </div>
                            </Link>
                          ) : field.type === "image" ? (
                            <div className="flex px-2 py-1">
                              <div>
                                <img
                                  src={item[field.id]}
                                  className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                                  alt={item.name}
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 text-sm leading-normal">
                                  {item.name}
                                </h6>
                                <p className="mb-0 text-xs leading-tight text-slate-400">
                                  {item.email}
                                </p>
                              </div>
                            </div>
                          ) : field.type === "linkselect" ? (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`/${field.endpoint}/${item[field.id]}`}
                              className="font-semibold leading-tight text-slate-400"
                            >
                              {item[field.id]}
                            </a>
                          ) : field.type === "select" ? (
                            <span
                              className={`font-semibold leading-tight bg-gradient-to-tl px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white ${
                                field.options.find(
                                  (option) => option.value === item[field.id]
                                )?.style
                              }`}
                            >
                              {item[field.id]}
                            </span>
                          ) : (
                            <span>{item[field.id]}</span>
                          )}
                        </td>
                      ))}
                      <td className="p-2 align-middle bg-transparent border-t flex items-center text-xs whitespace-nowrap shadow-transparent">
                        <span className="inline-block w-1 h-1 rounded-full bg-orange-600 mr-1"></span>
                        {timeAgo(new Date(item.modified_at))}
                      </td>

                      <td className="p-2 align-middle bg-transparent border-t whitespace-nowrap shadow-transparent">
                        <Link href={`${currentPath}/${item.id}`}>
                          <div
                            onClick={() => onEdit(item)}
                            className="text-xs font-semibold leading-tight text-slate-400 cursor-pointer"
                          >
                            Edit
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTemplate;
