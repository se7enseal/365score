'use client';

import { useState } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import MobileNav from '@/src/components/MobileNav';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bets' | 'notifications' | 'settings'>('overview');

  const tabs = [
    { id: 'overview' as const, label: '个人资料' },
    { id: 'bets' as const, label: '我的投注' },
    { id: 'notifications' as const, label: '消息通知' },
    { id: 'settings' as const, label: '账户设置' },
  ];

  const user = {
    nickname: '足球达人',
    avatar: null,
    phone: '138****8888',
    email: 'user@example.com',
    expPoints: 2350,
    trialDaysRemaining: 7,
    isExpert: false,
    registeredAt: '2024-01-15',
  };

  const betHistory = [
    { id: 1, match: '曼城 vs 阿森纳', betType: '主胜', stake: 100, odds: 1.85, result: 'won', winAmount: 185, date: '2026-04-29' },
    { id: 2, match: '利物浦 vs 曼联', betType: '平局', stake: 50, odds: 3.20, result: 'pending', winAmount: 0, date: '2026-04-30' },
    { id: 3, match: '切尔西 vs 热刺', betType: '客胜', stake: 80, odds: 3.60, result: 'lost', winAmount: 0, date: '2026-04-28' },
  ];

  const notifications = [
    { id: 1, type: 'system', title: '系统通知', content: '您的AI分析免费试用还剩7天', time: '1小时前' },
    { id: 2, type: 'bet', title: '投注提醒', content: '利物浦 vs 曼联 比赛即将开始', time: '3小时前' },
    { id: 3, type: 'news', title: '新闻推送', content: '哈兰德打破英超进球纪录', time: '5小时前' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.nickname}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">积分: {user.expPoints}</span>
                {user.trialDaysRemaining > 0 && (
                  <span className="bg-green-500 px-3 py-1 rounded-full text-sm">AI分析免费试用: {user.trialDaysRemaining}天</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary-light'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{betHistory.length}</div>
                    <div className="text-sm text-gray-500">投注次数</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {betHistory.filter(b => b.result === 'won').length}
                    </div>
                    <div className="text-sm text-gray-500">赢单次数</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {betHistory.filter(b => b.result === 'lost').length}
                    </div>
                    <div className="text-sm text-gray-500">输单次数</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">
                      {Math.round(betHistory.filter(b => b.result === 'won').length / betHistory.length * 100)}%
                    </div>
                    <div className="text-sm text-gray-500">胜率</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">账户信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">手机号</span>
                      <span className="font-medium text-gray-900">{user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">邮箱</span>
                      <span className="font-medium text-gray-900">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">注册时间</span>
                      <span className="font-medium text-gray-900">{user.registeredAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">专家认证</span>
                      <span className={`font-medium ${user.isExpert ? 'text-green-600' : 'text-gray-500'}`}>
                        {user.isExpert ? '已认证' : '未认证'}
                      </span>
                    </div>
                  </div>
                </div>

                {!user.isExpert && (
                  <div className="bg-primary-light rounded-lg p-4 border border-primary/20">
                    <h3 className="font-semibold text-primary mb-2">申请成为专家</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      成为赛事分析专家，分享您的专业见解，获取更多专属权益
                    </p>
                    <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      立即申请
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bets' && (
              <div className="space-y-4 animate-fade-in">
                {betHistory.map((bet) => (
                  <div key={bet.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900">{bet.match}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        bet.result === 'won' ? 'bg-green-100 text-green-700' :
                        bet.result === 'lost' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {bet.result === 'won' ? '赢' : bet.result === 'lost' ? '输' : '进行中'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-6">
                        <span className="text-gray-500">投注类型: <span className="text-gray-900">{bet.betType}</span></span>
                        <span className="text-gray-500">赔率: <span className="text-gray-900">{bet.odds}</span></span>
                        <span className="text-gray-500">投注: <span className="text-gray-900">{bet.stake}积分</span></span>
                      </div>
                      <div>
                        {bet.result === 'won' ? (
                          <span className="text-green-600 font-bold">+{bet.winAmount}积分</span>
                        ) : bet.result === 'lost' ? (
                          <span className="text-red-600 font-bold">-{bet.stake}积分</span>
                        ) : (
                          <span className="text-gray-500">待结算</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4 animate-fade-in">
                {notifications.map((notification) => (
                  <div key={notification.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.type === 'system' ? 'bg-blue-100 text-blue-700' :
                        notification.type === 'bet' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {notification.type === 'system' && <span>⚙️</span>}
                        {notification.type === 'bet' && <span>🎯</span>}
                        {notification.type === 'news' && <span>📰</span>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{notification.title}</span>
                          <span className="text-xs text-gray-400">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{notification.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">账号安全</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">修改密码</span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button className="w-full flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">绑定手机号</span>
                      <span className="text-gray-400 text-sm">{user.phone}</span>
                    </button>
                    <button className="w-full flex items-center justify-between py-3">
                      <span className="text-gray-700">绑定邮箱</span>
                      <span className="text-gray-400 text-sm">{user.email}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">通知设置</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">赛事提醒</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">新闻推送</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">投注提醒</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-medium hover:bg-red-100 transition-colors">
                  退出登录
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
