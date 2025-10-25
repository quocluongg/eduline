import { MapPin, Phone, Mail, YoutubeIcon, FacebookIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0A1B74] text-[#FFFFFFB3] px-8 py-12">
      {/* UPPER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* col 1 */}
        <div className="flex-1 flex flex-col gap-4 min-w-[250px]">
          <h3 className="text-white text-lg  mb-2">
            Khoa Công nghệ Thông tin 2
          </h3>

          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-white mt-1 shrink-0" />
            <p>
              Học viện Công nghệ Bưu chính Viễn thông – Cơ sở TP.HCM
              <br />
              11 Nguyễn Đình Chiểu, P. Đa Kao, Q.1, TP.HCM
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={20} className="text-white shrink-0" />
            <p>028.37.305 316</p>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={20} className="text-white shrink-0" />
            <p>fit@ptithcm.edu.vn</p>
          </div>
        </div>

        {/* col 2 */}
        <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
          <h3 className="text-white text-lg  mb-2">Liên kết nhanh</h3>
          <ul className="space-y-2">
            <li className="">Giới thiệu</li>
            <li className="">Thông tin cho phụ huynh</li>
            <li className="">Thông tin cho sinh viên</li>
            <li className="">Liên hệ</li>
          </ul>
        </div>

        {/* col 2 */}
        <div className="flex-1 flex flex-col gap-4 min-w-[200px]">
          <h3 className="text-white text-lg mb-2">Kết nối với chúng tôi</h3>
          <div className="flex gap-4 text-white">
            <a href="#" className=" p-2 rounded-full bg-[#162FB0]">
              <FacebookIcon size={20} />
            </a>
            <a href="#" className=" p-2 rounded-full bg-[#AB4625]">
              <YoutubeIcon size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* LOWER */}
      <div className="border-t border-black/40 mt-10 pt-2 text-center text-sm text-[#FFFFFFB3]">
        © 2025 Khoa Công nghệ Thông tin 2 - PTIT HCM. Bản quyền thuộc về Học
        viện Công nghệ Bưu chính Viễn thông.
      </div>
    </footer>
  );
};

export default Footer;
