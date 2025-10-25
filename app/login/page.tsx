"use client";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/InputField";
import { PasswordField } from "@/components/PasswordField";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthChange } from "../lib/firebase";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";

const profileFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      if (user) {
        // Redirect to home or dashboard when logged in
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);
    setError("");

    const { user, error: authError } = await signInWithEmailAndPassword(
      data.email,
      data.password
    );

    if (authError) {
      setError(authError);
      setLoading(false);
    } else {
      // Success - auth state change will handle redirect
      form.reset();
    }
  }

  // Show loading state while checking auth
  if (currentUser) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <Text>Redirecting...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="flex flex-col space-y-6">
          {/* heading  */}
          <Heading className="text-[#10069d] text-center">Login</Heading>

          {/* login by google */}
          <Button className="bg-white text-black hover:bg-zinc-50 border border-zinc-200">
            {/* logo  */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-4 h-4 mr-2"
            />
            Login with Google
          </Button>

          {/* or continue with */}
          <div className="flex justify-around items-center space-x-4">
            <div className="border-t w-full border-zinc-300 dark:border-zinc-700" />
            <Text className="text-nowrap">Or continue with</Text>
            <div className="border-t w-full border-zinc-300 dark:border-zinc-700" />
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <Text className="text-sm text-red-700 dark:text-red-300">
                {error}
              </Text>
            </div>
          )}

          {/* login form  */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* email */}
              <InputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Nhập email"
                disabled={loading}
              />

              {/* password */}
              <PasswordField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Điền password"
                disabled={loading}
              />

              {/* login button */}
              <div className="space-y-3">
                {/* forgot */}
                <Text className="text-sm text-right hover:underline cursor-pointer text-[#10069d]">
                  Forgot Your Password?
                </Text>
                <Button
                  className="w-full bg-[#10069d] hover:bg-[#0d0580]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
