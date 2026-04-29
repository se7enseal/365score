import Header from '../../components/Header';
import Footer from '../../components/Footer';

const newsData = [
  { id: 1, title: '哈兰德本赛季已进36球，打破英超单赛季进球纪录', category: '英超', time: '2小时前', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Erling%20Haaland%20celebrating%20goal%20Manchester%20City%20football&image_size=landscape_16_9', summary: '曼城前锋哈兰德在本轮比赛中梅开二度，将本赛季联赛进球数提升至36球，打破了安迪·科尔和阿兰·希勒共同保持的英超单赛季进球纪录。' },
  { id: 2, title: '皇马宣布签下贝林厄姆，转会费达1.2亿欧元', category: '西甲', time: '5小时前', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Jude%20Bellingham%20Real%20Madrid%20presentation%20football&image_size=landscape_16_9', summary: '皇家马德里官方宣布签下多特蒙德中场贝林厄姆，双方签约6年，转会费总计1.2亿欧元，这是今夏足坛最重磅的转会之一。' },
  { id: 3, title: '利物浦确认克洛普赛季末离任', category: '英超', time: '8小时前', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Jurgen%20Klopp%20Liverpool%20manager%20press%20conference&image_size=landscape_16_9', summary: '利物浦官方确认，主教练克洛普将在本赛季结束后离任。克洛普自2015年执教利物浦以来，带领球队赢得了欧冠、英超等多项冠军。' },
  { id: 4, title: 'AC米兰重返欧冠四强', category: '欧冠', time: '昨天', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=AC%20Milan%20Champions%20League%20celebration%20football&image_size=landscape_16_9', summary: 'AC米兰在欧冠四分之一决赛中淘汰那不勒斯，时隔16年再次晋级欧冠四强。红黑军团将在半决赛中对阵国际米兰，上演米兰德比。' },
  { id: 5, title: '姆巴佩确认将离开巴黎圣日耳曼', category: '法甲', time: '昨天', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Kylian%20Mbappe%20Paris%20Saint%20Germain%20football&image_size=landscape_16_9', summary: '法国球星姆巴佩在社交媒体上确认，他将在本赛季结束后离开巴黎圣日耳曼。皇马被认为是这位世界杯冠军的最热门下家。' },
  { id: 6, title: '阿森纳豪砸1亿签下赖斯', category: '英超', time: '2天前', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Declan%20Rice%20Arsenal%20signing%20football&image_size=landscape_16_9', summary: '阿森纳官方宣布签下西汉姆联中场赖斯，转会费高达1.05亿英镑，创造了阿森纳队史转会纪录。赖斯将成为枪手重建的核心球员。' },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-xl p-6 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">📰 足球资讯</h1>
          <p className="text-sm opacity-80">最新足球新闻和赛事报道</p>
        </div>

        <div className="space-y-6">
          {newsData.map((news) => (
            <div 
              key={news.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">{news.category}</span>
                    <span className="text-gray-400 text-xs">{news.time}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{news.title}</h2>
                  <p className="text-gray-600 text-sm">{news.summary}</p>
                  <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    阅读全文 →
                  </button>
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
