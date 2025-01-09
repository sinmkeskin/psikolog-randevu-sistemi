import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <Image src="/logo.jpeg" alt="logo" width={50} height={25} />
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2025. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
