import { useEffect, useMemo, useState } from 'react';
import { X, TrendingDown, Calendar, MapPin, ChevronDown, ChevronUp, ChevronRight, PieChart, BarChart3, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell, Label } from 'recharts';
import type { ClinicData, ClinicWeeklyTrend, TreatmentType } from '@/types';
import { TREATMENT_TYPES } from '@/types';

interface ClinicDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  clinic: ClinicData | null;
  weeklyTrendData: ClinicWeeklyTrend[];
  globalTreatmentType: TreatmentType;
}

const ClinicDetailDrawer = ({ isOpen, onClose, clinic, weeklyTrendData, globalTreatmentType }: ClinicDetailDrawerProps) => {
  const [selectedTreatment, setSelectedTreatment] = useState<string>('all');
  const [expandedTreatment, setExpandedTreatment] = useState<string | null>(null);
  const [reasonViewTreatment, setReasonViewTreatment] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const label = TREATMENT_TYPES.find(t => t.value === globalTreatmentType)?.label;
      if (label && label !== '全部项目') {
        setSelectedTreatment(label);
      } else {
        setSelectedTreatment('all');
      }
      setExpandedTreatment(null);
      setReasonViewTreatment(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, globalTreatmentType]);

  const TREATMENTS = useMemo(() => {
    if (globalTreatmentType !== 'all') {
      const label = TREATMENT_TYPES.find(t => t.value === globalTreatmentType)?.label;
      return label ? [label] : [];
    }
    return ['正畸', '种植', '牙周', '儿牙', '综合'];
  }, [globalTreatmentType]);

  const chartData = useMemo(() => {
    if (!clinic) return [];
    const weeks = ['week1', 'week2', 'week3', 'week4'];
    const weekLabels = ['第1周', '第2周', '第3周', '第4周'];
    
    return weeks.map((week, i) => {
      const weekData = weeklyTrendData.filter(t => t.week === week);
      const filtered = selectedTreatment === 'all' 
        ? weekData 
        : weekData.filter(t => t.treatment === selectedTreatment);
      
      const appointments = filtered.reduce((sum, t) => sum + t.appointments, 0);
      const arrivals = filtered.reduce((sum, t) => sum + t.arrivals, 0);
      const noShows = filtered.reduce((sum, t) => sum + t.noShows, 0);
      const reschedules = filtered.reduce((sum, t) => sum + t.reschedules, 0);
      const noShowRate = appointments > 0 ? +((noShows / appointments) * 100).toFixed(1) : 0;
      const rescheduleRate = appointments > 0 ? +((reschedules / appointments) * 100).toFixed(1) : 0;
      const arrivalRate = appointments > 0 ? +((arrivals / appointments) * 100).toFixed(1) : 0;
      
      return {
        week: weekLabels[i],
        预约数: appointments,
        到诊数: arrivals,
        爽约数: noShows,
        改约数: reschedules,
        到诊率: arrivalRate,
        爽约率: noShowRate,
        改约率: rescheduleRate,
      };
    });
  }, [weeklyTrendData, selectedTreatment, clinic]);

  const detectBreakpoint = useMemo(() => {
    if (chartData.length < 2) return null;
    for (let i = 1; i < chartData.length; i++) {
      const prev = chartData[i - 1];
      const curr = chartData[i];
      if (curr.到诊率 - prev.到诊率 <= -3) {
        return { week: curr.week, drop: +(prev.到诊率 - curr.到诊率).toFixed(1) };
      }
    }
    return null;
  }, [chartData]);

  const treatmentSummary = useMemo(() => {
    return TREATMENTS.map(treatment => {
      const tData = weeklyTrendData.filter(t => t.treatment === treatment);
      const latest = tData.filter(t => t.week === 'week4')[0];
      const totalAppointments = tData.reduce((sum, t) => sum + t.appointments, 0);
      const totalArrivals = tData.reduce((sum, t) => sum + t.arrivals, 0);
      const totalNoShows = tData.reduce((sum, t) => sum + t.noShows, 0);
      const totalReschedules = tData.reduce((sum, t) => sum + t.reschedules, 0);
      const avgNoShowRate = totalAppointments > 0 ? +((totalNoShows / totalAppointments) * 100).toFixed(1) : 0;
      const avgRescheduleRate = totalAppointments > 0 ? +((totalReschedules / totalAppointments) * 100).toFixed(1) : 0;
      return {
        treatment,
        latestAppointments: latest?.appointments || 0,
        latestArrivals: latest?.arrivals || 0,
        latestNoShows: latest?.noShows || 0,
        latestReschedules: latest?.reschedules || 0,
        latestNoShowRate: latest?.noShowRate || 0,
        latestRescheduleRate: latest?.rescheduleRate || 0,
        totalAppointments,
        totalArrivals,
        totalNoShows,
        totalReschedules,
        avgNoShowRate,
        avgRescheduleRate,
      };
    });
  }, [weeklyTrendData, TREATMENTS]);

  const reasonViewPieData = useMemo(() => {
    if (!reasonViewTreatment) return null;
    const tData = weeklyTrendData.filter(t => t.treatment === reasonViewTreatment);
    const latest = tData.find(t => t.week === 'week4');
    if (!latest || latest.appointments === 0) return null;
    return [
      { name: '实际到诊', value: latest.arrivals, rate: latest.arrivalRate, color: '#059669' },
      { name: '爽约', value: latest.noShows, rate: latest.noShowRate, color: '#DC2626' },
      { name: '改约', value: latest.reschedules, rate: latest.rescheduleRate, color: '#F59E0B' },
    ];
  }, [reasonViewTreatment, weeklyTrendData]);

  const reasonViewTrendData = useMemo(() => {
    if (!reasonViewTreatment) return [];
    const tData = weeklyTrendData.filter(t => t.treatment === reasonViewTreatment);
    return tData.map(t => ({
      week: t.weekLabel,
      爽约数: t.noShows,
      改约数: t.reschedules,
      爽约率: t.noShowRate,
      改约率: t.rescheduleRate,
    }));
  }, [reasonViewTreatment, weeklyTrendData]);

  if (!isOpen || !clinic) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[680px] h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-gradient-to-r from-primary-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-800">{clinic.name}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">近4周复诊趋势分析</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {detectBreakpoint && (
          <div className="mx-6 mt-4 p-4 bg-danger-50 border border-danger-100 rounded-xl flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-danger-500 flex items-center justify-center shrink-0">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-danger-700">检测到断档预警</p>
              <p className="text-xs text-danger-600/80 mt-1">
                {detectBreakpoint.week} 到诊率较前一周下降 {detectBreakpoint.drop} 个百分点，建议重点关注
              </p>
            </div>
          </div>
        )}

        <div className="px-6 pt-4 flex items-center gap-2">
          <button
            onClick={() => setSelectedTreatment('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTreatment === 'all'
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            全部项目
          </button>
          {TREATMENTS.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTreatment(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTreatment === t
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pt-5 pb-20 space-y-6">
          <div className="content-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-neutral-800">预约、到诊、爽约、改约趋势</h4>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>近4周</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#737373' }} axisLine={{ stroke: '#e5e5e5' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#737373' }} axisLine={{ stroke: '#e5e5e5' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#737373' }} axisLine={{ stroke: '#e5e5e5' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                <Legend wrapperStyle={{ paddingTop: 10 }} iconType="circle" />
                <Bar yAxisId="left" dataKey="预约数" fill="#0D9488" radius={[6, 6, 0, 0]} />
                <Bar yAxisId="left" dataKey="到诊数" fill="#059669" radius={[6, 6, 0, 0]} />
                <Bar yAxisId="left" dataKey="爽约数" fill="#DC2626" radius={[6, 6, 0, 0]} />
                <Bar yAxisId="left" dataKey="改约数" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="到诊率" stroke="#0D9488" strokeWidth={2.5} dot={{ r: 4, fill: '#0D9488', strokeWidth: 2, stroke: '#fff' }} />
                <Line yAxisId="right" type="monotone" dataKey="爽约率" stroke="#DC2626" strokeWidth={2.5} dot={{ r: 4, fill: '#DC2626', strokeWidth: 2, stroke: '#fff' }} strokeDasharray="5 5" />
                <Line yAxisId="right" type="monotone" dataKey="改约率" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }} strokeDasharray="3 3" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="content-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-neutral-800">各项目4周汇总</h4>
              {reasonViewTreatment && (
                <button
                  onClick={() => setReasonViewTreatment(null)}
                  className="text-xs text-primary-600 font-medium hover:text-primary-700"
                >
                  返回项目列表
                </button>
              )}
            </div>

            {!reasonViewTreatment ? (
              <div className="space-y-2">
                {treatmentSummary.map(item => (
                  <div key={item.treatment} className="rounded-xl border border-neutral-100 overflow-hidden">
                    <div
                      className="px-4 py-3 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition-colors"
                      onClick={() => setExpandedTreatment(expandedTreatment === item.treatment ? null : item.treatment)}
                    >
                      <div className="flex items-center gap-3">
                        {expandedTreatment === item.treatment 
                          ? <ChevronUp className="w-4 h-4 text-neutral-400" />
                          : <ChevronRight className="w-4 h-4 text-neutral-400" />
                        }
                        <span className="w-14 text-sm font-medium text-neutral-800">{item.treatment}</span>
                        <span className="text-xs text-neutral-500">
                          到诊 <span className="font-semibold text-neutral-700">{item.totalArrivals}</span> / 预约 <span className="font-semibold text-neutral-700">{item.totalAppointments}</span>
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          item.avgNoShowRate > 10 ? 'bg-danger-50 text-danger-600' : 'bg-success-50 text-success-600'
                        }`}>
                          爽约 {item.avgNoShowRate}%
                        </span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
                          改约 {item.avgRescheduleRate}%
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setReasonViewTreatment(item.treatment);
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors flex items-center gap-1"
                      >
                        <PieChart className="w-3.5 h-3.5" />
                        断档原因
                      </button>
                    </div>
                    {expandedTreatment === item.treatment && (
                      <div className="px-4 pb-4 border-t border-neutral-50">
                        <div className="pt-3 grid grid-cols-4 gap-2 text-center text-xs">
                          {['第1周', '第2周', '第3周', '第4周'].map((week, i) => {
                            const weekKey = ['week1', 'week2', 'week3', 'week4'][i];
                            const wd = weeklyTrendData.find(t => t.treatment === item.treatment && t.week === weekKey);
                            return (
                              <div key={week} className="p-2 bg-neutral-50 rounded-lg">
                                <p className="text-neutral-500">{week}</p>
                                <p className="text-sm font-semibold text-neutral-800 mt-1">{wd?.arrivals || 0} / {wd?.appointments || 0}</p>
                                <div className="flex justify-center gap-1 mt-0.5">
                                  <span className="text-xs font-medium text-danger-600">爽约{wd?.noShowRate || 0}%</span>
                                  <span className="text-xs font-medium text-amber-600">改约{wd?.rescheduleRate || 0}%</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>当前查看：<strong className="text-neutral-800">{reasonViewTreatment}</strong> 最近一周断档原因分析</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 rounded-xl">
                    <h5 className="text-xs font-medium text-neutral-600 mb-2 text-center">断档原因分布（第4周）</h5>
                    <ResponsiveContainer width="100%" height={180}>
                      <RePieChart>
                        <Pie
                          data={reasonViewPieData || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {reasonViewPieData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-3 gap-1 mt-2 text-center text-xs">
                      {reasonViewPieData?.map(item => (
                        <div key={item.name} className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                          <span className="text-neutral-600 mt-1">{item.name}</span>
                          <span className="font-semibold text-neutral-800">{item.value} ({item.rate}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-xl">
                    <h5 className="text-xs font-medium text-neutral-600 mb-2 text-center">爽约/改约 4周对比</h5>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={reasonViewTrendData} barGap={3}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#737373' }} axisLine={{ stroke: '#e5e5e5' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#737373' }} axisLine={{ stroke: '#e5e5e5' }} />
                        <Tooltip 
                          contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
                        />
                        <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                        <Bar dataKey="爽约数" fill="#DC2626" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="改约数" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-700 border border-amber-100">
                  <strong className="text-amber-800">店长建议：</strong>
                  若爽约率上升，建议加强提前1天电话提醒；若改约率偏高，可考虑增加周末及晚间时段灵活预约。
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDetailDrawer;
