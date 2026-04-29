'use client';

interface DateFilterProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  availableDates: string[];
}

export default function DateFilter({ selectedDate, onDateChange, availableDates }: DateFilterProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const checkDate = new Date(dateStr);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate.getTime() === today.getTime()) return '今天';
    if (checkDate.getTime() === tomorrow.getTime()) return '明天';
    if (checkDate.getTime() === yesterday.getTime()) return '昨天';

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekDay = weekDays[date.getDay()];
    return `${month}月${day}日${weekDay}`;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {availableDates.map((date) => (
          <button
            key={date}
            onClick={() => onDateChange(date)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
              selectedDate === date
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-700/50 text-gray-400 hover:bg-slate-600 hover:text-white'
            }`}
          >
            {formatDate(date)}
          </button>
        ))}
      </div>
    </div>
  );
}