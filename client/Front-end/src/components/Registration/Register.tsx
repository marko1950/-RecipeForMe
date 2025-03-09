import { useState, useEffect, useRef } from "react";
import {
  faInfoCircle,
  faX,
  faCircleXmark,
  faCircleCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/api.js";
import { PropsRegister } from "../../types/registration/register.js";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,24}$/;
const REGISTER_URL = "/register";

const Register: React.FC<PropsRegister> = ({ onClose, setIsRegisterOpen }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState<string>("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [termsCheck, setTermsCheck] = useState<boolean>(false);

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidName(USERNAME_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(pwd);
    setValidPwd(result);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrorMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const v1 = USERNAME_REGEX.test(user);
    const v2 = PASSWORD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrorMsg("Invalid entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd, email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setIsRegisterOpen(false);
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrorMsg("Username or email already taken");
      } else {
        setErrorMsg("Registration Failed");
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
          <p ref={errRef} className="text-red-600 text-sm text-center mb-2">
            {errorMsg}
          </p>
        )}

        <h1 className="text-2xl font-bold  ">Sign up</h1>
        <p className="text-[0.85rem] mt-2 mb-4 text-gray-500">
          Nice to meet you! Enter your details to register.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
              {validEmail && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-500 ml-2"
                />
              )}
              {!validEmail && email && (
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-red-500 ml-2"
                />
              )}
            </label>
            <input
              type="email"
              id="email"
              placeholder="john123@gmail.com"
              ref={emailRef}
              className="w-full p-2 border rounded mt-1"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            {emailFocus && email && !validEmail && (
              <p className="text-xs text-red-600 mt-1">
                <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid email
                address. Example: user@example.com
              </p>
            )}
          </div>
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
              {validName && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-500 ml-2"
                />
              )}
              {!validName && user && (
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-red-500 ml-2"
                />
              )}
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              placeholder="john123"
              className="w-full p-2 border rounded mt-1"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            {userFocus && user && !validName && (
              <p className="text-xs text-red-600 mt-1">
                <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters. Must
                begin with a letter. Only letters, numbers, underscores, and
                hyphens allowed.
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
              {validPwd && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-500 ml-2"
                />
              )}
              {!validPwd && pwd && (
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-red-500 ml-2"
                />
              )}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-2 border rounded mt-1"
              onChange={(e) => setPwd(e.target.value)}
              placeholder="**********"
              required
              aria-invalid={validPwd ? "false" : "true"}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
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
            {pwdFocus && pwd && !validPwd && (
              <p className="text-xs text-red-600  mt-1">
                <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters, must
                include uppercase, lowercase, a number, and a special character
                (@$!%*?&).
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label htmlFor="confirm_pwd" className="block text-sm font-medium">
              Confirm Password
              {validMatch && matchPwd && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-500 ml-2"
                />
              )}
              {!validMatch && matchPwd && (
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-red-500 ml-2"
                />
              )}
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_pwd"
              placeholder="**********"
              className="w-full p-2 border rounded mt-1"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <button
              type="button"
              className="absolute right-4 top-11 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </button>
            {matchFocus && matchPwd && !validMatch && (
              <p className="text-xs text-red-600 mt-1">
                <FontAwesomeIcon icon={faInfoCircle} /> Must match the password.
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 rounded"
              onClick={() => setTermsCheck(!termsCheck)}
            />
            <label htmlFor="terms" className="text-sm text-gray-700 ">
              I agree with the&nbsp;
              <a
                href="#"
                className="text-blue-600 hover:underline font-semibold"
              >
                Terms and Conditions
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button
            className={`w-full py-2 rounded text-white font-bold uppercase ${
              validName && validPwd && validMatch && termsCheck
                ? "bg-[#E65100] hover:bg-[#F57C00]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={
              !validName ||
              !validPwd ||
              !validMatch ||
              !termsCheck ||
              !validEmail
            }
          >
            Sign up
          </button>

          {/* Already Registered */}

          <p className="text-center text-sm">
            Already have an account?&nbsp;
            <a href="#" className="text-blue-600 hover:underline font-semibold">
              Log In
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
