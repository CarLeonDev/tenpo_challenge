
import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/components/pages/HomePage";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { RootLayout } from "@/components/layouts/RootLayout";
import { LoginPage } from "@/components/pages/LoginPage";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route element={<RootLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App;