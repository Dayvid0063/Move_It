"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { loginAdmin } from "@/app/api/auth"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await loginAdmin(email, password);
      console.log("res:", response);

      // Check if the response has the expected structure
      if (response) {
        if (response.role === "ADMIN") {
          // Save user info to local storage
          localStorage.setItem("user", JSON.stringify(response));
          router.push("/dashboard");
        } else {
          // Handle unauthorized access
          toast({
            variant: "destructive",
            title: "Authorization Error",
            description: "You do not have access to this account.",
          });
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Login to your admin account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@moveit.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
