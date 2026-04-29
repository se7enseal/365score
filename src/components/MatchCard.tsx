'use client';

import { useState } from 'react';
import { Match, MatchStatus } from '../types/football';
import MatchDetailModal from './MatchDetailModal';

interface MatchCardProps {
  match: Match;
}

const statusTextMap: Record<MatchStatus, string> = {
  SCHEDULED: '未开始',
  LIVE: '进行中',
  HALFTIME: '中场',
  FINISHED: '已结束',
  POSTPONED: '延期',
  CANCELLED: '取消',
};

const getMatchMinute = (matchTime: string): number => {
  const now = new Date();
  const start = new Date(matchTime);
  const diffMinutes = Math.floor((now.getTime() - start.getTime()) / (1000 * 60));
  
  if (diffMinutes > 0 && diffMinutes <= 90) {
    return diffMinutes;
  }
  return 0;
};

export default function MatchCard({ match }: MatchCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const isLive = match.status === 'LIVE';
  const minute = isLive ? getMatchMinute(match.matchTime) : 0;

  return (
    <>
      <div 
        className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-5 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 cursor-pointer group relative overflow-hidden"
        onClick={() => setShowDetail(true)}
      >
        {isLive && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-pulse"></div>
        )}
        
        <div className="flex justify-between items-center mb-4 text-xs text-gray-400">
          <span className="font-medium">{match.league.name}</span>
          <div className="flex items-center gap-2">
            {isLive && (
              <>
                <span className="text-red-500 font-semibold">{minute}&apos;</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </>
            )}
            <span className={`px-2.5 py-1 rounded-md font-medium ${
              isLive ? 'bg-red-500/20 text-red-400' :
              match.status === 'FINISHED' ? 'bg-green-500/20 text-green-400' :
              match.status === 'HALFTIME' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-gray-700/50 text-gray-400'
            }`}>
              {statusTextMap[match.status]}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 text-left">
            <div className="font-bold text-white text-xl group-hover:text-blue-400 transition-colors">{match.homeTeam.name}</div>
            <div className="text-sm text-gray-400 mt-1">{match.homeTeam.shortName}</div>
          </div>

          <div className="px-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-white">{match.homeScore}</span>
              <span className="text-3xl text-gray-500">:</span>
              <span className="text-4xl font-bold text-white">{match.awayScore}</span>
            </div>
          </div>

          <div className="flex-1 text-right">
            <div className="font-bold text-white text-xl group-hover:text-blue-400 transition-colors">{match.awayTeam.name}</div>
            <div className="text-sm text-gray-400 mt-1">{match.awayTeam.shortName}</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700/50 text-xs text-gray-500 flex justify-between items-center">
          {match.venue && <span className="flex items-center gap-1">📍 {match.venue}</span>}
          <span className="flex items-center gap-1"> {new Date(match.matchTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {isLive && (
          <div className="mt-3 flex items-center justify-center gap-2 text-green-400 text-sm font-semibold">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            点击观看动画直播
          </div>
        )}
      </div>

      {showDetail && (
        <MatchDetailModal 
          match={match} 
          onClose={() => setShowDetail(false)} 
        />
      )}
    </>
  );
}