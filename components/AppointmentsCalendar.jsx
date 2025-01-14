"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

const AppointmentsCalendar = ({
  doctorId,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const [timeSlots, setTimeSlots] = useState([]); // Uygun saatler

  // Seçilen tarihe göre saatleri çek
  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    fetch(
      `https://healthymind.infinityfreeapp.com/getDoctorDetails.php?doctorId=${doctorId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const availableSlots = data.availability.filter(
          (slot) => slot.date === formattedDate
        );
        setTimeSlots(availableSlots);
      })
      .catch((error) => console.error("API Hatası:", error));
  }, [doctorId, selectedDate]);

  return (
    <div>
      {/* Takvim */}
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        minDate={new Date()} // Geçmiş tarih seçimi engelle
      />

      {/* Saat Seçimi */}
      <h3 className="text-lg font-bold mt-4">
        Uygun Saatler ({selectedDate.toDateString()}):
      </h3>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {timeSlots.length > 0 ? (
          timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg text-center cursor-pointer ${
                slot.is_available
                  ? "bg-green-200 hover:bg-green-300"
                  : "bg-red-200"
              }`}
              onClick={
                () => slot.is_available && setSelectedTime(slot.time) // Saat seçimini ayarla
              }
            >
              <p>{slot.time}</p>
            </div>
          ))
        ) : (
          <p>Bu tarihte uygun saat yok.</p>
        )}
      </div>

      {/* Seçilen Saat Bilgisi */}
      {selectedTime && (
        <p className="mt-4">
          Seçilen Saat: <b>{selectedTime}</b>
        </p>
      )}
    </div>
  );
};

export default AppointmentsCalendar;
