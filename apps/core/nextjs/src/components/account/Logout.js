import { postData } from "@/utils/Api";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import React from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await postData({}, "logout");
      if (response) {
        destroyCookie(null, "token");
        destroyCookie(null, "username");
        // Refresh the page after logout using window.location.reload()
        // window.location.reload();
        router.push("/login");
      } else {
        toast.info("", {
          render: `Logout failed: ${response?.message}`,
          type: "error",
          autoClose: false,
        });
      }
    } catch (error) {
      toast.info("", {
        render: `Logout failed: ${error}`,
        type: "error",
        autoClose: false,
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="absolute right-0 px-4 py-1 border border-red-500 hover:bg-red-100 rounded-lg"
    >
      Logout
    </button>
  );
};

export default Logout;
