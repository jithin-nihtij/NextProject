"use client";

import { loginSchema, TloginSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const form = useForm<TloginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { push } = useRouter();

  const { session } = useAuth();

  if (session) {
    push("/");
  }

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: TloginSchema) => {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log({ response });
      if (response?.error) {
        throw new Error(response.error);
      }
      if (!response?.ok) {
        throw new Error("Login failed");
      }
      return response;
    },
    onSuccess: () => {
      push("/");
    },
    onError: (error: Error) => {
      console.log("error", error);
    },
  });

  const onSubmit = (data: TloginSchema) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    aria-label="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    aria-label="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
