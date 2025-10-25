"use client";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { motion } from "motion/react";
import Image from "next/image";

const testimonialsData = [
  {
    name: "Võ Trung Kiên",
    title: "D22, Kỹ sư Backend tại Codeleap",
    avatarSrc: "/avatars/kane.jpeg",
    quote:
      "Nhờ nền tảng kiến thức vững chắc về Khoa học máy tính và sự tận tâm của giảng viên PTIT, tôi đã tự tin bước vào lĩnh vực Trí tuệ Nhân tạo. Các dự án nghiên cứu ở trường giúp tôi hiểu rõ cách áp dụng AI vào thực tế doanh nghiệp.",
  },
  {
    name: "Lương Võ Khôi Quốc",
    title: "D22, Kỹ sư Frontend tại Cohart",
    avatarSrc: "/avatars/quoc-luong.png",
    quote:
      "Học ở PTIT không chỉ giúp tôi có tư duy logic mà còn được rèn luyện kỹ năng làm việc nhóm và giải quyết vấn đề. Các thầy cô luôn khuyến khích sinh viên sáng tạo và cập nhật xu hướng công nghệ mới.",
  },
  {
    name: "Vũ Quỳnh Anh",
    title: "D21, Thủ khoa khóa đầu tiên ngành Công nghệ Tài chính PTIT",
    avatarSrc: "/avatars/avt2.png",
    quote:
      "PTIT là nơi tôi học được cách biến đam mê công nghệ thành nghề nghiệp thực thụ. Môi trường năng động, nhiều câu lạc bộ kỹ thuật giúp tôi phát triển cả kỹ năng cứng lẫn kỹ năng mềm.",
  },
  {
    name: "Mai Thị Phượng",
    title: "D22, Nữ sinh tiêu biểu toàn quốc trong lĩnh vực khoa học công nghệ",
    avatarSrc: "/avatars/avt.png",
    quote:
      "Học viện đã truyền cảm hứng để tôi dấn thân vào lĩnh vực giáo dục công nghệ. Sự kết hợp giữa kiến thức chuyên sâu và tinh thần đổi mới sáng tạo tại PTIT là nền tảng giúp tôi khởi nghiệp thành công.",
  },
];

const SuccessStories = () => {
  return (
    <section className="container flex flex-col items-center justify-center">
      {/* heading */}
      <Heading className="text-center mb-4">CÂU CHUYỆN THÀNH CÔNG</Heading>

      {/* subtitle */}
      <Text className="text-center text-gray-600 max-w-2xl mb-12">
        Những sinh viên PTIT đã và đang khẳng định vị thế của mình trong ngành
        công nghệ thông tin và đổi mới sáng tạo.
      </Text>

      {/* grid zigzag layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {testimonialsData.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`bg-white rounded-2xl shadow-md p-6 text-center flex flex-col items-center hover:shadow-xl transition-all 
              ${
                i % 2 === 1
                  ? "lg:translate-y-10"
                  : i % 3 === 0
                  ? "lg:-translate-y-6"
                  : ""
              }`}
          >
            <Image
              src={t.avatarSrc}
              alt={t.name}
              width={80}
              height={80}
              className="rounded-full object-cover mb-4 border-2 border-[#10069d]"
            />
            <h3 className="font-semibold text-lg text-black">{t.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{t.title}</p>
            {/* content  */}
            <div className=" flex gap-2">
              {/* icon */}
              <span className="text-[50px] font-bold text-gray-500 opacity-80">
                “
              </span>

              {/* quote */}
              <Text className="text-gray-700 text-sm text-left">
                {t.quote}”
              </Text>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
