import { Header } from "./Header.tsx";
import { Outlet } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export function AppLayout() {
  return (
    <div className="max-w-[1200px] w-full mx-auto min-h-screen flex flex-col">
      <Header />
      <div className="max-w-[1100px] w-full mx-auto px-4">
        <Outlet />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-mobile toast-desktop"
        limit={2}
      />
    </div>
  );
}
