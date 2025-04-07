import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export const RootLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen min-w-screen">
      <nav className="flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex flex-col items-center">
            <img src="/logo.webp" alt="logo" className="h-10" />
            <p className="text-white text-xs font-bold">Challenge</p>
          </Link>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <p>{user?.name}</p>

            <Button variant="secondary" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </nav>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};