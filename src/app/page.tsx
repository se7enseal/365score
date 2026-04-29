'use client';

import { useState } from 'react';
import MatchCard from '../components/MatchCard';
import Navbar from '../components/Navbar';
import DateFilter from '../components/DateFilter';
import matchesData from '../mocks/matches.json';
import { Match } from '../types/football';

const allDates = Array.from(
  new Set(matchesData.matches.map(m => m.date))
).sort();

const today = new Date();
const formattedDate = today.toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
});

  export default function Home() {
  const [selectedDate, setSelectedDate] = useState(allDates[0]);
const filteredMatches = (matchesData.matches as Match[]).filter(
  (match) => match.date === selectedDate
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      <Navbar />

      <header className="pt-24 pb-8 bg-gradient-to-b from-black/40 to-transparent">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">
               365比分网 - 实时足球比分
            </h1>
            <p className="text-slate-300 mt-4 text-base md:text-lg font-medium">
              英超 & 意甲 & 西甲 精彩赛事
            </p>
            <div className="mt-3 inline-block bg-white/5 backdrop-blur-sm rounded-full px-5 py-2 border border-white/10">
              <p className="text-slate-400 text-sm">
                📅 {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-white font-bold text-lg md:text-xl mb-4">选择日期</h2>
          <DateFilter 
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            availableDates={allDates}
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-slate-300 font-semibold text-sm md:text-base">
            {new Date(selectedDate).toLocaleDateString('zh-CN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
            })}
          </h3>
          <span className="text-slate-400 text-xs md:text-sm">
            共 {filteredMatches.length} 场比赛
          </span>
        </div>

        <div className="grid gap-6">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg md:text-xl">该日期暂无比赛</p>
            <p className="text-sm mt-2">请选择其他日期查看</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-md rounded-2xl px-6 md:px-8 py-4 border border-white/10 shadow-xl">
            <p className="text-slate-400 text-sm md:text-base">
              📊 共 <span className="text-white font-bold text-base md:text-lg">{matchesData.total}</span> 场比赛 | 
               日期范围: <span className="text-white font-bold">{matchesData.dateRange.start}</span> 至 <span className="text-white font-bold">{matchesData.dateRange.end}</span>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 mt-20 bg-black/20">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2026 365比分网 - 专业足球数据平台
          </p>
        </div>
      </footer>
    </div>
  );
}