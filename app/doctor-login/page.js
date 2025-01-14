"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://dash.infinityfree.com/accounts/if0_38104156/domains/healthymind.infinityfreeapp.com/doctorLogin.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // Yanıtı JSON olarak çözümle
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("doctor", JSON.stringify(data.doctor)); // Doktor bilgilerini kaydediyoruz
        alert("Giriş başarılı!");
        router.push("/doctor-dashboard"); // Doktor paneline yönlendirme
      } else {
        alert("Giriş başarısız! " + data.error);
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Doktor Girişi</h2>
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
      </form>
    </div>
  );
}

export default DoctorLogin;
