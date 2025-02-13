import { useState, useEffect, useRef } from "react";
import {
  faInfoCircle,
  faX,
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,24}$/;

const Register = ({ onClose }: { onClose: () => void }) => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative ">
        {/* Close Button */}

        <button
          className="absolute top-2 right-2 hover:text-gray-600 text-black"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faX} />
        </button>

        {/* Error Message */}
        {errorMsg && (
          <p ref={errRef} className="text-red-600 text-sm text-center mb-2">
            {errorMsg}
          </p>
        )}

        <h1 className="text-2xl font-bold mb-4 text-center">
          Create a new account
        </h1>

        <form className="space-y-4">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username:
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
              className="w-full p-2 border rounded mt-1"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            {userFocus && user && !validName && (
              <p className="text-xs text-gray-500 mt-1">
                <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters. Must
                begin with a letter. Only letters, numbers, underscores, and
                hyphens allowed.
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
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
              type="password"
              id="password"
              className="w-full p-2 border rounded mt-1"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {pwdFocus && !validPwd && (
              <p className="text-xs text-gray-500 mt-1">
                <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters, must
                include uppercase, lowercase, a number, and a special character
                (@$!%*?&).
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirm_pwd" className="block text-sm font-medium">
              Confirm Password:
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
              type="password"
              id="confirm_pwd"
              className="w-full p-2 border rounded mt-1"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            {matchFocus && !validMatch && (
              <p className="text-xs text-gray-500 mt-1">
                <FontAwesomeIcon icon={faInfoCircle} /> Must match the password.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className={`w-full py-2 rounded text-white font-bold ${
              validName && validPwd && validMatch
                ? "bg-[#E65100] hover:bg-[#F57C00]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!validName || !validPwd || !validMatch}
          >
            Sign up
          </button>

          {/* Already Registered */}
          <p className="text-center text-sm">
            Already registered?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
