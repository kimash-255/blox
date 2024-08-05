import { fetchData } from "@/utils/Api";
import { toUnderscoreLowercase } from "@/utils/textConvert";

export const fetchTableData = async (doc, filter_key, filter_value) => {
  console.log(doc, filter_key, filter_value);

  const endpoint = `documents/${toUnderscoreLowercase(doc)}`;

  try {
    // Fetch the initial response to get app and id
    const linkresponse = await fetchData({}, endpoint);
    console.log(8999, linkresponse);

    if (linkresponse.data) {
      const response = await fetchData(
        { filter_key, filter_value },
        `${linkresponse.data.app}/${linkresponse.data.id}`
      );

      return {
        data: response?.data?.list || null,
        linkresponse,
      };
    }

    return {
      data: null,
      linkresponse,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      data: null,
      linkresponse: null,
    };
  }
};
