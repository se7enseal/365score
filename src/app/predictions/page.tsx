'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const predictions = [
  { id: 1, home: '曼城', away: '阿森纳', homeScore: 3, awayScore: 1, league: '英超', date: '2024-04-29', time: '20:30', prediction: '曼城胜', confidence: 72, odds: { home: 1.65, draw: 3.80, away: 5.20 }, status: 'UPCOMING' },
  { id: 2, home: '利物浦', away: '曼联', homeScore: 2, awayScore: 2, league: '英超', date: '2024-04-30', time: '03:00', prediction: '平局', confidence: 55, odds: { home: 2.20, draw: 3.20, away: 3.40 }, status: 'UPCOMING' },
  { id: 3, home: '皇家马德里', away: '巴塞罗那', homeScore: 2, awayScore: 1, league: '西甲', date: '2024-05-01', time: '02:00', prediction: '皇马胜', confidence: 68, odds: { home: 1.85, draw: 3.40, away: 4.20 }, status: 'UPCOMING' },
  { id: 4, home: '拜仁慕尼黑', away: '多特蒙德', homeScore: 4, awayScore: 2, league: '德甲', date: '2024-04-28', time: '21:30', prediction: '拜仁胜', confidence: 75, odds: { home: 1.55, draw: 4.00, away: 6.00 }, status: 'FINISHED' },
  { id: 5, home: '巴黎圣日耳曼', away: '马赛', homeScore: 2, awayScore: 0, league: '法甲', date: '2024-04-28', time: '22:00', prediction: '巴黎胜', confidence: 65, odds: { home: 1.45, draw: 4.50, away: 7.00 }, status: 'FINISHED' },
  { id: 6, home: 'AC米兰', away: '尤文图斯', homeScore: 1, awayScore: 1, league: '意甲', date: '2024-04-29', time: '02:45', prediction: '平局', confidence: 52, odds: { home: 2.30, draw: 3.10, away: 3.30 }, status: 'LIVE' },
];

export default function PredictionsPage() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回上一页
        </button>
        
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">🤖 AI预测</h1>
          <p className="text-sm opacity-80">基于大数据分析的比赛结果预测</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {predictions.map((match) => (
            <div 
              key={match.id}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
                match.status === 'LIVE' ? 'ring-2 ring-red-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{match.league}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  match.status === 'LIVE' ? 'bg-red-100 text-red-700' :
                  match.status === 'FINISHED' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {match.status === 'LIVE' ? '直播中' : match.status === 'FINISHED' ? '已结束' : '即将开始'}
                </span>
              </div>

              <div className="flex items-center justify-center gap-8 mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-2xl font-bold text-blue-600">{match.home.charAt(0)}</span>
                  </div>
                  <div className="font-semibold text-gray-900">{match.home}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2 text-3xl font-bold">
                    <span>{match.homeScore}</span>
                    <span className="text-gray-400"> - </span>
                    <span>{match.awayScore}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{match.date} {match.time}</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-2xl font-bold text-red-600">{match.away.charAt(0)}</span>
                  </div>
                  <div className="font-semibold text-gray-900">{match.away}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">AI预测</span>
                  <span className={`font-bold ${
                    match.prediction.includes('胜') ? 'text-green-600' :
                    match.prediction === '平局' ? 'text-gray-600' : 'text-red-600'
                  }`}>{match.prediction}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>置信度</span>
                    <span>{match.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        match.confidence > 60 ? 'bg-green-500' : 
                        match.confidence > 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${match.confidence}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-center bg-blue-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">主胜</div>
                  <div className="font-bold text-blue-600">{match.odds.home.toFixed(2)}</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">平局</div>
                  <div className="font-bold text-gray-600">{match.odds.draw.toFixed(2)}</div>
                </div>
                <div className="text-center bg-red-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">客胜</div>
                  <div className="font-bold text-red-600">{match.odds.away.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
