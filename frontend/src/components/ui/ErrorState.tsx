const ErrorState = ({ message }: { message: string }) => {
  return <p className="text-md text-center text-(--error)">{message}</p>;
};

export default ErrorState;
