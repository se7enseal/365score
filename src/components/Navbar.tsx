'use client';

import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="h-10 w-auto bg-black rounded overflow-hidden">
              <img src="/logo.png" alt="365比分网" className="h-full w-full object-contain" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              365比分网
            </span>
          </div>

          {/* 桌面端菜单 */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-white/90 hover:text-white font-medium transition-colors duration-200 border-b-2 border-blue-500 pb-0.5"
            >
              即时比分
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white font-medium transition-colors duration-200"
            >
              数据中心
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white font-medium transition-colors duration-200"
            >
              AI 预测
            </a>
          </div>

          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a
              href="#"
              className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-colors"
            >
              即时比分
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-colors"
            >
              数据中心
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-colors"
            >
              AI 预测
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}