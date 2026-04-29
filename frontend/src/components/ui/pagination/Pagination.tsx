import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import Button from "./Button";

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
    <div className="join my-6 flex justify-center text-(--gray-primary)">
      <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        <ArrowLeft />
      </Button>

      <button className="btn btn-ghost cursor-default hover:border-transparent hover:bg-transparent">
        Page {page} of {totalPages}
      </button>

      <Button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
