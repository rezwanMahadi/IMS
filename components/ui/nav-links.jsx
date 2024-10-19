'use client';

import { FolderPlusIcon, HomeIcon, QueueListIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import * as React from "react"
import { useEffect, useState } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links_inventory = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'All Products', href: '/dashboard/allProducts', icon: QueueListIcon },
  { name: 'Add Product', href: '/dashboard/addProduct', icon: FolderPlusIcon },
];

const links_td = [
  { name: 'Home', href: '/td-dashboard', icon: HomeIcon },
  { name: 'All Vehicles', href: '/td-dashboard/allvehicles', icon: QueueListIcon },
];

const NavLinks = React.forwardRef(() => {
  const pathname = usePathname();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const local_user_info = JSON.parse(userString);
    if (local_user_info.role === "Inventory Manager") {
      setLinks(links_inventory);
    } else if (local_user_info.role === "Transport Devision Manager") {
      setLinks(links_td);
    }
  }, []);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-sky-300 hover:text-blue-900 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-300 text-blue-900': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
})
NavLinks.displayName = 'NavLinks';
export { NavLinks }