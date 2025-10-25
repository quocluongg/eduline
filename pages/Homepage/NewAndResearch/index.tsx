"use client";

import { motion } from "motion/react";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";

const newsList = [
  {
    image:
      "https://ptit.edu.vn/wp-content/uploads/2025/10/z7119193650586_9c103b3ce973cd489ef45183c319ac1e-1536x1024.jpg",
    date: "25/10/2025",
    title:
      "Học viện Công nghệ Bưu chính Viễn thông phối hợp cùng Qualcomm ra mắt nền tảng L2Pro và khởi động chương trình QVIC 2026",
    description:
      "Ngày 15/10, tại Học viện Công nghệ Bưu chính Viễn thông (PTIT), chương trình Thử thách đổi mới sáng tạo Qualcomm Việt Nam – QVIC 2026 chính thức được khởi động, thu hút sự quan tâm của đông đảo sinh viên, startup công nghệ và các chuyên gia trong lĩnh vực đổi mới sáng tạo và sở hữu trí tuệ.",
  },
  {
    image: "https://ptit.edu.vn/wp-content/uploads/2025/10/DSC02981-scaled.jpg",
    date: "20/10/2025",
    title: "PTIT tổ chức Lễ tốt nghiệp cho gần 800 Thạc sỹ, Cử nhân",
    description:
      "Ngày 24/10/2025, tại Hà Nội, Học viện Công nghệ Bưu chính Viễn thông đã tổ chức Lễ tốt nghiệp năm 2025 đợt 2 và trao bằng cho 48 Thạc sỹ cùng 750 cử nhân khối các ngành Kinh tế, Truyền thông khóa D21.",
  },
  {
    image:
      "https://ptit.edu.vn/wp-content/uploads/2025/10/60ed11b470499894b7b2f27da53d019094557af586.webp_rt202510221202.webp",
    date: "10/10/2025",
    title:
      "Trao học bổng toàn phần cho sinh viên Sri Lanka sang học tại Học viện Công nghệ Bưu chính Viễn thông",
    description:
      "Sáng 21/10, Đại sứ quán Việt Nam tại Sri Lanka tổ chức lễ công bố và trao học bổng toàn phần của Học viện Công nghệ Bưu chính Viễn thông (cơ sở Hà Nội) cho các sinh viên Sri Lanka.",
  },
];

const NewsAndResearch = () => {
  return (
    <section className="container flex flex-col justify-center gap-4">
      {/* title */}
      <Heading className="text-center uppercase">Tin tức nổi bật</Heading>

      {/* subtitle */}
      <Text className="text-center">
        Tổng hợp các tin tức nổi bật về hoạt động của học viện
      </Text>

      {/* danh sách tin */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
      >
        {newsList.map((news, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <NewsCard
              date={news.date}
              description={news.description}
              image={news.image}
              title={news.title}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* button */}
      <Button className="bg-[#10069d] text-white mx-auto">Tìm hiểu thêm</Button>
    </section>
  );
};

export default NewsAndResearch;
