'use client';

import { useState } from 'react';

interface LandingPageProps {
  onStudentLookup: (studentId: string, verificationCode: string) => void;
}

const faqItems = [
  {
    question: "Làm thế nào để theo dõi kết quả học tập của con?",
    answer: "Phụ huynh có thể tra cứu kết quả học tập thông qua hệ thống bằng cách nhập mã số sinh viên và mã xác thực được cung cấp bởi Khoa."
  },
  {
    question: "Chương trình học có những môn gì?",
    answer: "Chương trình đào tạo bao gồm các môn học chuyên ngành về Công nghệ Thông tin, cùng với các môn đại cương và kỹ năng mềm. Chi tiết có thể xem trong hồ sơ học tập của sinh viên."
  },
  {
    question: "Sinh viên có cơ hội thực tập tại doanh nghiệp không?",
    answer: "Có, sinh viên được tạo điều kiện thực tập tại các doanh nghiệp, công ty công nghệ trong và ngoài nước thông qua chương trình hợp tác của Khoa."
  },
  {
    question: "Học phí và các khoản chi phí khác?",
    answer: "Học phí được tính theo số tín chỉ đăng ký mỗi học kỳ. Thông tin chi tiết về học phí sẽ được hiển thị trong phần tra cứu thông tin sinh viên."
  },
  {
    question: "Cơ hội việc làm sau khi tốt nghiệp như thế nào?",
    answer: "Sinh viên tốt nghiệp có nhiều cơ hội việc làm tại các công ty công nghệ, ngân hàng, viễn thông và các tập đoàn lớn với mức lương cạnh tranh."
  },
  {
    question: "Làm thế nào để liên hệ với giảng viên chủ nhiệm?",
    answer: "Thông tin liên hệ của giảng viên chủ nhiệm có thể được tra cứu qua văn phòng Khoa hoặc gửi câu hỏi qua form bên dưới."
  }
];

export default function LandingPage({ onStudentLookup }: LandingPageProps) {
  const [studentId, setStudentId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Contact form states
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactStudentId, setContactStudentId] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim() && verificationCode.trim()) {
      onStudentLookup(studentId.trim(), verificationCode.trim());
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    alert('Câu hỏi của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi qua email trong thời gian sớm nhất.');

    // Reset form
    setParentName('');
    setEmail('');
    setPhone('');
    setContactStudentId('');
    setQuestion('');
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center gap-24 py-12 px-4 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      {/* Hero Section - Student Lookup */}
      <section className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Tra cứu thông tin học tập
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Phụ huynh có thể tra cứu thông tin học tập, rèn luyện của sinh viên
          </p>
        </div>

        <form onSubmit={handleLookup} className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Mã số sinh viên
              </label>
              <input
                id="studentId"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Nhập mã số sinh viên (VD: B21DCCN123)"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Mã xác thực (được cung cấp bởi Khoa)
              </label>
              <input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Nhập mã xác thực"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Tra cứu thông tin
            </button>
          </div>
        </form>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            Câu hỏi thường gặp
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Những câu hỏi phụ huynh quan tâm nhất
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <span className="font-medium text-zinc-900 dark:text-white pr-4">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-4 text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            Gửi câu hỏi cho Khoa
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Nếu có thắc mắc chưa được giải đáp, vui lòng gửi câu hỏi cho chúng tôi
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Họ và tên phụ huynh <span className="text-red-500">*</span>
              </label>
              <input
                id="parentName"
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Nhập họ và tên"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email để nhận phản hồi"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Số điện thoại
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label htmlFor="contactStudentId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Mã số sinh viên (nếu có)
              </label>
              <input
                id="contactStudentId"
                type="text"
                value={contactStudentId}
                onChange={(e) => setContactStudentId(e.target.value)}
                placeholder="VD: B21DCCN123"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Nội dung câu hỏi <span className="text-red-500">*</span>
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi câu hỏi'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
