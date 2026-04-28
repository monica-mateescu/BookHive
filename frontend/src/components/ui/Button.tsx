type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button = ({ onClick, children = "More details" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary btn-brand-primary btn-sm"
    >
      {children}
    </button>
  );
};

export default Button;
