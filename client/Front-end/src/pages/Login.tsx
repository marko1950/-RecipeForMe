import React from "react";
import { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  const loginUser = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="enter e-mail"
          name="email"
          value={loginData.email}
          onChange={onChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="enter password"
          name="password"
          value={loginData.password}
          onChange={onChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
