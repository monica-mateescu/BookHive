const ErrorState = ({ message }: { message: string }) => {
  return (
    <div role="alert" className="alert alert-error alert-soft">
      {message}
    </div>
  );
};

export default ErrorState;
