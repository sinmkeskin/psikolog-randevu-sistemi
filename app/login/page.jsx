"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./../globals.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://dash.infinityfree.com/accounts/if0_38104156/domains/healthymind.infinityfreeapp.com/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Backend'den dönen data:", data);

        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.name, email: data.email })
        );

        alert("Başarıyla giriş yaptınız!");
        router.push("/"); // Anasayfaya yönlendir
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Giriş bilgileri yanlış!");
      }
    } catch (error) {
      console.error("Giriş sırasında bir hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
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
