import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AuthService from "@/services/authService";

const AuthContext = createContext<{
  user?: any;
  isLoading: boolean;
  isAuthenticating: boolean;
  login: (credentials: { email: string, password: string }) => Promise<void>;
  logout: () => void;
} | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  const login = useCallback(async (credentials: { email: string, password: string }) => {
    setIsAuthenticating(true);
    try {

      const { status, data } = await AuthService.login(credentials);
      console.log({ data });

      if (status !== 200) {
        throw new Error(data.message);
      }


      setToken(data.token);
      setUser(data.user);
      navigate("/");
    } finally {
      setIsAuthenticating(false);
    }
  }, [navigate, setUser, setToken]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
  }, [navigate, setUser, setToken]);

  const authToken = useCallback(async () => {
    setIsLoading(true);
    const { status, data } = await AuthService.authToken(token);

    if (status !== 200) return logout();

    setUser(data.user);
    setIsLoading(false);
  }, [token, logout]);

  useEffect(() => {
    if (user || !token) {
      setIsLoading(false);
      return;
    }


    authToken();
  }, [token, logout, user, authToken]);

  return <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticating }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};