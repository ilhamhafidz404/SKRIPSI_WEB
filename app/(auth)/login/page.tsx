import { Suspense } from "react";
import LoginForm from "./partials/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}