'use client';

import { useState } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import MobileNav from '@/src/components/MobileNav';
import { leagues, standings, topScorers, topAssisters, teams } from '@/src/mocks/data';

export default function LeaguePage({ params }: { params: { name: string } }) {
  const league = leagues.find(l => l.name === params.name) || leagues[0];
  const [activeTab, setActiveTab] = useState<'standings' | 'scorers' | 'assists' | 'teams'>('standings');

  const tabs = [
    { id: 'standings' as const, label: '积分榜' },
    { id: 'scorers' as const, label: '射手榜' },
    { id: 'assists' as const, label: '助攻榜' },
    { id: 'teams' as const, label: '参赛球队' },
  ];

  const getFormIcon = (result: string) => {
    switch (result) {
      case 'W':
        return <span className="text-green-500 font-bold">W</span>;
      case 'D':
        return <span className="text-yellow-500 font-bold">D</span>;
      case 'L':
        return <span className="text-red-500 font-bold">L</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-8 flex items-end">
          <div className="flex items-end gap-6">
            <div className="relative">
              <img
                src={league.logo || 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Premier%20League%20logo%20modern%20design&image_size=square'}
                alt={league.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 border-white shadow-lg"
              />
            </div>
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold">{league.name}</h1>
              <p className="text-white/80 text-lg">{league.country} | 第{league.level}级别联赛</p>
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
            {activeTab === 'standings' && (
              <div className="overflow-x-auto animate-fade-in">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">排名</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">球队</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">赛</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">胜</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">平</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">负</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">进球</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">失球</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">净胜</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">积分</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">近期</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((entry) => (
                      <tr key={entry.position} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            entry.position <= 4 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {entry.position}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={entry.team.logo}
                              alt={entry.team.name}
                              className="w-8 h-8 rounded-lg"
                            />
                            <span className="font-medium text-gray-900">{entry.team.shortName}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4 text-sm text-gray-900">{entry.played}</td>
                        <td className="text-center py-3 px-4 text-sm text-green-600 font-medium">{entry.won}</td>
                        <td className="text-center py-3 px-4 text-sm text-yellow-600 font-medium">{entry.drawn}</td>
                        <td className="text-center py-3 px-4 text-sm text-red-600 font-medium">{entry.lost}</td>
                        <td className="text-center py-3 px-4 text-sm text-gray-900">{entry.goalsFor}</td>
                        <td className="text-center py-3 px-4 text-sm text-gray-500">{entry.goalsAgainst}</td>
                        <td className={`text-center py-3 px-4 text-sm font-medium ${
                          entry.goalDifference >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {entry.goalDifference >= 0 ? '+' : ''}{entry.goalDifference}
                        </td>
                        <td className="text-center py-3 px-4 text-sm font-bold text-primary">{entry.points}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-1">
                            {entry.form.map((result, idx) => (
                              <span key={idx} className="w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                {getFormIcon(result)}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'scorers' && (
              <div className="space-y-3 animate-fade-in">
                {topScorers.map((scorer) => (
                  <div key={scorer.rank} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      scorer.rank <= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {scorer.rank}
                    </span>
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{scorer.player.name}</div>
                      <div className="flex items-center gap-2">
                        <img src={scorer.team.logo} alt={scorer.team.name} className="w-4 h-4 rounded" />
                        <span className="text-sm text-gray-500">{scorer.team.shortName}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{scorer.goals}</div>
                      <div className="text-xs text-gray-500">进球</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-600">{scorer.assists}</div>
                      <div className="text-xs text-gray-500">助攻</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'assists' && (
              <div className="space-y-3 animate-fade-in">
                {topAssisters.map((assister) => (
                  <div key={assister.rank} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      assister.rank <= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {assister.rank}
                    </span>
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{assister.player.name}</div>
                      <div className="flex items-center gap-2">
                        <img src={assister.team.logo} alt={assister.team.name} className="w-4 h-4 rounded" />
                        <span className="text-sm text-gray-500">{assister.team.shortName}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{assister.assists}</div>
                      <div className="text-xs text-gray-500">助攻</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-600">{assister.goals}</div>
                      <div className="text-xs text-gray-500">进球</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'teams' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-fade-in">
                {teams.map((team) => (
                  <div key={team.id} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-16 h-16 mx-auto rounded-lg mb-3 group-hover:scale-110 transition-transform"
                    />
                    <div className="font-medium text-gray-900 text-sm truncate">{team.shortName}</div>
                    <div className="text-xs text-gray-500 mt-1">{team.stadium.name}</div>
                  </div>
                ))}
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


