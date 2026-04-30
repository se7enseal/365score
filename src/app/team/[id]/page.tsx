'use client';

import { useState } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import MobileNav from '@/src/components/MobileNav';
import { teams, players } from '@/src/mocks/data';
import type { Team, Player } from '@/src/types/football';

export default function TeamPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'squad' | 'matches' | 'stats'>('overview');

  const team = teams.find(t => t.id === params.id) || teams[0];

  const teamPlayers = players.slice(0, 14);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const getPositionLabel = (position: string) => {
    const positions: Record<string, string> = {
      '前锋': 'FW',
      '中场': 'MF',
      '后卫': 'DF',
      '门将': 'GK',
    };
    return positions[position] || position;
  };

  const getInjuryStatusBadge = (status: Player['injuryStatus']) => {
    switch (status) {
      case 'injured':
        return <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">受伤</span>;
      case 'suspended':
        return <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">停赛</span>;
      default:
        return <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">健康</span>;
    }
  };

  const tabs = [
    { id: 'overview' as const, label: '球队概况' },
    { id: 'squad' as const, label: '球队阵容' },
    { id: 'matches' as const, label: '近期比赛' },
    { id: 'stats' as const, label: '数据统计' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-8 flex items-end">
          <div className="flex items-end gap-6">
            <div className="relative">
              <img
                src={team.logo || 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=football%20team%20logo%20red%20white%20modern&image_size=square'}
                alt={team.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 border-white shadow-lg"
              />
            </div>
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold">{team.name}</h1>
              <p className="text-white/80 text-lg">{team.shortName} | 英超联赛</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
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
                    <div className="text-2xl font-bold text-primary">{team.totalValue}</div>
                    <div className="text-sm text-gray-500">球队总身价</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">{team.foundedYear}</div>
                    <div className="text-sm text-gray-500">成立年份</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">{team.stadium.capacity.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">球场容量</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">{team.honors.length}</div>
                    <div className="text-sm text-gray-500">主要荣誉</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🏟️ 主场球馆</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary-light rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{team.stadium.name}</h4>
                          <p className="text-sm text-gray-500">{team.stadium.address}</p>
                          <p className="text-sm text-gray-500">容量: {team.stadium.capacity.toLocaleString()} 人</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 历史荣誉</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {team.honors.map((honor, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {honor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">👔 主教练</h3>
                  <div className="bg-gradient-to-r from-primary-light to-white rounded-lg p-6 border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">{team.manager.name}</h4>
                          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-sm">{team.manager.nationality}</span>
                        </div>
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-gray-900 mb-1">战术风格</h5>
                          <p className="text-sm text-gray-600">{team.manager.tacticalStyle}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-1">执教履历</h5>
                          <div className="flex flex-wrap gap-2">
                            {team.manager.coachingExperience.map((exp, idx) => (
                              <span key={idx} className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm">
                                {exp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'squad' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">一线队阵容</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
                      导出阵容
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">门将 (GK)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {teamPlayers.filter(p => p.position === '门将').map((player) => (
                        <div key={player.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                              {player.jerseyNumber}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm truncate">{player.name}</div>
                              <div className="text-xs text-gray-500">{player.nationality} | {player.value}</div>
                            </div>
                            {getInjuryStatusBadge(player.injuryStatus)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">后卫 (DF)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {teamPlayers.filter(p => p.position === '后卫').map((player) => (
                        <div key={player.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                              {player.jerseyNumber}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm truncate">{player.name}</div>
                              <div className="text-xs text-gray-500">{player.nationality} | {player.value}</div>
                            </div>
                            {getInjuryStatusBadge(player.injuryStatus)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">中场 (MF)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {teamPlayers.filter(p => p.position === '中场').map((player) => (
                        <div key={player.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                              {player.jerseyNumber}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm truncate">{player.name}</div>
                              <div className="text-xs text-gray-500">{player.nationality} | {player.value}</div>
                            </div>
                            {getInjuryStatusBadge(player.injuryStatus)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">前锋 (FW)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {teamPlayers.filter(p => p.position === '前锋').map((player) => (
                        <div key={player.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                              {player.jerseyNumber}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm truncate">{player.name}</div>
                              <div className="text-xs text-gray-500">{player.nationality} | {player.value}</div>
                            </div>
                            {getInjuryStatusBadge(player.injuryStatus)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'matches' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">近期比赛</h3>
                  <select className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option>最近5场</option>
                    <option>最近10场</option>
                    <option>最近15场</option>
                  </select>
                </div>

                <div className="space-y-3">
                  {[
                    { date: '2026-04-29', home: '曼城', away: '阿森纳', homeScore: 2, awayScore: 1, result: 'W', type: '英超' },
                    { date: '2026-04-20', home: '曼城', away: '利物浦', homeScore: 3, awayScore: 1, result: 'W', type: '英超' },
                    { date: '2026-04-13', home: '切尔西', away: '曼城', homeScore: 2, awayScore: 2, result: 'D', type: '英超' },
                    { date: '2026-04-06', home: '曼城', away: '纽卡斯尔', homeScore: 4, awayScore: 0, result: 'W', type: '英超' },
                    { date: '2026-03-30', home: '曼联', away: '曼城', homeScore: 1, awayScore: 3, result: 'W', type: '英超' },
                  ].map((match, idx) => (
                    <div key={idx} className={`bg-gray-50 rounded-lg p-4 flex items-center justify-between ${
                      match.result === 'W' ? 'border-l-4 border-green-500' : match.result === 'D' ? 'border-l-4 border-yellow-500' : 'border-l-4 border-red-500'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500 w-20">{formatDate(match.date)}</div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900 w-16 text-right">{match.home}</span>
                          <span className="text-gray-400">VS</span>
                          <span className="font-medium text-gray-900 w-16">{match.away}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 font-bold">
                          <span className="w-8 text-right">{match.homeScore}</span>
                          <span>:</span>
                          <span className="w-8">{match.awayScore}</span>
                        </div>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{match.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900">赛季数据统计</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">89</div>
                    <div className="text-sm text-gray-500">进球数</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">24</div>
                    <div className="text-sm text-gray-500">失球数</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">+65</div>
                    <div className="text-sm text-gray-500">净胜球</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">84</div>
                    <div className="text-sm text-gray-500">积分</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">进攻数据</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">射门次数</span>
                        <span className="font-medium text-gray-900">287</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">射正次数</span>
                        <span className="font-medium text-gray-900">128</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">传球成功率</span>
                        <span className="font-medium text-gray-900">89%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">控球率</span>
                        <span className="font-medium text-gray-900">62%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">防守数据</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">抢断</span>
                        <span className="font-medium text-gray-900">287</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">拦截</span>
                        <span className="font-medium text-gray-900">156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">解围</span>
                        <span className="font-medium text-gray-900">234</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">扑救</span>
                        <span className="font-medium text-gray-900">89</span>
                      </div>
                    </div>
                  </div>
                </div>
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


