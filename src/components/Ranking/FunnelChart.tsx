import { funnelData } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';

const FunnelChart = () => {
  const colors = [
    { bg: 'bg-primary-500', light: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-200' },
    { bg: 'bg-primary-400', light: 'bg-primary-50/50', text: 'text-primary-600', border: 'border-primary-200' },
    { bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    { bg: 'bg-success-500', light: 'bg-success-50', text: 'text-success-700', border: 'border-success-200' },
  ];

  const maxWidth = 100;

  return (
    <div className="content-card">
      <div className="px-6 py-4 border-b border-neutral-100">
        <h3 className="text-base font-semibold text-neutral-800">复诊转化漏斗</h3>
        <p className="text-sm text-neutral-500 mt-0.5">从医嘱开出处方到患者最终到诊</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {funnelData.map((item, index) => {
            const widthPercent = (item.value / funnelData[0].value) * maxWidth;
            const color = colors[index];
            const lossRate = index > 0 ? (100 - item.rate).toFixed(1) : 0;

            return (
              <div key={item.name} className="relative">
                <div className="flex items-center gap-4">
                  <div className="w-20 text-right">
                    <p className="text-sm font-medium text-neutral-700">{item.name}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{item.value}人</p>
                  </div>
                  
                  <div className="flex-1 relative">
                    <div 
                      className={`h-14 rounded-lg ${color.bg} ${color.light} border ${color.border} flex items-center justify-between px-4 transition-all duration-500 relative overflow-hidden`}
                      style={{ width: `${widthPercent}%` }}
                    >
                      <div className={`absolute inset-0 ${color.bg} opacity-15`} />
                      <div className="relative flex items-center gap-2">
                        <span className={`text-lg font-bold ${color.text}`}>
                          {item.rate}%
                        </span>
                      </div>
                      {index > 0 && (
                        <div className="relative text-xs text-neutral-500">
                          较上一步流失 {lossRate}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {index < funnelData.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowRight className="w-4 h-4 text-neutral-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100">
          <h4 className="text-sm font-semibold text-neutral-700 mb-3">关键洞察</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-warning-50 border border-warning-100">
              <p className="text-xs text-warning-600 font-medium">最大流失点</p>
              <p className="text-sm font-bold text-warning-700 mt-1">医嘱 → 预约</p>
              <p className="text-xs text-warning-600/70 mt-0.5">流失率 15.3%</p>
            </div>
            <div className="p-3 rounded-lg bg-success-50 border border-success-100">
              <p className="text-xs text-success-600 font-medium">表现最优</p>
              <p className="text-sm font-bold text-success-700 mt-1">前台提醒环节</p>
              <p className="text-xs text-success-600/70 mt-0.5">完成率 94.2%</p>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-3 leading-relaxed">
            建议：加强医生复诊建议的沟通质量，提升患者对复诊重要性的认知，可有效降低第一环节流失率。
          </p>
        </div>
      </div>
    </div>
  );
};

export default FunnelChart;
