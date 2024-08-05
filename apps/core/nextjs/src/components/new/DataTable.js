import React from "react";
import { FaTrash } from "react-icons/fa";
import { timeAgo } from "@/utils/DateFormat";

const DataTable = ({
  data,
  onDelete,
  linkResponse,
  readOnly,
  initialColumns,
}) => {
  // Generate column headers from initial columns
  console.log(data);

  const getColumnHeaders = () => {
    const allKeys = new Set();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => allKeys.add(key));
    });

    const allKeysArray = Array.from(allKeys);
    const idIndex = allKeysArray.indexOf("id");
    const createdAtIndex = allKeysArray.indexOf("created_at");
    const modifiedAtIndex = allKeysArray.indexOf("modified_at");

    if (idIndex > -1) {
      allKeysArray.splice(idIndex, 1);
    }
    if (createdAtIndex > -1) {
      allKeysArray.splice(createdAtIndex, 1);
    }
    if (modifiedAtIndex > -1) {
      allKeysArray.splice(modifiedAtIndex, 1);
    }

    const orderedKeys = ["id", ...allKeysArray, "created_at", "modified_at"];
    return orderedKeys.map((key) => ({
      label: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), // Format label
      key,
    }));
  };

  const columns = getColumnHeaders();

  return (
    <div className="border border-slate-300 rounded-lg p-4 bg-white shadow-sm mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-fuchsia-50 border-b">
            {columns.map((col) => (
              <th key={col.key} className="py-2 px-4 text-left text-purple-900">
                {col.label}
              </th>
            ))}
            <th className="py-2 px-4 text-left text-purple-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`border-b ${
                index % 2 === 0 ? "bg-slate-50" : "bg-pink-50"
              } hover:bg-pink-100`}
            >
              {columns.map((col) => (
                <td key={col.key} className="py-2 px-4 text-slate-700">
                  {col.key === "id" ? (
                    <a
                      href={`/${linkResponse.data.app}/${
                        linkResponse.data.id
                      }/${item[col.key]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:underline"
                    >
                      {item[col.key]}
                    </a>
                  ) : col.key === "created_at" || col.key === "modified_at" ? (
                    timeAgo(new Date(item[col.key]))
                  ) : item[col.key] !== undefined ? (
                    item[col.key]
                  ) : (
                    "N/A"
                  )}
                </td>
              ))}
              <td className="py-2 px-4 text-right">
                <button
                  type="button"
                  onClick={() => onDelete(item)}
                  className="text-red-600 hover:text-red-800"
                  disabled={readOnly}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
