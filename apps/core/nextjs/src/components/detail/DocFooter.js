import { timeAgo } from "@/utils/DateFormat";
import React from "react";

const DocFooter = ({ data }) => (
  <>
    <td className="p-2 align-middle bg-transparent border-t flex items-center text-xs whitespace-nowrap shadow-transparent">
      <span className="inline-block w-1 h-1 rounded-full bg-green-600 mr-1"></span>
      {data?.modified_at ? timeAgo(data?.modified_at) : ""}&nbsp; since last
      edit
    </td>
    <td className="p-2 align-middle bg-transparent flex items-center text-xs whitespace-nowrap shadow-transparent">
      <span className="inline-block w-1 h-1 rounded-full bg-orange-600 mr-1"></span>
      {data?.created_at ? timeAgo(data?.created_at) : ""}&nbsp; since creation
    </td>
  </>
);

export default DocFooter;
