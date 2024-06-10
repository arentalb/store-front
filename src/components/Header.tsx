import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Store
        </Link>
      </div>
    </div>
  );
}
