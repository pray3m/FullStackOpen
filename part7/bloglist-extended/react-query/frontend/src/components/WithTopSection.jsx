import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const WithTopSection = ({ children }) => {
  const [user, dispatchAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatchAuth({ type: "CLEAR_USER" });
    navigate("/login");
  };

  const navStyles = {
    fontSize: "1.2rem",
  };

  return (
    <div>
      <p style={navStyles}>
        <Link to={"/"}>~blogs</Link> / <Link to={"/users"}> ~users</Link>
      </p>

      <h1>blogs app </h1>
      <p>
        <span>{user?.name} is logged in</span>
        <button onClick={handleLogout}>logout</button>
      </p>
      <hr style={{ margin: "24px" }} />
      {children}
    </div>
  );
};

export default WithTopSection;
