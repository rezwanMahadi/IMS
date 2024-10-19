"use client";
import SideNav from "@/components/Sidenav";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

let session_permission = false;

export default function Layout({ children }) {
    const router = useRouter();
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString != null) {
            const local_user_info = JSON.parse(userString);
            console.log(local_user_info);
            session_permission = true;

        } else {
            router.push('/login');
        }
    }, [router])
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}