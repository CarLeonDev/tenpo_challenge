import { RootLayout } from "@/components/layouts/RootLayout";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const AuthLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <RootLayout />
  );
};
