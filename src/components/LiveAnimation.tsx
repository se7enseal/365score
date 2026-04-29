'use client';

import { Match } from '../types/football';

interface LiveAnimationProps {
  match: Match;
}

export default function LiveAnimation({ match }: LiveAnimationProps) {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';

  if (!isLive && !isFinished) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p className="text-lg">比赛尚未开始</p>
        <p className="text-sm mt-2">比赛时间: {new Date(match.matchTime).toLocaleString('zh-CN')}</p>
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

  const ballPos = isLive ? getBallPosition() : { x: 50, y: 50 };

  const formatTime = (minute: number) => {
    if (minute <= 45) return `${minute}'`;
    return `HT+${minute - 45}'`;
  };

  const homeStarting = match.lineups?.home?.starting || [];
  const awayStarting = match.lineups?.away?.starting || [];
  const substitutions = match.events?.filter(e => e.type === 'SUBSTITUTION') || [];

  return (
    <div className="relative w-full aspect-video bg-gradient-to-b from-green-800 to-green-900 rounded-xl overflow-hidden border-2 border-green-700">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-4 border-2 border-white/50 rounded-lg"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/50 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full"></div>
        <div className="absolute left-0 top-1/4 bottom-1/4 w-16 border-r-2 border-y-2 border-white/50"></div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-16 border-l-2 border-y-2 border-white/50"></div>
        <div className="absolute left-0 top-1/3 bottom-1/3 w-32 border-r-2 border-y-2 border-white/40"></div>
        <div className="absolute right-0 top-1/3 bottom-1/3 w-32 border-l-2 border-y-2 border-white/40"></div>
      </div>

      <div className="absolute top-2 left-4 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
        <span className="text-white font-bold text-xs">{match.homeTeam.name}</span>
      </div>
      <div className="absolute top-2 right-4 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
        <span className="text-white font-bold text-xs">{match.awayTeam.name}</span>
      </div>

      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">{match.homeScore}</span>
          <span className="text-gray-400">:</span>
          <span className="text-xl font-bold text-white">{match.awayScore}</span>
        </div>
        <div className="text-center">
          <span className="text-gray-400 text-xs">HT: {match.homeScore}-{match.awayScore}</span>
        </div>
      </div>

      {isLive && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-red-600 px-2 py-0.5 rounded-full">
          <span className="text-white font-bold text-xs animate-pulse">
            LIVE {Math.floor((new Date().getTime() - new Date(match.matchTime).getTime()) / (1000 * 60))}&apos;
          </span>
        </div>
      )}

      {isLive && (
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
      )}

      {isFinished && homeStarting.length > 0 && (
        <>
          <div className="absolute top-16 left-4 right-4 flex justify-between px-4">
            <div className="flex flex-wrap gap-1 max-w-[45%]">
              {homeStarting.slice(0, 4).map((player, idx) => (
                <div key={`home-${idx}`} className="bg-blue-600/80 text-white text-[8px] px-1.5 py-0.5 rounded">
                  {player}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 max-w-[45%] justify-end">
              {awayStarting.slice(0, 4).map((player, idx) => (
                <div key={`away-${idx}`} className="bg-red-600/80 text-white text-[8px] px-1.5 py-0.5 rounded">
                  {player}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-24 left-1/2 -translate-x-1/2 flex gap-2">
            {homeStarting.slice(4, 7).map((player, idx) => (
              <div key={`home-mid-${idx}`} className="bg-blue-600/80 text-white text-[8px] px-1.5 py-0.5 rounded">
                {player}
              </div>
            ))}
          </div>

          <div className="absolute bottom-20 left-4 right-4 flex justify-between px-4">
            <div className="flex flex-wrap gap-1 max-w-[45%]">
              {homeStarting.slice(7).map((player, idx) => (
                <div key={`home-fwd-${idx}`} className="bg-blue-600/80 text-white text-[8px] px-1.5 py-0.5 rounded">
                  {player}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 max-w-[45%] justify-end">
              {awayStarting.slice(4).map((player, idx) => (
                <div key={`away-other-${idx}`} className="bg-red-600/80 text-white text-[8px] px-1.5 py-0.5 rounded">
                  {player}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {isFinished && substitutions.length > 0 && (
        <div className="absolute bottom-2 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 max-h-24 overflow-y-auto">
          <div className="text-xs text-gray-400 mb-1">换人事件</div>
          <div className="flex flex-col gap-1">
            {substitutions.map((event, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className="text-yellow-400 font-bold w-8">{formatTime(event.minute)}</span>
                <span className={`${event.team === 'home' ? 'text-blue-400' : 'text-red-400'}`}>
                  {event.player}
                </span>
                <span className="text-gray-500">{event.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLive && match.events.length > 0 && (
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
