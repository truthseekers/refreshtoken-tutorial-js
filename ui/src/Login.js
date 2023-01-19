import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import NavBar from "./NavBar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { setToken } = useContext(AuthContext);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const asyncResponse = await axios.post(
        process.env.REACT_APP_API_ENDPOINT + "users/login",
        { username: email, password: password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("asyncResponse.data: ", asyncResponse.data);
      localStorage.setItem("token", asyncResponse.data.accessToken);
      // setToken(asyncResponse.data.accessToken);
      // set refreshToken
      localStorage.setItem("refreshToken", asyncResponse.data.refreshToken);
    } catch (error) {
      // console.log("error...", error);
    }
  };

  return (
    <>
      <NavBar />
      <h3>
        Use "john" as email and "password" as password (don't include quotes)
      </h3>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Login;
