import { Link, type LinkProps } from "react-router";

type ButtonLinkProps = LinkProps & {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

const ButtonLink = ({
  className = "",
  variant = "primary",
  children,
  ...props
}: ButtonLinkProps) => {
  const variantClass = {
    primary: "btn-primary btn-brand-primary",
    secondary: "btn-outline btn-brand-secondary",
  }[variant];

  return (
    <Link className={`btn btn-sm ${variantClass} ${className}`} {...props}>
      {children}
    </Link>
  );
};

export default ButtonLink;
