"use client";
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CardWithForm() {
  const [email_val, setEmailValue] = useState('');
  const [pass_val, setPassValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = toast.loading("Loading...", {
      toastId: "1234abc",
      position: "top-center",
    });
    const data = {
      email: email_val,
      pass: pass_val
    }
    console.log(data);
    try {
      let res = await fetch("/auth", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let response = await res.json();
      if (response.success == true) {
        toast.update(id, {
          position: "top-center",
          autoClose: 2000,
          render: "Log In Successful.",
          type: "success",
          isLoading: false,
          pauseOnHover: false,
          hideProgressBar: true,
          theme: "colored",
        });
        const local_user_info = {
          name: response.user_info.name,
          email: response.user_info.email,
          finger_tag: response.user_info.finger_tag,
          role: response.user_info.role,
        };
        localStorage.setItem('user', JSON.stringify(local_user_info));
        console.log("Done Done Done");
        console.log(response);
        if (response.user_info.role == "Inventory Manager") {
          router.push('/dashboard');
        }
        else if(response.user_info.role == "Transport Devision Manager"){
          router.push('/td-dashboard');
        }
      }
      else {
        toast.update(id, {
          position: "top-center",
          autoClose: 2000,
          render: "Email or password is wrong",
          type: "error",
          isLoading: false,
          pauseOnHover: false,
          hideProgressBar: true,
          theme: "colored",
        });
        console.log("Email or pass wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>To access dashboard please log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Example: yourmail@gmail.com" value={email_val} onChange={(e) => setEmailValue(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="Your password" value={pass_val} onChange={(e) => setPassValue(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Log in</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  )
}
