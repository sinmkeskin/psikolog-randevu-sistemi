"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AppointmentCalendar from "@/components/AppointmentsCalendar";

const AppointmentPage = () => {
  const params = useParams();
  const doctorId = params?.doctorId; // URL'den gelen doktor ID'si
  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState([]); // Uygun saatler
  const [selectedDate, setSelectedDate] = useState(new Date()); // Tarih state'i
  const [selectedTime, setSelectedTime] = useState(""); // Saat state'i

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  // Doktor bilgilerini çek
  useEffect(() => {
    if (!doctorId) {
      console.error("Doktor ID bulunamadı.");
      return;
    }

    fetch(
      `http://localhost/clinic-api/getDoctorDetails.php?doctor_id=${doctorId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API Hatası: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data?.doctor) {
          setDoctor(data.doctor);
        } else {
          console.error("Doktor bilgileri alınamadı:", data);
        }
      })
      .catch((error) => console.error("API Hatası:", error));
  }, [doctorId]);

  // Randevu Talebi Fonksiyonu
  const handleAppointmentRequest = () => {
    // Kullanıcı bilgilerini `localStorage`'dan al
    const user = JSON.parse(localStorage.getItem("user")); // `user` bilgisini alıp parse ediyoruz
    const userEmail = user?.email;

    if (!userEmail) {
      alert(
        "Giriş yapmış görünüyorsunuz, ancak e-posta bilgisi alınamadı. Lütfen tekrar giriş yapmayı deneyin."
      );
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Lütfen bir tarih ve saat seçin!");
      return;
    }

    const requestBody = {
      doctorId,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      userEmail, // LocalStorage'dan alınan e-posta
    };

    console.log("Randevu Talebi Gönderiliyor:", requestBody);

    fetch("http://localhost/clinic-api/requestAppointment.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Randevu API Hatası: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Randevu talebiniz başarıyla gönderildi!");
        } else {
          alert("Randevu talebi başarısız: " + data.message);
        }
      })
      .catch((error) => console.error("Randevu talebi hatası:", error));
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
