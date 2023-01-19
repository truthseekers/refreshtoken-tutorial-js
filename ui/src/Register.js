import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const Register = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const asyncResponse = await axios.post(
        process.env.REACT_APP_API_ENDPOINT + "users/signup",
        { firstName, lastName, email: email, password: password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("asyncResponse: ", asyncResponse);
    } catch (error) {
      console.log("in catch error: ", error);
    }
  };

  return (
    <>
      <NavBar />
      <form onSubmit={formSubmitHandler}>
        <div>
          <label>first Name</label>
          <input
            type="text"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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

export default Register;
