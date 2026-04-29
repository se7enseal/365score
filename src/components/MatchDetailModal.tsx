'use client';

import { useState, Fragment } from 'react';
import { Match, OddsItem, Odds } from '../types/football';
import LiveAnimation from './LiveAnimation';
import FormationDisplay from './FormationDisplay';

interface MatchDetailModalProps {
  match: Match;
  onClose: () => void;
}

const oddsCompanies = [
  '竞彩官方',
  '澳门',
  '威廉希尔',
  '立博',
  'Interwetten',
  'SNAI'
] as const;

interface OddsModalProps {
  odds: Odds;
  title: string;
  onClose: () => void;
}

function OddsModal({ odds, title, onClose }: OddsModalProps) {
  const calculateAverage = (oddsData: Record<string, OddsItem>) => {
    const companies = Object.values(oddsData);
    if (companies.length === 0) return null;
    return {
      homeWin: companies.reduce((sum, c) => sum + c.homeWin, 0) / companies.length,
      draw: companies.reduce((sum, c) => sum + c.draw, 0) / companies.length,
      awayWin: companies.reduce((sum, c) => sum + c.awayWin, 0) / companies.length,
    };
  };

  const calculateStdDev = (values: number[]) => {
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  };

  const calculateDispersion = (oddsData: Record<string, OddsItem>) => {
    const companies = Object.values(oddsData);
    if (companies.length === 0) return null;
    const homeWins = companies.map(c => c.homeWin);
    const draws = companies.map(c => c.draw);
    const awayWins = companies.map(c => c.awayWin);

    return {
      homeWin: calculateStdDev(homeWins),
      draw: calculateStdDev(draws),
      awayWin: calculateStdDev(awayWins),
    };
  };

  const iAvg = calculateAverage(odds.initial);
  const lAvg = odds.live && Object.keys(odds.live).length > 0 ? calculateAverage(odds.live) : null;
  const iDisp = calculateDispersion(odds.initial);
  const lDisp = odds.live && Object.keys(odds.live).length > 0 ? calculateDispersion(odds.live) : null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-white font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-60px)] space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-2">初始赔率</div>
              {iAvg && (
                <div className="flex gap-2 text-sm">
                  <span className="text-green-400">{iAvg.homeWin.toFixed(2)}</span>
                  <span className="text-yellow-400">{iAvg.draw.toFixed(2)}</span>
                  <span className="text-blue-400">{iAvg.awayWin.toFixed(2)}</span>
                </div>
              )}
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-2">初始离散</div>
              {iDisp && (
                <div className="flex gap-2 text-sm">
                  <span className="text-green-400">{iDisp.homeWin.toFixed(3)}</span>
                  <span className="text-yellow-400">{iDisp.draw.toFixed(3)}</span>
                  <span className="text-blue-400">{iDisp.awayWin.toFixed(3)}</span>
                </div>
              )}
            </div>
            {lAvg && (
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-2">最终赔率</div>
                <div className="flex gap-2 text-sm">
                  <span className="text-green-400">{lAvg.homeWin.toFixed(2)}</span>
                  <span className="text-yellow-400">{lAvg.draw.toFixed(2)}</span>
                  <span className="text-blue-400">{lAvg.awayWin.toFixed(2)}</span>
                </div>
              </div>
            )}
            {lDisp && (
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-2">最终离散</div>
                <div className="flex gap-2 text-sm">
                  <span className="text-green-400">{lDisp.homeWin.toFixed(3)}</span>
                  <span className="text-yellow-400">{lDisp.draw.toFixed(3)}</span>
                  <span className="text-blue-400">{lDisp.awayWin.toFixed(3)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-2">AI预测记录</div>
            <div className="bg-slate-700/50 rounded-lg p-2">
              <div className="text-white text-sm">
                <span className="text-blue-400 font-bold">预测结果：</span>主胜
              </div>
              <div className="text-gray-400 text-xs mt-1">
                基于历史数据分析，主队获胜概率较高
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700/50">
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-300">公司</th>
                  <th className="px-2 py-2 text-center text-xs font-semibold text-green-400">主胜</th>
                  <th className="px-2 py-2 text-center text-xs font-semibold text-yellow-400">平局</th>
                  <th className="px-2 py-2 text-center text-xs font-semibold text-blue-400">客胜</th>
                </tr>
              </thead>
              <tbody>
                {oddsCompanies.map((company) => {
                  const initialOdds = odds?.initial[company];
                  if (!initialOdds) return null;
                  return (
                    <tr key={company} className="border-b border-slate-700/50">
                      <td className="px-2 py-2 text-white text-xs">{company}</td>
                      <td className="px-2 py-2 text-center text-gray-300 text-sm">{initialOdds.homeWin.toFixed(2)}</td>
                      <td className="px-2 py-2 text-center text-gray-300 text-sm">{initialOdds.draw.toFixed(2)}</td>
                      <td className="px-2 py-2 text-center text-gray-300 text-sm">{initialOdds.awayWin.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MatchDetailModal({ match, onClose }: MatchDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'animation' | 'events' | 'lineups' | 'prediction' | 'odds'>('animation');
  const [showOddsModal, setShowOddsModal] = useState(false);
  const [currentOdds, setCurrentOdds] = useState<Odds | null>(null);
  const [oddsTitle, setOddsTitle] = useState('');

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

  const calculateAverage = (oddsData: Record<string, OddsItem>) => {
    const companies = Object.values(oddsData);
    return {
      homeWin: companies.reduce((sum, c) => sum + c.homeWin, 0) / companies.length,
      draw: companies.reduce((sum, c) => sum + c.draw, 0) / companies.length,
      awayWin: companies.reduce((sum, c) => sum + c.awayWin, 0) / companies.length,
    };
  };

  const calculateStdDev = (values: number[]) => {
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  };

  const calculateDispersion = (oddsData: Record<string, OddsItem>) => {
    const companies = Object.values(oddsData);
    const homeWins = companies.map(c => c.homeWin);
    const draws = companies.map(c => c.draw);
    const awayWins = companies.map(c => c.awayWin);

    return {
      homeWin: calculateStdDev(homeWins),
      draw: calculateStdDev(draws),
      awayWin: calculateStdDev(awayWins),
    };
  };

  const iAvg = match.odds ? calculateAverage(match.odds.initial) : null;
  const lAvg = match.odds ? calculateAverage(match.odds.live) : null;
  const iDisp = match.odds ? calculateDispersion(match.odds.initial) : null;
  const lDisp = match.odds ? calculateDispersion(match.odds.live) : null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      {showOddsModal && currentOdds && (
        <OddsModal 
          odds={currentOdds} 
          title={oddsTitle} 
          onClose={() => setShowOddsModal(false)} 
        />
      )}
      <div 
        className="bg-slate-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-5xl h-[90vh] sm:h-auto sm:max-h-[90vh] overflow-hidden border-t sm:border border-slate-700 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
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
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl sm:text-2xl transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>
          <div className="mt-2 text-xs sm:text-sm text-gray-400 truncate">
            {match.league.name} · {match.venue}
          </div>
        </div>

        <div className="flex border-b border-slate-700 bg-slate-800/50 overflow-x-auto flex-shrink-0">
          <button
            onClick={() => setActiveTab('animation')}
            className={`flex-1 py-3 px-2 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'animation' 
                ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-700/50' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎬 动画
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-3 px-2 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'events' 
                ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-700/50' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ️ 事件
          </button>
          <button
            onClick={() => setActiveTab('lineups')}
            className={`flex-1 py-3 px-2 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'lineups' 
                ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-700/50' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            👥 阵容
          </button>
          <button
            onClick={() => setActiveTab('prediction')}
            className={`flex-1 py-3 px-2 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'prediction' 
                ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-700/50' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🤖 AI
          </button>
          <button
            onClick={() => setActiveTab('odds')}
            className={`flex-1 py-3 px-2 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'odds' 
                ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-700/50' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            💰 赔率
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'animation' && (
            <div className="space-y-4">
              <LiveAnimation match={match} />
              {match.status !== 'LIVE' && (
                <div className="text-center text-gray-400 py-4">
                  <p className="text-sm">动画直播仅在比赛进行中时可用</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="relative max-w-4xl mx-auto">
              {match.events.length > 0 ? (
                <div className="relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 transform -translate-x-1/2"></div>
                  
                  {match.events
                    .sort((a, b) => a.minute - b.minute)
                    .map((event, idx) => {
                      const isHome = event.team === 'home';
                      
                      return (
                        <div 
                          key={idx}
                          className="relative flex items-start mb-6"
                        >
                          <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                              event.type === 'GOAL' 
                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                                : event.type === 'YELLOW_CARD'
                                ? 'bg-gradient-to-br from-yellow-300 to-yellow-500'
                                : 'bg-gradient-to-br from-red-500 to-red-700'
                            }`}>
                              <span className="text-xs sm:text-sm">{event.minute}&apos;</span>
                            </div>
                          </div>

                          <div className={`w-5/12 ${
                            isHome 
                              ? 'pr-8 text-right' 
                              : 'ml-auto pl-8'
                          }`}>
                            <div className={`bg-slate-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border ${
                              isHome 
                                ? 'border-blue-500/30 hover:border-blue-500/50' 
                                : 'border-red-500/30 hover:border-red-500/50'
                            } transition-all hover:shadow-lg`}>
                              <div className={`flex items-start gap-2 sm:gap-3 ${
                                isHome ? 'flex-row-reverse' : ''
                              }`}>
                                <div className="text-xl sm:text-2xl flex-shrink-0">
                                  {event.type === 'GOAL' && '⚽'}
                                  {event.type === 'YELLOW_CARD' && '🟨'}
                                  {event.type === 'RED_CARD' && '🟥'}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-white font-bold text-sm sm:text-base mb-1 truncate">
                                    {event.player}
                                  </div>
                                  {event.assist && (
                                    <div className="text-gray-400 text-xs sm:text-sm truncate">
                                      <span className="text-gray-500">助攻:</span> {event.assist}
                                    </div>
                                  )}
                                  {event.type !== 'GOAL' && (
                                    <div className="text-gray-400 text-xs sm:text-sm mt-1 truncate">
                                      {event.description}
                                    </div>
                                  )}
                                </div>
                                <div className="hidden sm:block text-xs text-gray-500 font-semibold whitespace-nowrap flex-shrink-0">
                                  {isHome ? match.homeTeam.shortName : match.awayTeam.shortName}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-12">
                  <div className="text-4xl sm:text-6xl mb-4">📋</div>
                  <p className="text-base sm:text-lg">暂无比赛事件</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'lineups' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-white font-bold text-lg">
                  {match.status === 'SCHEDULED' && '📋 预测阵容'}
                  {match.status === 'LIVE' && '🔥 首发阵容'}
                  {(match.status === 'FINISHED' || match.status === 'HALFTIME') && '👥 阵容'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormationDisplay 
                  lineup={match.lineups.home}
                  teamName={match.homeTeam.name}
                  isHome={true}
                />
                <FormationDisplay 
                  lineup={match.lineups.away}
                  teamName={match.awayTeam.name}
                  isHome={false}
                />
              </div>
            </div>
          )}

          {activeTab === 'prediction' && (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-xl overflow-hidden">
                <div className="px-3 py-2 border-b border-amber-500/30 bg-amber-800/20">
                  <h4 className="text-amber-400 font-bold text-sm">⚔️ 历史交锋记录 (最近6场)</h4>
                </div>
                <div className="divide-y divide-amber-800/30">
                  {match.headToHead?.map((h2h, idx) => (
                    <div 
                      key={idx}
                      className="px-3 py-1.5 flex items-center justify-between hover:bg-amber-800/15 cursor-pointer transition-colors"
                      onClick={() => {
                        setCurrentOdds(h2h.odds);
                        setOddsTitle(`${h2h.homeTeam} vs ${h2h.awayTeam} - ${h2h.date}`);
                        setShowOddsModal(true);
                      }}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xs text-amber-400/60 w-14 truncate">{h2h.date}</span>
                        <span className="text-xs text-gray-500 px-1.5 py-0.5 rounded bg-slate-700/50">{h2h.matchType}</span>
                        <div className="flex-1 flex items-center justify-between px-2">
                          <span className="text-white text-xs truncate text-right">{h2h.homeTeam}</span>
                          <span className="text-gray-500 text-xs mx-2">vs</span>
                          <span className="text-white text-xs truncate">{h2h.awayTeam}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-xs">
                          {h2h.homeScore} : {h2h.awayScore}
                        </span>
                        <span className="text-blue-400 text-xs">💰</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-500/20 px-2 py-0.5 rounded-lg flex-shrink-0">
                    <span className="text-blue-400 font-bold text-xs">{match.aiPrediction.result}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>置信度</span>
                      <span className="text-white font-semibold">{match.aiPrediction.confidence}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${match.aiPrediction.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">{match.aiPrediction.analysis}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-800/50 rounded-xl p-2.5">
                  <div className="text-white font-semibold text-xs mb-2 truncate">{match.homeTeam.name}</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {match.recentForm.home.map((result, idx) => (
                      <div 
                        key={idx}
                        className={`${getFormColor(result)} w-7 h-7 rounded flex items-center justify-center text-white font-bold text-xs`}
                      >
                        {getFormText(result)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-2.5">
                  <div className="text-white font-semibold text-xs mb-2 truncate">{match.awayTeam.name}</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {match.recentForm.away.map((result, idx) => (
                      <div 
                        key={idx}
                        className={`${getFormColor(result)} w-7 h-7 rounded flex items-center justify-center text-white font-bold text-xs`}
                      >
                        {getFormText(result)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl overflow-hidden">
                <div className="px-3 py-2 border-b border-slate-700/50 bg-slate-700/20">
                  <h4 className="text-white font-bold text-xs">🏆 最近5场 - {match.homeTeam.name}</h4>
                </div>
                <div className="divide-y divide-slate-700/30">
                  {match.recentMatches?.home?.map((recentMatch, idx) => (
                    <div 
                      key={idx}
                      className="px-3 py-1.5 flex items-center justify-between hover:bg-slate-700/20 cursor-pointer transition-colors"
                      onClick={() => {
                        setCurrentOdds(recentMatch.odds);
                        setOddsTitle(`${match.homeTeam.name} vs ${recentMatch.opponent} - ${recentMatch.date}`);
                        setShowOddsModal(true);
                      }}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xs text-gray-400 w-14 truncate">{recentMatch.date}</span>
                        <span className="text-gray-500 text-xs">{recentMatch.isHome ? '🏠' : '✈️'}</span>
                        <span className="text-xs text-gray-500 px-1.5 py-0.5 rounded bg-slate-700/50">{recentMatch.matchType}</span>
                        <span className="text-white text-xs truncate flex-1">{recentMatch.opponent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-xs">
                          {recentMatch.homeScore} : {recentMatch.awayScore}
                        </span>
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${getFormColor(recentMatch.result)} text-white`}>
                          {getFormText(recentMatch.result)}
                        </span>
                        <span className="text-blue-400 text-xs">💰</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl overflow-hidden">
                <div className="px-3 py-2 border-b border-slate-700/50 bg-slate-700/20">
                  <h4 className="text-white font-bold text-xs">🏆 最近5场 - {match.awayTeam.name}</h4>
                </div>
                <div className="divide-y divide-slate-700/30">
                  {match.recentMatches?.away?.map((recentMatch, idx) => (
                    <div 
                      key={idx}
                      className="px-3 py-1.5 flex items-center justify-between hover:bg-slate-700/20 cursor-pointer transition-colors"
                      onClick={() => {
                        setCurrentOdds(recentMatch.odds);
                        setOddsTitle(`${match.awayTeam.name} vs ${recentMatch.opponent} - ${recentMatch.date}`);
                        setShowOddsModal(true);
                      }}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xs text-gray-400 w-14 truncate">{recentMatch.date}</span>
                        <span className="text-gray-500 text-xs">{recentMatch.isHome ? '🏠' : '✈️'}</span>
                        <span className="text-xs text-gray-500 px-1.5 py-0.5 rounded bg-slate-700/50">{recentMatch.matchType}</span>
                        <span className="text-white text-xs truncate flex-1">{recentMatch.opponent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-xs">
                          {recentMatch.homeScore} : {recentMatch.awayScore}
                        </span>
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${getFormColor(recentMatch.result)} text-white`}>
                          {getFormText(recentMatch.result)}
                        </span>
                        <span className="text-blue-400 text-xs">💰</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'odds' && match.odds && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-xl overflow-hidden">
                <div className="p-3 border-b border-slate-700 bg-slate-700/30">
                  <h4 className="text-white font-bold text-sm">欧赔对比</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    更新: {new Date(match.odds.lastUpdate).toLocaleString('zh-CN')}
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-700/50">
                        <th className="px-1 py-2 text-left font-semibold text-gray-300 w-16">公司</th>
                        <th className="px-3 py-2 text-center text-xs font-semibold text-green-400">主胜</th>
                        <th className="px-3 py-2 text-center text-xs font-semibold text-yellow-400">平局</th>
                        <th className="px-3 py-2 text-center text-xs font-semibold text-blue-400">客胜</th>
                      </tr>
                    </thead>
                    <tbody>
                      {oddsCompanies.map((company) => {
                        const initialOdds = match.odds?.initial[company];
                        const liveOdds = match.odds?.live[company];
                        if (!initialOdds || !liveOdds) return null;
                        
                        return (
                          <Fragment key={company}>
                            <tr className="bg-slate-800/30">
                              <td className="px-3 py-2 text-white font-semibold text-xs" rowSpan={2}>
                                {company}
                              </td>
                              <td className="px-3 py-2 text-center">
                                <span className="text-gray-400 text-xs">{initialOdds.homeWin.toFixed(2)}</span>
                              </td>
                              <td className="px-3 py-2 text-center">
                                <span className="text-gray-400 text-xs">{initialOdds.draw.toFixed(2)}</span>
                              </td>
                              <td className="px-3 py-2 text-center">
                                <span className="text-gray-400 text-xs">{initialOdds.awayWin.toFixed(2)}</span>
                              </td>
                            </tr>
                            <tr className="border-b border-slate-700/50 bg-slate-800/10">
                              <td className="px-3 py-2 text-center">
                                <span className={`font-bold text-sm ${liveOdds.homeWin > initialOdds.homeWin ? 'text-red-400' : liveOdds.homeWin < initialOdds.homeWin ? 'text-green-400' : 'text-gray-300'}`}>
                                  {liveOdds.homeWin.toFixed(2)}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-center">
                                <span className={`font-bold text-sm ${liveOdds.draw > initialOdds.draw ? 'text-red-400' : liveOdds.draw < initialOdds.draw ? 'text-green-400' : 'text-gray-300'}`}>
                                  {liveOdds.draw.toFixed(2)}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-center">
                                <span className={`font-bold text-sm ${liveOdds.awayWin > initialOdds.awayWin ? 'text-red-400' : liveOdds.awayWin < initialOdds.awayWin ? 'text-green-400' : 'text-gray-300'}`}>
                                  {liveOdds.awayWin.toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          </Fragment>
                        );
                      })}
                      <tr className="bg-slate-700/50 font-bold">
                        <td className="px-3 py-2 text-white text-xs">平均值</td>
                        <td className="px-3 py-2 text-center">
                          <div className="space-y-1">
                            <div className="text-gray-400 text-xs">{iAvg?.homeWin.toFixed(2)}</div>
                            <div className="text-yellow-400 text-sm">{lAvg?.homeWin.toFixed(2)}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <div className="space-y-1">
                            <div className="text-gray-400 text-xs">{iAvg?.draw.toFixed(2)}</div>
                            <div className="text-yellow-400 text-sm">{lAvg?.draw.toFixed(2)}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <div className="space-y-1">
                            <div className="text-gray-400 text-xs">{iAvg?.awayWin.toFixed(2)}</div>
                            <div className="text-yellow-400 text-sm">{lAvg?.awayWin.toFixed(2)}</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl overflow-hidden">
                <div className="p-3 border-b border-slate-700 bg-slate-700/30">
                  <h4 className="text-white font-bold text-sm">离散值</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    数值越小，机构意见越一致
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[400px]">
                    <thead>
                      <tr className="bg-slate-700/50">
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-300">类型</th>
                        <th className="px-3 py-2 text-center text-xs font-semibold text-green-400">主胜</th>
                        <th className="px-3 py-2 text-center text-xs font-semibold text-yellow-400">平局</th>
                        <th className="px-3 py-2 text-center text-xs font-semibold text-blue-400">客胜</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-slate-800/30">
                        <td className="px-3 py-2 text-white font-semibold text-xs">初始离散</td>
                        <td className="px-3 py-2 text-center">
                          <span className="text-gray-400 font-bold text-sm">{iDisp?.homeWin.toFixed(2)}</span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className="text-gray-400 font-bold text-sm">{iDisp?.draw.toFixed(2)}</span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className="text-gray-400 font-bold text-sm">{iDisp?.awayWin.toFixed(2)}</span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-700/50 bg-slate-800/10">
                        <td className="px-3 py-2 text-white font-semibold text-xs">即时离散</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`font-bold text-sm ${(lDisp?.homeWin || 0) < (iDisp?.homeWin || 0) ? 'text-green-400' : 'text-red-400'}`}>
                            {lDisp?.homeWin.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`font-bold text-sm ${(lDisp?.draw || 0) < (iDisp?.draw || 0) ? 'text-green-400' : 'text-red-400'}`}>
                            {lDisp?.draw.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`font-bold text-sm ${(lDisp?.awayWin || 0) < (iDisp?.awayWin || 0) ? 'text-green-400' : 'text-red-400'}`}>
                            {lDisp?.awayWin.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                <h5 className="text-blue-400 font-bold text-sm mb-2">📊 离散值参考说明</h5>
                <div className="space-y-2 text-xs text-gray-300">
                  <p>• <span className="text-green-400 font-semibold">离散值下降</span>：机构意见趋于一致，该结果打出的可能性增加</p>
                  <p>• <span className="text-red-400 font-semibold">离散值上升</span>：机构分歧加大，该结果打出的可能性降低</p>
                  <p>• <span className="text-yellow-400 font-semibold">最低离散值</span>：通常对应最可能打出的赛果方向</p>
                  <p className="text-gray-400 mt-2">注：离散值仅供参考，实际投注需结合其他数据综合分析</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}