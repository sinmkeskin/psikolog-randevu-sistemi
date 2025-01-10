"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleDoctorClick = () => {
    router.push("/doctors");
  };

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
      path: "/blogs",
    },
  ];

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.jpeg" alt="logo" width={100} height={50} />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item) => (
            <li
              key={item.id}
              className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out"
            >
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4">
        <button onClick={handleLoginClick} className="login-button">
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

export default Header;
