"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container">
      <div className="container h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader className="flex justify-center items-center">
            <CardTitle>Welcome to Industrial Inventory and</CardTitle>
            <CardTitle> Transport Management</CardTitle>
            <CardDescription>To access dashboard please log in.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mt-6">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600" onClick={(e) => { e.PreventDefault; router.push('/login'); }}>Log in</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
