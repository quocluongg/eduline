"use client";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { motion, animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

const stats = [
  {
    number: 1,
    suffix: "",
    label: "hạng về Đổi mới sáng tạo theo xếp hạng của Scimago năm 2024",
  },
  { number: 30, suffix: "+", label: "Chương trình đào tạo trình độ Đại học" },
  { number: 10, suffix: "", label: "Chương trình đào tạo Thạc sĩ và Tiến sĩ" },
  {
    number: 3,
    suffix: "",
    label:
      "Văn phòng hợp tác nghiên cứu đào tạo, Liên kết đào tạo tại Nhật Bản và Hàn Quốc",
  },
  {
    number: 7,
    suffix: "",
    label:
      "Cơ sở nghiên cứu, đào tạo Đại học và đào tạo ngắn hạn trên toàn lãnh thổ Việt Nam",
  },
  { number: 400, suffix: "+", label: "Đối tác trong và ngoài nước" },
];

const CountUp = ({ value, suffix }: { value: number; suffix?: string }) => {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (!textRef.current || !isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (textRef.current) {
          textRef.current.textContent = `${Math.floor(latest)}${suffix ?? ""}`;
        }
      },
    });

    return () => {
      controls.stop();
    };
  }, [isInView, value, suffix]);

  return (
    <div ref={containerRef} aria-hidden>
      <span ref={textRef}>0{suffix ?? ""}</span>
    </div>
  );
};

const Stats = () => {
  return (
    <div className="relative left-1/2 right-1/2 -mx-[calc(50vw-7px)] w-[calc(100vw-16px)] bg-[#10069d] text-center py-12 flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-4 text-white">
        <Heading className="text-white text-3xl font-bold">
          Thành tựu và Quy mô Đào tạo
        </Heading>

        <Text className="text-white/80 max-w-2xl">
          Những con số thể hiện vị thế và năng lực của Học viện trong đào tạo,
          nghiên cứu và hợp tác quốc tế.
        </Text>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-8">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <div className="text-5xl font-bold text-white">
                <CountUp value={item.number} suffix={item.suffix} />
              </div>
              <p className="text-white/90 text-sm md:text-base max-w-xs">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
