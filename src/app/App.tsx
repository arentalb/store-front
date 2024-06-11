import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/SharedPages/LoginPage.tsx";
import { RegisterPage } from "../pages/SharedPages/RegisterPage.tsx";
import { AppLayout } from "../components/shared/AppLayout.tsx";
import { HomePage } from "../pages/SharedPages/HomePage.tsx";
import { PrivateRoute } from "../utils/PrivateRoute.tsx";
import { ProfilePage } from "../pages/SharedPages/ProfilePage.tsx";
import { AdminUsersPage } from "../pages/AdminPages/AdminUsersPage.tsx";
import { AdminCategoryPage } from "../pages/AdminPages/AdminCategoryPage.tsx";
import { AdminOrderListPage } from "../pages/AdminPages/AdminOrderListPage.tsx";
import { AdminOrderDetailPage } from "../pages/AdminPages/AdminOrderDetailPage.tsx";
import { AdminProductsPage } from "../pages/AdminPages/AdminProductsPage.tsx";
import { AdminProductListPage } from "../pages/AdminPages/product/AdminProductListPage.tsx";
import { AdminProductFormAddPage } from "../pages/AdminPages/product/AdminProductFormAddPage.tsx";
import { AdminProductFormEditPage } from "../pages/AdminPages/product/AdminProductFormEditPage.tsx";
import { UserProductsPage } from "../pages/UserPages/UserProductsPage.tsx";
import { UserProductDetailPage } from "../pages/UserPages/UserProductDetailPage.tsx";
import { UserCartPage } from "../pages/UserPages/UserCartPage.tsx";
import { UserCheckoutPage } from "../pages/UserPages/UserCheckoutPage.tsx";
import { UserOrdersPage } from "../pages/UserPages/UserOrdersPage.tsx";
import { UserOrderDetailPage } from "../pages/UserPages/UserOrderDetailPage.tsx";

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

          <Route element={<PrivateRoute roles={["User"]} />}>
            <Route path="/products" element={<UserProductsPage />} />
            <Route path="/product/:id" element={<UserProductDetailPage />} />
            <Route path="/cart" element={<UserCartPage />} />
            <Route path="/checkout" element={<UserCheckoutPage />} />
            <Route path="/orders" element={<UserOrdersPage />} />
            <Route path="/orders/:id" element={<UserOrderDetailPage />} />
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
              <Route path="all" element={<AdminProductListPage />} />
              <Route path="new" element={<AdminProductFormAddPage />} />
              <Route path="edit/:id" element={<AdminProductFormEditPage />} />
            </Route>
          </Route>
          <Route path="*" element={<p>Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
