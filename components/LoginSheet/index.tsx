"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, onAuthChange } from "@/app/lib/firebase";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/InputField";
import { PasswordField } from "@/components/PasswordField";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const loginFormSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ."),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginSheetProps {
  children: React.ReactNode;
}

export function LoginSheet({ children }: LoginSheetProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      if (user && open) {
        setOpen(false);
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [open, router]);

  async function onSubmit(data: LoginFormValues) {
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
      form.reset();
      // Sheet will close automatically via useEffect
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="sr-only">Đăng nhập</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col space-y-6 py-4">
          {/* Heading */}
          <Heading className="text-[#10069d] text-center">Đăng nhập</Heading>

          {/* Login by Google */}
          <Button className="bg-white text-black hover:bg-zinc-50 border border-zinc-200">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-4 h-4 mr-2"
            />
            Đăng nhập với Google
          </Button>

          {/* Divider */}
          <div className="flex items-center space-x-4">
            <div className="border-t flex-1 border-zinc-300 dark:border-zinc-700" />
            <Text className="text-sm text-zinc-500">Hoặc tiếp tục với</Text>
            <div className="border-t flex-1 border-zinc-300 dark:border-zinc-700" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <Text className="text-sm text-red-700 dark:text-red-300">
                {error}
              </Text>
            </div>
          )}

          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <InputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Nhập email"
                disabled={loading}
              />

              {/* Password */}
              <PasswordField
                control={form.control}
                name="password"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                disabled={loading}
              />

              {/* Login Button */}
              <div className="space-y-3 pt-2">
                {/* Forgot Password */}
                <Text className="text-sm text-right hover:underline cursor-pointer text-[#10069d]">
                  Quên mật khẩu?
                </Text>

                <Button
                  className="w-full bg-[#10069d] hover:bg-[#0d0580]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </div>

              {/* Terms */}
              <Text className="text-center text-xs text-gray-600 dark:text-gray-400">
                Bằng cách đăng nhập, bạn đồng ý với{" "}
                <Link
                  href={"/terms"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#10069d] font-semibold hover:underline"
                >
                  điều khoản và điều kiện
                </Link>{" "}
                của chúng tôi
              </Text>

              {/* Sign Up */}
              <Text className="text-center text-sm">
                Chưa có tài khoản?{" "}
                <Link
                  href={"/signup"}
                  className="text-[#10069d] font-semibold hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Đăng ký
                </Link>
              </Text>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
