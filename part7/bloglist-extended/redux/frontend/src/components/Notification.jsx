import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

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

Notification.propTypes = {
  successMsg: PropTypes.string,
  errorMsg: PropTypes.string,
};

export default Notification;
