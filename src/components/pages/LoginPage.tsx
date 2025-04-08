import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { FAKE_USER } from "@/contants/constants";

export const LoginPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { user, login, isAuthenticating } = useAuth();
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = formRef.current?.checkValidity();

    if (!isFormValid) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login({
        email: email.trim(),
        password: password.trim(),
      });
    } catch (e: any) {
      setError(e?.message ?? "Invalid email or password");
    }
  };
  console.log({ error });

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <form className="flex flex-col gap-4" ref={formRef} onSubmit={handleLogin}>
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" autoFocus required minLength={3} placeholder={FAKE_USER.email} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" required minLength={3} placeholder={FAKE_USER.password} />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>

          <CardFooter>
            <Button className="w-full" type="submit" disabled={isAuthenticating}>{isAuthenticating ? "Loading..." : "Login"}</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
