import React from "react";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Sevdiğiniz Doktorlardan Kolayca Randevu Alın ve Planlayın
              </h2>
              <p className="mt-4 text-gray-700">
                Klinik olarak, alanında uzman birçok doktorumuzla sağlık
                hizmetinde en iyiyi sunmaktan gurur duyuyoruz. Sağlığınız için
                en doğru adımı atmak adına dilediğiniz uzmanımızla görüşmek için
                hemen randevunuzu talep edin. Sağlıklı yarınlar için sizi
                bekliyoruz!
              </p>
              <Button className="mt-10">Randevu Talep Edin</Button>
            </div>
          </div>
          {/* Google Maps Embed */}
          <div className="rounded-3xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d304494.8104018238!2d40.85131529707252!3d41.020237885661215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40625e4dd4f5eaaf%3A0x3f8db1ef6f542849!2sFener,%20Recep%20Tayyip%20Erdoğan%20%C3%9Cniversitesi%20Zihni%20Derin%20Yerle%C5%9Fkesi,%2053100%20Rize%20Merkez/Rize!5e0!3m2!1str!2str!4v1683482473487!5m2!1str!2str"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
