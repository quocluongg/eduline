"use client";

import { useState } from "react";
import PublicLayout from "@/layout/PublicLayout";
import {
  Trophy,
  Briefcase,
  Users,
  Medal,
  GraduationCap,
  Building2,
  Calendar,
} from "lucide-react";

const icons = {
  Trophy,
  Briefcase,
  Users,
  Medal,
  GraduationCap,
  Building2,
  Calendar,
};
type IconKey = keyof typeof icons;

interface NavData {
  id: number;
  title: string;
  icon: IconKey;
}

const navData: NavData[] = [
  { id: 1, title: "Học bổng", icon: "Trophy" },
  { id: 2, title: "Thực tập", icon: "Briefcase" },
  { id: 3, title: "Hoạt động", icon: "Users" },
];

export interface Scholarship {
  id: number;
  title: string;
  description: string;
  details: { label: string; value: string }[];
  deadline: string;
  note?: string;
  icon: IconKey;
  color: string;
}

export const scholarshipData: Scholarship[] = [
  {
    id: 1,
    title: "Học bổng khuyến khích học tập",
    description: "Dành cho sinh viên có kết quả học tập xuất sắc",
    details: [
      { label: "Loại A (GPA ≥ 3.6)", value: "3.000.000 VND" },
      { label: "Loại B (GPA 3.2–3.59)", value: "2.000.000 VND" },
      { label: "Loại C (GPA 2.8–3.19)", value: "1.000.000 VND" },
    ],
    deadline: "Hạn nộp: 31/12/2025",
    icon: "Trophy",
    color: "#EADDD0",
  },
  {
    id: 2,
    title: "Học bổng tài năng",
    description: "Dành cho sinh viên đạt giải trong các cuộc thi",
    details: [
      { label: "Giải Quốc tế", value: "10.000.000 VND" },
      { label: "Giải Quốc gia", value: "5.000.000 VND" },
      { label: "Giải Khu vực", value: "3.000.000 VND" },
    ],
    deadline: "Xét quanh năm",
    icon: "Medal",
    color: "#E3E0F8",
  },
  {
    id: 3,
    title: "Học bổng hỗ trợ sinh viên",
    description: "Hỗ trợ sinh viên có hoàn cảnh khó khăn",
    details: [
      { label: "Mức 1", value: "2.000.000 VND" },
      { label: "Mức 2", value: "1.500.000 VND" },
      { label: "Mức 3", value: "1.000.000 VND" },
    ],
    deadline: "Hạn nộp: 30/11/2025",
    icon: "GraduationCap",
    color: "#E6EEF8",
  },
  {
    id: 4,
    title: "Học bổng doanh nghiệp",
    description: "Tài trợ bởi các đối tác doanh nghiệp",
    details: [
      { label: "Học bổng FPT Software", value: "" },
      { label: "Học bổng Viettel", value: "" },
      { label: "Học bổng VNG Corporation", value: "" },
      { label: "Học bổng Tiki Technology", value: "" },
    ],
    deadline: "Thông báo định kỳ",
    icon: "Building2",
    color: "#E7E7DB",
  },
];

const Page = () => {
  const [activeId, setActiveId] = useState<number | null>(1);

  return (
    <PublicLayout>
      <div className="w-full bg-white">
        {/* hero */}
        <div className="flex flex-col gap-4 px-4 sm:px-8 md:px-20 py-10 text-lg text-[#3A4F30] bg-[#E6ECE0]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left">
            Liên hệ với chúng tôi
          </h1>
          <h2 className="text-base sm:text-xl md:text-2xl text-center md:text-left">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </h2>
          <img
            src="https://i2-vnexpress.vnecdn.net/2025/05/22/ptit-jpeg-1747899912-174789995-5968-5954-1747900051.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=2zzDFwpd0SbnNG5b1dEiQg"
            alt="Học viện Công nghệ Bưu chính Viễn thông"
            className="w-full max-h-[400px] object-cover rounded-3xl"
          />
        </div>

        {/* content */}
        <div className="px-4 sm:px-8 md:px-20 py-10">
          {/* nav */}
          <div className="bg-[#E2E0DC] rounded-3xl">
            <div className="mx-20 flex justify-between">
              {navData.map((data) => {
                const Icon = icons[data.icon];
                const isActive = activeId === data.id;
                return (
                  <button
                    key={data.id}
                    onClick={() => setActiveId(data.id)}
                    className={`text-black flex gap-3 items-center justify-center px-30 py-2 my-3 rounded-2xl transition-all
                      ${isActive ? "bg-white" : "hover:text-black/70"}`}
                  >
                    <Icon size={20} />
                    <p className="font-md">{data.title}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* scholarship */}
          <div className="py-10">
            {/* title */}
            <div className="flex flex-col items-center justify-center gap-2 text-center mb-10">
              <h1 className="text-black text-2xl sm:text-3xl md:text-[32px] font-semibold">
                Chương trình học bổng
              </h1>
              <p className="text-black/60 text-base sm:text-lg">
                Hỗ trợ sinh viên có thành tích xuất sắc và hoàn cảnh khó khăn
              </p>
            </div>

            {/* card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scholarshipData.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <div
                    key={item.id}
                    className="p-5 bg-white rounded-2xl border text-black hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon size={20} />
                      </div>
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                    </div>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {item.details.map((d, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{d.label}</span>
                          <span className="font-medium text-[#0A1B74]">
                            {d.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="flex items-center gap-2 text-sm text-gray-500 mt-3">
                      <Calendar size={18} />
                      {item.deadline}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* scholar intro */}
            <div className="mt-10 flex flex-col gap-3 bg-[#E6ECE0] p-6 rounded-3xl text-[#3A4F30]">
              <h1 className="text-xl sm:text-2xl font-semibold">
                Hướng dẫn nộp hồ sơ học bổng
              </h1>
              <ol className="list-decimal list-inside space-y-1 text-sm sm:text-base">
                <li>Tải mẫu đơn xin học bổng tại website Khoa.</li>
                <li>
                  Chuẩn bị hồ sơ theo yêu cầu (bảng điểm, giấy tờ chứng
                  minh...).
                </li>
                <li>
                  Nộp hồ sơ trực tiếp tại Văn phòng Khoa hoặc gửi qua email.
                </li>
                <li>Chờ thông báo kết quả (thường trong vòng 2–3 tuần).</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Page;
