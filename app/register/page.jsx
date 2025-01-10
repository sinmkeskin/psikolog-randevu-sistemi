"use client";

import React, { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/clinic-api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      window.location.href = "/login"; // Giriş sayfasına yönlendir
    } else {
      alert(data.message || "Bir hata oluştu.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Kayıt Ol</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border p-6 rounded-md w-96"
      >
        <label>
          Ad Soyad:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />
        </label>
        <label>
          E-posta:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />
        </label>
        <label>
          Şifre:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />
        </label>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
