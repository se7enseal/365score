'use client';

import { useState } from 'react';

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: '首页', icon: '🏠', href: '/' },
    { id: 'live', label: '直播', icon: '⚽', href: '/live' },
    { id: 'standings', label: '积分榜', icon: '🏆', href: '/standings' },
    { id: 'top-scorers', label: '射手榜', icon: '⭐', href: '/top-scorers' },
    { id: 'news', label: '新闻', icon: '📰', href: '/news' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-2 px-4 flex-1 transition-colors ${
              activeTab === item.id
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}