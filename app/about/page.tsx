import PublicLayout from "@/layout/PublicLayout";
import ContactCard from "@/components/ContactCard";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const icons = { MapPin, Phone, Mail, Clock };
type IconKey = keyof typeof icons;

interface ContactCard {
  id: number;
  title: string;
  icon: IconKey;
  bgColor: string;
  contents: string[];
}

const contactCards: ContactCard[] = [
  {
    id: 1,
    title: "Địa chỉ",
    icon: "MapPin",
    bgColor: "bg-blue-50",
    contents: [
      "Học viện Công nghệ Bưu chính Viễn thông",
      "Cơ sở tại TP. Hồ Chí Minh",
      "11 Nguyễn Đình Chiểu, P. Đa Kao, Q.1, TP.HCM",
    ],
  },
  {
    id: 2,
    title: "Điện thoại",
    icon: "Phone",
    bgColor: "bg-green-50",
    contents: [
      "Văn phòng Khoa: (028) 3822 8142",
      "Hotline: 0909 123 456",
      "(Thứ 2 - Thứ 6: 7:30 - 16:30)",
    ],
  },
  {
    id: 3,
    title: "Email",
    icon: "Mail",
    bgColor: "bg-purple-50",
    contents: [
      "Email chung: fit@ptithcm.edu.vn",
      "Hỗ trợ sinh viên: support.fit@ptithcm.edu.vn",
      "Hợp tác doanh nghiệp: partner.fit@ptithcm.edu.vn",
    ],
  },
  {
    id: 4,
    title: "Giờ làm việc",
    icon: "Clock",
    bgColor: "bg-yellow-50",
    contents: [
      "Thứ 2 - Thứ 6: 7:30 - 11:30, 13:00 - 16:30",
      "Thứ 7: 7:30 - 11:00",
      "Chủ nhật: Nghỉ",
    ],
  },
];

const About = () => {
  return (
    <PublicLayout>
      <div className="w-full bg-white">
        {/* hero */}
        <div className="flex flex-col gap-4 px-15 py-10 text-lg text-[#FAF5FF] bg-[#EEECFA]">
          <h1 className="text-[48px] font-bold text-[#2E1D60]">
            Liên hệ với chúng tôi
          </h1>
          <h1 className="text-xl text-[32px] text-[#2E1D60]">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </h1>
          <img
            src="https://ptit.edu.vn/wp-content/uploads/2025/06/gen-h-z6725576433040_61ec92e2b71dc98c67dc3603c0a09655.jpg"
            alt=""
            className="w-full max-h-[400px] object-cover rounded-3xl aspect-square"
          />
        </div>

        {/* content */}
        <div className="flex flex-1 gap-10 py-15 mx-15">
          {/* left side */}
          <div className="flex flex-1 flex-col">
            <h1 className="text-2xl font-semibold mb-6 text-black">
              Thông tin liên hệ
            </h1>
            <div className="flex flex-col gap-4">
              {contactCards.map((card) => (
                <ContactCard
                  key={card.id}
                  title={card.title}
                  icon={icons[card.icon]}
                  bgColor={card.bgColor}
                  data={card.contents}
                />
              ))}
            </div>
          </div>
          {/* right side */}
          <div className="flex flex-1 flex-col">
            <h1 className="text-2xl font-semibold mb-6 text-black">
              Gửi tin nhắn
            </h1>
            <div className="flex flex-col items-center gap-4 p-6 border border-black/40 rounded-2xl bg-white text-[#0000008F]">
              {/* name */}
              <div className="w-full">
                <label>Họ và tên *</label>
                <Input type="text" placeholder="Nhập họ và tên của bạn" />
              </div>

              {/* email */}
              <div className="w-full">
                <label>Email *</label>
                <Input type="email" placeholder="n22dcpt@gmail.com" />
              </div>

              {/* phone */}
              <div className="w-full">
                <label>Số điện thoại *</label>
                <Input type="tel" placeholder="Số điện thoại" />
              </div>

              {/* topic */}
              <div className="w-full">
                <label>Chủ đề *</label>
                <Input type="text" placeholder="Mời bạn nhập chủ đề..." />
              </div>

              {/* message */}
              <div className="w-full">
                <label>Nội dung tin nhắn *</label>
                <Textarea
                  placeholder="Mời bạn nhập nội dung tin nhắn..."
                  className="resize-none h-32"
                />
              </div>

              <Button className="w-full text-lg py-6">
                <Send />
                Gửi tin nhắn
              </Button>
            </div>
          </div>
        </div>
        {/* maps */}
        <div className="w-full h-[600px] p-15">
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7837.0647688748595!2d106.77765617937689!3d10.847052785326822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2sPosts%20and%20Telecommunications%20Institute%20of%20Technology%20HCM%20Branch!5e0!3m2!1sen!2s!4v1761372129177!5m2!1sen!2s"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default About;
