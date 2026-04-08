const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}) => {
  return (
    <div className="join flex justify-center">
      <button
        className="join-item btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        «
      </button>
      <button className="join-item btn">
        Page {page} of {totalPages}
      </button>
      <button
        className="join-item btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
