import { Link, useNavigate } from "react-router-dom";
import {
  FiBook,
  FiBox,
  FiHome,
  FiLogOut,
  FiPackage,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../redux/auth/authApiSlice.ts";
import { getUser, logOut } from "../../redux/auth/authSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { ADMIN, SUPER_ADMIN, USER } from "../../constants/roles.ts";

export function Header() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError.data.message);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          SuperMarket
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <details>
                  <summary>
                    {user.role === ADMIN || user.role === SUPER_ADMIN
                      ? "Admin"
                      : "Menu"}
                  </summary>
                  <ul className="-translate-x-10 z-50 p-2 bg-base-100 rounded-t-none">
                    {user.role === USER ? (
                      <>
                        <li>
                          <Link to="/home">
                            <FiHome />
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link to="/products">
                            <FiShoppingBag />
                            Products
                          </Link>
                        </li>
                        <li>
                          <Link to="/cart">
                            <FiShoppingCart />
                            Cart
                          </Link>
                        </li>
                        <li>
                          <Link to="/orders">
                            <FiBox />
                            Orders
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/admin/product">
                            <FiBox />
                            Products
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/category">
                            <FiBook />
                            Category
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/orders">
                            <FiPackage />
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/users">
                            <FiUsers />
                            Users
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link to="/profile" className="border-t-2">
                        <FiUser />
                        <span>{user.username}</span>
                      </Link>
                    </li>
                    <li>
                      <button onClick={logoutHandler}>
                        <FiLogOut />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </details>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
