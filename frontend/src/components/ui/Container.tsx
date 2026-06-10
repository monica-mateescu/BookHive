const Container: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={`section container ${className}`}>{children}</div>;
};

export default Container;
