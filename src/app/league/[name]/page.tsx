import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export async function generateStaticParams() {
  const leagues = ['英超', '西甲', '意甲', '德甲', '法甲', '欧冠', '欧罗巴', '欧协联', '足总杯', '国王杯', '德国杯', '意大利杯'];
  return leagues.map((name) => ({ name }));
}

const leagueData: Record<string, {
  name: string;
  country: string;
  founded: string;
  teams: number;
  description: string;
  champions: Array<{ year: string; team: string }>;
  topScorers: Array<{ name: string; team: string; goals: number; assists: number }>;
  standings: Array<{ rank: number; team: string; played: number; win: number; draw: number; lose: number; goalsFor: number; goalsAgainst: number; gd: number; points: number }>;
  teamsList: Array<{ name: string; founded: string; stadium: string; capacity: number; coach: string }>;
  rules: string;
}> = {
  '英超': {
    name: '英格兰足球超级联赛',
    country: '英格兰',
    founded: '1992年',
    teams: 20,
    description: '英格兰足球超级联赛（简称英超）是英格兰足球总会属下的最高等级职业足球联赛，成立于1992年，是欧洲五大联赛之一。英超以其快节奏、高对抗和全球广泛的影响力而闻名。英超联赛拥有曼联、利物浦、阿森纳、切尔西、曼城等世界顶级豪门俱乐部。',
    champions: [
      { year: '2023-24', team: '曼城' },
      { year: '2022-23', team: '曼城' },
      { year: '2021-22', team: '曼城' },
      { year: '2020-21', team: '曼城' },
      { year: '2019-20', team: '利物浦' },
    ],
    topScorers: [
      { name: '哈兰德', team: '曼城', goals: 36, assists: 8 },
      { name: '萨拉赫', team: '利物浦', goals: 24, assists: 12 },
      { name: '凯恩', team: '热刺', goals: 22, assists: 10 },
      { name: 'Saka', team: '阿森纳', goals: 15, assists: 14 },
      { name: '孙兴慜', team: '热刺', goals: 20, assists: 7 },
    ],
    standings: [
      { rank: 1, team: '曼城', played: 34, win: 28, draw: 5, lose: 1, goalsFor: 95, goalsAgainst: 23, gd: 72, points: 89 },
      { rank: 2, team: '阿森纳', played: 34, win: 25, draw: 7, lose: 2, goalsFor: 86, goalsAgainst: 25, gd: 61, points: 82 },
      { rank: 3, team: '利物浦', played: 34, win: 24, draw: 6, lose: 4, goalsFor: 84, goalsAgainst: 26, gd: 58, points: 78 },
      { rank: 4, team: '热刺', played: 34, win: 22, draw: 6, lose: 6, goalsFor: 65, goalsAgainst: 25, gd: 40, points: 72 },
      { rank: 5, team: '曼联', played: 34, win: 20, draw: 8, lose: 6, goalsFor: 58, goalsAgainst: 23, gd: 35, points: 68 },
      { rank: 6, team: '纽卡斯尔', played: 34, win: 18, draw: 8, lose: 8, goalsFor: 60, goalsAgainst: 38, gd: 22, points: 62 },
      { rank: 7, team: '布莱顿', played: 34, win: 18, draw: 7, lose: 9, goalsFor: 55, goalsAgainst: 42, gd: 13, points: 61 },
      { rank: 8, team: '阿斯顿维拉', played: 34, win: 17, draw: 8, lose: 9, goalsFor: 51, goalsAgainst: 46, gd: 5, points: 59 },
      { rank: 9, team: '切尔西', played: 34, win: 16, draw: 9, lose: 9, goalsFor: 52, goalsAgainst: 41, gd: 11, points: 57 },
      { rank: 10, team: '利物浦', played: 34, win: 14, draw: 10, lose: 10, goalsFor: 45, goalsAgainst: 42, gd: 3, points: 52 },
      { rank: 11, team: '水晶宫', played: 34, win: 11, draw: 12, lose: 11, goalsFor: 40, goalsAgainst: 45, gd: -5, points: 45 },
      { rank: 12, team: '西汉姆', played: 34, win: 11, draw: 11, lose: 12, goalsFor: 42, goalsAgainst: 46, gd: -4, points: 44 },
      { rank: 13, team: '布伦特福德', played: 34, win: 11, draw: 10, lose: 13, goalsFor: 43, goalsAgainst: 53, gd: -10, points: 43 },
      { rank: 14, team: '富勒姆', played: 34, win: 10, draw: 11, lose: 13, goalsFor: 50, goalsAgainst: 61, gd: -11, points: 41 },
      { rank: 15, team: '狼队', played: 34, win: 10, draw: 10, lose: 14, goalsFor: 35, goalsAgainst: 51, gd: -16, points: 40 },
      { rank: 16, team: '伯恩茅斯', played: 34, win: 10, draw: 9, lose: 15, goalsFor: 40, goalsAgainst: 56, gd: -16, points: 39 },
      { rank: 17, team: '埃弗顿', played: 34, win: 10, draw: 8, lose: 16, goalsFor: 34, goalsAgainst: 57, gd: -23, points: 38 },
      { rank: 18, team: '诺丁汉森林', played: 34, win: 9, draw: 11, lose: 14, goalsFor: 41, goalsAgainst: 60, gd: -19, points: 38 },
      { rank: 19, team: '南安普顿', played: 34, win: 6, draw: 10, lose: 18, goalsFor: 30, goalsAgainst: 58, gd: -28, points: 28 },
      { rank: 20, team: '莱斯特城', played: 34, win: 5, draw: 10, lose: 19, goalsFor: 31, goalsAgainst: 65, gd: -34, points: 25 },
    ],
    teamsList: [
      { name: '曼城', founded: '1880年', stadium: '伊蒂哈德球场', capacity: 53400, coach: '瓜迪奥拉' },
      { name: '阿森纳', founded: '1886年', stadium: '酋长球场', capacity: 60704, coach: '阿尔特塔' },
      { name: '利物浦', founded: '1892年', stadium: '安菲尔德球场', capacity: 61276, coach: '克洛普' },
      { name: '热刺', founded: '1882年', stadium: '热刺球场', capacity: 62062, coach: '波斯特科格鲁' },
      { name: '曼联', founded: '1878年', stadium: '老特拉福德', capacity: 74879, coach: '滕哈格' },
    ],
    rules: '英超联赛共有20支球队，每支球队需进行38场比赛（主客场各19场）。赛季结束后，积分榜前三名获得欧冠参赛资格，第四名获得欧冠附加赛资格，第五名获得欧联杯资格，第六名获得欧协联资格。积分榜最后三名降级至英冠联赛。',
  },
  '西甲': {
    name: '西班牙足球甲级联赛',
    country: '西班牙',
    founded: '1929年',
    teams: 20,
    description: '西班牙足球甲级联赛（简称西甲）是西班牙最高等级的职业足球联赛，成立于1929年。西甲以其技术流打法和巴塞罗那、皇家马德里等豪门俱乐部而闻名于世。西甲联赛培养了梅西、C罗等众多世界级球星。',
    champions: [
      { year: '2023-24', team: '皇家马德里' },
      { year: '2022-23', team: '巴塞罗那' },
      { year: '2021-22', team: '皇家马德里' },
      { year: '2020-21', team: '马德里竞技' },
      { year: '2019-20', team: '皇家马德里' },
    ],
    topScorers: [
      { name: '本泽马', team: '皇家马德里', goals: 28, assists: 5 },
      { name: '莱万多夫斯基', team: '巴塞罗那', goals: 23, assists: 6 },
      { name: '维尼修斯', team: '皇家马德里', goals: 18, assists: 13 },
      { name: '萨拉赫', team: '利物浦', goals: 24, assists: 12 },
      { name: '加维', team: '巴塞罗那', goals: 12, assists: 8 },
    ],
    standings: [
      { rank: 1, team: '皇马', played: 34, win: 26, draw: 5, lose: 3, goalsFor: 78, goalsAgainst: 23, gd: 55, points: 83 },
      { rank: 2, team: '巴萨', played: 34, win: 25, draw: 7, lose: 2, goalsFor: 74, goalsAgainst: 22, gd: 52, points: 82 },
      { rank: 3, team: '马竞', played: 34, win: 21, draw: 8, lose: 5, goalsFor: 58, goalsAgainst: 20, gd: 38, points: 71 },
      { rank: 4, team: '比利亚雷亚尔', played: 34, win: 18, draw: 8, lose: 8, goalsFor: 52, goalsAgainst: 32, gd: 20, points: 62 },
      { rank: 5, team: '塞维利亚', played: 34, win: 17, draw: 10, lose: 7, goalsFor: 48, goalsAgainst: 30, gd: 18, points: 61 },
      { rank: 6, team: '贝蒂斯', played: 34, win: 16, draw: 8, lose: 10, goalsFor: 48, goalsAgainst: 40, gd: 8, points: 56 },
      { rank: 7, team: '皇家社会', played: 34, win: 15, draw: 9, lose: 10, goalsFor: 42, goalsAgainst: 35, gd: 7, points: 54 },
      { rank: 8, team: '奥萨苏纳', played: 34, win: 14, draw: 10, lose: 10, goalsFor: 38, goalsAgainst: 35, gd: 3, points: 52 },
      { rank: 9, team: '瓦伦西亚', played: 34, win: 12, draw: 11, lose: 11, goalsFor: 40, goalsAgainst: 41, gd: -1, points: 47 },
      { rank: 10, team: '赫塔菲', played: 34, win: 12, draw: 8, lose: 14, goalsFor: 35, goalsAgainst: 43, gd: -8, points: 44 },
      { rank: 11, team: '毕尔巴鄂', played: 34, win: 11, draw: 10, lose: 13, goalsFor: 40, goalsAgainst: 43, gd: -3, points: 43 },
      { rank: 12, team: '阿尔梅里亚', played: 34, win: 11, draw: 9, lose: 14, goalsFor: 41, goalsAgainst: 53, gd: -12, points: 42 },
      { rank: 13, team: '赫罗纳', played: 34, win: 11, draw: 8, lose: 15, goalsFor: 42, goalsAgainst: 52, gd: -10, points: 41 },
      { rank: 14, team: '巴拉多利德', played: 34, win: 11, draw: 7, lose: 16, goalsFor: 35, goalsAgainst: 50, gd: -15, points: 40 },
      { rank: 15, team: '埃尔切', played: 34, win: 10, draw: 9, lose: 15, goalsFor: 32, goalsAgainst: 47, gd: -15, points: 39 },
      { rank: 16, team: '马洛卡', played: 34, win: 10, draw: 8, lose: 16, goalsFor: 30, goalsAgainst: 48, gd: -18, points: 38 },
      { rank: 17, team: '塞尔塔', played: 34, win: 9, draw: 10, lose: 15, goalsFor: 35, goalsAgainst: 49, gd: -14, points: 37 },
      { rank: 18, team: '加的斯', played: 34, win: 9, draw: 8, lose: 17, goalsFor: 28, goalsAgainst: 50, gd: -22, points: 35 },
      { rank: 19, team: '西班牙人', played: 34, win: 7, draw: 10, lose: 17, goalsFor: 31, goalsAgainst: 53, gd: -22, points: 31 },
      { rank: 20, team: '巴列卡诺', played: 34, win: 6, draw: 12, lose: 16, goalsFor: 32, goalsAgainst: 58, gd: -26, points: 30 },
    ],
    teamsList: [
      { name: '皇家马德里', founded: '1902年', stadium: '伯纳乌球场', capacity: 81044, coach: '安切洛蒂' },
      { name: '巴塞罗那', founded: '1899年', stadium: '诺坎普球场', capacity: 99354, coach: '哈维' },
      { name: '马德里竞技', founded: '1903年', stadium: '万达大都会', capacity: 68456, coach: '西蒙尼' },
      { name: '塞维利亚', founded: '1905年', stadium: '皮斯胡安球场', capacity: 43883, coach: '门迪利巴' },
      { name: '比利亚雷亚尔', founded: '1923年', stadium: '陶瓷球场', capacity: 23500, coach: '埃梅里' },
    ],
    rules: '西甲联赛共有20支球队，每支球队进行38场比赛。积分榜前三名获得欧冠资格，第四名获得欧冠附加赛资格，第五名获得欧联杯资格，第六名获得欧协联资格。最后三名降级至西乙联赛。',
  },
  '意甲': {
    name: '意大利足球甲级联赛',
    country: '意大利',
    founded: '1929年',
    teams: 20,
    description: '意大利足球甲级联赛（简称意甲）是意大利最高等级的职业足球联赛，成立于1929年。意甲以其出色的防守战术和AC米兰、尤文图斯等传统豪门而著称。意甲联赛曾被称为"小世界杯"，吸引了众多世界级球星。',
    champions: [
      { year: '2023-24', team: '那不勒斯' },
      { year: '2022-23', team: '那不勒斯' },
      { year: '2021-22', team: 'AC米兰' },
      { year: '2020-21', team: '国际米兰' },
      { year: '2019-20', team: '尤文图斯' },
    ],
    topScorers: [
      { name: '奥斯梅恩', team: '那不勒斯', goals: 26, assists: 4 },
      { name: '劳塔罗', team: '国际米兰', goals: 22, assists: 8 },
      { name: '吉鲁', team: 'AC米兰', goals: 17, assists: 5 },
      { name: '穆里尔', team: '亚特兰大', goals: 16, assists: 6 },
      { name: '贝拉尔迪', team: '萨索洛', goals: 15, assists: 8 },
    ],
    standings: [
      { rank: 1, team: '那不勒斯', played: 34, win: 28, draw: 4, lose: 2, goalsFor: 77, goalsAgainst: 27, gd: 50, points: 88 },
      { rank: 2, team: 'AC米兰', played: 34, win: 22, draw: 8, lose: 4, goalsFor: 64, goalsAgainst: 28, gd: 36, points: 74 },
      { rank: 3, team: '国际米兰', played: 34, win: 22, draw: 7, lose: 5, goalsFor: 67, goalsAgainst: 27, gd: 40, points: 73 },
      { rank: 4, team: '尤文图斯', played: 34, win: 21, draw: 8, lose: 5, goalsFor: 56, goalsAgainst: 21, gd: 35, points: 71 },
      { rank: 5, team: '罗马', played: 34, win: 18, draw: 9, lose: 7, goalsFor: 50, goalsAgainst: 25, gd: 25, points: 63 },
      { rank: 6, team: '拉齐奥', played: 34, win: 18, draw: 7, lose: 9, goalsFor: 59, goalsAgainst: 39, gd: 20, points: 61 },
      { rank: 7, team: '亚特兰大', played: 34, win: 17, draw: 9, lose: 8, goalsFor: 66, goalsAgainst: 40, gd: 26, points: 60 },
      { rank: 8, team: '佛罗伦萨', played: 34, win: 15, draw: 11, lose: 8, goalsFor: 53, goalsAgainst: 39, gd: 14, points: 56 },
      { rank: 9, team: '博洛尼亚', played: 34, win: 14, draw: 10, lose: 10, goalsFor: 45, goalsAgainst: 40, gd: 5, points: 52 },
      { rank: 10, team: '都灵', played: 34, win: 12, draw: 10, lose: 12, goalsFor: 40, goalsAgainst: 40, gd: 0, points: 46 },
      { rank: 11, team: '乌迪内斯', played: 34, win: 11, draw: 11, lose: 12, goalsFor: 44, goalsAgainst: 50, gd: -6, points: 44 },
      { rank: 12, team: '萨索洛', played: 34, win: 11, draw: 10, lose: 13, goalsFor: 47, goalsAgainst: 56, gd: -9, points: 43 },
      { rank: 13, team: '热那亚', played: 34, win: 11, draw: 9, lose: 14, goalsFor: 36, goalsAgainst: 47, gd: -11, points: 42 },
      { rank: 14, team: '维罗纳', played: 34, win: 10, draw: 10, lose: 14, goalsFor: 35, goalsAgainst: 45, gd: -10, points: 40 },
      { rank: 15, team: '恩波利', played: 34, win: 9, draw: 12, lose: 13, goalsFor: 36, goalsAgainst: 47, gd: -11, points: 39 },
      { rank: 16, team: '莱切', played: 34, win: 10, draw: 8, lose: 16, goalsFor: 38, goalsAgainst: 55, gd: -17, points: 38 },
      { rank: 17, team: '克雷莫纳', played: 34, win: 8, draw: 12, lose: 14, goalsFor: 34, goalsAgainst: 50, gd: -16, points: 36 },
      { rank: 18, team: '斯佩齐亚', played: 34, win: 7, draw: 11, lose: 16, goalsFor: 30, goalsAgainst: 52, gd: -22, points: 32 },
      { rank: 19, team: '桑普多利亚', played: 34, win: 6, draw: 10, lose: 18, goalsFor: 29, goalsAgainst: 55, gd: -26, points: 28 },
      { rank: 20, team: '威尼斯', played: 34, win: 5, draw: 9, lose: 20, goalsFor: 27, goalsAgainst: 61, gd: -34, points: 24 },
    ],
    teamsList: [
      { name: 'AC米兰', founded: '1899年', stadium: '圣西罗球场', capacity: 75923, coach: '皮奥利' },
      { name: '国际米兰', founded: '1908年', stadium: '梅阿查球场', capacity: 75923, coach: '小因扎吉' },
      { name: '尤文图斯', founded: '1897年', stadium: '安联球场', capacity: 41507, coach: '阿莱格里' },
      { name: '那不勒斯', founded: '1926年', stadium: '迭戈·阿曼多·马拉多纳球场', capacity: 54726, coach: '斯帕莱蒂' },
      { name: '罗马', founded: '1927年', stadium: '奥林匹克球场', capacity: 70634, coach: '穆里尼奥' },
    ],
    rules: '意甲联赛共有20支球队，每支球队进行38场比赛。积分榜前四名获得欧冠资格，第五名获得欧联杯资格，第六名获得欧协联资格。最后三名降级至意乙联赛。',
  },
  '德甲': {
    name: '德国足球甲级联赛',
    country: '德国',
    founded: '1963年',
    teams: 18,
    description: '德国足球甲级联赛（简称德甲）是德国最高等级的职业足球联赛，成立于1963年。德甲以其高效的进攻和拜仁慕尼黑的长期统治而闻名。德甲联赛培养了众多世界级球星和教练。',
    champions: [
      { year: '2023-24', team: '拜仁慕尼黑' },
      { year: '2022-23', team: '拜仁慕尼黑' },
      { year: '2021-22', team: '拜仁慕尼黑' },
      { year: '2020-21', team: '拜仁慕尼黑' },
      { year: '2019-20', team: '拜仁慕尼黑' },
    ],
    topScorers: [
      { name: '凯恩', team: '拜仁慕尼黑', goals: 32, assists: 7 },
      { name: '穆西亚拉', team: '拜仁慕尼黑', goals: 18, assists: 12 },
      { name: '菲尔克鲁格', team: '多特蒙德', goals: 16, assists: 5 },
      { name: '阿德耶米', team: '多特蒙德', goals: 15, assists: 8 },
      { name: '格里福', team: '弗赖堡', goals: 14, assists: 6 },
    ],
    standings: [
      { rank: 1, team: '拜仁', played: 34, win: 27, draw: 4, lose: 3, goalsFor: 92, goalsAgainst: 24, gd: 68, points: 85 },
      { rank: 2, team: '多特', played: 34, win: 24, draw: 5, lose: 5, goalsFor: 81, goalsAgainst: 33, gd: 48, points: 77 },
      { rank: 3, team: '莱比锡', played: 34, win: 20, draw: 8, lose: 6, goalsFor: 68, goalsAgainst: 33, gd: 35, points: 68 },
      { rank: 4, team: '勒沃库森', played: 34, win: 19, draw: 8, lose: 7, goalsFor: 64, goalsAgainst: 36, gd: 28, points: 65 },
      { rank: 5, team: '门兴', played: 34, win: 16, draw: 10, lose: 8, goalsFor: 54, goalsAgainst: 39, gd: 15, points: 58 },
      { rank: 6, team: '法兰克福', played: 34, win: 16, draw: 8, lose: 10, goalsFor: 58, goalsAgainst: 45, gd: 13, points: 56 },
      { rank: 7, team: '科隆', played: 34, win: 14, draw: 11, lose: 9, goalsFor: 52, goalsAgainst: 44, gd: 8, points: 53 },
      { rank: 8, team: '沃尔夫斯堡', played: 34, win: 14, draw: 10, lose: 10, goalsFor: 50, goalsAgainst: 46, gd: 4, points: 52 },
      { rank: 9, team: '柏林联合', played: 34, win: 13, draw: 10, lose: 11, goalsFor: 46, goalsAgainst: 41, gd: 5, points: 49 },
      { rank: 10, team: '弗赖堡', played: 34, win: 12, draw: 11, lose: 11, goalsFor: 47, goalsAgainst: 42, gd: 5, points: 47 },
      { rank: 11, team: '霍芬海姆', played: 34, win: 11, draw: 13, lose: 10, goalsFor: 53, goalsAgainst: 47, gd: 6, points: 46 },
      { rank: 12, team: '奥格斯堡', played: 34, win: 11, draw: 10, lose: 13, goalsFor: 42, goalsAgainst: 50, gd: -8, points: 43 },
      { rank: 13, team: '美因茨', played: 34, win: 10, draw: 11, lose: 13, goalsFor: 41, goalsAgainst: 51, gd: -10, points: 41 },
      { rank: 14, team: '斯图加特', played: 34, win: 9, draw: 12, lose: 13, goalsFor: 43, goalsAgainst: 52, gd: -9, points: 39 },
      { rank: 15, team: '波鸿', played: 34, win: 9, draw: 10, lose: 15, goalsFor: 38, goalsAgainst: 56, gd: -18, points: 37 },
      { rank: 16, team: '达姆施塔特', played: 34, win: 8, draw: 9, lose: 17, goalsFor: 35, goalsAgainst: 62, gd: -27, points: 33 },
      { rank: 17, team: '沙尔克04', played: 34, win: 7, draw: 8, lose: 19, goalsFor: 31, goalsAgainst: 66, gd: -35, points: 29 },
      { rank: 18, team: '柏林赫塔', played: 34, win: 5, draw: 10, lose: 19, goalsFor: 29, goalsAgainst: 64, gd: -35, points: 25 },
    ],
    teamsList: [
      { name: '拜仁慕尼黑', founded: '1900年', stadium: '安联球场', capacity: 75000, coach: '图赫尔' },
      { name: '多特蒙德', founded: '1909年', stadium: ' Signal Iduna Park', capacity: 81365, coach: '泰尔齐奇' },
      { name: 'RB莱比锡', founded: '2009年', stadium: '红牛竞技场', capacity: 42558, coach: '罗斯' },
      { name: '勒沃库森', founded: '1904年', stadium: '拜耳竞技场', capacity: 30210, coach: '哈维·阿隆索' },
      { name: '门兴格拉德巴赫', founded: '1900年', stadium: '普鲁士公园球场', capacity: 54057, coach: '法尔克' },
    ],
    rules: '德甲联赛共有18支球队，每支球队进行34场比赛。积分榜前三名获得欧冠资格，第四名获得欧冠附加赛资格，第五名获得欧联杯资格，第六名获得欧协联资格。最后两名直接降级，第16名与德乙第三名进行升降级附加赛。',
  },
  '法甲': {
    name: '法国足球甲级联赛',
    country: '法国',
    founded: '1932年',
    teams: 20,
    description: '法国足球甲级联赛（简称法甲）是法国最高等级的职业足球联赛，成立于1932年。法甲以巴黎圣日耳曼的统治和培养年轻天才球员而闻名。法甲联赛培养了姆巴佩、本泽马等众多球星。',
    champions: [
      { year: '2023-24', team: '巴黎圣日耳曼' },
      { year: '2022-23', team: '巴黎圣日耳曼' },
      { year: '2021-22', team: '巴黎圣日耳曼' },
      { year: '2020-21', team: '里尔' },
      { year: '2019-20', team: '巴黎圣日耳曼' },
    ],
    topScorers: [
      { name: '姆巴佩', team: '巴黎圣日耳曼', goals: 30, assists: 12 },
      { name: '哈莫马', team: '兰斯', goals: 18, assists: 7 },
      { name: '本耶德尔', team: '摩纳哥', goals: 16, assists: 6 },
      { name: '马丁内利', team: '阿森纳', goals: 15, assists: 7 },
      { name: '戴维', team: '里尔', goals: 14, assists: 5 },
    ],
    standings: [
      { rank: 1, team: '巴黎', played: 34, win: 27, draw: 4, lose: 3, goalsFor: 86, goalsAgainst: 28, gd: 58, points: 85 },
      { rank: 2, team: '马赛', played: 34, win: 22, draw: 7, lose: 5, goalsFor: 62, goalsAgainst: 30, gd: 32, points: 73 },
      { rank: 3, team: '里昂', played: 34, win: 20, draw: 6, lose: 8, goalsFor: 58, goalsAgainst: 30, gd: 28, points: 66 },
      { rank: 4, team: '摩纳哥', played: 34, win: 18, draw: 10, lose: 6, goalsFor: 58, goalsAgainst: 33, gd: 25, points: 64 },
      { rank: 5, team: '雷恩', played: 34, win: 17, draw: 8, lose: 9, goalsFor: 52, goalsAgainst: 37, gd: 15, points: 59 },
      { rank: 6, team: '尼斯', played: 34, win: 16, draw: 10, lose: 8, goalsFor: 52, goalsAgainst: 38, gd: 14, points: 58 },
      { rank: 7, team: '里尔', played: 34, win: 15, draw: 9, lose: 10, goalsFor: 51, goalsAgainst: 44, gd: 7, points: 54 },
      { rank: 8, team: '朗斯', played: 34, win: 14, draw: 11, lose: 9, goalsFor: 45, goalsAgainst: 38, gd: 7, points: 53 },
      { rank: 9, team: '斯特拉斯堡', played: 34, win: 13, draw: 10, lose: 11, goalsFor: 42, goalsAgainst: 40, gd: 2, points: 49 },
      { rank: 10, team: '洛里昂', played: 34, win: 12, draw: 10, lose: 12, goalsFor: 44, goalsAgainst: 44, gd: 0, points: 46 },
      { rank: 11, team: '南特', played: 34, win: 11, draw: 11, lose: 12, goalsFor: 36, goalsAgainst: 41, gd: -5, points: 44 },
      { rank: 12, team: '布雷斯特', played: 34, win: 11, draw: 10, lose: 13, goalsFor: 40, goalsAgainst: 45, gd: -5, points: 43 },
      { rank: 13, team: '蒙彼利埃', played: 34, win: 10, draw: 12, lose: 12, goalsFor: 42, goalsAgainst: 49, gd: -7, points: 42 },
      { rank: 14, team: '兰斯', played: 34, win: 10, draw: 11, lose: 13, goalsFor: 38, goalsAgainst: 48, gd: -10, points: 41 },
      { rank: 15, team: '克莱蒙', played: 34, win: 10, draw: 9, lose: 15, goalsFor: 35, goalsAgainst: 51, gd: -16, points: 39 },
      { rank: 16, team: '图卢兹', played: 34, win: 9, draw: 11, lose: 14, goalsFor: 37, goalsAgainst: 48, gd: -11, points: 38 },
      { rank: 17, team: '昂热', played: 34, win: 8, draw: 11, lose: 15, goalsFor: 32, goalsAgainst: 50, gd: -18, points: 35 },
      { rank: 18, team: '欧塞尔', played: 34, win: 7, draw: 10, lose: 17, goalsFor: 29, goalsAgainst: 52, gd: -23, points: 31 },
      { rank: 19, team: '特鲁瓦', played: 34, win: 6, draw: 9, lose: 19, goalsFor: 28, goalsAgainst: 56, gd: -28, points: 27 },
      { rank: 20, team: '阿雅克肖', played: 34, win: 5, draw: 8, lose: 21, goalsFor: 22, goalsAgainst: 61, gd: -39, points: 23 },
    ],
    teamsList: [
      { name: '巴黎圣日耳曼', founded: '1970年', stadium: '王子公园球场', capacity: 47929, coach: '恩里克' },
      { name: '马赛', founded: '1899年', stadium: '韦洛德罗姆球场', capacity: 67394, coach: '图多尔' },
      { name: '里昂', founded: '1950年', stadium: '奥林匹克里昂球场', capacity: 59186, coach: '加西亚' },
      { name: '摩纳哥', founded: '1924年', stadium: '路易二世球场', capacity: 18523, coach: '科瓦奇' },
      { name: '里尔', founded: '1944年', stadium: '皮埃尔·莫鲁瓦球场', capacity: 50186, coach: '丰塞卡' },
    ],
    rules: '法甲联赛共有20支球队，每支球队进行38场比赛。积分榜前三名获得欧冠资格，第四名获得欧冠附加赛资格，第五名获得欧联杯资格，第六名获得欧协联资格。最后两名直接降级，第18名与法乙第三名进行升降级附加赛。',
  },
  '欧冠': {
    name: '欧洲冠军联赛',
    country: '欧洲',
    founded: '1955年',
    teams: 32,
    description: '欧洲冠军联赛（简称欧冠）是欧洲足球协会联盟主办的年度足球俱乐部赛事，成立于1955年，是欧洲俱乐部足球最高荣誉和最具影响力的赛事。欧冠联赛汇聚了欧洲各大联赛的顶级豪门。',
    champions: [
      { year: '2023-24', team: '皇家马德里' },
      { year: '2022-23', team: '曼城' },
      { year: '2021-22', team: '皇家马德里' },
      { year: '2020-21', team: '切尔西' },
      { year: '2019-20', team: '拜仁慕尼黑' },
    ],
    topScorers: [
      { name: '姆巴佩', team: '巴黎圣日耳曼', goals: 12, assists: 4 },
      { name: '哈兰德', team: '曼城', goals: 10, assists: 3 },
      { name: '维尼修斯', team: '皇家马德里', goals: 8, assists: 5 },
      { name: '萨拉赫', team: '利物浦', goals: 7, assists: 4 },
      { name: '莱万多夫斯基', team: '巴塞罗那', goals: 7, assists: 2 },
    ],
    standings: [],
    teamsList: [],
    rules: '欧冠联赛共有32支球队进入小组赛阶段，分为8个小组，每组4支球队进行双循环比赛。小组前两名晋级淘汰赛阶段，淘汰赛采用主客场两回合制。决赛为单场决胜，在中立场地进行。',
  },
  '欧罗巴': {
    name: '欧足联欧洲联赛',
    country: '欧洲',
    founded: '1971年',
    teams: 32,
    description: '欧足联欧洲联赛（简称欧联杯）是欧洲足球协会联盟主办的仅次于欧冠的俱乐部赛事，成立于1971年，为欧洲各大联赛的中游球队提供了欧洲赛场的机会。',
    champions: [
      { year: '2023-24', team: '塞维利亚' },
      { year: '2022-23', team: '塞维利亚' },
      { year: '2021-22', team: '法兰克福' },
      { year: '2020-21', team: '比利亚雷亚尔' },
      { year: '2019-20', team: '塞维利亚' },
    ],
    topScorers: [
      { name: '拉卡泽特', team: '里昂', goals: 8, assists: 3 },
      { name: '奥尔莫', team: '莱比锡', goals: 7, assists: 4 },
      { name: '萨拉维亚', team: '巴黎圣日耳曼', goals: 6, assists: 2 },
      { name: '伊萨克', team: '纽卡斯尔', goals: 6, assists: 1 },
      { name: '索博斯洛伊', team: '利物浦', goals: 5, assists: 3 },
    ],
    standings: [],
    teamsList: [],
    rules: '欧联杯联赛共有32支球队进入小组赛阶段，分为8个小组，每组4支球队进行双循环比赛。小组前两名晋级淘汰赛阶段，淘汰赛采用主客场两回合制。决赛为单场决胜，在中立场地进行。',
  },
  '欧协联': {
    name: '欧足联欧洲协会联赛',
    country: '欧洲',
    founded: '2021年',
    teams: 32,
    description: '欧足联欧洲协会联赛（简称欧协联）是欧洲足球协会联盟主办的第三级欧洲俱乐部赛事，成立于2021年，为更多欧洲俱乐部提供了参加欧洲赛事的机会。欧协联冠军可获得下赛季欧联杯资格。',
    champions: [
      { year: '2023-24', team: '阿斯顿维拉' },
      { year: '2022-23', team: '西汉姆联' },
      { year: '2021-22', team: '罗马' },
    ],
    topScorers: [
      { name: '沃特金斯', team: '阿斯顿维拉', goals: 11, assists: 3 },
      { name: '安东尼奥', team: '西汉姆联', goals: 9, assists: 2 },
      { name: '佩德罗', team: '罗马', goals: 8, assists: 4 },
      { name: '亚伯拉罕', team: '罗马', goals: 7, assists: 2 },
      { name: '帕耶', team: '马赛', goals: 6, assists: 3 },
    ],
    standings: [],
    teamsList: [],
    rules: '欧协联共有32支球队进入小组赛阶段，分为8个小组，每组4支球队进行双循环比赛。小组第一和三个成绩最好的小组第二晋级淘汰赛阶段。淘汰赛采用主客场两回合制，决赛为单场决胜。',
  },
  '足总杯': {
    name: '英格兰足总杯',
    country: '英格兰',
    founded: '1871年',
    teams: 64,
    description: '英格兰足总杯是世界上最古老的足球杯赛，成立于1871年。足总杯面向英格兰各级别联赛的俱乐部开放，是英格兰足球最重要的杯赛之一。',
    champions: [
      { year: '2023-24', team: '曼城' },
      { year: '2022-23', team: '曼城' },
      { year: '2021-22', team: '利物浦' },
      { year: '2020-21', team: '莱斯特城' },
      { year: '2019-20', team: '阿森纳' },
    ],
    topScorers: [
      { name: '哈兰德', team: '曼城', goals: 8, assists: 2 },
      { name: '萨拉赫', team: '利物浦', goals: 6, assists: 3 },
      { name: '萨卡', team: '阿森纳', goals: 5, assists: 2 },
      { name: '凯恩', team: '热刺', goals: 5, assists: 1 },
      { name: '马内', team: '利物浦', goals: 4, assists: 2 },
    ],
    standings: [],
    teamsList: [],
    rules: '足总杯采用单场淘汰制，共分为八轮。前两轮为资格赛，第三轮到第六轮为主客场抽签决定，半决赛在温布利球场进行，决赛也在温布利球场举行。冠军获得下赛季欧联杯资格。',
  },
  '国王杯': {
    name: '西班牙国王杯',
    country: '西班牙',
    founded: '1902年',
    teams: 82,
    description: '西班牙国王杯是西班牙足球最重要的杯赛之一，成立于1902年。国王杯面向西班牙各级别联赛的俱乐部开放，是西班牙足球传统赛事。',
    champions: [
      { year: '2023-24', team: '巴塞罗那' },
      { year: '2022-23', team: '巴塞罗那' },
      { year: '2021-22', team: '皇家贝蒂斯' },
      { year: '2020-21', team: '巴塞罗那' },
      { year: '2019-20', team: '皇家社会' },
    ],
    topScorers: [
      { name: '莱万多夫斯基', team: '巴塞罗那', goals: 7, assists: 2 },
      { name: '本泽马', team: '皇家马德里', goals: 6, assists: 3 },
      { name: '维尼修斯', team: '皇家马德里', goals: 5, assists: 2 },
      { name: '费兰·托雷斯', team: '巴塞罗那', goals: 5, assists: 1 },
      { name: '伊格莱西亚斯', team: '贝蒂斯', goals: 4, assists: 2 },
    ],
    standings: [],
    teamsList: [],
    rules: '国王杯采用单场淘汰制，低级别球队享有主场优势。半决赛为两回合制，决赛为单场决胜。冠军获得下赛季欧联杯资格。',
  },
  '德国杯': {
    name: '德国杯',
    country: '德国',
    founded: '1952年',
    teams: 64,
    description: '德国杯是德国足球最重要的杯赛，成立于1952年。德国杯面向德国各级别联赛的俱乐部开放，是德国足球传统赛事。',
    champions: [
      { year: '2023-24', team: '勒沃库森' },
      { year: '2022-23', team: '莱比锡' },
      { year: '2021-22', team: '莱比锡' },
      { year: '2020-21', team: '多特蒙德' },
      { year: '2019-20', team: '拜仁慕尼黑' },
    ],
    topScorers: [
      { name: '维尔茨', team: '勒沃库森', goals: 6, assists: 3 },
      { name: '恩昆库', team: '莱比锡', goals: 5, assists: 2 },
      { name: '穆勒', team: '拜仁慕尼黑', goals: 5, assists: 4 },
      { name: '哈兰德', team: '多特蒙德', goals: 4, assists: 1 },
      { name: '希克', team: '勒沃库森', goals: 4, assists: 2 },
    ],
    standings: [],
    teamsList: [],
    rules: '德国杯采用单场淘汰制，低级别球队享有主场优势。决赛在柏林奥林匹克球场举行。冠军获得下赛季欧联杯资格。',
  },
  '意大利杯': {
    name: '意大利杯',
    country: '意大利',
    founded: '1922年',
    teams: 44,
    description: '意大利杯是意大利足球最重要的杯赛，成立于1922年。意大利杯面向意大利各级别联赛的俱乐部开放，是意大利足球传统赛事。',
    champions: [
      { year: '2023-24', team: '国际米兰' },
      { year: '2022-23', team: '国际米兰' },
      { year: '2021-22', team: '佛罗伦萨' },
      { year: '2020-21', team: '那不勒斯' },
      { year: '2019-20', team: '那不勒斯' },
    ],
    topScorers: [
      { name: '劳塔罗', team: '国际米兰', goals: 7, assists: 2 },
      { name: '奥斯梅恩', team: '那不勒斯', goals: 6, assists: 1 },
      { name: '弗拉霍维奇', team: '尤文图斯', goals: 5, assists: 2 },
      { name: '吉鲁', team: 'AC米兰', goals: 5, assists: 1 },
      { name: '贝拉尔迪', team: '萨索洛', goals: 4, assists: 3 },
    ],
    standings: [],
    teamsList: [],
    rules: '意大利杯采用单场淘汰制，部分轮次为两回合制。决赛在罗马奥林匹克球场举行。冠军获得下赛季欧联杯资格。',
  },
};

export default function LeaguePage({ params }: { params: { name: string } }) {
  const league = leagueData[params.name] || {
    name: params.name,
    country: '未知',
    founded: '未知',
    teams: 0,
    description: '暂无详细信息',
    champions: [],
    topScorers: [],
    standings: [],
    teamsList: [],
    rules: '',
  };

  const attackRanking = league.standings.length > 0 
    ? [...league.standings].sort((a, b) => b.goalsFor - a.goalsFor).slice(0, 3)
    : [];
  const defenseRanking = league.standings.length > 0
    ? [...league.standings].sort((a, b) => a.goalsAgainst - b.goalsAgainst).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">{league.name}</h1>
          <div className="flex items-center gap-4 text-sm opacity-80">
            <span>🏆 {league.country}</span>
            <span>📅 成立于 {league.founded}</span>
            <span>👥 {league.teams} 支球队</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">联赛介绍</h2>
              <p className="text-gray-600 leading-relaxed">{league.description}</p>
            </div>

            {league.standings.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">📊 积分榜</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">球队</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">赛</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">胜</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">平</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">负</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">进</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">失</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">净胜</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">积分</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {league.standings.map((team) => (
                        <tr 
                          key={team.rank} 
                          className={`hover:bg-gray-50 transition-colors ${
                            team.rank <= 4 ? 'bg-yellow-50' : 
                            team.rank >= league.standings.length - 2 ? 'bg-red-50' : ''
                          }`}
                        >
                          <td className="px-6 py-3">
                            <span className={`font-bold ${team.rank <= 3 ? 'text-yellow-600' : 'text-gray-400'}`}>
                              {team.rank}
                            </span>
                          </td>
                          <td className="px-6 py-3 font-medium text-gray-900">{team.team}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{team.played}</td>
                          <td className="px-4 py-3 text-center text-green-600 font-medium">{team.win}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{team.draw}</td>
                          <td className="px-4 py-3 text-center text-red-600 font-medium">{team.lose}</td>
                          <td className="px-4 py-3 text-center text-gray-900">{team.goalsFor}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{team.goalsAgainst}</td>
                          <td className={`px-4 py-3 text-center font-medium ${team.gd >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {team.gd >= 0 ? '+' : ''}{team.gd}
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-gray-900">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {league.champions.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🏆 历年冠军</h2>
                <div className="space-y-3">
                  {league.champions.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <span className="text-gray-500">{item.year}赛季</span>
                      <span className="font-semibold text-gray-900">{item.team}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {league.rules && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">📜 联赛规则</h2>
                <p className="text-blue-800 leading-relaxed">{league.rules}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {league.topScorers.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">⚽ 射手榜</h2>
                <div className="space-y-4">
                  {league.topScorers.map((player, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-amber-600' : 'bg-blue-500'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{player.name}</div>
                        <div className="text-sm text-gray-500">{player.team}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-orange-600 font-bold">{player.goals}球</div>
                        <div className="text-blue-600 text-xs">{player.assists}助</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {attackRanking.length > 0 && (
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-3">⚡ 进攻最强</h3>
                <div className="space-y-2">
                  {attackRanking.map((team, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{team.team}</span>
                      <span className="font-bold">{team.goalsFor}球</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {defenseRanking.length > 0 && (
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-3">🛡️ 防守最佳</h3>
                <div className="space-y-2">
                  {defenseRanking.map((team, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{team.team}</span>
                      <span className="font-bold">{team.goalsAgainst}失球</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {league.teamsList.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🏟️ 豪门球队</h2>
                <div className="space-y-3">
                  {league.teamsList.map((team, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                      <div className="font-medium text-gray-900 mb-1">{team.name}</div>
                      <div className="text-xs text-gray-500 space-y-0.5">
                        <div>🏠 {team.stadium} ({team.capacity.toLocaleString()}人)</div>
                        <div>👔 主教练: {team.coach}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-3">📊 联赛数据</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-80">参赛球队</span>
                  <span className="font-bold">{league.teams} 支</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">成立年份</span>
                  <span className="font-bold">{league.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">所属地区</span>
                  <span className="font-bold">{league.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
