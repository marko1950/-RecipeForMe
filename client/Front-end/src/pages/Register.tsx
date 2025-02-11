import React from "react";
import { useState } from "react";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({ ...prevState, [name]: value }));
  };
  console.log(registerData);
  const loginUser = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={loginUser}>
        <label>name</label>
        <input
          type="text"
          placeholder="enter name"
          name="name"
          value={registerData.name}
          onChange={onChange}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="enter e-mail"
          name="email"
          value={registerData.email}
          onChange={onChange}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="enter password"
          name="password"
          value={registerData.password}
          onChange={onChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Register;
