import { PhoneCall } from 'lucide-react';
import type { ReceptionistData } from '@/types';

interface ReceptionistRankListProps {
  data: ReceptionistData[];
}

const ReceptionistRankList = ({ data }: ReceptionistRankListProps) => {
  const sortedReceptionists = [...data].sort((a, b) => b.score - a.score);

  const getRankBadgeClass = (rank: number) => {
    if (rank === 1) return 'rank-badge-gold';
    if (rank === 2) return 'rank-badge-silver';
    if (rank === 3) return 'rank-badge-bronze';
    return 'rank-badge-default';
  };

  return (
    <div className="content-card">
      <div className="px-6 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-purple-600" />
          <h3 className="text-base font-semibold text-neutral-800">前台排行</h3>
        </div>
        <p className="text-sm text-neutral-500 mt-0.5">按提醒完成率与响应率综合排序</p>
      </div>
      
      <div className="divide-y divide-neutral-50 max-h-[480px] overflow-y-auto scrollbar-thin">
        {sortedReceptionists.map((receptionist, index) => (
          <div 
            key={receptionist.id} 
            className="px-6 py-4 hover:bg-neutral-50/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={getRankBadgeClass(index + 1)}>
                {index + 1}
              </div>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <span className="text-sm font-semibold text-purple-700">
                  {receptionist.name.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-neutral-800">{receptionist.name}</p>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">{receptionist.clinicName}</p>
                
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-500">提醒完成率</span>
                      <span className="text-xs font-semibold text-neutral-700">{receptionist.reminderRate}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill bg-purple-500"
                        style={{ width: `${receptionist.reminderRate}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-500">患者响应率</span>
                      <span className="text-xs font-semibold text-neutral-700">{receptionist.responseRate}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${
                          receptionist.responseRate >= 85 ? 'bg-success-500' : 
                          receptionist.responseRate >= 75 ? 'bg-warning-500' : 'bg-danger-500'
                        }`}
                        style={{ width: `${receptionist.responseRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600 font-mono">{receptionist.score}</div>
                <p className="text-xs text-neutral-400">综合得分</p>
                <p className="text-xs text-neutral-500 mt-1">{receptionist.reminders}次提醒</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceptionistRankList;
