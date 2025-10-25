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
  { id: 2, title: "Hoạt động", icon: "Users" },
  { id: 3, title: "Lịch học", icon: "Calendar" },
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

// Activities Data
interface Club {
  id: number;
  name: string;
  description: string;
  tags: string[];
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  month: string;
  status: string;
}

interface TeamActivity {
  title: string;
  items: string[];
}

export const clubsData: Club[] = [
  {
    id: 1,
    name: "CLB Lập trình",
    description: "Nghiên cứu và chia sẻ kiến thức về lập trình, tham gia các cuộc thi",
    tags: ["Coding", "Contest"],
  },
  {
    id: 2,
    name: "CLB An toàn thông tin",
    description: "Học hỏi và thực hành về bảo mật, tìm điểm đáo Bốc, CTF",
    tags: ["Security", "CTF"],
  },
  {
    id: 3,
    name: "CLB AI & Machine Learning",
    description: "Nghiên cứu về AI, Deep Learning, tham gia các dự án thực tế",
    tags: ["AI", "ML"],
  },
  {
    id: 4,
    name: "CLB Thiết kế Đồ họa",
    description: "Học và thực hành về UI/UX, graphic design, video editing",
    tags: ["Design", "UI/UX"],
  },
];

export const eventsData: Event[] = [
  {
    id: 1,
    title: "Hackathon 2025",
    description: "Cuộc thi lập trình 24h với tổng giải thưởng 50 triệu đồng",
    date: "25",
    month: "Th11",
    status: "Đăng ký đến 30/11",
  },
  {
    id: 2,
    title: "Tech Talk- Career in IT",
    description: "Chia sẻ các chuyên gia hàng đầu về định hướng nghề nghiệp",
    date: "05",
    month: "Th12",
    status: "Miễn phí",
  },
  {
    id: 3,
    title: "Job Fair 2025",
    description: "Ngày hội việc làm với 30+ doanh nghiệp tham gia",
    date: "15",
    month: "Th12",
    status: "Đăng ký ngay",
  },
  {
    id: 4,
    title: "IT Festival",
    description: "Lễ hội công nghệ với workshop, trò chơi, trình diễn",
    date: "20",
    month: "Th12",
    status: "Sắp diễn ra",
  },
];

export const teamActivitiesData: TeamActivity[] = [
  {
    title: "Đoàn Thanh niên",
    items: [
      "Chiến dịch tình nguyện hè",
      "Hoạt động vì trẻ em cộng đồng",
      "Chương trình hiến máu nhân đạo",
    ],
  },
  {
    title: "Hội Sinh viên",
    items: [
      "Hỗ trợ sinh viên",
      "Ngày hội vui trần câu lạc bộ",
      "Cuộc thi tài năng sinh viên",
    ],
  },
  {
    title: "Câu lạc bộ thể thao",
    items: [
      "CLB Bóng đá",
      "CLB Cầu lông",
      "CLB Bóng rổ",
    ],
  },
];

// Schedule Data
interface ClassSchedule {
  day: string;
  periods: {
    time: string;
    subject?: string;
    room?: string;
    teacher?: string;
  }[];
}

export const scheduleData: ClassSchedule[] = [
  {
    day: "Thứ 2",
    periods: [
      { time: "7:00-9:00", subject: "Cơ sở dữ liệu", room: "A101", teacher: "TS. Nguyễn Văn A" },
      { time: "9:15-11:15", subject: "Lập trình Web", room: "B205", teacher: "ThS. Trần Thị B" },
      { time: "13:00-15:00", subject: "Mạng máy tính", room: "C303", teacher: "PGS. Lê Văn C" },
      { time: "15:15-17:15" },
    ],
  },
  {
    day: "Thứ 3",
    periods: [
      { time: "7:00-9:00", subject: "Toán rời rạc", room: "A102", teacher: "TS. Phạm Thị D" },
      { time: "9:15-11:15" },
      { time: "13:00-15:00", subject: "Cấu trúc dữ liệu", room: "B201", teacher: "ThS. Hoàng Văn E" },
      { time: "15:15-17:15", subject: "Tiếng Anh chuyên ngành", room: "D401", teacher: "ThS. Đỗ Thị F" },
    ],
  },
  {
    day: "Thứ 4",
    periods: [
      { time: "7:00-9:00", subject: "Cơ sở dữ liệu", room: "A101", teacher: "TS. Nguyễn Văn A" },
      { time: "9:15-11:15", subject: "Lập trình Web", room: "B205", teacher: "ThS. Trần Thị B" },
      { time: "13:00-15:00" },
      { time: "15:15-17:15", subject: "Thể dục", room: "Sân vận động", teacher: "Nguyễn Văn G" },
    ],
  },
  {
    day: "Thứ 5",
    periods: [
      { time: "7:00-9:00", subject: "Hệ điều hành", room: "C302", teacher: "PGS. Vũ Văn H" },
      { time: "9:15-11:15", subject: "Phân tích thiết kế hệ thống", room: "A103", teacher: "TS. Bùi Thị I" },
      { time: "13:00-15:00", subject: "Mạng máy tính", room: "C303", teacher: "PGS. Lê Văn C" },
      { time: "15:15-17:15" },
    ],
  },
  {
    day: "Thứ 6",
    periods: [
      { time: "7:00-9:00", subject: "Toán rời rạc", room: "A102", teacher: "TS. Phạm Thị D" },
      { time: "9:15-11:15", subject: "Cấu trúc dữ liệu", room: "B201", teacher: "ThS. Hoàng Văn E" },
      { time: "13:00-15:00" },
      { time: "15:15-17:15" },
    ],
  },
  {
    day: "Thứ 7",
    periods: [
      { time: "7:00-9:00" },
      { time: "9:15-11:15" },
      { time: "13:00-15:00" },
      { time: "15:15-17:15" },
    ],
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
          <div className="flex justify-center mb-6">
            <div className="bg-[#E2E0DC] rounded-3xl inline-block">
            <div className="px-3 flex gap-2">
              {navData.map((data) => {
                const Icon = icons[data.icon];
                const isActive = activeId === data.id;
                return (
                  <button
                    key={data.id}
                    onClick={() => setActiveId(data.id)}
                    className={`text-black flex gap-2 items-center justify-center px-6 py-2 my-3 rounded-2xl transition-all
                      ${isActive ? "bg-white" : "hover:text-black/70"}`}
                  >
                    <Icon size={20} />
                    <p className="font-md">{data.title}</p>
                  </button>
                );
              })}
            </div>
            </div>
          </div>

          {/* scholarship */}
          {activeId === 1 && (
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
          )}

          {/* activities */}
          {activeId === 2 && (
          <div className="py-10">
            {/* title */}
            <div className="flex flex-col items-center justify-center gap-2 text-center mb-10">
              <h1 className="text-black text-2xl sm:text-3xl md:text-[32px] font-semibold">
                Hoạt động sinh viên
              </h1>
              <p className="text-black/60 text-base sm:text-lg">
                Các hoạt động ngoại khóa và câu lạc bộ dành cho sinh viên
              </p>
            </div>

            {/* clubs section */}
            <div className="mb-10">
              <h2 className="text-black text-xl font-semibold mb-4">Câu lạc bộ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clubsData.map((club) => (
                  <div
                    key={club.id}
                    className="p-5 bg-white rounded-2xl border text-black hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-lg mb-2">{club.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{club.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {club.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* events section */}
            <div className="mb-10">
              <h2 className="text-black text-xl font-semibold mb-4">Sự kiện sắp tới</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventsData.map((event) => (
                  <div
                    key={event.id}
                    className="p-5 bg-white rounded-2xl border text-black hover:shadow-md transition flex gap-4"
                  >
                    <div className="flex flex-col items-center justify-center bg-[#0A1B74] text-white rounded-lg px-4 py-3 min-w-[70px]">
                      <span className="text-2xl font-bold">{event.date}</span>
                      <span className="text-sm">{event.month}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* team activities section */}
            <div>
              <h2 className="text-black text-xl font-semibold mb-4">Hoạt động Đoàn - Hội</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teamActivitiesData.map((activity, i) => (
                  <div
                    key={i}
                    className="p-5 bg-white rounded-2xl border text-black"
                  >
                    <h3 className="font-semibold text-lg mb-3 text-[#0A1B74]">
                      {activity.title}
                    </h3>
                    <ul className="space-y-2">
                      {activity.items.map((item, j) => (
                        <li key={j} className="text-gray-700 text-sm flex items-start gap-2">
                          <span className="text-[#0A1B74] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          {/* schedule */}
          {activeId === 3 && (
          <div className="py-10">
            {/* title */}
            <div className="flex flex-col items-center justify-center gap-2 text-center mb-10">
              <h1 className="text-black text-2xl sm:text-3xl md:text-[32px] font-semibold">
                Thời khóa biểu
              </h1>
              <p className="text-black/60 text-base sm:text-lg">
                Lịch học các môn trong tuần
              </p>
            </div>

            {/* calendar table */}
            <div className="bg-white rounded-2xl border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-fixed">
                  <colgroup>
                    <col className="w-32" />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead>
                    <tr className="bg-[#0A1B74] text-white">
                      <th className="px-4 py-3 text-left font-semibold">Thời gian</th>
                      {scheduleData.map((day) => (
                        <th key={day.day} className="px-4 py-3 text-center font-semibold">
                          {day.day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleData[0].periods.map((_, periodIndex) => (
                      <tr key={periodIndex} className="border-t">
                        <td className="px-4 py-3 font-medium text-gray-700 bg-gray-50">
                          {scheduleData[0].periods[periodIndex].time}
                        </td>
                        {scheduleData.map((day) => {
                          const period = day.periods[periodIndex];
                          return (
                            <td
                              key={`${day.day}-${periodIndex}`}
                              className="px-4 py-3 border-l"
                            >
                              {period.subject ? (
                                <div className="space-y-1">
                                  <div className="font-semibold text-[#0A1B74]">
                                    {period.subject}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {period.room}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {period.teacher}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center text-gray-400">-</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* notes */}
            <div className="mt-6 flex flex-col gap-3 bg-[#E6ECE0] p-6 rounded-3xl text-[#3A4F30]">
              <h3 className="text-lg font-semibold">Lưu ý</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Sinh viên cần có mặt trước giờ học 10 phút</li>
                <li>Mang theo thẻ sinh viên khi vào lớp</li>
                <li>Lịch học có thể thay đổi, theo dõi thông báo từ giảng viên</li>
                <li>Liên hệ Phòng Đào tạo nếu có thắc mắc về lịch học</li>
              </ul>
            </div>
          </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default Page;
