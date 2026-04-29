'use client';

import { useState, useEffect } from 'react';

export default function MainContent() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredMatches = [
    {
      id: 1,
      homeTeam: '切尔西',
      awayTeam: '托特纳姆热刺',
      homeScore: 2,
      awayScore: 1,
      league: '英超联赛',
      date: '2024-04-28',
      time: '22:00',
      status: 'FINISHED',
    },
    {
      id: 2,
      homeTeam: '曼城',
      awayTeam: '阿森纳',
      homeScore: 3,
      awayScore: 2,
      league: '英超联赛',
      date: '2024-04-29',
      time: '20:30',
      status: 'LIVE',
    },
    {
      id: 3,
      homeTeam: '皇家马德里',
      awayTeam: '巴塞罗那',
      homeScore: 1,
      awayScore: 1,
      league: '西甲联赛',
      date: '2024-04-30',
      time: '02:00',
      status: 'UPCOMING',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMatches.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredMatches.length]);

  const upcomingMatches = [
    { id: 1, home: '曼城', away: '阿森纳', time: '今天 20:30', league: '英超', status: 'UPCOMING' },
    { id: 2, home: '利物浦', away: '曼联', time: '明天 03:00', league: '英超', status: 'UPCOMING' },
    { id: 3, home: '皇马', away: '巴萨', time: '周日 02:00', league: '西甲', status: 'UPCOMING' },
    { id: 4, home: '拜仁', away: '多特', time: '周日 00:30', league: '德甲', status: 'UPCOMING' },
    { id: 5, home: '巴黎', away: '马赛', time: '周六 22:00', league: '法甲', status: 'UPCOMING' },
  ];

  const newsHeadlines = [
    { id: 1, title: '哈兰德本赛季已进36球，打破英超纪录', category: '英超', time: '2小时前' },
    { id: 2, title: '皇马宣布签下贝林厄姆，转会费1.2亿欧', category: '西甲', time: '5小时前' },
    { id: 3, title: '利物浦确认克洛普赛季末离任', category: '英超', time: '8小时前' },
    { id: 4, title: 'AC米兰重返欧冠四强', category: '欧冠', time: '昨天' },
  ];

  const aiPredictions = [
    { match: '曼城 vs 阿森纳', prediction: '曼城胜', confidence: 68, odds: '1.85' },
    { match: '利物浦 vs 曼联', prediction: '平局', confidence: 52, odds: '3.20' },
    { match: '皇马 vs 巴萨', prediction: '皇马胜', confidence: 72, odds: '1.75' },
  ];

  const currentMatch = featuredMatches[currentSlide];

  return (
    <main className="flex-1 space-y-6">
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white h-48 overflow-hidden">
        <div className="flex items-center justify-between h-full">
          <div>
            <div className="text-sm opacity-80 mb-2">{currentMatch.league}</div>
            <h1 className="text-3xl font-bold mb-4">{currentMatch.homeTeam} vs {currentMatch.awayTeam}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold">{currentMatch.homeScore}</span>
                <span className="text-2xl"> - </span>
                <span className="text-4xl font-bold">{currentMatch.awayScore}</span>
              </div>
              <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm">
                {currentMatch.date} {currentMatch.time}
              </span>
              {currentMatch.status === 'LIVE' && (
                <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  LIVE
                </span>
              )}
            </div>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            查看详情 →
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredMatches.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 font-semibold flex items-center gap-2">
              <span>📅</span> 今日赛事
            </h2>
            <a href="/calendar" className="text-blue-600 hover:text-blue-700 text-sm">
              查看全部 →
            </a>
          </div>
          <div className="space-y-3">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900 font-medium">{match.home}</span>
                    <span className="text-gray-400">VS</span>
                    <span className="text-gray-900 font-medium">{match.away}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 text-xs">{match.league}</div>
                    <div className="text-gray-900 text-sm font-medium">{match.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 font-semibold flex items-center gap-2">
              <span>🤖</span> AI预测
            </h2>
            <a href="/predictions" className="text-blue-600 hover:text-blue-700 text-sm">
              查看全部 →
            </a>
          </div>
          <div className="space-y-3">
            {aiPredictions.map((prediction, idx) => (
              <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 text-sm font-medium">{prediction.match}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${prediction.confidence > 60 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {prediction.confidence}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs">预测:</span>
                    <span className="text-gray-900 font-semibold">{prediction.prediction}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs">赔率:</span>
                    <span className="text-orange-600 font-bold">{prediction.odds}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900 font-semibold flex items-center gap-2">
            <span>📰</span> 最新资讯
          </h2>
          <a href="/news" className="text-blue-600 hover:text-blue-700 text-sm">
            查看全部 →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newsHeadlines.map((news) => (
            <div key={news.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">{news.category}</span>
                <span className="text-gray-400 text-xs">{news.time}</span>
              </div>
              <h3 className="text-gray-900 text-sm font-medium line-clamp-2">{news.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
