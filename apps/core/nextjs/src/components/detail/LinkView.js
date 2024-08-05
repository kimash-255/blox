import React, { useState, useEffect } from "react";
import { fetchLinkUrl } from "./FetchTable";

const LinkView = ({ field, data }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchUrl = async () => {
      if (field.doc) {
        const fetchedUrl = await fetchLinkUrl(field.doc);
        setUrl(fetchedUrl);
      }
    };

    fetchUrl();
  }, [field.doc]);

  if (!url) return null;

  return (
    <a
      href={`/${url}/${data[field.id]}`}
      className="text-blue-500 underline hover:text-blue-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      {data[field.id]}
    </a>
  );
};

export default LinkView;
