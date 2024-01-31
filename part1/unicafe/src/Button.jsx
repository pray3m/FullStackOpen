const Button = ({ title, fn }) => {
  return <button onClick={fn}>{title}</button>;
};

export default Button;
