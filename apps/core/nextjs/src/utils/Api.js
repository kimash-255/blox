import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";

// Define the API URL
const apiUrl = `http://127.0.0.1:${process.env.NEXT_PUBLIC_DJANGO_PORT}`;

// Function to append a slash to the URL if it doesn't already have one
const formatUrl = (url) => {
  return url.endsWith("/") ? url : url + "/";
};

// Function to handle 401 errors by deleting cookies
const handle401Error = () => {
  const router = useRouter();
  destroyCookie(null, "token");
  destroyCookie(null, "username");
  router.push("/login");
};

// Function to fetch data from the API
const fetchData = async (params = {}, endpoint) => {
  const { token } = parseCookies();
  const getUrl = formatUrl(`${apiUrl}/${endpoint}`);
  if (!token) {
    handle401Error();
  }
  try {
    const headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${token}`,
    };

    const response = await axios.get(getUrl, { params, headers });

    if (response.status === 200) {
      return {
        success: "Return successfully",
        data: response.data,
      };
    } else {
      if (response.status === 401) {
        handle401Error();
        return {
          error: "401 error",
        };
      }
      return response;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handle401Error();
    }
    return {
      error: error,
      message: error?.response?.data?.error,
    };
  }
};

const postData = async (formData = {}, endpoint) => {
  const { token } = parseCookies();
  const postUrl = formatUrl(`${apiUrl}/${endpoint}`);

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (endpoint !== "login") {
      // headers.Authorization = `Token ${token}`;
    }

    const response = await axios.post(postUrl, formData, { headers });

    if (response.status === 201) {
      return {
        success: "Added successfully",
        data: response.data,
      };
    } else {
      if (response.status === 401) {
        handle401Error();
        return {
          error: "401 error",
        };
      }
      return response;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handle401Error();
    }
    return {
      error: error,
      message: error?.response?.data?.error,
    };
  }
};

// Function to update data in the API
const updateData = async (formData = {}, endpoint) => {
  const { token } = parseCookies();
  const updateUrl = formatUrl(`${apiUrl}/${endpoint}`);
  try {
    const headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${token}`,
    };

    const response = await axios.patch(updateUrl, formData, { headers });

    if (response.status === 200) {
      return {
        success: "Updated successfully",
        data: response.data,
      };
    } else {
      if (response.status === 401) {
        handle401Error();
        return {
          error: "401 error",
        };
      }
      return response;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handle401Error();
    }
    return {
      error: error,
      message: error?.response?.data?.error,
    };
  }
};

// Function to delete data from the API
const deleteData = async (endpoint) => {
  const { token } = parseCookies();
  const deleteUrl = formatUrl(`${apiUrl}/${endpoint}`);
  try {
    const headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${token}`,
    };

    const response = await axios.delete(deleteUrl, { headers });

    if (response.status === 204) {
      return {
        success: "Deleted successfully",
      };
    } else {
      if (response.status === 401) {
        handle401Error();
        return {
          error: "401 error",
        };
      }
      return response;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handle401Error();
    }
    return {
      error: error,
      message: error?.response?.data?.error,
    };
  }
};

// services/notificationService.js
export async function fetchNotifications() {
  // Mock API call to fetch notifications
  const response = await fetchData({ is_read: false }, "notifications");
  if (!response.data) {
    throw new Error("Failed to fetch notifications");
  }
  return response?.data?.list;
}

export async function fetchMessages() {
  // Mock API call to fetch messages
  const response = await fetchData({ is_read: false }, "messages");
  if (!response.data) {
    throw new Error("Failed to fetch messages");
  }
  return response?.data?.list;
}

// Export the functions
export { deleteData, fetchData, postData, updateData };
