"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(
      "mysql://u7wwallvnxp5gffz:aAHd4tIiDaDcoQ1oiOiO@bwg9g8ilezeklrvefyjv-mysql.services.clever-cloud.com:3306/bwg9g8ilezeklrvefyjv/getDoctors.php"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("API isteği başarısız oldu.");
        }
        return response.json();
      })
      .then((data) => {
        setDoctors(data);
      })
      .catch((error) => console.error("API hatası:", error));
  }, []);

  const handleAppointment = (doctorId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      router.push(`/appointment/${doctorId}`);
    } else {
      alert("Randevu alabilmek için giriş yapmalısınız!");
      router.push("/login");
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-10 items-center flex flex-col gap-3">
      <h2 className="font-bold text-4xl tracking-wide">Doktorlarımız</h2>
      <h2 className="text-blue-300 text-l">
        Seçtiğiniz Psikoloğumuzdan Randevu Talep Ediniz
      </h2>
      <div className="flex w-full max-w-sm items-center space-x-2 flex-col gap-3">
        <Input
          type="text"
          placeholder="Araştır.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit">Ara</Button>
      </div>

      {filteredDoctors.length === 0 ? (
        <p>Yükleniyor veya veri yok...</p>
      ) : (
        <div className="flex gap-5 flex-wrap justify-center mt-5">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.doctorId}
              className="relative group border border-gray-300 rounded-lg p-5 w-60 text-center transition-all duration-300 hover:shadow-lg"
            >
              {/* Fotoğraf ve İsim */}
              <img
                src={
                  doctor.photo
                    ? `data:image/jpeg;base64,${doctor.photo}` // Base64 formatını kullan
                    : "mysql://u7wwallvnxp5gffz:aAHd4tIiDaDcoQ1oiOiO@bwg9g8ilezeklrvefyjv-mysql.services.clever-cloud.com:3306/bwg9g8ilezeklrvefyjv/images/default.jpg" // Eğer fotoğraf yoksa varsayılan görsel
                }
                alt={doctor.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
              />

              <h3 className="font-bold">{doctor.name}</h3>

              {/* Hover'da Biyografi */}
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 text-sm text-gray-700 hover-bio">
                <p>{doctor.bio}</p>
              </div>

              {/* Randevu Al Butonu */}
              <div className="mt-3 relative z-10">
                <Button
                  type="button"
                  onClick={() => handleAppointment(doctor.doctorId)}
                >
                  Randevu Al
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
