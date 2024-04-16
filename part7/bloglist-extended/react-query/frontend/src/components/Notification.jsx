import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  if (notification === null) return null;

  const messageStyles = {
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <p style={messageStyles}>{notification}</p>;
};

export default Notification;
