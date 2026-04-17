import type { UserRef } from "@types";
import { formatDate, isPopulatedUser } from "@utils";

type ClubSidebarProps = {
  createdBy: string | UserRef;
  createdDate: string;
  updatedDate: string;
};
const ClubSidebar = ({
  createdBy,
  createdDate,
  updatedDate,
}: ClubSidebarProps) => {
  return (
    <div className="space-y-6">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="card-title text-lg">Created By</h3>
          <p>
            {isPopulatedUser(createdBy)
              ? `${createdBy.firstName} ${createdBy.lastName}`
              : createdBy}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="card-title text-lg">Status Info</h3>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Created: </strong> {formatDate(createdDate)}
            </p>
            <p>
              <strong>Last update: </strong> {formatDate(updatedDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSidebar;
