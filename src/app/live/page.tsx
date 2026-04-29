'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function LivePage() {
  const [matches, setMatches] = useState([
    { id: 1, home: '切尔西', away: '热刺', homeScore: 2, awayScore: 1, minute: '85\'', league: '英超', status: 'LIVE' },
    { id: 2, home: '拜仁', away: '多特', homeScore: 3, awayScore: 2, minute: '72\'', league: '德甲', status: 'LIVE' },
    { id: 3, home: '巴黎', away: '里昂', homeScore: 1, awayScore: 1, minute: 'HT', league: '法甲', status: 'HT' },
    { id: 4, home: 'AC米兰', away: '尤文图斯', homeScore: 0, awayScore: 0, minute: '15\'', league: '意甲', status: 'LIVE' },
    { id: 5, home: '皇马', away: '塞维利亚', homeScore: 2, awayScore: 0, minute: '60\'', league: '西甲', status: 'LIVE' },
    { id: 6, home: '曼城', away: '利物浦', homeScore: 1, awayScore: 1, minute: '40\'', league: '英超', status: 'LIVE' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMatches(prev => prev.map(match => {
        if (match.status === 'LIVE' && match.minute !== 'HT') {
          const minute = parseInt(match.minute);
          if (minute < 90) {
            return { ...match, minute: `${minute + 1}'` };
          }
        }
        return match;
      }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const leagues = ['全部', '英超', '西甲', '意甲', '德甲', '法甲'];
  const [activeLeague, setActiveLeague] = useState('全部');

  const filteredMatches = activeLeague === '全部' 
    ? matches 
    : matches.filter(m => m.league === activeLeague);

  const getStatusColor = (status: string) => {
    return status === 'LIVE' ? 'bg-red-500' : 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">实时比分</h1>
            <p className="text-gray-500 mt-1">追踪所有进行中的比赛</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              {matches.filter(m => m.status === 'LIVE').length} 场比赛进行中
            </span>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {leagues.map((league) => (
            <button
              key={league}
              onClick={() => setActiveLeague(league)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeLeague === league
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {league}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
            <div className="col-span-2">联赛</div>
            <div className="col-span-3">主队</div>
            <div className="col-span-2 text-center">比分</div>
            <div className="col-span-3">客队</div>
            <div className="col-span-2 text-center">状态</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredMatches.map((match) => (
              <a
                key={match.id}
                href={`/match/${match.id}`}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-2">
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{match.league}</span>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {match.home.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900">{match.home}</span>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-2">
                  <span className={`text-xl font-bold ${match.homeScore > match.awayScore ? 'text-blue-600' : match.homeScore < match.awayScore ? 'text-red-600' : 'text-gray-900'}`}>
                    {match.homeScore}
                  </span>
                  <span className="text-gray-400">:</span>
                  <span className={`text-xl font-bold ${match.awayScore > match.homeScore ? 'text-red-600' : match.awayScore < match.homeScore ? 'text-blue-600' : 'text-gray-900'}`}>
                    {match.awayScore}
                  </span>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <span className="font-medium text-gray-900">{match.away}</span>
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {match.away.charAt(0)}
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-2">
                  <span className={`${getStatusColor(match.status)} text-white text-xs px-2 py-1 rounded font-medium`}>
                    {match.status === 'LIVE' ? 'LIVE' : 'HT'}
                  </span>
                  <span className="text-gray-500 text-sm">{match.minute}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">即将开始的比赛</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { home: '阿森纳', away: '曼联', time: '今天 20:30', league: '英超' },
              { home: '利物浦', away: '纽卡斯尔', time: '今天 22:00', league: '英超' },
              { home: '巴萨', away: '马竞', time: '明天 02:00', league: '西甲' },
              { home: '国米', away: '罗马', time: '明天 03:45', league: '意甲' },
            ].map((match, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold">
                    {match.home.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{match.home} vs {match.away}</div>
                    <div className="text-sm text-gray-500">{match.league}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{match.time}</div>
                  <div className="text-xs text-gray-500">即将开始</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
