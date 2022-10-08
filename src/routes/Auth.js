import React, { useState } from "react";
import { authService } from "../config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  //email 과 password에 동시에 적용할 수 있는 onChange 함수
  const onChange = (e) => {
    // console.log(e.target.name)하면 email칸에 입력하면 email이 뜨고 password 칸에 입력하면 password가 뜬다
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      // email 칸이 입력되었으면
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        //create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        //login
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      // const result = await signInWithPopup(authService, provider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken
    } else if (name === "github") {
      provider = new GithubAuthProvider();
      // const result = await signInWithPopup(authService, provider);
      // const credential = GithubAuthProvider.credentialFormResult(result);
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
