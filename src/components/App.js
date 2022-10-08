import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); //useState가 로그인 여부 알 수 있게 됨
  const [userObj, setUserObj] = useState(null); // 작성자가 누구인지 알게해줌

  //login 상태를 observing 하는 함수
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // const uid = user.uid;
        setUserObj(user); // 사용자가 로그인하면 로그인한 정보를 따른데다 쓸 수 있게 저장하는 것!
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
};
export default App;
