import React from "react";
import { MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full mx-[100px] text-black bg-[#0A1B74] rounded-[24px]">
      <div className="p-4">
        <p className="text-white">Khoa Công nghệ thông tin 2</p>
        <div className="flex gap-4 text-[#FFFFFF7A]">
          <MapPin size={20} />
          <p>
            Học viện Công nghệ Bưu chính Viễn thông - Cơ sở tại TP. Hồ Chí Minh
            <br />
            11 Nguyễn Đình Chiểu, P. Đa Kao, Q.1, TP.HCM
          </p>
        </div>
        <div className="flex items-center gap-4 text-white">
          <Phone size={20} />
          Liên hệ: 028.37.305 316
        </div>
        <div className="text-[#FFFFFF7A]"></div>
      </div>
    </div>
  );
};

export default Footer;
