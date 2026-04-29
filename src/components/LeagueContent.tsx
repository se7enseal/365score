'use client';

import { useState } from 'react';
import BackButton from './BackButton';
import Header from './Header';
import Footer from './Footer';

interface SeasonData {
  year: string;
  champion: string;
  runnerUp: string;
  topScorer: { name: string; team: string; goals: number };
  avgGoals: number;
  attendance: string;
}

interface LeagueData {
  name: string;
  country: string;
  founded: string;
  teams: number;
  description: string;
  seasons: SeasonData[];
  currentStandings: Array<{ rank: number; team: string; played: number; win: number; draw: number; lose: number; goalsFor: number; goalsAgainst: number; gd: number; points: number }>;
  teamsList: Array<{ name: string; founded: string; stadium: string; capacity: number; coach: string }>;
  rules: string;
  format: string;
}

export default function LeagueContent({ league }: { league: LeagueData }) {
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  const sortedSeasons = [...league.seasons].sort((a, b) => b.year.localeCompare(a.year));
  const defaultSeason = sortedSeasons.length > 0 ? sortedSeasons[0].year : '';
  const displaySeason = selectedSeason || defaultSeason;
  const currentSeasonData = sortedSeasons.find(s => s.year === displaySeason);

  const attackRanking = league.currentStandings.length > 0 
    ? [...league.currentStandings].sort((a, b) => b.goalsFor - a.goalsFor).slice(0, 3)
    : [];
  const defenseRanking = league.currentStandings.length > 0
    ? [...league.currentStandings].sort((a, b) => a.goalsAgainst - b.goalsAgainst).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BackButton />
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">{league.name}</h1>
          <div className="flex items-center gap-4 text-sm opacity-80">
            <span>🏆 {league.country}</span>
            <span>📅 成立于 {league.founded}</span>
            <span>👥 {league.teams} 支球队</span>
          </div>
        </div>

        {sortedSeasons.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-medium">选择赛季：</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortedSeasons.map((season) => (
                  <option key={season.year} value={season.year}>{season.year}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">联赛介绍</h2>
              <p className="text-gray-600 leading-relaxed">{league.description}</p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">比赛形式：</span>
                <span className="text-gray-600">{league.format}</span>
              </div>
            </div>

            {currentSeasonData && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🏆 {displaySeason}赛季数据</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white text-center">
                    <div className="text-2xl font-bold">{currentSeasonData.champion}</div>
                    <div className="text-sm opacity-90">冠军</div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg p-4 text-white text-center">
                    <div className="text-2xl font-bold">{currentSeasonData.runnerUp}</div>
                    <div className="text-sm opacity-90">亚军</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-4 text-white text-center">
                    <div className="text-2xl font-bold">{currentSeasonData.topScorer.name}</div>
                    <div className="text-sm opacity-90">最佳射手 ({currentSeasonData.topScorer.goals}球)</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-4 text-white text-center">
                    <div className="text-2xl font-bold">{currentSeasonData.avgGoals}</div>
                    <div className="text-sm opacity-90">场均进球</div>
                  </div>
                </div>
              </div>
            )}

            {league.currentStandings.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">📊 积分榜</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">球队</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">场次</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">胜</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">平</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">负</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">进球</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">失球</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">净胜</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">积分</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {league.currentStandings.map((row) => (
                        <tr key={row.rank} className={row.rank <= 4 ? 'bg-blue-50' : row.rank >= league.currentStandings.length - 2 ? 'bg-red-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {row.rank <= 3 ? (
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${row.rank === 1 ? 'bg-yellow-500' : row.rank === 2 ? 'bg-gray-400' : 'bg-orange-500'}`}>
                                {row.rank}
                              </span>
                            ) : (
                              <span className="text-gray-600">{row.rank}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{row.team}</td>
                          <td className="px-6 py-4 text-center text-gray-600">{row.played}</td>
                          <td className="px-6 py-4 text-center text-green-600 font-medium">{row.win}</td>
                          <td className="px-6 py-4 text-center text-gray-600">{row.draw}</td>
                          <td className="px-6 py-4 text-center text-red-600 font-medium">{row.lose}</td>
                          <td className="px-6 py-4 text-center text-green-600">{row.goalsFor}</td>
                          <td className="px-6 py-4 text-center text-red-600">{row.goalsAgainst}</td>
                          <td className={`px-6 py-4 text-center font-medium ${row.gd > 0 ? 'text-green-600' : row.gd < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {row.gd > 0 ? '+' : ''}{row.gd}
                          </td>
                          <td className="px-6 py-4 text-center text-blue-600 font-bold">{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {attackRanking.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">⚽ 进攻排名</h2>
                <div className="space-y-3">
                  {attackRanking.map((team, index) => (
                    <div key={team.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'}`}>
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900">{team.team}</span>
                      </div>
                      <span className="text-green-600 font-bold">{team.goalsFor} 球</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {defenseRanking.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🛡️ 防守排名</h2>
                <div className="space-y-3">
                  {defenseRanking.map((team, index) => (
                    <div key={team.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'}`}>
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900">{team.team}</span>
                      </div>
                      <span className="text-red-600 font-bold">{team.goalsAgainst} 球</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">联赛数据</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="opacity-80">所属国家</span>
                  <span className="font-medium">{league.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">成立年份</span>
                  <span className="font-medium">{league.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">参赛球队</span>
                  <span className="font-medium">{league.teams} 支</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">赛季数量</span>
                  <span className="font-medium">{league.seasons.length} 个</span>
                </div>
              </div>
            </div>

            {league.teamsList.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🏟️ 豪门球队</h3>
                <div className="space-y-4">
                  {league.teamsList.map((team) => (
                    <div key={team.name} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">{team.name}</div>
                      <div className="text-sm text-gray-500">📅 {team.founded}</div>
                      <div className="text-sm text-gray-500">🏟️ {team.stadium} ({team.capacity.toLocaleString()}人)</div>
                      <div className="text-sm text-gray-500">👔 {team.coach}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {league.seasons.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 历年冠军</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {sortedSeasons.slice(0, 10).map((season) => (
                    <div key={season.year} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <span className="text-gray-600 text-sm">{season.year}</span>
                      <span className="font-medium text-yellow-600">{season.champion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {league.rules && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📜 联赛规则</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{league.rules}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}