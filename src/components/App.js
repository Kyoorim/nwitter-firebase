// import React, { useState } from "react";
// import { dbService } from "../config";
// import { collection, addDoc } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); //useState가 로그인 여부 알 수 있게 됨

  //login 상태를 observing 하는 함수
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // const uid = user.uid;
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );

  // const [nweet, setNweet] = useState("");
  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   await addDoc(collection(dbService, "ntweets"), {
  //     nweet,
  //     createdAt: Date.now(),
  //   });
  //   setNweet("");
  // };
  // const onChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setNweet(value);
  // };
  // return (
  //   <>
  //     <form onSubmit={onSubmit}>
  //       <input
  //         value={nweet}
  //         onChange={onChange}
  //         type="text"
  //         placeholder="what's on your mind?"
  //       ></input>
  //       <input type="submit" value="Ntweet"></input>
  //     </form>
  //   </>
  // );
};
export default App;
