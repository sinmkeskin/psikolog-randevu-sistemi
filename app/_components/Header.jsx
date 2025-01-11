"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null); // Kullanıcı bilgisi için state

  // Kullanıcıyı localStorage'dan al
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Kullanıcıyı state'e yükle
    }
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user"); // Kullanıcıyı localStorage'dan kaldır
    setUser(null); // Kullanıcıyı state'ten kaldır
    router.push("/"); // Anasayfaya yönlendir
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
      {/* Logo ve Menü */}
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

      {/* Kullanıcı Durumu */}
      <div className="flex gap-4">
        {user ? (
          // Giriş yapılmışsa
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Merhaba, {user.name}</span>
            <button onClick={handleLogoutClick} className="login-button">
              Çıkış Yap
            </button>
          </div>
        ) : (
          // Giriş yapılmamışsa
          <button onClick={handleLoginClick} className="login-button">
            Giriş Yap
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
