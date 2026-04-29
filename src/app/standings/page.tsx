'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function StandingsPage() {
  const [activeLeague, setActiveLeague] = useState('英超');

  const leagues = ['英超', '西甲', '意甲', '德甲', '法甲'];

  const standingsData: Record<string, Array<{ rank: number; team: string; played: number; win: number; draw: number; lose: number; goalsFor: number; goalsAgainst: number; gd: number; points: number; trend: string }>> = {
    '英超': [
      { rank: 1, team: '曼城', played: 34, win: 28, draw: 5, lose: 1, goalsFor: 96, goalsAgainst: 24, gd: 72, points: 89, trend: 'up' },
      { rank: 2, team: '阿森纳', played: 34, win: 25, draw: 7, lose: 2, goalsFor: 83, goalsAgainst: 22, gd: 61, points: 82, trend: 'down' },
      { rank: 3, team: '利物浦', played: 34, win: 24, draw: 6, lose: 4, goalsFor: 84, goalsAgainst: 26, gd: 58, points: 78, trend: 'up' },
      { rank: 4, team: '热刺', played: 34, win: 22, draw: 6, lose: 6, goalsFor: 74, goalsAgainst: 34, gd: 40, points: 72, trend: 'same' },
      { rank: 5, team: '曼联', played: 34, win: 20, draw: 8, lose: 6, goalsFor: 68, goalsAgainst: 33, gd: 35, points: 68, trend: 'down' },
      { rank: 6, team: '纽卡斯尔', played: 34, win: 19, draw: 8, lose: 7, goalsFor: 64, goalsAgainst: 33, gd: 31, points: 65, trend: 'up' },
      { rank: 7, team: '布莱顿', played: 34, win: 18, draw: 8, lose: 8, goalsFor: 58, goalsAgainst: 40, gd: 18, points: 62, trend: 'same' },
      { rank: 8, team: '阿斯顿维拉', played: 34, win: 17, draw: 10, lose: 7, goalsFor: 51, goalsAgainst: 36, gd: 15, points: 61, trend: 'up' },
      { rank: 19, team: '莱斯特城', played: 34, win: 9, draw: 7, lose: 18, goalsFor: 41, goalsAgainst: 65, gd: -24, points: 34, trend: 'down' },
      { rank: 20, team: '南安普顿', played: 34, win: 6, draw: 7, lose: 21, goalsFor: 36, goalsAgainst: 73, gd: -37, points: 25, trend: 'down' },
    ],
    '西甲': [
      { rank: 1, team: '皇马', played: 34, win: 26, draw: 5, lose: 3, goalsFor: 78, goalsAgainst: 23, gd: 55, points: 83, trend: 'up' },
      { rank: 2, team: '巴萨', played: 34, win: 25, draw: 7, lose: 2, goalsFor: 79, goalsAgainst: 27, gd: 52, points: 82, trend: 'down' },
      { rank: 3, team: '马竞', played: 34, win: 21, draw: 8, lose: 5, goalsFor: 61, goalsAgainst: 23, gd: 38, points: 71, trend: 'same' },
      { rank: 4, team: '比利亚雷亚尔', played: 34, win: 18, draw: 8, lose: 8, goalsFor: 54, goalsAgainst: 34, gd: 20, points: 62, trend: 'up' },
      { rank: 5, team: '塞维利亚', played: 34, win: 17, draw: 10, lose: 7, goalsFor: 55, goalsAgainst: 37, gd: 18, points: 61, trend: 'down' },
    ],
    '意甲': [
      { rank: 1, team: '那不勒斯', played: 34, win: 28, draw: 4, lose: 2, goalsFor: 77, goalsAgainst: 27, gd: 50, points: 88, trend: 'up' },
      { rank: 2, team: 'AC米兰', played: 34, win: 22, draw: 8, lose: 4, goalsFor: 64, goalsAgainst: 28, gd: 36, points: 74, trend: 'same' },
      { rank: 3, team: '国际米兰', played: 34, win: 22, draw: 7, lose: 5, goalsFor: 71, goalsAgainst: 31, gd: 40, points: 73, trend: 'down' },
      { rank: 4, team: '尤文图斯', played: 34, win: 21, draw: 8, lose: 5, goalsFor: 56, goalsAgainst: 21, gd: 35, points: 71, trend: 'up' },
      { rank: 5, team: '罗马', played: 34, win: 18, draw: 9, lose: 7, goalsFor: 50, goalsAgainst: 25, gd: 25, points: 63, trend: 'same' },
    ],
    '德甲': [
      { rank: 1, team: '拜仁', played: 34, win: 27, draw: 4, lose: 3, goalsFor: 92, goalsAgainst: 24, gd: 68, points: 85, trend: 'up' },
      { rank: 2, team: '多特', played: 34, win: 24, draw: 5, lose: 5, goalsFor: 83, goalsAgainst: 35, gd: 48, points: 77, trend: 'down' },
      { rank: 3, team: '莱比锡', played: 34, win: 20, draw: 8, lose: 6, goalsFor: 64, goalsAgainst: 29, gd: 35, points: 68, trend: 'up' },
      { rank: 4, team: '勒沃库森', played: 34, win: 19, draw: 8, lose: 7, goalsFor: 60, goalsAgainst: 32, gd: 28, points: 65, trend: 'same' },
      { rank: 5, team: '门兴', played: 34, win: 16, draw: 10, lose: 8, goalsFor: 51, goalsAgainst: 36, gd: 15, points: 58, trend: 'down' },
    ],
    '法甲': [
      { rank: 1, team: '巴黎', played: 34, win: 27, draw: 4, lose: 3, goalsFor: 85, goalsAgainst: 27, gd: 58, points: 85, trend: 'up' },
      { rank: 2, team: '马赛', played: 34, win: 22, draw: 7, lose: 5, goalsFor: 67, goalsAgainst: 35, gd: 32, points: 73, trend: 'same' },
      { rank: 3, team: '里昂', played: 34, win: 20, draw: 6, lose: 8, goalsFor: 56, goalsAgainst: 28, gd: 28, points: 66, trend: 'down' },
      { rank: 4, team: '摩纳哥', played: 34, win: 18, draw: 10, lose: 6, goalsFor: 58, goalsAgainst: 33, gd: 25, points: 64, trend: 'up' },
      { rank: 5, team: '雷恩', played: 34, win: 17, draw: 8, lose: 9, goalsFor: 52, goalsAgainst: 37, gd: 15, points: 59, trend: 'same' },
    ],
  };

  const currentStandings = standingsData[activeLeague] || [];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <span className="text-green-600">↑</span>;
      case 'down': return <span className="text-red-600">↓</span>;
      default: return <span className="text-gray-400">→</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-700';
    if (rank === 2) return 'bg-gray-100 text-gray-700';
    if (rank === 3) return 'bg-orange-100 text-orange-700';
    if (rank >= 18) return 'bg-red-50 text-red-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">积分榜</h1>
            <p className="text-gray-500 mt-1">查看各联赛完整排名</p>
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
          <div className="grid grid-cols-14 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500">
            <div className="col-span-1">#</div>
            <div className="col-span-3">球队</div>
            <div className="col-span-1 text-center">赛</div>
            <div className="col-span-1 text-center">胜</div>
            <div className="col-span-1 text-center">平</div>
            <div className="col-span-1 text-center">负</div>
            <div className="col-span-1 text-center">进</div>
            <div className="col-span-1 text-center">失</div>
            <div className="col-span-1 text-center">净</div>
            <div className="col-span-1 text-center">积</div>
            <div className="col-span-1"></div>
          </div>

          <div className="divide-y divide-gray-100">
            {currentStandings.map((team) => (
              <div
                key={team.rank}
                className={`grid grid-cols-14 gap-2 px-4 py-3 items-center hover:bg-gray-50 transition-colors cursor-pointer ${
                  team.rank >= 18 ? 'bg-red-50/50' : ''
                }`}
              >
                <div className="col-span-1">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRankStyle(team.rank)}`}>
                    {team.rank}
                  </span>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      {team.team.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{team.team}</span>
                  </div>
                </div>
                <div className="col-span-1 text-center text-gray-600 text-sm">{team.played}</div>
                <div className="col-span-1 text-center text-green-600 text-sm font-medium">{team.win}</div>
                <div className="col-span-1 text-center text-gray-600 text-sm">{team.draw}</div>
                <div className="col-span-1 text-center text-red-600 text-sm">{team.lose}</div>
                <div className="col-span-1 text-center text-gray-600 text-sm">{team.goalsFor}</div>
                <div className="col-span-1 text-center text-gray-600 text-sm">{team.goalsAgainst}</div>
                <div className={`col-span-1 text-center text-sm font-medium ${team.gd >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {team.gd >= 0 ? '+' : ''}{team.gd}
                </div>
                <div className="col-span-1 text-center text-lg font-bold text-gray-900">{team.points}</div>
                <div className="col-span-1 text-center">{getTrendIcon(team.trend)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🥇</span>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{currentStandings[0]?.team}</div>
                <div className="text-sm text-gray-500">联赛冠军</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🥈</span>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{currentStandings[1]?.team}</div>
                <div className="text-sm text-gray-500">欧冠资格</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🥉</span>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{currentStandings[2]?.team}</div>
                <div className="text-sm text-gray-500">欧冠资格</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
