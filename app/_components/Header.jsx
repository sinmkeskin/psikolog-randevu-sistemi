"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null); // Kullanıcı bilgisi için state
  const [doctor, setDoctor] = useState(null); // Doktor bilgisi için state

  // Kullanıcı ve doktor bilgilerini localStorage'dan al
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedDoctor = localStorage.getItem("doctor");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedDoctor) {
      setDoctor(JSON.parse(storedDoctor));
    }
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleDoctorLoginClick = () => {
    router.push("/doctor-login");
  };

  const handleLogoutClick = () => {
    if (user) {
      localStorage.removeItem("user");
      setUser(null);
    } else if (doctor) {
      localStorage.removeItem("doctor");
      setDoctor(null);
    }
    router.push("/"); // Anasayfaya yönlendir
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
        {doctor ? (
          // Doktor girişi yapılmışsa
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Merhaba, {doctor.name}</span>
            <button onClick={handleLogoutClick} className="login-button">
              Çıkış Yap
            </button>
          </div>
        ) : user ? (
          // Kullanıcı girişi yapılmışsa
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Merhaba, {user.name}</span>
            <button onClick={handleLogoutClick} className="login-button">
              Çıkış Yap
            </button>
          </div>
        ) : (
          // Hiçbir giriş yapılmamışsa
          <div className="flex gap-4">
            <button onClick={handleLoginClick} className="login-button">
              Giriş Yap
            </button>
            <button onClick={handleDoctorLoginClick} className="login-button">
              Doktor Girişi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
