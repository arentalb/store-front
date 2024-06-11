import { useGetUsersQuery } from "../../redux/user/userApiSlice.ts";
import { toast } from "react-toastify";
import { TApiError } from "../../types/TApiError.ts";
import { FiCheck, FiX } from "react-icons/fi";
import { Loader } from "../common/Loader.tsx";

export function UserList() {
  const {
    data: usersResponse,
    isLoading: isUsersLoading,
    error: usersError,
    isError: isUsersError,
  } = useGetUsersQuery();

  if (isUsersError && usersError) {
    const apiError = usersError as TApiError;
    toast.error(apiError?.data?.message || "An error occurred");
    return <div>Error loading users</div>;
  }

  if (isUsersLoading) {
    return <Loader />;
  }

  if (!usersResponse || !usersResponse.data) {
    return <div>No users found</div>;
  }

  const users = usersResponse.data;

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
