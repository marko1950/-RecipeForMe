import React, { useState, useEffect, useRef } from "react";
import { PropsLogin } from "../../types/registration/login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faX } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

const Login: React.FC<PropsLogin> = ({ onClose, setIsLoginOpen }) => {
  const LOGIN_URL = "/auth";
  const { auth, setAuth } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { user, accessToken } = response?.data;
      console.log(accessToken);
      setAuth({ ...user, accessToken });
      setPwd("");
      setEmail("");
      setIsLoginOpen(false);
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative ">
        {/* Close Button */}
        <button
          className="absolute top-6 right-7 hover:text-gray-600 text-black "
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faX} className="text-[0.8rem]" />
        </button>
        {/* Error Message */}
        {errorMsg && (
          <p
            ref={errRef}
            aria-live="assertive"
            className="text-red-600 text-sm text-center mb-2"
          >
            {errorMsg}
          </p>
        )}
        <h1 className="text-2xl font-bold  ">Log in</h1>
        <p className="text-sm mt-2 mb-4 text-gray-500">
          Enter your email and password to log in.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="john123@gmail.com"
              ref={emailRef}
              className="w-full p-2 border rounded mt-1 "
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-2 border rounded mt-1"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="**********"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-11 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
            <div className="flex justify-between mt-3">
              <div className="flex items-center space-x-2 ">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-4 h-4 rounded"
                  onClick={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe" className="text-sm text-[#78909C]">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-blue-600 hover:underline font-semibold"
              >
                <p className="text-sm te">Forgot password? </p>
              </a>
            </div>
          </div>
          <button
            className={`w-full py-2 rounded text-white font-bold uppercase ${
              email && pwd
                ? "bg-[#E65100] hover:bg-[#F57C00]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!pwd || !email}
          >
            Log in
          </button>
          <p className="text-center text-sm text-[#78909C]">
            Don't have an account?&nbsp;
            <a href="#" className="text-blue-600 hover:underline font-semibold">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
