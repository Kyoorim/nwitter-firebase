import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import TopNav from "./TopNav";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <TopNav />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
