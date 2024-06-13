import { FiCheck, FiX } from "react-icons/fi";
import { TUserDetail } from "../../types/TUser.ts";

interface UserListProps {
  users: TUserDetail[];
}

export function UserList({ users }: UserListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isVerified ? <FiCheck /> : <FiX />}</td>
              <td>{user.active ? <FiCheck /> : <FiX />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
