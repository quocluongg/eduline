"use client";

import { Heading } from "@/components/Heading";
import { motion } from "motion/react";
import Image from "next/image";

const logos = [
  "https://ptit.edu.vn/wp-content/uploads/2024/05/abf51ba6a63c9a93bb6c88a984faeab9-3.png",
  "https://ptit.edu.vn/wp-content/uploads/2024/05/microsoft.png",
  "https://ptit.edu.vn/wp-content/uploads/2024/05/Naver.png",
  "https://ptit.edu.vn/wp-content/uploads/2024/09/Logo-Rikkei.png",
  "https://ptit.edu.vn/wp-content/uploads/2024/09/Logo-Tap-doan-vien-thong-Viettel-Moi-02-01-1024x640-1-e1727270304736.jpg",
  "https://ptit.edu.vn/wp-content/uploads/2024/09/logo-fpt-inkythuatso-1-01-01-14-33-19-e1727270330460.jpg",
  "https://ptit.edu.vn/wp-content/uploads/2024/09/VMO_Logo_Positive--e1727270372975.webp",
  "https://ptit.edu.vn/wp-content/uploads/2024/09/Ericsson-logo-1.png",
];

export default function Marquee() {
  return (
    <div>
      <Heading className="text-center mb-6">Đối tác doanh nghiệp</Heading>
      <section className="w-full bg-white py-10 overflow-hidden relative">
        <motion.div
          className="flex gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-[180px]"
            >
              <img
                src={logo}
                alt={`Logo ${i}`}
                width={150}
                height={80}
                className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
