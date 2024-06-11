import { useGetUsersQuery } from "../../redux/user/userApiSlice.ts";
import { toast } from "react-toastify";
import { TApiError } from "../../types/TApiError.ts";
import { FiCheck, FiX } from "react-icons/fi";

export function AdminUsersPage() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-8">All Users</h1>
      <UserList />
    </div>
  );
}

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
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
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
