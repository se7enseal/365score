'use client';

import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '首页', href: '/' },
    { label: 'AI预测', href: '/predictions' },
    { label: '赛事数据', href: '/stats' },
    { label: '新闻资讯', href: '/news' },
    { label: '积分榜', href: '/standings' },
    { label: '射手榜', href: '/top-scorers' },
    { label: '助攻榜', href: '/assists' },
    { label: '赛程表', href: '/calendar' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="365比分网" className="w-10 h-10 rounded-lg object-contain" />
            <span className="hidden sm:block text-gray-900 font-bold text-xl">365比分网</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 w-40"
              />
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
              登录
            </button>

            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="搜索球队/联赛..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm text-center"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
