'use client';

import { Match } from '../types/football';

interface LiveAnimationProps {
  match: Match;
}

export default function LiveAnimation({ match }: LiveAnimationProps) {
  const isLive = match.status === 'LIVE';
  
  if (!isLive) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p className="text-lg">比赛尚未开始或已结束</p>
        <p className="text-sm mt-2">动画直播仅在比赛进行中时显示</p>
      </div>
    );
  }

  const getBallPosition = () => {
    const now = new Date();
    const start = new Date(match.matchTime);
    const elapsedMinutes = Math.floor((now.getTime() - start.getTime()) / (1000 * 60));
    
    if (elapsedMinutes <= 0 || elapsedMinutes > 90) {
      return { x: 50, y: 50 };
    }

    const progress = (elapsedMinutes % 15) / 15;
    const x = 10 + progress * 80;
    const y = 30 + Math.sin(elapsedMinutes * 0.5) * 20;
    
    return { x, y };
  };

  const ballPos = getBallPosition();

  return (
    <div className="relative w-full aspect-video bg-gradient-to-b from-green-800 to-green-900 rounded-xl overflow-hidden border-2 border-green-700">
      {/* 足球场背景 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-4 border-2 border-white/50 rounded-lg"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/50 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full"></div>
        
        {/* 球门区域 */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-16 border-r-2 border-y-2 border-white/50"></div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-16 border-l-2 border-y-2 border-white/50"></div>
        
        {/* 禁区 */}
        <div className="absolute left-0 top-1/3 bottom-1/3 w-32 border-r-2 border-y-2 border-white/40"></div>
        <div className="absolute right-0 top-1/3 bottom-1/3 w-32 border-l-2 border-y-2 border-white/40"></div>
      </div>

      {/* 球队名称 */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg">
        <span className="text-white font-bold text-sm">{match.homeTeam.name}</span>
      </div>
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg">
        <span className="text-white font-bold text-sm">{match.awayTeam.name}</span>
      </div>

      {/* 比分 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-white">{match.homeScore}</span>
          <span className="text-gray-400">:</span>
          <span className="text-2xl font-bold text-white">{match.awayScore}</span>
        </div>
      </div>

      {/* 比赛时间 */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-red-600 px-3 py-1 rounded-full">
        <span className="text-white font-bold text-sm animate-pulse">
          LIVE {Math.floor((new Date().getTime() - new Date(match.matchTime).getTime()) / (1000 * 60))}&apos;
        </span>
      </div>

      {/* 球 */}
      <div 
        className="absolute w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-1000 ease-linear"
        style={{
          left: `${ballPos.x}%`,
          top: `${ballPos.y}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
        }}
      >
        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50"></div>
      </div>

      {/* 主队球员（蓝色） */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-4">
        {[20, 35, 50, 65, 80].map((y, idx) => (
          <div 
            key={`home-${idx}`}
            className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
            style={{
              animation: `float ${2 + idx * 0.5}s ease-in-out infinite alternate`
            }}
          >
            {idx + 1}
          </div>
        ))}
      </div>

      {/* 客队球员（红色） */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
        {[20, 35, 50, 65, 80].map((y, idx) => (
          <div 
            key={`away-${idx}`}
            className="w-8 h-8 rounded-full bg-red-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
            style={{
              animation: `float ${2 + idx * 0.5}s ease-in-out infinite alternate`
            }}
          >
            {idx + 1}
          </div>
        ))}
      </div>

      {/* 最近事件提示 */}
      {match.events.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md rounded-lg p-3 border border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {match.events[match.events.length - 1].type === 'GOAL' ? '⚽' : 
               match.events[match.events.length - 1].type === 'YELLOW_CARD' ? '🟨' : '🟥'}
            </span>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">
                {match.events[match.events.length - 1].player}
              </p>
              <p className="text-gray-400 text-xs">
                {match.events[match.events.length - 1].minute}&apos; - {match.events[match.events.length - 1].description}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}