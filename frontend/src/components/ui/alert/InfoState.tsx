const InfoState = ({ message }: { message: string }) => {
  return (
    <div role="alert" className="alert alert-info alert-soft">
      {message}
    </div>
  );
};

export default InfoState;
