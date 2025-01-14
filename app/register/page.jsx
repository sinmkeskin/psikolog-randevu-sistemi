"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://sql104.infinityfree.com/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );

      const text = await response.text(); // Yanıtı düz metin olarak alın
      console.log("Backend yanıtı (ham):", text);

      // Yanıtın JSON olup olmadığını kontrol edin
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("JSON parse hatası. Yanıt JSON değil:", text);
        alert("Sunucudan beklenmeyen bir yanıt alındı.");
        return;
      }

      console.log("Backend yanıtı (JSON):", data);

      if (data.message) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Fetch hatası:", error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Kayıt Ol</h2>
        <div className="form-group">
          <label htmlFor="firstName">Ad:</label>
          <input
            type="text"
            id="firstName"
            placeholder="Adınızı girin"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Soyad:</label>
          <input
            type="text"
            id="lastName"
            placeholder="Soyadınızı girin"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="register-button">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
