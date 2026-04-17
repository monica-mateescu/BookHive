import { Loading, Pagination, UserRow } from "@/components";
import { getUsers } from "@/data/users";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Users = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users", { page }],
    queryFn: () => getUsers(page),
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="alert alert-error">{error.message}</div>;
  return (
    <section>
      <div className="flex justify-end text-xs font-semibold">
        Total users: {data?.pagination?.total}
      </div>
      {data?.data?.length === 0 ? (
        <div className="alert alert-info">No users found.</div>
      ) : (
        <>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((user, index) => (
                <UserRow
                  key={user.id}
                  index={(page - 1) * data.pagination.limit + index + 1}
                  user={user}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            page={page}
            totalPages={data?.pagination.totalPages ?? 1}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
};

export default Users;
