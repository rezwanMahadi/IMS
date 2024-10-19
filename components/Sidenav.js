"use client";
import Link from 'next/link';
// import NavLinks from '@/app/ui/dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, UserCircleIcon, EnvelopeIcon, UserIcon, Cog6ToothIcon, AtSymbolIcon, FingerPrintIcon } from '@heroicons/react/24/outline';
import { NavLinks } from '@/components/ui/nav-links';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";


export default function SideNav() {
  const [user_name, setUser_name] = useState('');
  const [user_email, setUser_email] = useState('');
  const [user_tag, setUser_tag] = useState('');
  const [user_role, setuser_role] = useState('');
  const router = useRouter();
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString != null) {
      const local_user_info = JSON.parse(userString);
      setUser_name(local_user_info.name);
      setUser_email(local_user_info.email);
      setUser_tag(local_user_info.finger_tag);
      setuser_role(local_user_info.role);
      console.log(local_user_info);
      console.log("user", user_name);
    } else {
      router.push('/login');
    }
  }, [])

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link className="mb-2 flex md:flex-col h-20 space-y-3 items-center justify-center rounded-md bg-sky-800 text-white p-4 md:h-52" href="/dashboard">
        <h1 className='text-[25px]'>User Information</h1>
        <div className="w-32 flex flex-col md:w-52 space-y-2">
          <div className="flex space-x-2">
            <UserCircleIcon className='h-6 w-6' />
            <span>{user_name}</span>
          </div>
          <div className="flex space-x-2">
            <AtSymbolIcon className="h-6 w-6" />
            <span>{user_email}</span>
          </div>
          <div className="flex space-x-2">
            <FingerPrintIcon className="h-6 w-6" />
            <span>{user_tag}</span>
          </div>
          <div className="flex space-x-2">
            <Cog6ToothIcon className="h-6 w-6" />
            <span>{user_role}</span>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-200 md:block"></div>
        <Link href="/login">
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-sky-300 hover:text-blue-900 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </Link>
      </div>
    </div>
  );
}
