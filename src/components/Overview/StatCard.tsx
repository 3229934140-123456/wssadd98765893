import { TrendingUp, TrendingDown, Calendar, Users, XCircle, RefreshCcw } from 'lucide-react';

type StatType = 'appointments' | 'arrivals' | 'noShow' | 'reschedule';

interface StatCardProps {
  type: StatType;
  value: number | string;
  label: string;
  trend: number;
  trendLabel?: string;
  suffix?: string;
}

const iconMap = {
  appointments: Calendar,
  arrivals: Users,
  noShow: XCircle,
  reschedule: RefreshCcw,
};

const colorMap = {
  appointments: {
    bg: 'from-primary-500 to-primary-600',
    text: 'text-primary-600',
    bgLight: 'bg-primary-50',
  },
  arrivals: {
    bg: 'from-success-500 to-success-600',
    text: 'text-success-600',
    bgLight: 'bg-success-50',
  },
  noShow: {
    bg: 'from-warning-500 to-warning-600',
    text: 'text-warning-600',
    bgLight: 'bg-warning-50',
  },
  reschedule: {
    bg: 'from-purple-500 to-purple-600',
    text: 'text-purple-600',
    bgLight: 'bg-purple-50',
  },
};

const StatCard = ({ type, value, label, trend, trendLabel = '较上周', suffix = '' }: StatCardProps) => {
  const Icon = iconMap[type];
  const colors = colorMap[type];
  const isPositive = type === 'appointments' || type === 'arrivals' ? trend > 0 : trend < 0;

  return (
    <div className="stat-card relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.bg} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500`} />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${colors.bgLight} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-success-600' : 'text-danger-600'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {Math.abs(trend)}%
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-3xl font-bold text-neutral-800 font-mono tracking-tight">
            {value}{suffix}
          </p>
          <p className="text-sm text-neutral-500">{label}</p>
          <p className="text-xs text-neutral-400">{trendLabel}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
