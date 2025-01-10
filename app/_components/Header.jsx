import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  const Menu = [
    {
      id: 1,
      name: "AnaSayfa",
      path: "/",
    },
    {
      id: 2,
      name: "Danışmanlarımız",
      path: "/doctors",
    },
    {
      id: 3,
      name: "Bloglar",
      path: "/",
    },
  ];

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.jpeg" alt="logo" width={100} height={50} />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item) => (
            <li
              key={item.id} // key özelliği eklendi
              className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out"
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Button>Giriş Yap</Button>
    </div>
  );
}

export default Header;
