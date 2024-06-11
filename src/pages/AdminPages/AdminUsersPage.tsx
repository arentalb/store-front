import { UserList } from "../../components/admin/UserList";

export function AdminUsersPage() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-8">All Users</h1>
      <UserList />
    </div>
  );
}
