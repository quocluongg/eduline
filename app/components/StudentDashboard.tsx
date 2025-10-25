'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
  Class?: string;
  CourseYear?: number;
  OverallGPA?: number;
  AttendanceRate?: number;
  Subjects?: Subject[];
  ConductRecords?: ConductRecord[];
}

interface StudentDashboardProps {
  studentId: string;
}

export default function StudentDashboard({ studentId }: StudentDashboardProps) {
  const [studentData, setStudentData] = useState<StudentData>({});
  const [currentSemesterSubjects, setCurrentSemesterSubjects] = useState<Subject[]>([]);
  const [conductScore, setConductScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }

      try {
        const studentDocRef = doc(db, 'students', studentId);
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
          }

          // Get current conduct score
          if (data.ConductRecords && data.ConductRecords.length > 0) {
            const latestConduct = data.ConductRecords[data.ConductRecords.length - 1];
            setConductScore(latestConduct.Score);
          }
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  };

  const getGradeLabel = (grade: string) => {
    if (grade.startsWith('A')) return 'Giỏi';
    if (grade.startsWith('B')) return 'Khá';
    if (grade.startsWith('C')) return 'Trung bình';
    if (grade.startsWith('D')) return 'Yếu';
    return 'Kém';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!studentData._id) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-600 dark:text-zinc-400">Không tìm thấy thông tin sinh viên.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      {/* Student Info Header - Light Blue Background */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950/50 dark:to-blue-900/50 rounded-xl p-8 border border-indigo-100 dark:border-indigo-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-1">Họ và tên</p>
            <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-50">
              {studentData.FullName}
            </p>
          </div>

          <div>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-1">Mã sinh viên</p>
            <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-50">
              {studentData._id}
            </p>
          </div>

          <div>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-1">Lớp</p>
            <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-50">
              {studentData.Class || `${studentData.Major} - Khóa ${studentData.CourseYear}`}
            </p>
          </div>

          <div>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-1">Khóa học</p>
            <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-50">
              20{studentData.CourseYear ? `${studentData.CourseYear} - 20${studentData.CourseYear! + 5}` : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Three Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GPA Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border-2 border-blue-200 dark:border-blue-800 p-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {studentData.OverallGPA?.toFixed(2) || 'N/A'}
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">GPA Tích lũy</div>
        </div>

        {/* Conduct Score Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border-2 border-green-200 dark:border-green-800 p-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
            {conductScore || 'N/A'}
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Điểm rèn luyện</div>
        </div>

        {/* Attendance Rate Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border-2 border-orange-200 dark:border-orange-800 p-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-4">
            <svg className="w-7 h-7 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
            {studentData.AttendanceRate ? `${studentData.AttendanceRate}%` : '95%'}
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Tỷ lệ đi học</div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Kết quả học tập học kỳ 1 (2024-2025)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Mã HP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Tên học phần
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Tín chỉ
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Điểm
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Xếp loại
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {currentSemesterSubjects.length > 0 ? (
                currentSemesterSubjects.map((subject, index) => (
                  <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">
                      {subject.SubjectCode}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-700 dark:text-zinc-300">
                      {subject.SubjectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-zinc-700 dark:text-zinc-300">
                      {subject.Credits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-zinc-900 dark:text-white">
                      {subject.Grade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(subject.Grade)}`}>
                        {getGradeLabel(subject.Grade)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400">
                    Chưa có kết quả học tập cho học kỳ này
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
