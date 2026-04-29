'use client';
import { useState } from 'react';

interface Lineup {
  formation: string;
  starting: string[];
  substitutes: string[];
}

interface FormationDisplayProps {
  lineup: Lineup;
  teamName: string;
  isHome: boolean;
}

const posMap: Record<string, { t: string; l: string }> = {
  'GK': { t: '88%', l: '50%' },
  'CB': { t: '72%', l: '50%' },
  'LCB': { t: '72%', l: '35%' },
  'RCB': { t: '72%', l: '65%' },
  'LB': { t: '62%', l: '20%' },
  'RB': { t: '62%', l: '80%' },
  'CDM': { t: '58%', l: '50%' },
  'CM': { t: '48%', l: '50%' },
  'LCM': { t: '48%', l: '35%' },
  'RCM': { t: '48%', l: '65%' },
  'CAM': { t: '38%', l: '50%' },
  'LW': { t: '32%', l: '20%' },
  'RW': { t: '32%', l: '80%' },
  'LAM': { t: '35%', l: '35%' },
  'RAM': { t: '35%', l: '65%' },
  'ST': { t: '22%', l: '50%' },
  'CF': { t: '20%', l: '50%' },
};

const parseFormation = (f: string): string[] => {
  const p = f.split('-').map(Number);
  const pos: string[] = ['GK'];
  if (p.length === 4) {
    for (let i = 0; i < p[0]; i++) pos.push(p[0] === 3 ? (i === 0 ? 'LCB' : i === 1 ? 'CB' : 'RCB') : (i === 0 ? 'LB' : i === p[0] - 1 ? 'RB' : 'CB'));
    for (let i = 0; i < p[1]; i++) pos.push(p[1] === 1 ? 'CDM' : (i === 0 ? 'LCM' : i === p[1] - 1 ? 'RCM' : 'CM'));
    for (let i = 0; i < p[2]; i++) pos.push(p[2] === 1 ? 'CAM' : (i === 0 ? 'LAM' : i === p[2] - 1 ? 'RAM' : 'CM'));
    for (let i = 0; i < p[3]; i++) pos.push(p[3] === 1 ? 'ST' : (i === 0 ? 'LW' : i === p[3] - 1 ? 'RW' : 'CF'));
  } else if (p.length === 3) {
    for (let i = 0; i < p[0]; i++) pos.push(i === 0 ? 'LB' : i === p[0] - 1 ? 'RB' : 'CB');
    for (let i = 0; i < p[1]; i++) pos.push(i === 0 ? 'CDM' : i === p[1] - 1 ? 'CAM' : 'CM');
    for (let i = 0; i < p[2]; i++) pos.push(i === 0 ? 'LW' : i === p[2] - 1 ? 'RW' : 'ST');
  }
  while (pos.length < 11) pos.push('CM');
  return pos.slice(0, 11);
};

export default function FormationDisplay({ lineup, teamName, isHome }: FormationDisplayProps) {
  const [showSubs, setShowSubs] = useState(false);
  const pColor = (p: string) => p === 'GK' ? 'bg-yellow-500' : isHome ? 'bg-blue-600' : 'bg-red-600';
  const getL = (b: string): string => isHome ? b : `${100 - parseInt(b)}%`;
  const fPos = parseFormation(lineup.formation);
  const start = lineup.starting || [];
  const subs = lineup.substitutes || [];

  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden">
      <div className="p-3 border-b border-slate-700 bg-slate-700/30">
        <div className="flex justify-between items-center">
          <h4 className="text-white font-bold text-sm">{teamName}</h4>
          <span className="text-xs text-gray-400">{lineup.formation}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="relative bg-gradient-to-b from-green-800/40 to-green-900/40 rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <div className="absolute inset-0 border-2 border-white/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-[18%] border-b-2 border-x-2 border-white/20"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/5 h-[18%] border-t-2 border-x-2 border-white/20"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-white/20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/30"></div>
          </div>
          {start.map((name, idx) => {
            const pk = fPos[idx] || 'CM';
            const p = posMap[pk] || { t: `${50 - (idx * 5)}%`, l: `${30 + (idx * 5)}%` };
            return (
              <div key={idx} className="absolute -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all z-10" style={{ top: p.t, left: getL(p.l) }}>
                <div className={`${pColor(pk)} w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg border-2 border-white/30`}>{idx + 1}</div>
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                  <span className="text-white text-[10px] sm:text-xs font-semibold bg-black/60 px-1.5 py-0.5 rounded">{name}</span>
                </div>
              </div>
            );
          })}
        </div>
        {showSubs && subs.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="text-xs text-gray-400 font-semibold mb-2">替补球员</div>
            {subs.map((name, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-700/40 px-3 py-2.5 rounded-lg">
                <div className="bg-gray-500 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs">{idx + 12}</div>
                <div className="text-white text-sm font-medium">{name}</div>
              </div>
            ))}
          </div>
        )}
        {subs.length > 0 && (
          <button onClick={() => setShowSubs(!showSubs)} className="w-full mt-4 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-gray-300 text-xs font-semibold transition-all">
            {showSubs ? '收起替补' : `查看替补 (${subs.length}人)`}
          </button>
        )}
      </div>
    </div>
  );
}