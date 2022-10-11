import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import TopNav from "./TopNav";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <TopNav userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
