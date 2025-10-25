import React from "react";
import { LucideIcon } from "lucide-react";

interface ContactCardProps {
  title: string;
  icon: LucideIcon;
  bgColor: string;
  data: string[];
}

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  icon: Icon,
  bgColor,
  data,
}) => {
  return (
    <div className="flex items-start gap-4 p-6 border border-black/40 rounded-2xl bg-white">
      <div
        className={`p-3 rounded-xl ${bgColor} flex items-center justify-center`}
      >
        <Icon className="text-[#4B5563]" size={24} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1 text-black">{title}</h3>
        {data.map((content, key) => (
          <p key={key} className="text-sm text-gray-700">
            {content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ContactCard;
