import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const WithTopSection = ({ children }) => {
  const [user, dispatchAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatchAuth({ type: "CLEAR_USER" });
    navigate("/login");
  };
  return (
    <div>
      <h2>blogs</h2>
      <p>
        <span>{user?.name} is logged in</span>
        <button onClick={handleLogout}>logout</button>
      </p>
      <hr />
      {children}
    </div>
  );
};

export default WithTopSection;
