"use client";

import { Heading } from "@/components/Heading";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const newsData = [
  {
    id: 1,
    title:
      "Thông báo v/v thực hiện đánh giá kết quả rèn luyện sinh viên học kỳ 2 năm học 2024-2025",
    date: "22/10/2025",
    image: "https://ptit.edu.vn/wp-content/uploads/2025/09/Thong-bao-1.jpg",
  },
  {
    id: 2,
    title:
      "Thông báo về việc tổ chức Lễ Tốt nghiệp năm 2025 – đợt 2 (tháng 10/2025)",
    date: "17/10/2025",
    image: "https://ptit.edu.vn/wp-content/uploads/2025/09/Thong-bao-1.jpg",
  },
  {
    id: 3,
    title: "Thông báo chương trình: Samsung Talent Program 2025",
    date: "13/10/2025",
    image: "https://ptit.edu.vn/wp-content/uploads/2025/09/Thong-bao-1.jpg",
  },
  {
    id: 4,
    title: "Chương trình học bổng tài năng STP 2025",
    date: "07/10/2025",
    image: "https://ptit.edu.vn/wp-content/uploads/2025/09/Thong-bao-1.jpg",
  },
];

const sideNews = [
  "Thông báo về việc thu hồ sơ xét miễn, giảm học phí và hỗ trợ chi phí học tập",
  "Thông báo về việc hỗ trợ sinh viên chịu ảnh hưởng bởi bão lụt năm 2025",
  "Thông báo cảnh báo (lần 5) về các thủ đoạn lừa đảo trên mạng xã hội",
  "Thông báo thay đổi thời gian buổi gặp gỡ, đối thoại giữa Giám đốc Học viện và sinh viên",
];

const News = () => {
  return (
    <section className="container mx-auto py-12 px-4 lg:px-0">
      {/* title */}
      <Heading className="text-center uppercase">Thông báo</Heading>

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
          {newsData.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            >
              <div className="relative w-full h-40">
                <img
                  src={news.image}
                  alt={news.title}
                  className="object-cover w-full h-40"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="text-sm text-gray-500 font-medium flex gap-2 justify-start items-center">
                  <Calendar />
                  {news.date}
                </p>
                <h3 className="text-black font-semibold text-base leading-snug line-clamp-2 hover:text-[#10069d]">
                  {news.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 w-full lg:w-[30%]"
        >
          <h4 className="font-semibold text-lg text-[#10069d] underline underline-offset-4">
            Tin nổi bật
          </h4>
          {sideNews.map((title, i) => (
            <div
              key={i}
              className="border-b border-gray-200 pb-3 hover:text-[#10069d] transition-colors text-black text-sm leading-snug cursor-pointer"
            >
              {title}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default News;
