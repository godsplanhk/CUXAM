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
export function LoginForm() {
  const signIn = useSignIn();
  const navigate = useNavigate();
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
    }

  }
  return (
    <CardContainer className="inter-var justify-center w-96">
      <CardBody className="backdrop-blur-sm h-auto w-auto bg-white/30 relative group/card dark:hover:shadow-2xl dark:bg-black xs:w-[20rem] sm:w-[30rem] rounded-xl p-6 border flex flex-col items-center">
        <CardItem
          className="text-xl text-red-500 font-bold dark:text-Red"
        >
          CUXAM
        </CardItem>
        <CardItem className="text-xl text-blue-500 font-bold max-w-sm mt-2 dark:text-neutral-300">
          Login
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
                    <FormLabel className="flex">Username</FormLabel>
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
                    <FormLabel className="flex">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" onClick={() => { form.handleSubmit }}>Submit</Button>
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