'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  const matchesData: Record<string, Array<{ id: number; home: string; away: string; time: string; league: string; status: string }>> = {
    '2024-04-28': [
      { id: 1, home: '切尔西', away: '热刺', time: '22:00', league: '英超', status: 'FINISHED' },
      { id: 2, home: '利物浦', away: '纽卡斯尔', time: '20:30', league: '英超', status: 'FINISHED' },
    ],
    '2024-04-29': [
      { id: 3, home: '曼城', away: '阿森纳', time: '20:30', league: '英超', status: 'UPCOMING' },
      { id: 4, home: '曼联', away: '埃弗顿', time: '19:00', league: '英超', status: 'UPCOMING' },
      { id: 5, home: '拜仁', away: '多特', time: '21:30', league: '德甲', status: 'UPCOMING' },
    ],
    '2024-04-30': [
      { id: 6, home: '皇马', away: '巴萨', time: '02:00', league: '西甲', status: 'UPCOMING' },
      { id: 7, home: 'AC米兰', away: '尤文图斯', time: '00:00', league: '意甲', status: 'UPCOMING' },
    ],
    '2024-05-01': [
      { id: 8, home: '巴黎', away: '马赛', time: '23:00', league: '法甲', status: 'UPCOMING' },
    ],
    '2024-05-04': [
      { id: 9, home: '阿森纳', away: '利物浦', time: '22:00', league: '英超', status: 'UPCOMING' },
      { id: 10, home: '热刺', away: '曼城', time: '20:30', league: '英超', status: 'UPCOMING' },
    ],
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getMatchesForDate = (dateStr: string) => {
    return matchesData[dateStr] || [];
  };

  const isToday = (day: number) => {
    return formatDate(selectedDate).replace(/-\d{2}-/, '-' + String(day).padStart(2, '0') + '-') === formatDate(today);
  };

  const isSelected = (day: number) => {
    return selectedDate.getDate() === day;
  };

  const hasMatches = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return matchesData[dateStr] && matchesData[dateStr].length > 0;
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const currentDateMatches = getMatchesForDate(formatDate(selectedDate));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">赛程日历</h1>
            <p className="text-gray-500 mt-1">查看所有即将进行的比赛</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedDate(today)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              今天
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-900">
                  {currentYear}年 {monthNames[currentMonth]}
                </h2>
                <button
                  onClick={handleNextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs text-gray-500 font-medium py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const day = idx + 1;
                  const hasMatch = hasMatches(day);
                  const isTdy = isToday(day);
                  const isSel = isSelected(day);

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all relative ${
                        isSel
                          ? 'bg-blue-600 text-white'
                          : isTdy
                          ? 'bg-blue-100 text-blue-600'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {day}
                      {hasMatch && (
                        <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isSel ? 'bg-white' : 'bg-blue-500'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日 赛事
                </h3>
                <span className="text-sm text-gray-500">
                  共 {currentDateMatches.length} 场比赛
                </span>
              </div>

              {currentDateMatches.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">⚽</div>
                  <p className="text-gray-500">当天没有比赛</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentDateMatches.map((match) => (
                    <div
                      key={match.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {match.home.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">{match.home}</span>
                              <span className="text-gray-400">VS</span>
                              <span className="font-semibold text-gray-900">{match.away}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">{match.league}</span>
                              {match.status === 'FINISHED' && (
                                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded">已结束</span>
                              )}
                              {match.status === 'LIVE' && (
                                <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded font-bold animate-pulse">LIVE</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${match.status === 'UPCOMING' ? 'text-gray-900' : 'text-blue-600'}`}>
                            {match.status === 'UPCOMING' ? match.time : 'FT'}
                          </div>
                          {match.status !== 'UPCOMING' && (
                            <div className="text-sm text-gray-500">全场结束</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
