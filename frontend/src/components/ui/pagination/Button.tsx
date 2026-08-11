type ButtonProps = {
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const Button = ({ disabled, onClick, children }: ButtonProps) => (
  <button
    className="btn btn-ghost text-(--brand-primary) transition-colors hover:bg-(--brand-primary) hover:text-(--bg-main) disabled:cursor-not-allowed disabled:text-(--brand-secondary) disabled:opacity-50"
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
