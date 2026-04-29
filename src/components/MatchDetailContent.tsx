'use client';

import { useState } from 'react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  league: string;
  date: string;
  time: string;
  status: string;
  homeLineup: Array<{ number: number; name: string; position: string }>;
  awayLineup: Array<{ number: number; name: string; position: string }>;
  events: Array<{ time: string; type: string; team: string; player: string; description: string }>;
  stats: {
    home: { possession: number; shots: number; shotsOnTarget: number; corners: number; fouls: number; yellowCards: number; redCards: number };
    away: { possession: number; shots: number; shotsOnTarget: number; corners: number; fouls: number; yellowCards: number; redCards: number };
  };
}

export default function MatchDetailContent({ match }: { match: Match }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'lineup' | 'events' | 'stats'>('overview');

  const tabs = [
    { id: 'overview' as const, label: '比赛概览' },
    { id: 'lineup' as const, label: '首发阵容' },
    { id: 'events' as const, label: '比赛事件' },
    { id: 'stats' as const, label: '统计数据' },
  ];

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">{match.homeTeam.charAt(0)}</span>
              </div>
              <span className="font-semibold">{match.homeTeam}</span>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{match.homeScore} - {match.awayScore}</div>
              <div className="text-sm opacity-80">{match.league}</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">{match.awayTeam.charAt(0)}</span>
              </div>
              <span className="font-semibold">{match.awayTeam}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg">{match.date}</div>
            <div className="text-sm opacity-80">{match.time}</div>
            <div className={`mt-2 px-3 py-1 rounded-full text-sm ${match.status === 'FINISHED' ? 'bg-gray-500' : match.status === 'LIVE' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}>
              {match.status === 'FINISHED' ? '已结束' : match.status === 'LIVE' ? 'LIVE' : '即将开始'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">比赛亮点</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{match.homeScore}</div>
                  <div className="text-sm text-gray-600">{match.homeTeam}进球</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600">{match.awayScore}</div>
                  <div className="text-sm text-gray-600">{match.awayTeam}进球</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{match.stats.home.possession}%</div>
                  <div className="text-sm text-gray-600">{match.homeTeam}控球率</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">进球时刻</h3>
              <div className="space-y-2">
                {match.events.filter(e => e.type === 'goal').map((event, idx) => (
                  <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${event.team === 'home' ? 'bg-blue-50' : 'bg-red-50'}`}>
                    <span className="text-gray-500 font-medium">{event.time}</span>
                    <span className="text-2xl">⚽</span>
                    <span className="font-medium text-gray-900">{event.player}</span>
                    <span className="text-gray-500 text-sm">- {event.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lineup' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{match.homeTeam} 首发阵容</h3>
              <div className="space-y-2">
                {match.homeLineup.map((player) => (
                  <div key={player.number} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {player.number}
                    </div>
                    <span className="flex-1 font-medium text-gray-900">{player.name}</span>
                    <span className="text-gray-500 text-sm">{player.position}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{match.awayTeam} 首发阵容</h3>
              <div className="space-y-2">
                {match.awayLineup.map((player) => (
                  <div key={player.number} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {player.number}
                    </div>
                    <span className="flex-1 font-medium text-gray-900">{player.name}</span>
                    <span className="text-gray-500 text-sm">{player.position}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">比赛事件时间线</h3>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              {match.events.map((event, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    event.type === 'goal' ? 'bg-green-100' : 
                    event.type === 'yellow' ? 'bg-yellow-100' : 
                    event.type === 'red' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <span className="text-xl">
                      {event.type === 'goal' ? '⚽' : event.type === 'yellow' ? '🟨' : event.type === 'red' ? '🟥' : '🔄'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{event.time}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        event.team === 'home' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {event.team === 'home' ? match.homeTeam : match.awayTeam}
                      </span>
                    </div>
                    <div className="text-gray-600 mt-1">{event.player} - {event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">比赛统计</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{match.stats.home.possession}%</div>
                <div className="text-sm text-gray-500">控球率</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{match.stats.away.possession}%</div>
                <div className="text-sm text-gray-500">控球率</div>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${match.stats.home.possession}%` }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-blue-600">{match.stats.home.shots}</div>
                <div className="text-sm text-gray-600">射门</div>
                <div className="text-xs text-gray-400">{match.stats.home.shotsOnTarget} 射正</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-red-600">{match.stats.away.shots}</div>
                <div className="text-sm text-gray-600">射门</div>
                <div className="text-xs text-gray-400">{match.stats.away.shotsOnTarget} 射正</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-blue-600">{match.stats.home.corners}</div>
                <div className="text-sm text-gray-600">角球</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-red-600">{match.stats.away.corners}</div>
                <div className="text-sm text-gray-600">角球</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-gray-600">{match.stats.home.fouls}</div>
                <div className="text-sm text-gray-600">犯规</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-gray-600">{match.stats.away.fouls}</div>
                <div className="text-sm text-gray-600">犯规</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-yellow-600">{match.stats.home.yellowCards}</div>
                <div className="text-sm text-gray-600">黄牌</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-yellow-600">{match.stats.away.yellowCards}</div>
                <div className="text-sm text-gray-600">黄牌</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
