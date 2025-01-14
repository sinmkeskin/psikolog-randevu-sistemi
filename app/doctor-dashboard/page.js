"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [content, setContent] = useState(""); // Blog içeriği
  const router = useRouter();

  useEffect(() => {
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    if (!doctorData || !doctorData.doctorId) {
      alert("Lütfen giriş yapın.");
      router.push("/doctor-login");
      return;
    }

    setDoctor(doctorData);

    // Randevuları çek
    fetchAppointments(doctorData.doctorId);
  }, []);

  const fetchAppointments = (doctorId) => {
    fetch(
      `http://healthymind.infinityfreeapp.com/getAppointments.php?doctorId=${doctorId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.appointments) {
          setAppointments(data.appointments);
        } else {
          alert("Randevular alınamadı.");
        }
      })
      .catch((error) => {
        console.error("Randevuları alırken hata oluştu:", error);
      });
  };

  const handleAvailabilitySubmit = () => {
    const doctorData = JSON.parse(localStorage.getItem("doctor"));

    if (!doctorData || !doctorData.doctorId) {
      alert("Doktor bilgisi bulunamadı. Lütfen tekrar giriş yapın.");
      return;
    }

    const requestBody = {
      doctorId: doctorData.doctorId,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      isAvailable: 1,
    };

    fetch("http://healthymind.infinityfreeapp.com/addAvailability.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Müsaitlik saati eklendi!");
        } else {
          alert("Saat eklenemedi: " + (data.error || "Bilinmeyen hata"));
        }
      })
      .catch((error) => {
        console.error("API Hatası:", error);
      });
  };

  const handleAppointmentStatus = (id, status) => {
    const requestBody = {
      appointmentId: id,
      status,
    };

    fetch(
      "http://healthymind.infinityfreeapp.com/updateAppointmentStatus.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP isteği başarısız.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Randevu durumu başarıyla güncellendi.");
          fetchAppointments(doctor.doctorId);
        } else {
          alert("Hata: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Durum güncellenirken hata oluştu:", error);
      });
  };

  // Blog gönderme fonksiyonu
  const handleBlogSubmit = () => {
    const requestBody = {
      doctorId: doctor.doctorId,
      content: content,
    };

    fetch("http://healthymind.infinityfreeapp.com/addBlog.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Blog yazısı başarıyla kaydedildi.");
        } else {
          alert("Hata: " + data.error);
        }
      })
      .catch((error) => {
        console.error("API Hatası:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-4 shadow">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">Doktor Paneli</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6 space-y-8">
        {/* Müsaitlik Ekle */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Yeni Müsaitlik Saati Ekle
          </h2>
          <div className="flex gap-4 items-center">
            <input
              type="date"
              className="border rounded-lg p-2 w-1/3"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
            <input
              type="time"
              className="border rounded-lg p-2 w-1/3"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
            <button
              onClick={handleAvailabilitySubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Ekle
            </button>
          </div>
        </section>

        {/* Randevular */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Randevular</h2>
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2">Tarih</th>
                <th className="px-4 py-2">Saat</th>
                <th className="px-4 py-2">Kullanıcı</th>
                <th className="px-4 py-2">Durum</th>
                <th className="px-4 py-2">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b">
                  <td className="px-4 py-2">{appointment.date}</td>
                  <td className="px-4 py-2">{appointment.time}</td>
                  <td className="px-4 py-2">{appointment.email}</td>
                  <td className="px-4 py-2">{appointment.status}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() =>
                        handleAppointmentStatus(appointment.id, "approved")
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded-lg"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() =>
                        handleAppointmentStatus(appointment.id, "rejected")
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Reddet
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Blog Yazısı */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Blog Yazısı Oluştur</h2>
          <textarea
            placeholder="Blog içeriği"
            className="w-full border rounded-lg p-4"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)} // İçeriği güncelle
          ></textarea>
          <button
            onClick={handleBlogSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
          >
            Yayınla
          </button>
        </section>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto text-center text-gray-600">
          © 2025. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
};

export default DoctorDashboard;
