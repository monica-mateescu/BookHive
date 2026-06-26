import { ClubRow, ConfirmModal, Loading, Pagination } from "@/components";
import { Seo } from "@/components/seo";
import { ButtonLink } from "@/components/ui";
import { deleteClubById, getClubs } from "@/data";
import type { Club, ClubsResponse } from "@/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

const Clubs = () => {
  const [page, setPage] = useState(1);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery<ClubsResponse, Error>({
    queryKey: ["clubs", { page }],
    queryFn: () => getClubs(page),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteClubById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      setSelectedClub(null);
    },
    onError: () => {
      setSelectedClub(null);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const errorMessage = deleteMutation.error?.message || null;

  if (isLoading) return <Loading />;
  if (isError) return <div className="alert alert-error">{error.message}</div>;

  return (
    <>
      <Seo title="Club list" index={false} />
      <section className="overflow-x-auto py-5">
        <div className="flex justify-end">
          <ButtonLink to="create" className="btn-sm mb-2">
            Add new club
          </ButtonLink>
        </div>

        <h1 className="flex justify-start text-2xl font-semibold">Clubs</h1>

        <div className="flex justify-end text-xs font-semibold">
          Total clubs: {data?.pagination.total}
        </div>

        {errorMessage && (
          <div className="alert alert-error mb-4">{errorMessage}</div>
        )}
        {data?.data?.length === 0 ? (
          <div className="alert alert-info">No clubs found.</div>
        ) : (
          <>
            <table className="mb-4 table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Meating Date</th>
                  <th>Created Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((club, index) => (
                  <ClubRow
                    key={club.id}
                    index={(page - 1) * data.pagination.limit + index + 1}
                    club={club}
                    onDelete={() => setSelectedClub(club)}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              page={page}
              totalPages={data?.pagination.totalPages ?? 1}
              onPageChange={setPage}
            />
            {selectedClub && (
              <ConfirmModal
                title={selectedClub.name}
                message="Are you sure you want to delete this club?"
                onConfirm={() => handleDelete(selectedClub.id)}
                onClose={() => setSelectedClub(null)}
                isLoading={deleteMutation.isPending}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Clubs;
