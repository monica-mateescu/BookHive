import type { MemberRef } from "../../types/club";
import { formatDate, isPopulatedUser } from "../../utils";

type ClubMembersProps = {
  members: MemberRef[];
};

const ClubMembers = ({ members }: ClubMembersProps) => {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Members</h2>
        <div className="overflow-x-auto">
          <table className="table-zebra table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr
                  key={
                    isPopulatedUser(member.userId)
                      ? member.userId.id
                      : member.userId
                  }
                >
                  <td>
                    {isPopulatedUser(member.userId)
                      ? `${member.userId.firstName} ${member.userId.lastName}`
                      : member.userId}
                  </td>
                  <td>
                    <span className="badge badge-info">{member.role}</span>
                  </td>
                  <td>{formatDate(member.joinedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClubMembers;
