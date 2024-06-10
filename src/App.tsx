import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { AppLayout } from "./components/AppLayout.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { PrivateRoute } from "./utils/PrivateRoute.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
