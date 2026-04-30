'use client';

import { useState, useEffect } from 'react';
import Header from '@/src/components/Header';
import LeftSidebar from '@/src/components/LeftSidebar';
import RightSidebar from '@/src/components/RightSidebar';
import Footer from '@/src/components/Footer';
import MobileNav from '@/src/components/MobileNav';
import { matches, news, leagues, standings } from '@/src/mocks/data';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredMatches = matches.filter(m => m.status === 'FINISHED' || m.status === 'LIVE');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMatches.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredMatches.length]);

  const upcomingMatches = [
    { id: 1, home: '利物浦', away: '曼联', time: '今天 19:30', league: '英超', status: 'SCHEDULED' },
    { id: 2, home: '曼城', away: '阿森纳', time: '今天 15:00', league: '英超', status: 'FINISHED', homeScore: 2, awayScore: 1 },
    { id: 3, home: '切尔西', away: '热刺', time: '昨天 17:30', league: '英超', status: 'FINISHED', homeScore: 1, awayScore: 1 },
    { id: 4, home: '皇马', away: '巴萨', time: '周日 02:00', league: '西甲', status: 'SCHEDULED' },
    { id: 5, home: '拜仁', away: '多特', time: '周六 22:30', league: '德甲', status: 'SCHEDULED' },
  ];

  const currentMatch = featuredMatches[currentSlide] || matches[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <LeftSidebar />
          </div>

          <div className="flex-1 min-w-0 space-y-6">
            <a href={`/match/${currentMatch.id.split('_')[1]}`} className="block relative bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white h-[300px] overflow-hidden hover:from-primary-hover hover:to-primary-dark transition-all">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative flex flex-col md:flex-row items-center justify-between h-full">
                <div className="text-center md:text-left">
                  <div className="text-sm opacity-80 mb-2">{currentMatch.league.name}</div>
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <img src={currentMatch.homeTeam.logo} alt={currentMatch.homeTeam.name} className="w-16 h-16 rounded-lg" />
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold">{currentMatch.homeTeam.shortName}</h1>
                      <div className="text-4xl font-bold my-2">{currentMatch.homeScore} - {currentMatch.awayScore}</div>
                      <h1 className="text-2xl md:text-3xl font-bold">{currentMatch.awayTeam.shortName}</h1>
                    </div>
                    <img src={currentMatch.awayTeam.logo} alt={currentMatch.awayTeam.name} className="w-16 h-16 rounded-lg" />
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm">
                      {currentMatch.date}
                    </span>
                    {currentMatch.status === 'LIVE' && (
                      <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        LIVE
                      </span>
                    )}
                    {currentMatch.status === 'FINISHED' && (
                      <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-bold">
                        完赛
                      </span>
                    )}
                  </div>
                </div>
                <span className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center mt-4 md:mt-0">
                  查看详情 →
                </span>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredMatches.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </a>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-900 font-semibold flex items-center gap-2">
                    <span>📅</span> 今日赛事
                  </h2>
                  <a href="/calendar" className="text-primary hover:text-primary-hover text-sm transition-colors">
                    查看全部 →
                  </a>
                </div>
                <div className="space-y-3">
                  {upcomingMatches.map((match) => (
                    <a
                      key={match.id}
                      href={`/match/${match.id}`}
                      className="block bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-900 font-medium">{match.home}</span>
                          <span className="text-gray-400">VS</span>
                          <span className="text-gray-900 font-medium">{match.away}</span>
                        </div>
                        <div className="text-right">
                          {match.status === 'FINISHED' && (
                            <span className="font-bold text-gray-900">{match.homeScore}-{match.awayScore}</span>
                          )}
                          <div className="text-gray-500 text-xs">{match.league} · {match.time}</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-900 font-semibold flex items-center gap-2">
                    <span>🏆</span> 积分榜
                  </h2>
                  <a href="/standings" className="text-primary hover:text-primary-hover text-sm transition-colors">
                    查看全部 →
                  </a>
                </div>
                <div className="space-y-2">
                  {standings.slice(0, 5).map((entry) => (
                    <a key={entry.position} href={`/team/${entry.team.id}`} className="flex items-center gap-3 bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        entry.position <= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {entry.position}
                      </span>
                      <img src={entry.team.logo} alt={entry.team.name} className="w-8 h-8 rounded" />
                      <span className="flex-1 font-medium text-gray-900">{entry.team.shortName}</span>
                      <span className="text-gray-500 text-sm">{entry.played}场</span>
                      <span className="font-bold text-primary">{entry.points}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900 font-semibold flex items-center gap-2">
                  <span>📰</span> 最新资讯
                </h2>
                <a href="/news" className="text-primary hover:text-primary-hover text-sm transition-colors">
                  查看全部 →
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {news.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer group">
                    {item.imageUrl && (
                      <div className="h-24 mb-3 rounded-lg overflow-hidden">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary-light text-primary text-xs px-2 py-0.5 rounded">{item.category}</span>
                      <span className="text-gray-400 text-xs">
                        {(() => {
                          const date = new Date(item.publishedAt);
                          const hours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
                          return hours < 24 ? `${hours}小时前` : `${date.getMonth() + 1}月${date.getDate()}日`;
                        })()}
                      </span>
                    </div>
                    <h3 className="text-gray-900 text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-white/80">博彩公司赔率</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-white/80">每日赛事覆盖</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="text-3xl font-bold mb-2">AI预测</div>
                <div className="text-white/80">智能分析推荐</div>
              </div>
            </div>
          </div>

          <div className="hidden xl:block w-64 flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
