import React, { useState } from "react";
import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// const inputStyles = {}; 
// 이건 왜 추가했을까???

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if (newAccount) {
        //create account
        data = await createUserWithEmailAndPassword( authService, email, password );
      } else {
        //Log in
        data = await signInWithEmailAndPassword( authService, email, password );
      }
      console.log(data);
    } catch (error) {
      setError(error.code);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      {" "}
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount}  className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};
export default AuthForm;
