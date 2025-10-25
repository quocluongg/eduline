"use client";

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface Subject {
  SubjectCode: string;
  SubjectName: string;
  Credits: number;
  Semester: string;
  Grade: string;
  Status: string;
}

interface ConductRecord {
  AcademicYear: string;
  Score: number;
  Rating: string;
  Achievements: string[];
}

interface StudentData {
  _id?: string;
  FullName?: string;
  Major?: string;
  CourseYear?: number;
  OverallGPA?: number;
  Subjects?: Subject[];
  ConductRecords?: ConductRecord[];
}

const faqs: FAQItem[] = [
  {
    question: "Eduline là gì?",
    answer:
      "Eduline là nền tảng giáo dục kết nối sinh viên với giáo viên và cung cấp tài nguyên học tập.",
  },
  {
    question: "Làm thế nào để bắt đầu?",
    answer:
      "Chỉ cần duyệt qua FAQ của chúng tôi hoặc nhấp 'Chat với Admin' để nhận hỗ trợ cá nhân hóa từ đội ngũ của chúng tôi.",
  },
  {
    question: "Có những khóa học nào?",
    answer:
      "Chúng tôi cung cấp nhiều khóa học bao gồm Toán, Khoa học, Ngôn ngữ và Công nghệ. Liên hệ Admin để biết chi tiết về khóa học cụ thể.",
  },
  {
    question: "Làm thế nào để liên hệ hỗ trợ?",
    answer:
      "Nhấp vào nút 'Chat với Admin' bên dưới để bắt đầu cuộc trò chuyện với đội ngũ hỗ trợ của chúng tôi.",
  },
  {
    question: "Có ứng dụng di động không?",
    answer:
      "Hiện tại, Eduline có sẵn dưới dạng ứng dụng web. Ứng dụng di động đang được phát triển và sẽ sớm ra mắt.",
  },
  {
    question: "Có những phương thức thanh toán nào?",
    answer:
      "Chúng tôi chấp nhận nhiều phương thức thanh toán. Vui lòng chat với Admin để biết thông tin chi tiết về giá và thanh toán.",
  },
];

interface FAQProps {
  onStartChat: () => void;
  verifiedStudentId: string;
}

export default function FAQ({ onStartChat, verifiedStudentId }: FAQProps) {
  const [studentData, setStudentData] = useState<StudentData>({});
  const [currentSemesterSubjects, setCurrentSemesterSubjects] = useState<
    Subject[]
  >([]);
  const [currentYearConducts, setCurrentYearConducts] = useState<
    ConductRecord[]
  >([]);
  const [latestSemester, setLatestSemester] = useState<string>("");
  const [semesterPayroll, setSemesterPayroll] = useState<number>(0);
  const [latestSemesterCredits, setLatestSemesterCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // --- Fetch logic giữ nguyên ---
  const findLatestSemester = (subjects: Subject[]): string => {
    if (!subjects || subjects.length === 0) return "";
    const semesters = subjects
      .map((s) => s.Semester)
      .filter((v, i, a) => a.indexOf(v) === i);
    const sorted = semesters.sort((a, b) => {
      const [yearA, yearB] = [parseInt(a.slice(0, 4)), parseInt(b.slice(0, 4))];
      const [subA, subB] = [parseInt(a.slice(4)), parseInt(b.slice(4))];
      return yearB - yearA || subB - subA;
    });
    return sorted[0];
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!verifiedStudentId) {
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, "students", verifiedStudentId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setStudentData(data as StudentData);
          const now = new Date();
          const currentYear = now.getFullYear();
          const semester = now.getMonth() + 1 <= 6 ? 1 : 2;
          const currentSemester = `${currentYear}${semester}`;

          if (data.Subjects) {
            const filtered = data.Subjects.filter(
              (s: Subject) => s.Semester === currentSemester
            );
            setCurrentSemesterSubjects(filtered);
            const latest = findLatestSemester(data.Subjects);
            setLatestSemester(latest);
            if (latest) {
              const subs = data.Subjects.filter(
                (s: Subject) => s.Semester === latest
              );
              const totalCredits = subs.reduce(
                (sum: number, s: Subject) => sum + s.Credits,
                0
              );
              setLatestSemesterCredits(totalCredits);
              setSemesterPayroll(totalCredits * 800000);
            }
          }

          const academicYear =
            semester === 1
              ? `${currentYear - 1}-${currentYear}`
              : `${currentYear}-${currentYear + 1}`;

          if (data.ConductRecords) {
            const filtered = data.ConductRecords.filter(
              (c: ConductRecord) => c.AcademicYear === academicYear
            );
            setCurrentYearConducts(filtered);
          }
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [verifiedStudentId]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
          Bảng Điều Khiển Sinh Viên
        </h2>

        {/* Các phần hiển thị thông tin giữ nguyên ... */}

        {/* FAQ Accordion */}
        <h3 className="text-md font-bold text-zinc-900 dark:text-white mb-3 mt-6">
          Câu Hỏi Thường Gặp
        </h3>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-zinc-200 rounded-lg bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 mb-2"
            >
              <AccordionTrigger className="text-zinc-900 dark:text-white font-medium px-4 py-3 text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-zinc-700 dark:text-zinc-300 px-4 pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Chat CTA */}
        <div className="mt-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Cần Thêm Trợ Giúp?
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
            Không tìm thấy thông tin bạn cần? Bắt đầu cuộc trò chuyện với đội
            ngũ Admin để nhận hỗ trợ cá nhân hóa.
          </p>
          <button
            onClick={onStartChat}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Chat với Admin
          </button>
        </div>
      </div>
    </div>
  );
}
