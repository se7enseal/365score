'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function StandingsPage() {
  const [activeLeague, setActiveLeague] = useState('英超');

  const leagues = ['英超', '西甲', '意甲', '德甲', '法甲'];

  const standingsData: Record<string, Array<{ rank: number; team: string; played: number; win: number; draw: number; lose: number; goalsFor: number; goalsAgainst: number; gd: number; points: number; trend: string }>> = {
    '英超': [
      { rank: 1, team: '曼城', played: 34, win: 28, draw: 5, lose: 1, goalsFor: 96, goalsAgainst: 24, gd: 72, points: 89, trend: 'up' },
      { rank: 2, team: '阿森纳', played: 34, win: 25, draw: 7, lose: 2, goalsFor: 83, goalsAgainst: 22, gd: 61, points: 82, trend: 'down' },
      { rank: 3, team: '利物浦', played: 34, win: 24, draw: 6, lose: 4, goalsFor: 84, goalsAgainst: 26, gd: 58, points: 78, trend: 'up' },
      { rank: 4, team: '热刺', played: 34, win: 22, draw: 6, lose: 6, goalsFor: 74, goalsAgainst: 34, gd: 40, points: 72, trend: 'same' },
      { rank: 5, team: '曼联', played: 34, win: 20, draw: 8, lose: 6, goalsFor: 68, goalsAgainst: 33, gd: 35, points: 68, trend: 'down' },
      { rank: 6, team: '纽卡斯尔', played: 34, win: 19, draw: 8, lose: 7, goalsFor: 64, goalsAgainst: 33, gd: 31, points: 65, trend: 'up' },
      { rank: 7, team: '布莱顿', played: 34, win: 18, draw: 8, lose: 8, goalsFor: 58, goalsAgainst: 40, gd: 18, points: 62, trend: 'same' },
      { rank: 8, team: '阿斯顿维拉', played: 34, win: 17, draw: 10, lose: 7, goalsFor: 51, goalsAgainst: 36, gd: 15, points: 61, trend: 'up' },
      { rank: 9, team: '富勒姆', played: 34, win: 15, draw: 7, lose: 12, goalsFor: 55, goalsAgainst: 53, gd: 2, points: 52, trend: 'down' },
      { rank: 10, team: '水晶宫', played: 34, win: 11, draw: 14, lose: 9, goalsFor: 40, goalsAgainst: 42, gd: -2, points: 47, trend: 'same' },
      { rank: 11, team: '布伦特福德', played: 34, win: 11, draw: 13, lose: 10, goalsFor: 46, goalsAgainst: 43, gd: 3, points: 46, trend: 'up' },
      { rank: 12, team: '切尔西', played: 34, win: 11, draw: 11, lose: 12, goalsFor: 47, goalsAgainst: 46, gd: 1, points: 44, trend: 'down' },
      { rank: 13, team: '狼队', played: 34, win: 11, draw: 10, lose: 13, goalsFor: 36, goalsAgainst: 40, gd: -4, points: 43, trend: 'same' },
      { rank: 14, team: '伯恩茅斯', played: 34, win: 11, draw: 8, lose: 15, goalsFor: 41, goalsAgainst: 51, gd: -10, points: 41, trend: 'up' },
      { rank: 15, team: '埃弗顿', played: 34, win: 10, draw: 10, lose: 14, goalsFor: 34, goalsAgainst: 57, gd: -23, points: 40, trend: 'down' },
      { rank: 16, team: '诺丁汉森林', played: 34, win: 9, draw: 11, lose: 14, goalsFor: 40, goalsAgainst: 55, gd: -15, points: 38, trend: 'same' },
      { rank: 17, team: '南安普顿', played: 34, win: 9, draw: 7, lose: 18, goalsFor: 41, goalsAgainst: 65, gd: -24, points: 34, trend: 'down' },
      { rank: 18, team: '莱斯特城', played: 34, win: 8, draw: 7, lose: 19, goalsFor: 38, goalsAgainst: 64, gd: -26, points: 31, trend: 'down' },
      { rank: 19, team: '利兹联', played: 34, win: 7, draw: 10, lose: 17, goalsFor: 48, goalsAgainst: 73, gd: -25, points: 31, trend: 'down' },
      { rank: 20, team: '伯恩利', played: 34, win: 5, draw: 10, lose: 19, goalsFor: 31, goalsAgainst: 68, gd: -37, points: 25, trend: 'down' },
    ],
    '西甲': [
      { rank: 1, team: '皇马', played: 34, win: 26, draw: 5, lose: 3, goalsFor: 78, goalsAgainst: 23, gd: 55, points: 83, trend: 'up' },
      { rank: 2, team: '巴萨', played: 34, win: 25, draw: 7, lose: 2, goalsFor: 79, goalsAgainst: 27, gd: 52, points: 82, trend: 'down' },
      { rank: 3, team: '马竞', played: 34, win: 21, draw: 8, lose: 5, goalsFor: 61, goalsAgainst: 23, gd: 38, points: 71, trend: 'same' },
      { rank: 4, team: '比利亚雷亚尔', played: 34, win: 18, draw: 8, lose: 8, goalsFor: 54, goalsAgainst: 34, gd: 20, points: 62, trend: 'up' },
      { rank: 5, team: '塞维利亚', played: 34, win: 17, draw: 10, lose: 7, goalsFor: 55, goalsAgainst: 37, gd: 18, points: 61, trend: 'down' },
      { rank: 6, team: '皇家社会', played: 34, win: 16, draw: 10, lose: 8, goalsFor: 47, goalsAgainst: 32, gd: 15, points: 58, trend: 'same' },
      { rank: 7, team: '贝蒂斯', played: 34, win: 14, draw: 11, lose: 9, goalsFor: 51, goalsAgainst: 40, gd: 11, points: 53, trend: 'up' },
      { rank: 8, team: '奥萨苏纳', played: 34, win: 13, draw: 11, lose: 10, goalsFor: 39, goalsAgainst: 34, gd: 5, points: 50, trend: 'down' },
      { rank: 9, team: '瓦伦西亚', played: 34, win: 11, draw: 15, lose: 8, goalsFor: 44, goalsAgainst: 35, gd: 9, points: 48, trend: 'same' },
      { rank: 10, team: '赫塔菲', played: 34, win: 11, draw: 12, lose: 11, goalsFor: 33, goalsAgainst: 42, gd: -9, points: 45, trend: 'up' },
      { rank: 11, team: '阿尔梅里亚', played: 34, win: 11, draw: 9, lose: 14, goalsFor: 42, goalsAgainst: 53, gd: -11, points: 42, trend: 'down' },
      { rank: 12, team: '毕尔巴鄂竞技', played: 34, win: 10, draw: 12, lose: 12, goalsFor: 43, goalsAgainst: 48, gd: -5, points: 42, trend: 'same' },
      { rank: 13, team: '西班牙人', played: 34, win: 10, draw: 11, lose: 13, goalsFor: 35, goalsAgainst: 42, gd: -7, points: 41, trend: 'up' },
      { rank: 14, team: '赫罗纳', played: 34, win: 10, draw: 10, lose: 14, goalsFor: 42, goalsAgainst: 51, gd: -9, points: 40, trend: 'down' },
      { rank: 15, team: '巴拉多利德', played: 34, win: 9, draw: 12, lose: 13, goalsFor: 35, goalsAgainst: 48, gd: -13, points: 39, trend: 'same' },
      { rank: 16, team: '塞尔塔', played: 34, win: 9, draw: 11, lose: 14, goalsFor: 41, goalsAgainst: 51, gd: -10, points: 38, trend: 'up' },
      { rank: 17, team: '加的斯', played: 34, win: 8, draw: 13, lose: 13, goalsFor: 34, goalsAgainst: 47, gd: -13, points: 37, trend: 'down' },
      { rank: 18, team: '埃尔切', played: 34, win: 5, draw: 12, lose: 17, goalsFor: 28, goalsAgainst: 53, gd: -25, points: 27, trend: 'down' },
      { rank: 19, team: '马洛卡', played: 34, win: 5, draw: 11, lose: 18, goalsFor: 30, goalsAgainst: 60, gd: -30, points: 26, trend: 'down' },
      { rank: 20, team: '巴列卡诺', played: 34, win: 4, draw: 10, lose: 20, goalsFor: 31, goalsAgainst: 62, gd: -31, points: 22, trend: 'down' },
    ],
    '意甲': [
      { rank: 1, team: '那不勒斯', played: 34, win: 28, draw: 4, lose: 2, goalsFor: 77, goalsAgainst: 27, gd: 50, points: 88, trend: 'up' },
      { rank: 2, team: 'AC米兰', played: 34, win: 22, draw: 8, lose: 4, goalsFor: 64, goalsAgainst: 28, gd: 36, points: 74, trend: 'same' },
      { rank: 3, team: '国际米兰', played: 34, win: 22, draw: 7, lose: 5, goalsFor: 71, goalsAgainst: 31, gd: 40, points: 73, trend: 'down' },
      { rank: 4, team: '尤文图斯', played: 34, win: 21, draw: 8, lose: 5, goalsFor: 56, goalsAgainst: 21, gd: 35, points: 71, trend: 'up' },
      { rank: 5, team: '罗马', played: 34, win: 18, draw: 9, lose: 7, goalsFor: 50, goalsAgainst: 25, gd: 25, points: 63, trend: 'same' },
      { rank: 6, team: '拉齐奥', played: 34, win: 18, draw: 8, lose: 8, goalsFor: 59, goalsAgainst: 38, gd: 21, points: 62, trend: 'down' },
      { rank: 7, team: '亚特兰大', played: 34, win: 17, draw: 9, lose: 8, goalsFor: 66, goalsAgainst: 41, gd: 25, points: 60, trend: 'up' },
      { rank: 8, team: '佛罗伦萨', played: 34, win: 15, draw: 11, lose: 8, goalsFor: 51, goalsAgainst: 31, gd: 20, points: 56, trend: 'same' },
      { rank: 9, team: '都灵', played: 34, win: 13, draw: 11, lose: 10, goalsFor: 41, goalsAgainst: 37, gd: 4, points: 50, trend: 'down' },
      { rank: 10, team: '博洛尼亚', played: 34, win: 12, draw: 11, lose: 11, goalsFor: 48, goalsAgainst: 42, gd: 6, points: 47, trend: 'up' },
      { rank: 11, team: '乌迪内斯', played: 34, win: 11, draw: 13, lose: 10, goalsFor: 48, goalsAgainst: 45, gd: 3, points: 46, trend: 'same' },
      { rank: 12, team: '萨索洛', played: 34, win: 12, draw: 9, lose: 13, goalsFor: 47, goalsAgainst: 51, gd: -4, points: 45, trend: 'down' },
      { rank: 13, team: '恩波利', played: 34, win: 10, draw: 12, lose: 12, goalsFor: 37, goalsAgainst: 46, gd: -9, points: 42, trend: 'up' },
      { rank: 14, team: '斯佩齐亚', played: 34, win: 10, draw: 10, lose: 14, goalsFor: 42, goalsAgainst: 50, gd: -8, points: 40, trend: 'same' },
      { rank: 15, team: '莱切', played: 34, win: 10, draw: 9, lose: 15, goalsFor: 39, goalsAgainst: 52, gd: -13, points: 39, trend: 'down' },
      { rank: 16, team: '维罗纳', played: 34, win: 8, draw: 13, lose: 13, goalsFor: 35, goalsAgainst: 48, gd: -13, points: 37, trend: 'up' },
      { rank: 17, team: '蒙扎', played: 34, win: 8, draw: 11, lose: 15, goalsFor: 35, goalsAgainst: 52, gd: -17, points: 35, trend: 'same' },
      { rank: 18, team: '克雷莫纳', played: 34, win: 5, draw: 11, lose: 18, goalsFor: 27, goalsAgainst: 58, gd: -31, points: 26, trend: 'down' },
      { rank: 19, team: '桑普多利亚', played: 34, win: 4, draw: 10, lose: 20, goalsFor: 24, goalsAgainst: 62, gd: -38, points: 22, trend: 'down' },
      { rank: 20, team: '威尼斯', played: 34, win: 3, draw: 9, lose: 22, goalsFor: 21, goalsAgainst: 61, gd: -40, points: 18, trend: 'down' },
    ],
    '德甲': [
      { rank: 1, team: '拜仁', played: 34, win: 27, draw: 4, lose: 3, goalsFor: 92, goalsAgainst: 24, gd: 68, points: 85, trend: 'up' },
      { rank: 2, team: '多特', played: 34, win: 24, draw: 5, lose: 5, goalsFor: 83, goalsAgainst: 35, gd: 48, points: 77, trend: 'down' },
      { rank: 3, team: '莱比锡', played: 34, win: 20, draw: 8, lose: 6, goalsFor: 64, goalsAgainst: 29, gd: 35, points: 68, trend: 'up' },
      { rank: 4, team: '勒沃库森', played: 34, win: 19, draw: 8, lose: 7, goalsFor: 60, goalsAgainst: 32, gd: 28, points: 65, trend: 'same' },
      { rank: 5, team: '门兴', played: 34, win: 16, draw: 10, lose: 8, goalsFor: 51, goalsAgainst: 36, gd: 15, points: 58, trend: 'down' },
      { rank: 6, team: '沃尔夫斯堡', played: 34, win: 15, draw: 10, lose: 9, goalsFor: 53, goalsAgainst: 40, gd: 13, points: 55, trend: 'up' },
      { rank: 7, team: '法兰克福', played: 34, win: 14, draw: 12, lose: 8, goalsFor: 58, goalsAgainst: 41, gd: 17, points: 54, trend: 'same' },
      { rank: 8, team: '科隆', played: 34, win: 14, draw: 9, lose: 11, goalsFor: 52, goalsAgainst: 46, gd: 6, points: 51, trend: 'down' },
      { rank: 9, team: 'RB莱比锡', played: 34, win: 13, draw: 10, lose: 11, goalsFor: 48, goalsAgainst: 42, gd: 6, points: 49, trend: 'up' },
      { rank: 10, team: '美因茨', played: 34, win: 12, draw: 10, lose: 12, goalsFor: 44, goalsAgainst: 47, gd: -3, points: 46, trend: 'same' },
      { rank: 11, team: '奥格斯堡', played: 34, win: 11, draw: 10, lose: 13, goalsFor: 42, goalsAgainst: 51, gd: -9, points: 43, trend: 'down' },
      { rank: 12, team: '霍芬海姆', played: 34, win: 11, draw: 9, lose: 14, goalsFor: 45, goalsAgainst: 50, gd: -5, points: 42, trend: 'up' },
      { rank: 13, team: '柏林赫塔', played: 34, win: 10, draw: 11, lose: 13, goalsFor: 42, goalsAgainst: 52, gd: -10, points: 41, trend: 'same' },
      { rank: 14, team: '波鸿', played: 34, win: 10, draw: 10, lose: 14, goalsFor: 38, goalsAgainst: 52, gd: -14, points: 40, trend: 'down' },
      { rank: 15, team: '弗赖堡', played: 34, win: 9, draw: 11, lose: 14, goalsFor: 37, goalsAgainst: 44, gd: -7, points: 38, trend: 'up' },
      { rank: 16, team: '柏林联', played: 34, win: 8, draw: 11, lose: 15, goalsFor: 32, goalsAgainst: 51, gd: -19, points: 35, trend: 'same' },
      { rank: 17, team: '沙尔克04', played: 34, win: 7, draw: 8, lose: 19, goalsFor: 30, goalsAgainst: 60, gd: -30, points: 29, trend: 'down' },
      { rank: 18, team: '圣保利', played: 34, win: 3, draw: 10, lose: 21, goalsFor: 25, goalsAgainst: 67, gd: -42, points: 19, trend: 'down' },
    ],
    '法甲': [
      { rank: 1, team: '巴黎', played: 34, win: 27, draw: 4, lose: 3, goalsFor: 85, goalsAgainst: 27, gd: 58, points: 85, trend: 'up' },
      { rank: 2, team: '马赛', played: 34, win: 22, draw: 7, lose: 5, goalsFor: 67, goalsAgainst: 35, gd: 32, points: 73, trend: 'same' },
      { rank: 3, team: '里昂', played: 34, win: 20, draw: 6, lose: 8, goalsFor: 56, goalsAgainst: 28, gd: 28, points: 66, trend: 'down' },
      { rank: 4, team: '摩纳哥', played: 34, win: 18, draw: 10, lose: 6, goalsFor: 58, goalsAgainst: 33, gd: 25, points: 64, trend: 'up' },
      { rank: 5, team: '雷恩', played: 34, win: 17, draw: 8, lose: 9, goalsFor: 52, goalsAgainst: 37, gd: 15, points: 59, trend: 'same' },
      { rank: 6, team: '尼斯', played: 34, win: 16, draw: 10, lose: 8, goalsFor: 45, goalsAgainst: 31, gd: 14, points: 58, trend: 'down' },
      { rank: 7, team: '里尔', played: 34, win: 15, draw: 10, lose: 9, goalsFor: 48, goalsAgainst: 36, gd: 12, points: 55, trend: 'up' },
      { rank: 8, team: '朗斯', played: 34, win: 14, draw: 12, lose: 8, goalsFor: 46, goalsAgainst: 34, gd: 12, points: 54, trend: 'same' },
      { rank: 9, team: '斯特拉斯堡', played: 34, win: 12, draw: 13, lose: 9, goalsFor: 40, goalsAgainst: 34, gd: 6, points: 49, trend: 'down' },
      { rank: 10, team: '蒙彼利埃', played: 34, win: 12, draw: 11, lose: 11, goalsFor: 42, goalsAgainst: 42, gd: 0, points: 47, trend: 'up' },
      { rank: 11, team: '南特', played: 34, win: 11, draw: 12, lose: 11, goalsFor: 37, goalsAgainst: 40, gd: -3, points: 45, trend: 'same' },
      { rank: 12, team: '布雷斯特', played: 34, win: 11, draw: 11, lose: 12, goalsFor: 40, goalsAgainst: 43, gd: -3, points: 44, trend: 'down' },
      { rank: 13, team: '图卢兹', played: 34, win: 10, draw: 13, lose: 11, goalsFor: 41, goalsAgainst: 45, gd: -4, points: 43, trend: 'up' },
      { rank: 14, team: '梅斯', played: 34, win: 10, draw: 11, lose: 13, goalsFor: 32, goalsAgainst: 44, gd: -12, points: 41, trend: 'same' },
      { rank: 15, team: '克莱蒙', played: 34, win: 10, draw: 9, lose: 15, goalsFor: 38, goalsAgainst: 50, gd: -12, points: 39, trend: 'down' },
      { rank: 16, team: '特鲁瓦', played: 34, win: 8, draw: 13, lose: 13, goalsFor: 34, goalsAgainst: 48, gd: -14, points: 37, trend: 'up' },
      { rank: 17, team: '欧塞尔', played: 34, win: 7, draw: 12, lose: 15, goalsFor: 31, goalsAgainst: 49, gd: -18, points: 33, trend: 'same' },
      { rank: 18, team: '昂热', played: 34, win: 6, draw: 11, lose: 17, goalsFor: 29, goalsAgainst: 51, gd: -22, points: 29, trend: 'down' },
      { rank: 19, team: '阿雅克肖', played: 34, win: 5, draw: 9, lose: 20, goalsFor: 28, goalsAgainst: 60, gd: -32, points: 24, trend: 'down' },
      { rank: 20, team: '尼斯B队', played: 34, win: 3, draw: 8, lose: 23, goalsFor: 22, goalsAgainst: 70, gd: -48, points: 17, trend: 'down' },
    ],
  };

  const currentStandings = standingsData[activeLeague] || [];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <span className="text-green-600">↑</span>;
      case 'down': return <span className="text-red-600">↓</span>;
      default: return <span className="text-gray-400">→</span>;
    }
  };

  const getRowClass = (rank: number) => {
    const totalTeams = currentStandings.length;
    if (rank <= 4) return 'bg-yellow-50';
    if (rank >= totalTeams - 2) return 'bg-red-50';
    return '';
  };

  const getRankBadgeClass = (rank: number) => {
    const totalTeams = currentStandings.length;
    if (rank === 1) return 'bg-yellow-500 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-orange-500 text-white';
    if (rank === 4) return 'bg-blue-500 text-white';
    if (rank >= totalTeams - 2) return 'bg-red-500 text-white';
    return 'bg-gray-200 text-gray-600';
  };

  const getQualificationInfo = (rank: number) => {
    const totalTeams = currentStandings.length;
    if (rank === 1) return { text: '冠军', color: 'text-yellow-600' };
    if (rank <= 4) return { text: '欧冠', color: 'text-blue-600' };
    if (rank === 5 || rank === 6) return { text: '欧罗巴', color: 'text-green-600' };
    if (rank === 7) return { text: '欧协联', color: 'text-purple-600' };
    if (rank >= totalTeams - 2) return { text: '降级', color: 'text-red-600' };
    return null;
  };

  const getAttackStats = () => {
    return [...currentStandings].sort((a, b) => b.goalsFor - a.goalsFor);
  };

  const getDefenseStats = () => {
    return [...currentStandings].sort((a, b) => a.goalsAgainst - b.goalsAgainst);
  };

  const attackStats = getAttackStats();
  const defenseStats = getDefenseStats();

  const leagueRules: Record<string, string> = {
    '英超': '英超联赛共有20支球队，每支球队进行38场比赛（主客场各19场）。赛季结束后，积分榜前4名获得欧冠参赛资格，第5-6名获得欧罗巴联赛资格，第7名获得欧协联资格。最后3名降级到英冠联赛。',
    '西甲': '西甲联赛共有20支球队，每支球队进行38场比赛。积分榜前4名获得欧冠资格，第5-6名获得欧罗巴资格，第7名获得欧协联资格。最后3名降级到西乙联赛。',
    '意甲': '意甲联赛共有20支球队，每支球队进行38场比赛。积分榜前4名获得欧冠资格，第5名获得欧罗巴资格，第6名获得欧协联资格。最后3名降级到意乙联赛。',
    '德甲': '德甲联赛共有18支球队，每支球队进行34场比赛。积分榜前4名获得欧冠资格，第5名获得欧罗巴资格，第6名获得欧协联资格。最后2名直接降级，第16名与德乙第3名进行附加赛。',
    '法甲': '法甲联赛共有20支球队，每支球队进行38场比赛。积分榜前4名获得欧冠资格，第5名获得欧罗巴资格，第6名获得欧协联资格。最后2名降级到法乙联赛。',
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回上一页
        </button>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">积分榜</h1>
            <p className="text-gray-500 mt-1">查看各联赛完整排名</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {leagues.map((league) => (
            <button
              key={league}
              onClick={() => setActiveLeague(league)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeLeague === league
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {league}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="grid grid-cols-16 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500">
            <div className="col-span-1">#</div>
            <div className="col-span-4">球队</div>
            <div className="col-span-1 text-center">赛</div>
            <div className="col-span-1 text-center">胜</div>
            <div className="col-span-1 text-center">平</div>
            <div className="col-span-1 text-center">负</div>
            <div className="col-span-1 text-center">进</div>
            <div className="col-span-1 text-center">失</div>
            <div className="col-span-1 text-center">净</div>
            <div className="col-span-1 text-center">积</div>
            <div className="col-span-1">趋势</div>
            <div className="col-span-2">资格</div>
          </div>

          <div className="divide-y divide-gray-100">
            {currentStandings.map((team) => {
              const qualInfo = getQualificationInfo(team.rank);
              return (
                <div
                  key={team.rank}
                  className={`grid grid-cols-16 gap-2 px-4 py-3 items-center ${getRowClass(team.rank)} hover:bg-gray-50 transition-colors cursor-pointer`}
                >
                  <div className="col-span-1">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRankBadgeClass(team.rank)}`}>
                      {team.rank}
                    </span>
                  </div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        {team.team.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{team.team}</span>
                    </div>
                  </div>
                  <div className="col-span-1 text-center text-gray-600 text-sm">{team.played}</div>
                  <div className="col-span-1 text-center text-green-600 text-sm font-medium">{team.win}</div>
                  <div className="col-span-1 text-center text-gray-600 text-sm">{team.draw}</div>
                  <div className="col-span-1 text-center text-red-600 text-sm">{team.lose}</div>
                  <div className="col-span-1 text-center text-gray-600 text-sm">{team.goalsFor}</div>
                  <div className="col-span-1 text-center text-gray-600 text-sm">{team.goalsAgainst}</div>
                  <div className={`col-span-1 text-center text-sm font-medium ${team.gd >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {team.gd >= 0 ? '+' : ''}{team.gd}
                  </div>
                  <div className="col-span-1 text-center text-lg font-bold text-gray-900">{team.points}</div>
                  <div className="col-span-1 text-center">{getTrendIcon(team.trend)}</div>
                  <div className="col-span-2">
                    {qualInfo && (
                      <span className={`text-xs font-medium ${qualInfo.color}`}>
                        {qualInfo.text}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚽ 进攻排名</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 font-bold">1.</span>
                  <span className="font-medium text-gray-900">{attackStats[0]?.team}</span>
                </div>
                <span className="text-green-600 font-bold">{attackStats[0]?.goalsFor}球</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 font-bold">2.</span>
                  <span className="font-medium text-gray-900">{attackStats[1]?.team}</span>
                </div>
                <span className="text-green-600 font-bold">{attackStats[1]?.goalsFor}球</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 font-bold">3.</span>
                  <span className="font-medium text-gray-900">{attackStats[2]?.team}</span>
                </div>
                <span className="text-green-600 font-bold">{attackStats[2]?.goalsFor}球</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🛡️ 防守排名</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span className="font-medium text-gray-900">{defenseStats[0]?.team}</span>
                </div>
                <span className="text-blue-600 font-bold">失{defenseStats[0]?.goalsAgainst}球</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span className="font-medium text-gray-900">{defenseStats[1]?.team}</span>
                </div>
                <span className="text-blue-600 font-bold">失{defenseStats[1]?.goalsAgainst}球</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span className="font-medium text-gray-900">{defenseStats[2]?.team}</span>
                </div>
                <span className="text-blue-600 font-bold">失{defenseStats[2]?.goalsAgainst}球</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📉 进攻最差</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-red-600 font-bold">1.</span>
                  <span className="font-medium text-gray-900">{attackStats[attackStats.length - 1]?.team}</span>
                </div>
                <span className="text-red-600 font-bold">{attackStats[attackStats.length - 1]?.goalsFor}球</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-red-600 font-bold">2.</span>
                  <span className="font-medium text-gray-900">{attackStats[attackStats.length - 2]?.team}</span>
                </div>
                <span className="text-red-600 font-bold">{attackStats[attackStats.length - 2]?.goalsFor}球</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-red-600 font-bold">3.</span>
                  <span className="font-medium text-gray-900">{attackStats[attackStats.length - 3]?.team}</span>
                </div>
                <span className="text-red-600 font-bold">{attackStats[attackStats.length - 3]?.goalsFor}球</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💔 防守最差</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-orange-600 font-bold">1.</span>
                  <span className="font-medium text-gray-900">{defenseStats[defenseStats.length - 1]?.team}</span>
                </div>
                <span className="text-orange-600 font-bold">失{defenseStats[defenseStats.length - 1]?.goalsAgainst}球</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-orange-600 font-bold">2.</span>
                  <span className="font-medium text-gray-900">{defenseStats[defenseStats.length - 2]?.team}</span>
                </div>
                <span className="text-orange-600 font-bold">失{defenseStats[defenseStats.length - 2]?.goalsAgainst}球</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-orange-600 font-bold">3.</span>
                  <span className="font-medium text-gray-900">{defenseStats[defenseStats.length - 3]?.team}</span>
                </div>
                <span className="text-orange-600 font-bold">失{defenseStats[defenseStats.length - 3]?.goalsAgainst}球</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 联赛规则</h3>
          <p className="text-gray-600 leading-relaxed">
            {leagueRules[activeLeague]}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
