"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // URL parametresini almak için
import AppointmentCalendar from "@/components/AppointmentsCalendar";

const AppointmentPage = () => {
  const { doctorId } = useParams(); // doctorId'yi useParams ile alıyoruz
  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  // Doktor verilerini al
  useEffect(() => {
    if (doctorId) {
      fetch(
        `https://sql104.infinityfree.com/getDoctorDetails.php?doctorId=${doctorId}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
            alert("Doktor bilgileri alınırken bir hata oluştu.");
          } else {
            setDoctor(data.doctor);
            setAvailability(data.availability);
          }
        })
        .catch((error) => console.error("API Hatası:", error));
    }
  }, [doctorId]);

  // Randevu talebini gönder
  const handleAppointmentRequest = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Kullanıcı bilgilerini al

    if (!user || !user.email) {
      alert("Lütfen giriş yapın!");
      return;
    }

    const requestBody = {
      doctorId, // Doktor ID'si
      date: selectedDate.toISOString().split("T")[0], // Tarih
      time: selectedTime, // Saat
      email: user.email, // Kullanıcı e-postasını 'email' olarak gönderiyoruz
    };

    fetch("https://sql104.infinityfree.com/requestAppointment.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Randevu talebiniz başarıyla gönderildi!");
        } else {
          alert("Hata: " + data.message);
        }
      })
      .catch((error) => {
        console.error("API Hatası:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      {doctor ? (
        <div>
          <div className="flex gap-6">
            {/* Doktor Bilgileri */}
            <div className="w-1/3">
              <img
                src={`data:image/jpeg;base64,${doctor.photo}`}
                alt={doctor.name}
                className="w-full rounded-lg shadow-lg"
              />
              <h2 className="text-xl font-bold mt-4">{doctor.name}</h2>
            </div>

            {/* Randevu Takvimi */}
            <div className="w-2/3">
              <AppointmentCalendar
                doctorId={doctorId}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                availability={availability} // Uygun saatleri geçiyoruz
              />
              <div className="mt-6">
                <p>
                  Seçilen Tarih: <b>{selectedDate.toDateString()}</b>
                </p>
                <p>
                  Seçilen Saat: <b>{selectedTime || "Henüz seçilmedi"}</b>
                </p>
                <button
                  onClick={handleAppointmentRequest}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Randevu Talep Et
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Doktor bilgileri yükleniyor...</p>
      )}
    </div>
  );
};

export default AppointmentPage;
