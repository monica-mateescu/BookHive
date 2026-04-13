type UserRowProps = {
  index: number;
  user: User;
};

const UserRow = ({ index, user }: UserRowProps) => {
  return (
    <tr>
      <th>{index}</th>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <th>
        <div className="flex justify-end gap-3">
          <button className="btn btn-error btn-xs">Delete</button>
        </div>
      </th>
    </tr>
  );
};

export default UserRow;
