import { useState } from "react";
import { postData } from "@/utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "nookies";
import Layout from "./Layout";
import Loading from "./Loading";
import Link from "next/link";

export default function LoginForm({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await postData(credentials, "login");
      if (response?.data) {
        const { token, username } = response.data;
        setCookie(null, "token", token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
          path: "/", // Root path
        });
        setCookie(null, "username", username, {
          maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
          path: "/", // Root path
        });
        toast.info("", {
          render: `Welcome ${username}`,
          type: "success",
          autoClose: 5000,
        });
        onLoginSuccess();
      } else {
        toast.info("", {
          render: `Login failed: ${response?.message}`,
          type: "error",
          autoClose: false,
        });
      }
    } catch (error) {
      toast.update("", {
        render: `Login failed: ${error}`,
        type: "error",
        autoClose: false,
      });
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <Layout gradientFrom="purple-700" gradientTo="pink-500">
      {isLoading && <Loading />}
      <div className={`mx-auto p-8 ${isLoading ? "opacity-60" : ""}`}>
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl text-black font-semibold">Login</h1>
          <Link href="/">
            <div className="transition duration-300">Home</div>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
        >
          <div className="relative">
            <input
              autoComplete="off"
              id="username"
              name="username"
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
              placeholder="Username"
            />
            <label
              htmlFor="username"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Username
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="relative inline-block w-full px-6 py-3 my-4 text-xs font-bold text-center text-white uppercase align-middle transition-all ease-in border-0 rounded-lg select-none shadow-soft-md bg-150 bg-x-25 leading-pro bg-gradient-to-tl from-purple-800 to-purple-700 hover:shadow-soft-2xl hover:scale-102"
          >
            <div className="">Login</div>
          </button>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
}
