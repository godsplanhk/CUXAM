"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import api from '../../utils/axiosInstance'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {FormLoader} from "@/components/formLoader"

export function LoginForm() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(5),
  });
  const form = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      }
    }
  );
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', values);
      const token = response.data.token;
      if (signIn({
        auth: {
          token: token,
          type: 'Bearer'
        },
        userState: {
          name: response.data.name
        }
      })) {
        localStorage.setItem('token', token);
        navigate("/generate");
      }
    }
    catch (err) {
      if (err && err instanceof AxiosError) {
        alert(err);
      }
      else if (err && err instanceof Error) {
        alert(err.message);
      }
    } finally{
      setIsLoading(false);
    }
  }
  return (
    <CardContainer className="inter-var justify-center w-96">
      <CardBody className="drop-shadow-[0_30px_30px_rgba(130,0,0,.50)] backdrop-blur-sm h-auto w-auto bg-slate-50/30 relative group/card dark:hover:shadow-2xl dark:bg-slate-950 xs:w-[20rem] sm:w-[30rem] rounded-xl p-6 border flex flex-col items-center">
        <CardItem
          className="text-xl text-red-500 font-bold dark:text-Red"
        >
          CUXAM
        </CardItem>
        <CardItem className="text-xl text-blue-500 font-bold max-w-sm mt-2 dark:text-neutral-300">
          User Login
        </CardItem>
        <CardItem
          as="div"
          className="px-4 py-4 rounded-xl text-xs font-normal dark:text-white w-11/12 xs:w-full xs:px-2 xs:py-2"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <FormLabel className="flex text-sm">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <FormLabel className="flex text-sm">Password</FormLabel>
                    <div className="flex w-full relative">
                      <FormControl>
                        <Input className="w-full pr-10" placeholder="password" type={showPassword ? "text" : "password"} {...field} />
                      </FormControl>
                      <span
                        className="absolute inset-y-0 right-2 flex items-center text-xs cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </span></div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="text-base font-medium" type="submit" onClick={() => { form.handleSubmit }}>{isLoading ? <FormLoader /> : 'Submit'}</Button>
            </form>
          </Form>
        </CardItem>
        <CardItem
          className="flex text-sm underline text-blue-500 max-w-sm mt-2 dark:text-neutral-300">
          <a href="https://github.com/godsplanhk/CUXAM">Forgot Password?</a>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}