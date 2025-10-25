"use client";

import { motion } from "motion/react";

interface NewsCardProps {
  image: string;
  date: string;
  title: string;
  description: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  image,
  date,
  title,
  description,
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 max-w-sm cursor-pointer"
    >
      {/* img */}
      <div className="relative w-full">
        <img
          src={image}
          alt={title}
          className="object-cover transition-transform duration-500 hover:scale-105 h-48  w-full"
        />
      </div>

      {/* content */}
      <div className="p-4 flex flex-col gap-2">
        <span className="text-sm text-gray-500">{date}</span>
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
    </motion.article>
  );
};

export default NewsCard;
