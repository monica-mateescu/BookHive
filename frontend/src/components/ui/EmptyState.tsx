const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="text-md text-center font-semibold text-(--gray-primary)">
      {message}
    </div>
  );
};

export default EmptyState;
