import { useState } from "react";
import { login, validateOtp } from "@/utils/Api"; // Make sure to export validateOtp from your API utilities
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "nookies";
import Layout from "./Layout";
import Loading from "./Loading";
import Link from "next/link";
import { saveToDB } from "@/utils/indexedDB";
import { useRouter } from "next/router";

export default function LoginForm({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [otp, setOtp] = useState(""); // State for OTP
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false); // Toggle for OTP mode
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await login({
        username: credentials.username,
        password: credentials.password,
      });

      if (response?.data) {
        const { token, username } = response.data;

        toast.info(`Welcome, wait for OTP`, {
          type: "success",
          autoClose: 5000,
        });

        setIsOtpMode(true); // Switch to OTP mode
      } else {
        toast.error(`Login failed: ${response?.message || "Unknown error"}`, {
          autoClose: false,
        });
      }
    } catch (error) {
      toast.error(`Login failed: ${error.message || "Unknown error"}`, {
        autoClose: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await validateOtp({ otp });

      if (response?.data) {
        toast.success("OTP validated successfully!");
        console.log(response.data);

        const { token } = response.data; // Get the token from the response

        // Save the token to IndexedDB
        if (token) {
          await saveToDB("authToken", token);
        }

        router.push("/");
      } else {
        toast.error(
          `OTP validation failed: ${response?.message || "Unknown error"}`,
          {
            autoClose: false,
          }
        );
      }
    } catch (error) {
      toast.error(
        `OTP validation failed: ${error.message || "Unknown error"}`,
        {
          autoClose: false,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout gradientFrom="purple-700" gradientTo="pink-500">
      {isLoading && <Loading />}
      <div className={`mx-auto p-8 ${isLoading ? "opacity-60" : ""}`}>
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl text-black font-semibold">
            {isOtpMode ? "Enter OTP" : "Login"}
          </h1>
          <Link href="/">
            <div className="transition duration-300">Home</div>
          </Link>
        </div>
        {!isOtpMode ? (
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
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
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-b-blue-600"
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
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-b-blue-600"
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
              type="button"
              onClick={handleLogin}
              className="relative inline-block w-full px-6 py-3 my-4 text-xs font-bold text-center text-white uppercase align-middle transition-all ease-in border-0 rounded-lg select-none shadow-soft-md bg-150 bg-x-25 leading-pro bg-gradient-to-tl from-purple-800 to-purple-700 hover:shadow-soft-2xl hover:scale-102"
            >
              <div className="">Login</div>
            </button>
          </div>
        ) : (
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="relative">
              <input
                autoComplete="off"
                id="otp"
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-b-blue-600"
                placeholder="OTP"
              />
              <label
                htmlFor="otp"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                OTP
              </label>
            </div>
            <button
              type="button"
              onClick={handleOtpSubmit}
              className="relative inline-block w-full px-6 py-3 my-4 text-xs font-bold text-center text-white uppercase align-middle transition-all ease-in border-0 rounded-lg select-none shadow-soft-md bg-150 bg-x-25 leading-pro bg-gradient-to-tl from-purple-800 to-purple-700 hover:shadow-soft-2xl hover:scale-102"
            >
              <div className="">Validate OTP</div>
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </Layout>
  );
}
