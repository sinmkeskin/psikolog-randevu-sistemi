"use client"; // Eğer app/ kullanıyorsanız gerekli

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // app/ için
// import { useRouter } from "next/router"; // pages/ için

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/clinic-api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Giriş başarılı!");
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/doctors");
    } else {
      alert(data.message || "Giriş başarısız.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-96">
        <label>
          E-posta:
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded-md w-full"
          />
        </label>
        <label>
          Şifre:
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded-md w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Giriş Yap
        </button>
      </form>
      <p className="mt-3">
        Hesabınız yok mu?{" "}
        <a href="/register" className="text-blue-500 underline">
          Kayıt Ol
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
