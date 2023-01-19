import { useNavigate, Route, Routes } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        To home
      </p>
      <p
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => navigate("/login")}
      >
        To login
      </p>
      <p
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => navigate("/register")}
      >
        To Register
      </p>
      <p
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => navigate("/publicposts")}
      >
        To Public Posts
      </p>
      <p
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => navigate("/privateposts")}
      >
        To Private Posts
      </p>
    </div>
  );
};

export default NavBar;
