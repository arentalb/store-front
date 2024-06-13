import { useGetUsersQuery } from "../../redux/user/userApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { UserList } from "../../components/admin/UserList";
import { Loader } from "../../components/common/Loader.tsx";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";
import { EmptyMessage } from "../../components/common/EmptyMessage.tsx";
import { TUserDetail } from "../../types/TUser.ts";

export function AdminUsersPage() {
  const {
    data: usersResponse,
    isLoading: isUsersLoading,
    error: usersError,
    isError: isUsersError,
  } = useGetUsersQuery();

  const users: TUserDetail[] | undefined = usersResponse?.data || [];

  if (isUsersError) {
    const apiError = usersError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching users"
        }
      />
    );
  }
  if (isUsersLoading) return <Loader />;

  if (users?.length === 0) {
    return <EmptyMessage message={"There is no users to show "} />;
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-8">All Users</h1>
      <UserList users={users} />
    </div>
  );
}
