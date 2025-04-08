import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Loader2, LogOut } from "lucide-react";

export const RootLayout = () => {
  const { user, isLoading, logout } = useAuth();

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
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

      {isLoading && (
        <div className="flex items-center justify-center h-screen w-screen">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col items-center justify-center flex-1">
          <Outlet />
        </div>
      )}
    </div>
  );
};