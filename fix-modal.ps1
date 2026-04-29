$content = @'
'use client';
import { useState, Fragment } from 'react';
import { Match } from '../types/football';
import LiveAnimation from './LiveAnimation';
import FormationDisplay from './FormationDisplay';

interface MatchDetailModalProps {
  match: Match;
  onClose: () => void;
}

const oddsCompanies = ['竞彩官方', '澳门', '威廉希尔', '立博', 'Interwetten', 'SNAI'] as const;

export default function MatchDetailModal({ match, onClose }: MatchDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'animation' | 'events' | 'lineups' | 'prediction' | 'odds'>('animation');

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-500';
      case 'D': return 'bg-yellow-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getFormText = (result: string) => {
    switch (result) {
      case 'W': return '胜';
      case 'D': return '平';
      case 'L': return '负';
      default: return result;
    }
  };

  const calculateAverage = (oddsData: any) => {
    const companies = Object.values(oddsData) as any[];
    return {
      homeWin: companies.reduce((sum: number, c: any) => sum + c.homeWin, 0) / companies.length,
      draw: companies.reduce((sum: number, c: any) => sum + c.draw, 0) / companies.length,
      awayWin: companies.reduce((sum: number, c: any) => sum + c.awayWin, 0) / companies.length,
    };
  };

  const calculateStdDev = (values: number[]) => {
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  };

  const calculateDispersion = (oddsData: any) => {
    const companies = Object.values(oddsData) as any[];
    return {
      homeWin: calculateStdDev(companies.map(c => c.homeWin)),
      draw: calculateStdDev(companies.map(c => c.draw)),
      awayWin: calculateStdDev(companies.map(c => c.awayWin)),
    };
  };

  const initialAvg = match.odds ? calculateAverage(match.odds.initial) : null;
  const liveAvg = match.odds ? calculateAverage(match.odds.live) : null;
  const initialDisp = match.odds ? calculateDispersion(match.odds.initial) : null;
  const liveDisp = match.odds ? calculateDispersion(match.odds.live) : null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-slate-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-5xl h-[90vh] sm:h-auto sm:max-h-[90vh] overflow-hidden border-t sm:border border-slate-700 shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-lg md:text-2xl font-bold text-white truncate max-w-[80px] sm:max-w-none">{match.homeTeam.name}</span>
              <div className="bg-slate-800 px-2 py-1 sm:px-4 sm:py-2 rounded-lg">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{match.homeScore}</span>
                <span className="text-gray-500 mx-1">:</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{match.awayScore}</span>
              </div>
              <span className="text-sm sm:text-lg md:text-2xl font-bold text-white truncate max-w-[80px] sm:max-w-none">{match.awayTeam.name}</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl sm:text-2xl transition-colors flex-shrink-0">✕