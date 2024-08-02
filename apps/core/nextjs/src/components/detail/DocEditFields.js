import { useData } from "@/contexts/DataContext";
import { fetchData, postData } from "@/utils/Api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DocFieldList from "./DocFieldList";

const DocEditFields = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, setData } = useData();
  const [initialData, setInitialData] = useState(null);

  const endpoint = "documents";

  useEffect(() => {
    const fetchData1 = async () => {
      if (!endpoint || !id) return;
      try {
        const response = await fetchData({}, `${endpoint}/${id}`);
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error(`Failed to fetch data, ${error.message || error}`);
      }
    };

    fetchData1();
  }, [endpoint, id]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fieldsModule = await import(
          `../../../../../custom/${data.app}/${data.module}/doc/${data.id}/fields.js`
        );
        if (fieldsModule && fieldsModule.fields) {
          console.log(fieldsModule.fields);

          setInitialData(fieldsModule.fields);
        }
      } catch (error) {
        console.error(
          `Failed to load fields module, ${error.message || error}`
        );
      }
    };
    if (data) {
      fetchInitialData();
    }
  }, [data]);

  return <>{initialData && <DocFieldList data={initialData} />}</>;
};

export default DocEditFields;
