"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TuserSchema, userSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

const SignUp = () => {
  const { push } = useRouter();
  const { session } = useAuth();

  if (session) {
    redirect("/");
  }
  const form = useForm<TuserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onsubmit = (data: TuserSchema) => {
    signUpUser.mutate(data);
  };
  const signUpUser = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (data: TuserSchema) => {
      const response = await axios.post(
        "http://localhost:3000/api/createUser",

        data
      );
      return response.data;
    },
    onSuccess: () => {
      push("/login");
    },
    onError: () => {
      toast(`Something Went Wrong`);
    },
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex flex-col justify-end items-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="User Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={signUpUser.isPending}>
            {signUpUser.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
