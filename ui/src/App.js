import logo from "./logo.svg";
import "./App.css";
import { useNavigate, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import PublicPosts from "./PublicPosts";
import PrivatePosts from "./PrivatePosts";
import NavBar from "./NavBar";

const HomeRoute = () => {
  return (
    <div>
      <NavBar />
    </div>
  );
};

function App() {
  console.log("tada");

  return (
    <div style={{ background: "yellowgreen" }}>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publicposts" element={<PublicPosts />} />
        <Route path="/privateposts" element={<PrivatePosts />} />
      </Routes>
    </div>
  );
}

export default App;
