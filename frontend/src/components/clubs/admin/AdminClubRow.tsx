import type { Club } from "@types";
import { Link } from "react-router";

type ClubRowProps = {
  index: number;
  club: Club;
  onDelete: () => void;
};

const ClubRow = ({ index, club, onDelete }: ClubRowProps) => {
  return (
    <tr>
      <th>{index}</th>
      <td>{club.name}</td>
      <td>{club.description}</td>
      <td>{club.isActive ? "Yes" : "No"}</td>
      <td>{new Date(club.createdAt).toLocaleDateString()}</td>
      <th>
        <div className="flex justify-end gap-3">
          <Link to={`${club.id}`} className="btn btn-info btn-xs">
            view
          </Link>
          <Link to={`${club.id}/edit`} className="btn btn-warning btn-xs">
            edit
          </Link>
          <button onClick={onDelete} className="btn btn-error btn-xs">
            delete
          </button>
        </div>
      </th>
    </tr>
  );
};

export default ClubRow;
