const Button = ({ text, onClick, type = "button", className = "" }) => {
  return (
      <button className={className} onClick={onClick} type={type}>
          {text}
      </button>
  );
};

export default Button;
