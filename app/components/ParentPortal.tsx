"use client";

import { useState } from "react";
import LandingPage from "./LandingPage";
import StudentDashboard from "./StudentDashboard";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ParentPortal() {
  const [verifiedStudentId, setVerifiedStudentId] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleStudentLookup = async (
    studentId: string,
    verificationCode: string
  ) => {
    setIsVerifying(true);
    setError("");

    try {
      const studentDocRef = doc(db, "students", studentId);
      const studentDoc = await getDoc(studentDocRef);

      if (studentDoc.exists()) {
        setVerifiedStudentId(studentId);
      } else {
        setError(
          "Không tìm thấy mã số sinh viên. Vui lòng kiểm tra lại thông tin."
        );
      }
    } catch (err: any) {
      setError("Có lỗi xảy ra khi tra cứu thông tin. Vui lòng thử lại.");
      console.error("Error verifying student:", err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleBackToLanding = () => {
    setVerifiedStudentId("");
    setError("");
  };

  if (verifiedStudentId) {
    return (
      <div>
        <div className="mb-6 max-w-7xl mx-auto px-4">
          <button
            onClick={handleBackToLanding}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại trang tra cứu
          </button>
        </div>
        <StudentDashboard studentId={verifiedStudentId} />
      </div>
    );
  }

  // Show landing page with lookup form
  return (
    <div>
      {error && (
        <div className="max-w-2xl mx-auto mb-6 px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}
      <LandingPage onStudentLookup={handleStudentLookup} />
      {isVerifying && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-zinc-900 dark:text-white">
              Đang xác thực...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
