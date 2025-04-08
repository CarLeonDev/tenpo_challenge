import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { LogOut } from "lucide-react";
import { Loading } from "@/components/ui/Loading";

export const RootLayout = () => {
  const { user, isLoading, logout } = useAuth();

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 dark bg-sidebar text-sidebar-foreground py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex flex-col items-center">
            <img src="logo.webp" alt="logo" className="h-10" />
            <p className="text-white text-xs font-bold">Challenge</p>
          </Link>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <p className="text-sm font-bold">{user?.name}</p>

            <Button variant="secondary" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </nav>

      {isLoading && (
        <div className="flex items-center justify-center h-screen w-screen">
          <Loading size="lg" />
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col items-center sm:justify-center flex-1">
          <Outlet />
        </div>
      )}
    </div>
  );
};