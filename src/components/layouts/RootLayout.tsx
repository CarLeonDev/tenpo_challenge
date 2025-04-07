import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const RootLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen min-w-screen">
      <nav className="flex items-center justify-between bg-black px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex flex-col items-center">
            <img src="/logo.webp" alt="logo" className="h-10" />
            <p className="text-white text-xs font-bold">Challenge</p>
          </Link>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <p>{user?.name}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </nav>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};