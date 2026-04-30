'use client';

import { useState } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import MobileNav from '@/src/components/MobileNav';
import { matches } from '@/src/mocks/data';
import type { Match, MatchEvent } from '@/src/types/football';

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'odds' | 'h2h' | 'chat'>('overview');

  const match = matches.find(m => m.id === `match_${params.id}`) || matches[0];

  const tabs = [
    { id: 'overview' as const, label: '比赛概览' },
    { id: 'stats' as const, label: '数据统计' },
    { id: 'odds' as const, label: '赔率分析' },
    { id: 'h2h' as const, label: '交锋历史' },
    { id: 'chat' as const, label: '赛事讨论' },
  ];

  const getEventIcon = (type: MatchEvent['type']) => {
    switch (type) {
      case 'GOAL':
        return <span className="text-green-500">⚽</span>;
      case 'YELLOW_CARD':
        return <span className="text-yellow-500">🟡</span>;
      case 'RED_CARD':
        return <span className="text-red-500">🔴</span>;
      case 'SUBSTITUTION':
        return <span className="text-blue-500">🔄</span>;
      case 'PENALTY':
        return <span className="text-orange-500">⚖️</span>;
      case 'CORNER':
        return <span className="text-purple-500">🔘</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Match['status']) => {
    switch (status) {
      case 'LIVE':
        return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">LIVE</span>;
      case 'HALFTIME':
        return <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">半场</span>;
      case 'FINISHED':
        return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">完赛</span>;
      case 'SCHEDULED':
        return <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-bold">未开赛</span>;
      case 'POSTPONED':
        return <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">延期</span>;
      case 'CANCELLED':
        return <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold">取消</span>;
      default:
        return null;
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{match.league.name}</span>
            {getStatusBadge(match.status)}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-20 h-20 md:w-24 md:h-24 rounded-xl mb-2" />
                <div className="font-semibold text-gray-900 text-lg">{match.homeTeam.shortName}</div>
              </div>

              <div className="text-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-gray-900">{match.homeScore}</span>
                  <span className="text-gray-400 text-2xl"> - </span>
                  <span className="text-5xl md:text-6xl font-bold text-gray-900">{match.awayScore}</span>
                </div>
                <div className="text-gray-500 mt-2 text-sm">
                  {match.status === 'FINISHED' ? '完赛' : match.status === 'LIVE' ? '进行中' : `${formatDate(match.date)} ${formatTime(match.matchTime)}`}
                </div>
              </div>

              <div className="text-center">
                <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-20 h-20 md:w-24 md:h-24 rounded-xl mb-2" />
                <div className="font-semibold text-gray-900 text-lg">{match.awayTeam.shortName}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={`/team/${match.homeTeam.id}`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                查看 {match.homeTeam.shortName} 详情
              </a>
              <a href={`/team/${match.awayTeam.id}`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                查看 {match.awayTeam.shortName} 详情
              </a>
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
                {match.events.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 比赛时间轴</h3>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                      <div className="space-y-4">
                        {match.events.map((event, idx) => (
                          <div key={idx} className="relative flex gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                              event.team === 'home' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {event.minute}
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                {getEventIcon(event.type)}
                                <span className="font-medium text-gray-900">{event.player}</span>
                                {event.assist && <span className="text-gray-500 text-sm">({event.assist}助攻)</span>}
                              </div>
                              <p className="text-sm text-gray-600">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI预测分析</h3>
                    <div className="bg-gradient-to-r from-primary-light to-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-900 font-semibold">预测结果: {match.aiPrediction.result}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          match.aiPrediction.confidence > 60 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          置信度 {match.aiPrediction.confidence}%
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{match.aiPrediction.analysis}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 近期状态</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-2">{match.homeTeam.shortName} 近5场</div>
                        <div className="flex gap-1">
                          {match.recentForm.home.map((result, idx) => (
                            <span key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              result === 'W' ? 'bg-green-100 text-green-700' : result === 'D' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {result}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-2">{match.awayTeam.shortName} 近5场</div>
                        <div className="flex gap-1">
                          {match.recentForm.away.map((result, idx) => (
                            <span key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              result === 'W' ? 'bg-green-100 text-green-700' : result === 'D' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {result}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6 animate-fade-in">
                {match.stats && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary">{match.stats.home.possession}%</div>
                        <div className="text-sm text-gray-500">控球率</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-secondary">{match.stats.home.shots}</div>
                        <div className="text-sm text-gray-500">射门次数</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-secondary">{match.stats.home.shotsOnTarget}</div>
                        <div className="text-sm text-gray-500">射正次数</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-secondary">{match.stats.home.corners}</div>
                        <div className="text-sm text-gray-500">角球</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{match.homeTeam.shortName}</h4>
                        <div className="space-y-3">
                          {[
                            { label: '控球率', home: match.stats.home.possession, away: match.stats.away.possession },
                            { label: '射门次数', home: match.stats.home.shots, away: match.stats.away.shots },
                            { label: '射正次数', home: match.stats.home.shotsOnTarget, away: match.stats.away.shotsOnTarget },
                            { label: '角球', home: match.stats.home.corners, away: match.stats.away.corners },
                            { label: '进攻次数', home: match.stats.home.attacks, away: match.stats.away.attacks },
                            { label: '危险进攻', home: match.stats.home.dangerousAttacks, away: match.stats.away.dangerousAttacks },
                            { label: '传球成功率', home: match.stats.home.passAccuracy, away: match.stats.away.passAccuracy },
                          ].map((stat, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="w-24 text-sm text-gray-500">{stat.label}</div>
                              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 transition-all"
                                  style={{ width: `${(stat.home / (stat.home + stat.away)) * 100}%` }}
                                />
                                <div
                                  className="h-full bg-red-500 transition-all"
                                  style={{ width: `${(stat.away / (stat.home + stat.away)) * 100}%` }}
                                />
                              </div>
                              <div className="flex gap-4 text-sm">
                                <span className="font-medium text-blue-600">{stat.home}{stat.label === '控球率' || stat.label === '传球成功率' ? '%' : ''}</span>
                                <span className="font-medium text-red-600">{stat.away}{stat.label === '控球率' || stat.label === '传球成功率' ? '%' : ''}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">纪律数据</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">{match.homeTeam.shortName} 黄牌</span>
                              <span className="text-yellow-600 font-medium">{match.stats.home.yellowCards}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">{match.homeTeam.shortName} 红牌</span>
                              <span className="text-red-600 font-medium">{match.stats.home.redCards}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">{match.homeTeam.shortName} 犯规</span>
                              <span className="text-gray-900 font-medium">{match.stats.home.fouls}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">{match.homeTeam.shortName} 越位</span>
                              <span className="text-gray-900 font-medium">{match.stats.home.offsides}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">{match.awayTeam.shortName}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">黄牌</span>
                              <span className="text-yellow-600 font-medium">{match.stats.away.yellowCards}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">红牌</span>
                              <span className="text-red-600 font-medium">{match.stats.away.redCards}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">犯规</span>
                              <span className="text-gray-900 font-medium">{match.stats.away.fouls}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">越位</span>
                              <span className="text-gray-900 font-medium">{match.stats.away.offsides}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'odds' && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                    <div className="text-sm opacity-80 mb-1">初始平均赔率</div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">{match.odds.average.initial.homeWin}</span>
                      <span className="text-lg">主胜</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl p-4 text-white">
                    <div className="text-sm opacity-80 mb-1">初始平均赔率</div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">{match.odds.average.initial.draw}</span>
                      <span className="text-lg">平局</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white">
                    <div className="text-sm opacity-80 mb-1">初始平均赔率</div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">{match.odds.average.initial.awayWin}</span>
                      <span className="text-lg">客胜</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">离散指数</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">初始离散值</span>
                        <span className="font-medium text-primary">{match.odds.deviation.initial}</span>
                      </div>
                      {match.odds.deviation.live && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">即时离散值</span>
                          <span className="font-medium text-primary">{match.odds.deviation.live}</span>
                        </div>
                      )}
                      <div className="mt-3 p-3 bg-white rounded-lg">
                        <p className="text-xs text-gray-500">
                          离散指数越低，博彩公司对比赛结果的看法越一致；离散指数越高，看法分歧越大。
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">赔率统计</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">博彩公司数量</span>
                        <span className="font-medium text-gray-900">{match.odds.bookmakers.length}家</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">更新时间</span>
                        <span className="font-medium text-gray-900">{formatTime(match.odds.lastUpdate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">博彩公司</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">主胜</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">平局</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">客胜</th>
                        {match.odds.bookmakers[0]?.asianHandicap && (
                          <>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">盘口</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">上盘</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">下盘</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {match.odds.bookmakers.slice(0, 15).map((bookmaker, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{bookmaker.name}</td>
                          <td className="text-center py-3 px-4 text-sm text-blue-600">{bookmaker.initial.homeWin}</td>
                          <td className="text-center py-3 px-4 text-sm text-gray-600">{bookmaker.initial.draw}</td>
                          <td className="text-center py-3 px-4 text-sm text-red-600">{bookmaker.initial.awayWin}</td>
                          {bookmaker.asianHandicap && (
                            <>
                              <td className="text-center py-3 px-4 text-sm text-gray-500">{bookmaker.asianHandicap.homeHandicap}</td>
                              <td className="text-center py-3 px-4 text-sm text-blue-600">{bookmaker.asianHandicap.homeOdds}</td>
                              <td className="text-center py-3 px-4 text-sm text-red-600">{bookmaker.asianHandicap.awayOdds}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'h2h' && (
              <div className="space-y-4 animate-fade-in">
                {match.headToHead.map((h2h, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 w-20">{formatDate(h2h.date)}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900">{h2h.homeTeam}</span>
                        <span className="text-gray-400">VS</span>
                        <span className="font-medium text-gray-900">{h2h.awayTeam}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 font-bold">
                        <span className="w-8 text-right">{h2h.homeScore}</span>
                        <span>:</span>
                        <span className="w-8">{h2h.awayScore}</span>
                      </div>
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{h2h.matchType}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    {[
                      { id: 1, user: '足球爱好者', content: '哈兰德今天状态真好！', time: '10分钟前' },
                      { id: 2, user: '英超球迷', content: '德布劳内的助攻太漂亮了', time: '8分钟前' },
                      { id: 3, user: '阿森纳球迷', content: '下半场我们还有机会', time: '5分钟前' },
                      { id: 4, user: '中立观众', content: '这场比赛真精彩！', time: '3分钟前' },
                    ].map((msg) => (
                      <div key={msg.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 text-sm">{msg.user}</span>
                            <span className="text-xs text-gray-400">{msg.time}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="发表你的看法..."
                    className="flex-1 bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                  <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                    发送
                  </button>
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


