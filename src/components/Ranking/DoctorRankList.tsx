import { Stethoscope, TrendingUp, TrendingDown } from 'lucide-react';
import type { DoctorData } from '@/types';

interface DoctorRankListProps {
  data: DoctorData[];
  onDoctorClick?: (doctor: DoctorData) => void;
}

const DoctorRankList = ({ data, onDoctorClick }: DoctorRankListProps) => {
  const sortedDoctors = [...data].sort((a, b) => b.score - a.score);

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
          <Stethoscope className="w-5 h-5 text-primary-600" />
          <h3 className="text-base font-semibold text-neutral-800">医生排行</h3>
        </div>
        <p className="text-sm text-neutral-500 mt-0.5">按复诊预约完成率综合排序</p>
      </div>
      
      <div className="divide-y divide-neutral-50 max-h-[480px] overflow-y-auto scrollbar-thin">
        {sortedDoctors.map((doctor, index) => (
          <div 
            key={doctor.id} 
            className="px-6 py-4 hover:bg-neutral-50/50 transition-colors cursor-pointer"
            onClick={() => onDoctorClick?.(doctor)}
          >
            <div className="flex items-center gap-4">
              <div className={getRankBadgeClass(index + 1)}>
                {index + 1}
              </div>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-700">
                  {doctor.name.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-neutral-800">{doctor.name}</p>
                  <span className="tag-neutral">{doctor.specialty}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">{doctor.clinicName}</p>
                
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-500">预约完成率</span>
                      <span className="text-xs font-semibold text-neutral-700">{doctor.appointmentRate}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill bg-primary-500"
                        style={{ width: `${doctor.appointmentRate}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-500">到诊率</span>
                      <span className="text-xs font-semibold text-neutral-700">{doctor.arrivalRate}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${
                          doctor.arrivalRate >= 85 ? 'bg-success-500' : 
                          doctor.arrivalRate >= 75 ? 'bg-warning-500' : 'bg-danger-500'
                        }`}
                        style={{ width: `${doctor.arrivalRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600 font-mono">{doctor.score}</div>
                <p className="text-xs text-neutral-400">综合得分</p>
                <p className="text-xs text-neutral-500 mt-1">{doctor.suggestions}条建议</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorRankList;
