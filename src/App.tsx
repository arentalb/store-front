import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { AppLayout } from "./components/AppLayout.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { PrivateRoute } from "./utils/PrivateRoute.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage.tsx";
import { AdminCategoryPage } from "./pages/admin/AdminCategoryPage.tsx";
import { AdminOrderListPage } from "./pages/admin/AdminOrderListPage.tsx";
import { AdminOrderDetailPage } from "./pages/admin/AdminOrderDetailPage.tsx";
import { AdminProductsPage } from "./pages/admin/product/AdminProductsPage.tsx";
import { AdminProductList } from "./pages/admin/product/AdminProductList.tsx";
import { AdminProductFormAdd } from "./pages/admin/product/AdminProductFormAdd.tsx";
import { AdminProductFormEdit } from "./pages/admin/product/AdminProductFormEdit.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            element={<PrivateRoute roles={["Admin", "SuperAdmin", "User"]} />}
          >
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route
            path={"/admin"}
            element={<PrivateRoute roles={["Admin", "SuperAdmin"]} />}
          >
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="category" element={<AdminCategoryPage />} />
            <Route path="orders" element={<AdminOrderListPage />} />
            <Route path="orders/:id" element={<AdminOrderDetailPage />} />
            <Route path="product" element={<AdminProductsPage />}>
              <Route index element={<Navigate to="all" replace />} />
              <Route path="all" element={<AdminProductList />} />
              <Route path="new" element={<AdminProductFormAdd />} />
              <Route path="edit/:id" element={<AdminProductFormEdit />} />
            </Route>
          </Route>
          <Route path="*" element={<p>Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
