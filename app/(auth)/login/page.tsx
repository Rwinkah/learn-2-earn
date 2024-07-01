import { LoginForm } from "../../_components/login-form";

export default function LoginPage() {
  return (
    <>
      <h6 className="font-extralight text-xs mb-2">Welcome back</h6>
      <h3 className="text-4xl font-bold mb-[56px]">Sign in to continue</h3>
      <LoginForm />
    </>
  );
}
