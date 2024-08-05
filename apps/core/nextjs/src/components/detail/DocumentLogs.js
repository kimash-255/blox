// components/DocumentLogs.js
import React, { useEffect, useState } from "react";
import { fetchData } from "@/utils/Api";
import { toast } from "react-toastify";
import { toCamelCase } from "@/utils/textConvert";
import { timeAgo } from "@/utils/DateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faEdit } from "@fortawesome/free-solid-svg-icons";

const DocumentLogs = ({ endpoint, id, config }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const titleCased = toCamelCase(config.endpoint.split("/").pop());

      try {
        const response = await fetchData(
          { model_name: titleCased, object_id: id },
          `changelogs`
        );
        if (response?.data) {
          setLogs(response.data.list);
        }
      } catch (error) {
        toast.error(`Failed to fetch logs, ${error.message || error}`);
      }
    };

    fetchLogs();
  }, [endpoint, id, config.endpoint]);

  return (
    <div className="p-4 my-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
        <FontAwesomeIcon icon={faEdit} className="text-blue-500 mr-2" />
        Logs
      </h2>
      <ul className="space-y-2">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <li
              key={index}
              className={`p-4 border border-gray-300 rounded-lg shadow-sm ${
                index % 2 === 0 ? "bg-pink-50" : "bg-slate-50"
              } hover:bg-gray-100 transition-colors`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 flex items-center">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-gray-500 mr-1"
                  />
                  {new Date(log.timestamp).toLocaleString()} &nbsp;
                  <span className="text-purple-600 font-medium">
                    ({timeAgo(log.timestamp)})
                  </span>
                </span>
                <span className="text-sm text-yellow-500 font-medium flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-1" />
                  {log.user}
                </span>
              </div>
              <div className="text-sm text-gray-800">
                <strong className="font-semibold text-gray-900">
                  {log.field_name}
                </strong>{" "}
                changed from{" "}
                <span className="text-red-600 font-medium">
                  {log.old_value}
                </span>{" "}
                to{" "}
                <span className="text-green-600 font-medium">
                  {log.new_value}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center py-2">
            <FontAwesomeIcon icon={faEdit} className="text-gray-400 mr-2" />
            No logs available
          </li>
        )}
      </ul>
    </div>
  );
};

export default DocumentLogs;
