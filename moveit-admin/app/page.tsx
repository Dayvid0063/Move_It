import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginPage from "./(auth)/login/page";

export default async function HomePage() {
  // Check if the "token" cookie exists to determine login status
  const token = (await cookies()).get("token");

  // Redirect to dashboard if the user is already authenticated
  if (token) {
    redirect("/dashboard");
  }

  return <LoginPage />;
}
