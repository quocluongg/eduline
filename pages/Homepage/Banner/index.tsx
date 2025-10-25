"use client";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";

const Banner = () => {
  const text = "Tri thức, Sáng tạo\nĐạo đức, Trách nhiệm";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="container bg-white flex lg:flex-row flex-col items-center justify-between py-10">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="lg:hidden w-full mb-6"
      >
        <img
          src="/banner.png"
          alt="PTIT Banner"
          className="rounded-[50px] object-contain w-full"
        />
      </motion.div>
      <div className="flex-1 px-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heading
            as="h2"
            size="xl"
            className="tracking-[2px] text-[20px] lg:!text-[30px] uppercase leading-normal text-black whitespace-pre-line"
          >
            {displayed}
            <motion.span
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className="ml-1"
            >
              _
            </motion.span>
          </Heading>
        </motion.div>

        <Text className="mt-10 text-gray-700" size="lg">
          Học viện Công nghệ Bưu chính Viễn thông (PTIT) là trường công lập uy
          tín gần 75 năm, giữ vai trò nòng cốt trong đào tạo và nghiên cứu các
          lĩnh vực công nghệ số như CNTT, AI, Dữ liệu, Vi mạch, Robotics, Điện
          tử – Viễn thông… Trường được Nhà nước ưu tiên đầu tư, hướng đến phát
          triển nguồn nhân lực chất lượng cao, phục vụ các ngành công nghệ mũi
          nhọn và chuyển đổi số quốc gia.
        </Text>

        <Link href={"/courses"}>
          <Button className="mt-10 bg-[#10069d] text-white hover:bg-[#0d0585]">
            Khám phá ngay
          </Button>
        </Link>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="lg:w-1/2 lg:flex hidden w-full mt-4 justify-end"
      >
        <img
          src="/banner.png"
          alt="PTIT Banner"
          className="rounded-[50px] object-contain w-full"
        />
      </motion.div>
    </div>
  );
};

export default Banner;
