'use client';

import { useState, useEffect, useRef } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FAQ from './FAQ';

interface Message {
  id: string;
  text: string;
  timestamp: any;
  senderUid: string;
}

interface Conversation {
  id: string;
  lastMessageText: string;
  lastMessageTimestamp: any;
  participantUids: string[];
  studentId: string;
  userId?: string;
  createdBy: string;
  type?: 'admin' | 'custom';
  verifiedStudentId?: string;
}

export default function ChatPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [anonymousUid, setAnonymousUid] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [verifiedStudentId, setVerifiedStudentId] = useState<string>('');
  const [studentIdInput, setStudentIdInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize anonymous UID and check for verified student ID from cookies
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const setCookie = (name: string, value: string, days: number = 365) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    let uid = getCookie('anonymousUid');
    if (!uid) {
      uid = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setCookie('anonymousUid', uid);
    }
    setAnonymousUid(uid);

    // Check for verified student ID in cookies
    const storedStudentId = getCookie('verifiedStudentId');
    if (storedStudentId && !isAdmin) {
      setVerifiedStudentId(storedStudentId);
    }

    // Check if user is logged in as admin
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const isAdminUser = !!tokenResult.claims.admin;
        setIsAdmin(isAdminUser);

        // If admin, extract student ID from email
        if (isAdminUser && user.email) {
          const extractedStudentId = user.email.split('@')[0];
          setVerifiedStudentId(extractedStudentId);
        }
      } else {
        setIsAdmin(false);
        setVerifiedStudentId('');
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen for conversations based on admin status
  useEffect(() => {
    if (!anonymousUid) return;

    if (isAdmin) {
      // Admins see all conversations
      const q = query(
        collection(db, 'conversations'),
        orderBy('lastMessageTimestamp', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const conversationData: Conversation[] = [];
        snapshot.forEach((doc) => {
          conversationData.push({ id: doc.id, ...doc.data() } as Conversation);
        });
        setConversations(conversationData);
      });

      return () => unsubscribe();
    } else if (verifiedStudentId) {
      // Normal users only see their specific conversation with format: {studentId}_{userId}
      const conversationId = `${verifiedStudentId}_${anonymousUid}`;
      const conversationRef = doc(db, 'conversations', conversationId);

      const unsubscribe = onSnapshot(conversationRef, (docSnap) => {
        if (docSnap.exists()) {
          setConversations([{ id: docSnap.id, ...docSnap.data() } as Conversation]);
        } else {
          setConversations([]);
        }
      });

      return () => unsubscribe();
    }
  }, [anonymousUid, isAdmin, verifiedStudentId]);

  // Listen for messages in selected conversation
  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, 'conversations', selectedConversation, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageData: Message[] = [];
      snapshot.forEach((doc) => {
        messageData.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(messageData);
    });

    return () => unsubscribe();
  }, [selectedConversation]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === '' || !selectedConversation) return;

    // Use admin UID if logged in as admin, otherwise use anonymous UID
    const senderUid = isAdmin && auth.currentUser ? auth.currentUser.uid : anonymousUid;

    if (!senderUid) return;

    try {
      // Add message to sub-collection
      await addDoc(collection(db, 'conversations', selectedConversation, 'messages'), {
        text: newMessage,
        senderUid: senderUid,
        timestamp: serverTimestamp(),
      });

      // Update conversation's last message
      await updateDoc(doc(db, 'conversations', selectedConversation), {
        lastMessageText: newMessage,
        lastMessageTimestamp: serverTimestamp(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const verifyStudentId = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentIdInput.trim()) {
      setVerificationError('Vui lòng nhập Mã sinh viên');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');

    try {
      // Check if student ID exists in students collection
      const studentDocRef = doc(db, 'students', studentIdInput.trim());
      const studentDoc = await getDoc(studentDocRef);

      if (studentDoc.exists()) {
        // Student ID is valid
        setVerifiedStudentId(studentIdInput.trim());
        setStudentIdInput('');

        // Store verified student ID in cookies
        const expires = new Date();
        expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
        document.cookie = `verifiedStudentId=${studentIdInput.trim()};expires=${expires.toUTCString()};path=/`;
      } else {
        setVerificationError('Không tìm thấy Mã sinh viên. Vui lòng kiểm tra và thử lại.');
      }
    } catch (error: any) {
      setVerificationError('Lỗi xác thực Mã sinh viên: ' + error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      setShowAdminLogin(false);
      setAdminEmail('');
      setAdminPassword('');
    } catch (error: any) {
      alert('Đăng nhập thất bại: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setSelectedConversation(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const createAdminChat = async () => {
    if (!anonymousUid || !verifiedStudentId) return;

    try {
      // Create conversation ID with format: {studentId}_{userId}
      const conversationId = `${verifiedStudentId}_${anonymousUid}`;
      const conversationRef = doc(db, 'conversations', conversationId);
      const conversationDoc = await getDoc(conversationRef);

      if (conversationDoc.exists()) {
        // Conversation already exists, just open it
        setSelectedConversation(conversationId);
      } else {
        // Create new conversation with combined ID
        await setDoc(conversationRef, {
          studentId: verifiedStudentId,
          userId: anonymousUid,
          participantUids: [anonymousUid],
          createdBy: anonymousUid,
          lastMessageText: '',
          lastMessageTimestamp: serverTimestamp(),
          type: 'admin',
          verifiedStudentId: verifiedStudentId,
        });

        // Automatically select the new conversation
        setSelectedConversation(conversationId);
      }
    } catch (error) {
      console.error('Error creating/opening admin chat:', error);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-110"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Popover */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 flex h-[500px] w-[calc(100vw-2rem)] sm:w-[350px] max-w-[350px] flex-col rounded-lg bg-white shadow-2xl dark:bg-zinc-900 overflow-hidden">
          {showAdminLogin ? (
            /* Admin Login Form */
            <>
              <div className="flex items-center gap-2 rounded-t-lg bg-blue-600 px-4 py-3 text-white">
                {!verifiedStudentId && !isAdmin && (
                  <button
                    onClick={() => setShowAdminLogin(false)}
                    className="hover:opacity-80"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <h3 className="flex-1 font-semibold">Đăng nhập Admin</h3>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white text-black"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Đăng nhập
                  </button>
                </form>
              </div>
            </>
          ) : !verifiedStudentId && !isAdmin ? (
            /* Student ID Verification Form */
            <>
              <div className="flex items-center justify-between rounded-t-lg bg-blue-600 px-4 py-3 text-white">
                <h3 className="font-semibold">Chào mừng đến với Eduline</h3>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-center overflow-y-auto">
                <div className="text-center mb-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    Xác thực Sinh viên
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Vui lòng nhập Mã sinh viên để tiếp tục
                  </p>
                </div>

                <form onSubmit={verifyStudentId} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Mã sinh viên
                    </label>
                    <input
                      type="text"
                      value={studentIdInput}
                      onChange={(e) => setStudentIdInput(e.target.value)}
                      placeholder="Nhập mã sinh viên"
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white text-black"
                      required
                      disabled={isVerifying}
                    />
                  </div>

                  {verificationError && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                      {verificationError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isVerifying ? 'Đang xác thực...' : 'Tiếp tục'}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowAdminLogin(true)}
                      className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Đăng nhập Admin
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : !selectedConversation ? (
            !isAdmin ? (
              /* FAQ View for non-admin users */
              <>
                <div className="flex items-center justify-between rounded-t-lg bg-blue-600 px-4 py-3 text-white">
                  <h3 className="font-semibold">Trợ Giúp & Hỗ Trợ</h3>
                  <button onClick={() => setShowAdminLogin(true)} className="text-sm hover:underline">
                    Admin
                  </button>
                </div>
                <FAQ onStartChat={createAdminChat} verifiedStudentId={verifiedStudentId} />
              </>
            ) : (
              /* Conversations List (Admin Only) */
              <>
                <div className="flex items-center justify-between rounded-t-lg bg-blue-600 px-4 py-3 text-white">
                  <h3 className="font-semibold">Tất cả Cuộc trò chuyện (Admin)</h3>
                  <button onClick={handleLogout} className="text-sm hover:underline">
                    Đăng xuất
                  </button>
                </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-zinc-400 p-4 text-center gap-4">
                    <p>Chưa có cuộc trò chuyện nào.</p>
                  </div>
                ) : (
                  <>
                    {conversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className="w-full border-b border-zinc-200 p-4 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                      >
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">
                          {conversation.studentId}
                        </div>
                        <div className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                          User: {conversation.userId || conversation.createdBy}
                        </div>
                        <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 truncate">
                          {conversation.lastMessageText || 'Chưa có tin nhắn'}
                        </div>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </>
          )) : (
            /* Selected Conversation Messages */
            <>
              <div className="flex items-center gap-2 rounded-t-lg bg-blue-600 px-4 py-3 text-white">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="hover:opacity-80"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="flex-1 font-semibold">
                  {isAdmin ? (
                    // Admin sees the student ID and user ID
                    (() => {
                      const conv = conversations.find(c => c.id === selectedConversation);
                      return conv ? `${conv.studentId} (${conv.userId || conv.createdBy})` : 'Chat';
                    })()
                  ) : (
                    'Chat Hỗ Trợ Admin'
                  )}
                </h3>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-zinc-400">
                    <p>Chưa có tin nhắn. Bắt đầu cuộc trò chuyện!</p>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwnMessage = isAdmin
                      ? message.senderUid === auth.currentUser?.uid
                      : message.senderUid === anonymousUid;

                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg px-3 py-2 ${
                            isOwnMessage
                              ? 'bg-blue-600 text-white'
                              : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                          }`}
                        >
                          {!isOwnMessage && (
                            <div className="text-xs font-semibold mb-1 opacity-75">
                              {message.senderUid.startsWith('anon_') ? 'Người dùng' : 'Admin'}
                            </div>
                          )}
                          <p className="text-sm break-words">{message.text}</p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={sendMessage} className="border-t border-zinc-200 p-4 dark:border-zinc-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white text-black"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                    disabled={newMessage.trim() === ''}
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
