import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

const textVariants = cva("leading-relaxed", {
  variants: {
    size: {
      xs: "text-xs", // 12px
      sm: "text-sm", // 14px
      md: "text-base", // 16px
      lg: "text-lg", // 18px
    },
    // Định nghĩa các kiểu dáng
    variant: {
      default: "text-gray-800", // Màu chữ body chính
      subtle: "text-gray-500", // Màu mờ (cho caption, footer...)
      primary: "text-blue-600", // Màu nhấn
      danger: "text-red-600", // Màu báo lỗi
    },
    // Thêm variant cho font weight nếu cần
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  // Giá trị mặc định
  defaultVariants: {
    size: "md",
    variant: "default",
    weight: "normal",
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  /**
   * Thẻ HTML (semantic tag) để render.
   * Mặc định là 'p'.
   */
  as?: React.ElementType;
}

// 3. Xây dựng Component
export const Text: React.FC<TextProps> = ({
  as: Component = "p", // Mặc định là 'p'
  className,
  size,
  variant,
  weight,
  children,
  ...props
}) => {
  // 4. Tạo class cuối cùng
  const finalClasses = twMerge(
    clsx(
      textVariants({ size, variant, weight }) // Lấy class từ cva
    ),
    className // Merge với class từ bên ngoài
  );

  return (
    <Component className={finalClasses} {...props}>
      {children}
    </Component>
  );
};
