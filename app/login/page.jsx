"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./../globals.css"; // Eğer bir genel stil dosyanız varsa ekleyin

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API'ye bağlanmak için fetch kullanabilirsiniz
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Başarılı girişte yönlendirme yap
      router.push("/doctors");
    } else {
      alert("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Giriş Yap</h2>
        <div className="form-group">
          <label htmlFor="email">E-posta:</label>
          <input
            type="email"
            id="email"
            placeholder="E-posta adresinizi girin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            placeholder="Şifrenizi girin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Giriş Yap
        </button>
        <p className="register-link">
          Hesabınız yok mu? <a href="/register">Kayıt Ol</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
