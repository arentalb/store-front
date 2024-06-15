import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useRef } from "react";

export function Header() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logout] = useLogoutMutation();
  const dropdownRef = useRef<HTMLDetailsElement>(null);

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

  const closeDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.removeAttribute("open");
    }
  };

  const isActive = (path: string) =>
    location.pathname === path ? "border-b-2 border-b-primary" : "";

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
                <Link to="/login" className={isActive("/login")}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={isActive("/register")}>
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              {user.role === USER ? (
                <>
                  {/* Menu for larger screens */}
                  <li className="hidden md:block">
                    <Link to="/home" className={isActive("/home")}>
                      <FiHome />
                      Home
                    </Link>
                  </li>
                  <li className="hidden md:block">
                    <Link to="/products" className={isActive("/products")}>
                      <FiShoppingBag />
                      Products
                    </Link>
                  </li>
                  <li className="hidden md:block">
                    <Link to="/cart" className={isActive("/cart")}>
                      <FiShoppingCart />
                      Cart
                    </Link>
                  </li>
                  <li className="hidden md:block">
                    <Link to="/orders" className={isActive("/orders")}>
                      <FiBox />
                      Orders
                    </Link>
                  </li>
                  <li className="hidden md:block">
                    <Link to="/profile" className={isActive("/profile")}>
                      <FiUser />
                      <span>{user.username}</span>
                    </Link>
                  </li>
                  <li className="hidden md:block">
                    <button onClick={logoutHandler}>
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </li>
                  {/* Dropdown for smaller screens */}
                  <li className="md:hidden">
                    <details ref={dropdownRef}>
                      <summary>Menu</summary>
                      <ul className="z-50 -translate-x-10 p-2 bg-base-100 rounded-t-none">
                        <li>
                          <Link
                            to="/home"
                            className={isActive("/home")}
                            onClick={closeDropdown}
                          >
                            <FiHome />
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products"
                            className={isActive("/products")}
                            onClick={closeDropdown}
                          >
                            <FiShoppingBag />
                            Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/cart"
                            className={isActive("/cart")}
                            onClick={closeDropdown}
                          >
                            <FiShoppingCart />
                            Cart
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/orders"
                            className={isActive("/orders")}
                            onClick={closeDropdown}
                          >
                            <FiBox />
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile"
                            className={isActive("/profile")}
                            onClick={closeDropdown}
                          >
                            <FiUser />
                            <span>{user.username}</span>
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              closeDropdown();
                              logoutHandler();
                            }}
                          >
                            <FiLogOut />
                            <span>Logout</span>
                          </button>
                        </li>
                      </ul>
                    </details>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <details ref={dropdownRef}>
                      <summary>
                        {user.role === ADMIN || user.role === SUPER_ADMIN
                          ? "Admin"
                          : "Menu"}
                      </summary>
                      <ul className="-translate-x-10 z-50 p-2 bg-base-100 rounded-t-none">
                        <li>
                          <Link
                            to="/admin/product"
                            className={isActive("/admin/product")}
                            onClick={closeDropdown}
                          >
                            <FiBox />
                            Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/category"
                            className={isActive("/admin/category")}
                            onClick={closeDropdown}
                          >
                            <FiBook />
                            Category
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/orders"
                            className={isActive("/admin/orders")}
                            onClick={closeDropdown}
                          >
                            <FiPackage />
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/users"
                            className={isActive("/admin/users")}
                            onClick={closeDropdown}
                          >
                            <FiUsers />
                            Users
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile"
                            className={`${isActive("/profile")} border-t-2`}
                            onClick={closeDropdown}
                          >
                            <FiUser />
                            <span>{user.username}</span>
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              closeDropdown();
                              logoutHandler();
                            }}
                          >
                            <FiLogOut />
                            <span>Logout</span>
                          </button>
                        </li>
                      </ul>
                    </details>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
