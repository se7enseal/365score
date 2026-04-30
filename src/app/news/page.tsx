'use client';

import { useState } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import MobileNav from '@/src/components/MobileNav';
import { news, transferNews } from '@/src/mocks/data';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<'headlines' | 'transfer' | 'all'>('headlines');

  const tabs = [
    { id: 'headlines' as const, label: '头条新闻' },
    { id: 'transfer' as const, label: '转会专栏' },
    { id: 'all' as const, label: '全部新闻' },
  ];

  const filteredNews = activeTab === 'headlines' 
    ? news.filter(n => n.category === '头条')
    : activeTab === 'transfer'
    ? news.filter(n => n.category === '转会')
    : news;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    if (hours < 168) return `${Math.floor(hours / 24)}天前`;
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      '头条': 'bg-primary text-white',
      '转会': 'bg-blue-500 text-white',
      '赛事': 'bg-green-500 text-white',
      '评论': 'bg-gray-500 text-white',
    };
    return <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[category] || 'bg-gray-500 text-white'}`}>{category}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {activeTab === 'transfer' ? (
              <div className="space-y-4">
                {transferNews.map((transfer) => (
                  <div key={transfer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">{transfer.transferType}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          transfer.status === '已完成' ? 'bg-green-100 text-green-700' : 
                          transfer.status === '谈判中' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {transfer.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {transfer.playerName} {transfer.fromTeam && `从${transfer.fromTeam}`}
                        {transfer.toTeam && `转会至${transfer.toTeam}`}
                        {transfer.fee && ` · ${transfer.fee}`}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{transfer.news.summary}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span>{transfer.news.author}</span>
                        <span>{formatDate(transfer.news.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              filteredNews.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  {item.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        {getCategoryBadge(item.category)}
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.summary}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{item.author}</span>
                        <span>{formatDate(item.publishedAt)}</span>
                      </div>
                      <div className="flex gap-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">🔥 热门标签</h3>
              <div className="flex flex-wrap gap-2">
                {['英超', '欧冠', '转会', '哈兰德', '姆巴佩', '皇马', '巴萨', '利物浦', '曼联', '阿森纳'].map((tag) => (
                  <span key={tag} className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-primary hover:text-white transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">📊 浏览排行</h3>
              <div className="space-y-3">
                {news.slice(0, 5).map((item, idx) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      idx < 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 line-clamp-2 cursor-pointer hover:text-primary transition-colors">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-4 text-white">
              <h3 className="font-semibold mb-2">⚡ AI赛事分析</h3>
              <p className="text-sm opacity-90 mb-3">新注册用户可免费使用7天</p>
              <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors w-full">
                立即体验
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
