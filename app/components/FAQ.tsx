'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
    answer: "Eduline là nền tảng giáo dục kết nối sinh viên với giáo viên và cung cấp tài nguyên học tập."
  },
  {
    question: "Làm thế nào để bắt đầu?",
    answer: "Chỉ cần duyệt qua FAQ của chúng tôi hoặc nhấp 'Chat với Admin' để nhận hỗ trợ cá nhân hóa từ đội ngũ của chúng tôi."
  },
  {
    question: "Có những khóa học nào?",
    answer: "Chúng tôi cung cấp nhiều khóa học bao gồm Toán, Khoa học, Ngôn ngữ và Công nghệ. Liên hệ Admin để biết chi tiết về khóa học cụ thể."
  },
  {
    question: "Làm thế nào để liên hệ hỗ trợ?",
    answer: "Nhấp vào nút 'Chat với Admin' bên dưới để bắt đầu cuộc trò chuyện với đội ngũ hỗ trợ của chúng tôi."
  },
  {
    question: "Có ứng dụng di động không?",
    answer: "Hiện tại, Eduline có sẵn dưới dạng ứng dụng web. Ứng dụng di động đang được phát triển và sẽ sớm ra mắt."
  },
  {
    question: "Có những phương thức thanh toán nào?",
    answer: "Chúng tôi chấp nhận nhiều phương thức thanh toán. Vui lòng chat với Admin để biết thông tin chi tiết về giá và thanh toán."
  }
];

interface FAQProps {
  onStartChat: () => void;
  verifiedStudentId: string;
}

export default function FAQ({ onStartChat, verifiedStudentId }: FAQProps) {
  const [studentData, setStudentData] = useState<StudentData>({});
  const [currentSemesterSubjects, setCurrentSemesterSubjects] = useState<Subject[]>([]);
  const [currentYearConducts, setCurrentYearConducts] = useState<ConductRecord[]>([]);
  const [latestSemester, setLatestSemester] = useState<string>('');
  const [semesterPayroll, setSemesterPayroll] = useState<number>(0);
  const [latestSemesterCredits, setLatestSemesterCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Function to find the latest semester from all subjects
  const findLatestSemester = (subjects: Subject[]): string => {
    if (!subjects || subjects.length === 0) return '';

    // Extract unique semesters and parse them
    const semesters = subjects
      .map(s => s.Semester)
      .filter((value, index, self) => self.indexOf(value) === index); // unique

    if (semesters.length === 0) return '';

    // Sort semesters: first by year (YYYY), then by sub-number (1/2/3)
    const sortedSemesters = semesters.sort((a, b) => {
      const yearA = parseInt(a.substring(0, 4));
      const yearB = parseInt(b.substring(0, 4));
      const subA = parseInt(a.substring(4));
      const subB = parseInt(b.substring(4));

      if (yearA !== yearB) return yearB - yearA; // Descending year
      return subB - subA; // Descending sub-number
    });

    return sortedSemesters[0];
  };

  // Fetch student data from Firestore
  useEffect(() => {
    const fetchStudentData = async () => {
      if (!verifiedStudentId) {
        setLoading(false);
        return;
      }

      try {
        const studentDocRef = doc(db, 'students', verifiedStudentId);
        const studentDoc = await getDoc(studentDocRef);

        if (studentDoc.exists()) {
          const data = studentDoc.data();
          setStudentData(data as StudentData);

          // Get current semester (format: YYYY1 or YYYY2)
          const now = new Date();
          const currentYear = now.getFullYear();
          const currentMonth = now.getMonth() + 1;
          const semester = currentMonth <= 6 ? 1 : 2;
          const currentSemester = `${currentYear}${semester}`;

          // Filter subjects for current semester
          if (data.Subjects) {
            const filteredSubjects = data.Subjects.filter(
              (subject: Subject) => subject.Semester === currentSemester
            );
            setCurrentSemesterSubjects(filteredSubjects);

            // Calculate latest semester and payroll
            const latest = findLatestSemester(data.Subjects);
            setLatestSemester(latest);

            if (latest) {
              const semesterSubjects = data.Subjects.filter((s: Subject) => s.Semester === latest);
              const totalCredits = semesterSubjects.reduce((sum: number, subject: Subject) => sum + subject.Credits, 0);
              setLatestSemesterCredits(totalCredits);
              setSemesterPayroll(totalCredits * 800000);
            }
          }

          // Filter conduct records for current academic year (format: YYYY-YYYY)
          const academicYear = semester === 1
            ? `${currentYear - 1}-${currentYear}`
            : `${currentYear}-${currentYear + 1}`;

          if (data.ConductRecords) {
            const filteredConducts = data.ConductRecords.filter(
              (conduct: ConductRecord) => conduct.AcademicYear === academicYear
            );
            setCurrentYearConducts(filteredConducts);
          }
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
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

        {/* Student Information Cards */}
        {!loading && studentData._id && (
          <div className="space-y-4 mb-6">
            {/* Student Info Header */}
            {studentData.FullName && (
              <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {studentData.FullName}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {studentData.Major} - Khóa {studentData.CourseYear}
                </p>
              </div>
            )}

            {/* Overall GPA */}
            {studentData.OverallGPA !== undefined && (
              <div className="rounded-lg border border-zinc-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:border-zinc-700 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Điểm Trung Bình Chung
                    </h3>
                    <p className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {studentData.OverallGPA.toFixed(2)}
                    </p>
                  </div>
                  <svg className="h-12 w-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Current Semester Payroll */}
            {latestSemester && semesterPayroll > 0 && (
              <div className="rounded-lg border border-zinc-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:border-zinc-700 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Học Phí Học Kỳ Hiện Tại
                    </h3>
                    <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                      {semesterPayroll.toLocaleString('vi-VN')} VND
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                      Học kỳ {latestSemester} • {latestSemesterCredits} tín chỉ × 800.000 VND
                    </p>
                  </div>
                  <svg className="h-12 w-12 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Current Semester Subjects */}
            {currentSemesterSubjects.length > 0 && (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
                  Môn Học Học Kỳ Hiện Tại
                </h3>
                <div className="space-y-2">
                  {currentSemesterSubjects.map((subject, index) => (
                    <div key={index} className="rounded-md bg-white p-3 dark:bg-zinc-900">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-zinc-900 dark:text-white">
                            {subject.SubjectName}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                            {subject.SubjectCode} • {subject.Credits} tín chỉ
                          </p>
                        </div>
                        <div className="text-right ml-2">
                          <span className={`text-sm font-bold ${
                            subject.Grade.startsWith('A') ? 'text-green-600 dark:text-green-400' :
                            subject.Grade.startsWith('B') ? 'text-blue-600 dark:text-blue-400' :
                            'text-orange-600 dark:text-orange-400'
                          }`}>
                            {subject.Grade}
                          </span>
                          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                            {subject.Status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current Year Conduct Records */}
            {currentYearConducts.length > 0 && (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
                  Hạnh Kiểm ({currentYearConducts[0].AcademicYear})
                </h3>
                <div className="space-y-2">
                  {currentYearConducts.map((conduct, index) => (
                    <div key={index} className="rounded-md bg-white p-3 dark:bg-zinc-900">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                            conduct.Rating === 'Xuất sắc' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            conduct.Rating === 'Tốt' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {conduct.Rating}
                          </span>
                          <span className="text-sm font-bold text-zinc-900 dark:text-white">
                            {conduct.Score} điểm
                          </span>
                        </div>
                      </div>
                      {conduct.Achievements && conduct.Achievements.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {conduct.Achievements.map((achievement, idx) => (
                            <li key={idx} className="text-xs text-zinc-600 dark:text-zinc-400 flex items-start">
                              <svg className="h-3 w-3 mr-1 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <h3 className="text-md font-bold text-zinc-900 dark:text-white mb-3">
          Câu Hỏi Thường Gặp
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Cần Thêm Trợ Giúp?
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
            Không tìm thấy thông tin bạn cần? Bắt đầu cuộc trò chuyện với đội ngũ Admin để nhận hỗ trợ cá nhân hóa.
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
