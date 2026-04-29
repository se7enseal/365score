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

  const homeFormation = match.lineups?.home?.formation || '4-3-3';
  const awayFormation = match.lineups?.away?.formation || '4-3-3';
  
  const homePlayers = match.lineups?.home?.starting || [];
  const awayPlayers = match.lineups?.away?.starting || [];
  
  const substitutions = match.events?.filter(e => e.type === 'SUBSTITUTION') || [];

  const homeStats = match.stats?.home || {
    possession: 43,
    corners: 3,
    redCards: 1,
    yellowCards: 2,
    shots: 11,
    shotsOnTarget: 3,
    penalties: 0,
    attacks: 76,
    dangerousAttacks: 38
  };

  const awayStats = match.stats?.away || {
    possession: 57,
    corners: 3,
    redCards: 0,
    yellowCards: 2,
    shots: 15,
    shotsOnTarget: 3,
    penalties: 0,
    attacks: 70,
    dangerousAttacks: 33
  };

  const parseFormation = (formation: string) => {
    const parts = formation.split('-').map(Number);
    return {
      defenders: parts[0] || 4,
      midfielders: parts[1] || 3,
      forwards: parts[2] || 3
    };
  };

  const homeForm = parseFormation(homeFormation);
  const awayForm = parseFormation(awayFormation);

  const createVerticalPositions = (count: number, baseX: number) => {
    const positions = [];
    if (count === 1) {
      positions.push({ x: baseX, y: 50 });
    } else {
      const spacing = 40 / (count - 1);
      const startY = 30;
      for (let i = 0; i < count; i++) {
        const y = startY + spacing * i;
        positions.push({ x: baseX, y });
      }
    }
    return positions;
  };

  const homeGK = { x: 10, y: 50 };
  const homeDefenders = createVerticalPositions(homeForm.defenders, 22);
  const homeMidfielders = createVerticalPositions(homeForm.midfielders, 35);
  const homeForwards = createVerticalPositions(homeForm.forwards, 45);

  const awayGK = { x: 90, y: 50 };
  const awayDefenders = createVerticalPositions(awayForm.defenders, 78);
  const awayMidfielders = createVerticalPositions(awayForm.midfielders, 65);
  const awayForwards = createVerticalPositions(awayForm.forwards, 55);

  return (
    <div className="relative w-full aspect-video bg-gradient-to-b from-green-800 to-green-900 rounded-xl overflow-hidden border-2 border-green-700 flex flex-col">
      <div className="flex-1 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-4 border-2 border-white/50 rounded-lg"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/50 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="absolute left-0 top-1/4 bottom-1/4 w-16 border-r-2 border-y-2 border-white/50"></div>
          <div className="absolute right-0 top-1/4 bottom-1/4 w-16 border-l-2 border-y-2 border-white/50"></div>
          <div className="absolute left-25 top-0 bottom-0 w-px bg-white/20"></div>
          <div className="absolute right-25 top-0 bottom-0 w-px bg-white/20"></div>
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

        {isFinished && homePlayers.length > 0 && (
          <>
            <div 
              className="absolute w-9 h-9 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-lg"
              style={{ left: `${homeGK.x}%`, top: `${homeGK.y}%`, transform: 'translate(-50%, -50%)' }}
              title={`${homePlayers[0]} (GK)`}
            >
              <span className="text-white font-bold text-xs">1</span>
            </div>

            {homeDefenders.map((pos, idx) => (
              <div 
                key={`home-def-${idx}`}
                className="absolute w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-md"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                title={homePlayers[idx + 1]}
              >
                <span className="text-white font-bold text-xs">{idx + 2}</span>
              </div>
            ))}

            {homeMidfielders.map((pos, idx) => (
              <div 
                key={`home-mid-${idx}`}
                className="absolute w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-md"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                title={homePlayers[idx + 1 + homeForm.defenders]}
              >
                <span className="text-white font-bold text-xs">{idx + 2 + homeForm.defenders}</span>
              </div>
            ))}

            {homeForwards.map((pos, idx) => (
              <div 
                key={`home-fwd-${idx}`}
                className="absolute w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-md"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                title={homePlayers[idx + 1 + homeForm.defenders + homeForm.midfielders]}
              >
                <span className="text-white font-bold text-xs">{idx + 2 + homeForm.defenders + homeForm.midfielders}</span>
              </div>
            ))}

            <div 
              className="absolute w-9 h-9 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-lg"
              style={{ left: `${awayGK.x}%`, top: `${awayGK.y}%`, transform: 'translate(-50%, -50%)' }}
              title={`${awayPlayers[0]} (GK)`}
            >
              <span className="text-white font-bold text-xs">1</span>
            </div>

            {awayDefenders.map((pos, idx) => (
              <div 
                key={`away-def-${idx}`}
                className="absolute w-8 h-8 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-md"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                title={awayPlayers[idx + 1]}
              >
                <span className="text-white font-bold text-xs">{idx + 2}</span>
              </div>
            ))}

            {awayMidfielders.map((pos, idx) => (
              <div 
                key={`away-mid-${idx}`}
                className="absolute w-8 h-8 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-md"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                title={awayPlayers[idx + 1 + awayForm.defenders]}
              >
                <span className="text-white font-bold text-xs">{idx + 2 + awayForm.defenders}</span>
              </div>
            ))}

            {awayForwards.map((pos, idx) => (
              <div 
                key={`away-fwd-${idx}`}
                className="absolute w-8 h-8 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-md"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                title={awayPlayers[idx + 1 + awayForm.defenders + awayForm.midfielders]}
              >
                <span className="text-white font-bold text-xs">{idx + 2 + awayForm.defenders + awayForm.midfielders}</span>
              </div>
            ))}

            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-2">
              <div className="text-xs text-gray-400">主队阵型</div>
              <div className="text-white font-bold text-sm">{homeFormation}</div>
            </div>

            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-2">
              <div className="text-xs text-gray-400">客队阵型</div>
              <div className="text-white font-bold text-sm">{awayFormation}</div>
            </div>
          </>
        )}

        {isFinished && substitutions.length > 0 && (
          <div className="absolute bottom-32 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 max-h-16 overflow-y-auto">
            <div className="text-xs text-gray-400 mb-1">换人事件</div>
            <div className="flex flex-wrap gap-2">
              {substitutions.map((event, idx) => (
                <div key={idx} className="flex items-center gap-1 text-xs bg-slate-800/50 px-2 py-1 rounded">
                  <span className="text-yellow-400 font-bold">{formatTime(event.minute)}</span>
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
          <div className="absolute bottom-32 left-4 right-4 bg-black/70 backdrop-blur-md rounded-lg p-3 border border-white/10">
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
      </div>

      {isFinished && (
        <div className="bg-gray-900 border-t border-gray-700 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {Array.from({ length: homeStats.yellowCards }).map((_, i) => (
                <span key={i} className="text-yellow-400">🟨</span>
              ))}
              {Array.from({ length: homeStats.redCards }).map((_, i) => (
                <span key={i} className="text-red-400">🟥</span>
              ))}
              <span className="text-green-400">⛳</span>
              <span className="text-xs text-gray-400">{homeStats.corners}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">控球率</span>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  style={{ width: `${homeStats.possession}%` }}
                ></div>
              </div>
              <span className="text-xs text-blue-400 font-bold">{homeStats.possession}%</span>
              <span className="text-xs text-gray-500">|</span>
              <span className="text-xs text-red-400 font-bold">{awayStats.possession}%</span>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-l from-red-500 to-red-400"
                  style={{ width: `${awayStats.possession}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">控球率</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{awayStats.corners}</span>
              <span className="text-green-400">⛳</span>
              {Array.from({ length: awayStats.yellowCards }).map((_, i) => (
                <span key={i} className="text-yellow-400">🟨</span>
              ))}
              {Array.from({ length: awayStats.redCards }).map((_, i) => (
                <span key={i} className="text-red-400">🟥</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">进攻</span>
              <span className="text-blue-400">{homeStats.attacks}</span>
              <span className="text-red-400">{awayStats.attacks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">射门(射正)</span>
              <span className="text-blue-400">{homeStats.shots}({homeStats.shotsOnTarget})</span>
              <span className="text-red-400">{awayStats.shots}({awayStats.shotsOnTarget})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">危险进攻</span>
              <span className="text-blue-400">{homeStats.dangerousAttacks}</span>
              <span className="text-red-400">{awayStats.dangerousAttacks}</span>
            </div>
          </div>

          <div className="mt-2 flex justify-center">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-gray-400">点球:</span>
                <span className="text-blue-400">{homeStats.penalties}</span>
              </div>
              <span className="text-gray-600">|</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">点球:</span>
                <span className="text-red-400">{awayStats.penalties}</span>
              </div>
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
