type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  variant?: "primary" | "neutral";
};

const Button = ({
  className = "",
  variant = "primary",
  children = "More details",
  ...props
}: ButtonProps) => {
  const variantClass = {
    primary: "btn-primary btn-brand-primary",
    neutral: "btn-neutral btn-brand-neutral",
  }[variant];

  return (
    <button className={`btn btn-sm ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
