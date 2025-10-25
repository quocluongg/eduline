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

const profileFormSchema = z.object({
  username: z.string().nonempty("Username is required."),
  password: z.string().nonempty("Password is required."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const LoginForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    // ... (logic onSubmit)
  }

  return (
    <div className="flex flex-col space-y-6 min-h-screen justify-center ">
      {/* heading  */}
      <Heading className="text-[#10069d]">Login</Heading>

      {/* login by google */}
      <Button className="bg-white text-black space-y-2">
        {/* logo  */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
          alt=""
          className="w-4 h-4"
        />
        Login with Google
      </Button>

      {/* or continute with */}
      <div className="flex justify-around items-center space-x-4">
        <div className="border-1 w-[90px] h-[1px] border-black/30" />
        <Text>Or continue with</Text>
        <div className="border-1 w-[90px] h-[1px] border-black/30" />
      </div>

      {/* login form  */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* username */}
          <InputField
            control={form.control}
            name="username"
            label="Email"
            placeholder="Enter your email"
          />

          {/* password */}
          <PasswordField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          {/* login button */}
          <div>
            {/* forgot */}
            <Text className="text-sm text-right hover:underline cursor-pointer text-[#10069d]">
              Forgot Your Password?
            </Text>
            <Button className="w-full bg-[#10069d]" type="submit">
              Login
            </Button>
          </div>

          {/* terms */}
          <Text className="text-center text-sm text-gray-600">
            By logging in, you agree to our's{" "}
            <Link
              href={"/terms"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10069d] font-semibold hover:underline"
            >
              terms and conditions
            </Link>
          </Text>

          {/* sign up */}
          <Text className="text-center">
            Don't have an account?{" "}
            <Link
              href={"/signup"}
              className="text-[#10069d] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </Text>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
