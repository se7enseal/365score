'use client';

import { useState } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import MobileNav from '@/src/components/MobileNav';
import { matches, leagues, teams } from '@/src/mocks/data';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMatches = matches.filter((match) => {
    const matchDate = match.date;
    const matchLeague = match.league.id;
    const matchTeam = match.homeTeam.id === selectedTeam || match.awayTeam.id === selectedTeam;
    const matchStatus = match.status;

    const dateMatch = selectedDate ? matchDate === selectedDate : true;
    const leagueMatch = selectedLeague === 'all' || matchLeague === selectedLeague;
    const teamMatch = selectedTeam === 'all' || matchTeam;
    const statusMatch = statusFilter === 'all' || matchStatus === statusFilter;

    return dateMatch && leagueMatch && teamMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'LIVE':
        return <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">LIVE</span>;
      case 'FINISHED':
        return <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">完赛</span>;
      case 'SCHEDULED':
        return <span className="bg-gray-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">未开赛</span>;
      case 'HALFTIME':
        return <span className="bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">半场</span>;
      default:
        return null;
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">📅 赛程表</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择日期</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择联赛</label>
                <select
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="all">全部联赛</option>
                  {leagues.map((league) => (
                    <option key={league.id} value={league.id}>{league.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择球队</label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="all">全部球队</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">比赛状态</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="all">全部状态</option>
                  <option value="LIVE">进行中</option>
                  <option value="FINISHED">已完赛</option>
                  <option value="SCHEDULED">未开赛</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match) => (
                  <a
                    key={match.id}
                    href={`/match/${match.id.split('_')[1]}`}
                    className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-sm text-gray-500 w-20">{match.date}</div>
                    <div className="text-sm text-gray-500 w-16">{formatTime(match.matchTime)}</div>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{match.league.name}</span>
                    <div className="flex items-center gap-3 flex-1">
                      <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-10 h-10 rounded-lg" />
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{match.homeTeam.shortName}</div>
                        <div className="text-sm text-gray-500">VS</div>
                      </div>
                      <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-10 h-10 rounded-lg" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{match.homeScore}</span>
                      <span className="text-gray-400"> - </span>
                      <span className="font-bold text-lg">{match.awayScore}</span>
                    </div>
                    {getStatusBadge(match.status)}
                  </a>
                ))
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">暂无符合条件的比赛</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
