import { useState } from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/Overview/StatCard';
import ProjectFilter from '@/components/Overview/ProjectFilter';
import ClinicTable from '@/components/Overview/ClinicTable';
import TrendChart from '@/components/Overview/TrendChart';
import { getClinicsByTreatment, getTotalStats, clinicTreatmentBreakdown } from '@/data/mockData';
import type { TreatmentType } from '@/types';

const OverviewPage = () => {
  const [selectedType, setSelectedType] = useState<TreatmentType>('all');
  const clinicData = getClinicsByTreatment(selectedType);
  const totalStats = getTotalStats(clinicData);

  return (
    <Layout title="复诊概览">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-800">本周复诊数据</h2>
            <p className="text-sm text-neutral-500 mt-1">实时监控各门店复诊执行质量</p>
          </div>
          <ProjectFilter selected={selectedType} onChange={setSelectedType} />
        </div>

        <div className="grid grid-cols-4 gap-5">
          <StatCard
            type="appointments"
            value={totalStats.appointments}
            label="本周复诊预约数"
            trend={8.2}
            trendLabel="较上周 ↑"
            suffix="人次"
          />
          <StatCard
            type="arrivals"
            value={totalStats.arrivals}
            label="实际到诊数"
            trend={10.5}
            trendLabel="较上周 ↑"
            suffix="人次"
          />
          <StatCard
            type="noShow"
            value={totalStats.noShowRate}
            label="爽约率"
            trend={-5.8}
            trendLabel="较上周 ↓"
            suffix="%"
          />
          <StatCard
            type="reschedule"
            value={totalStats.rescheduleRate}
            label="改约率"
            trend={2.3}
            trendLabel="较上周 ↑"
            suffix="%"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <ClinicTable data={clinicData} breakdownData={clinicTreatmentBreakdown} />
          </div>
          <div className="col-span-1">
            <TrendChart />
          </div>
        </div>

        <div className="content-card p-6">
          <h3 className="text-base font-semibold text-neutral-800 mb-4">项目分析洞察</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-warning-50 border border-warning-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-warning-500" />
                <span className="text-sm font-medium text-warning-700">高风险项目</span>
              </div>
              <p className="text-2xl font-bold text-warning-600">儿牙</p>
              <p className="text-xs text-warning-600/70 mt-1">爽约率 12.8%，远高于平均水平</p>
            </div>
            <div className="p-4 rounded-xl bg-success-50 border border-success-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-success-500" />
                <span className="text-sm font-medium text-success-700">表现最优</span>
              </div>
              <p className="text-2xl font-bold text-success-600">种植</p>
              <p className="text-xs text-success-600/70 mt-1">到诊率 91.2%，患者依从性好</p>
            </div>
            <div className="p-4 rounded-xl bg-primary-50 border border-primary-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                <span className="text-sm font-medium text-primary-700">需关注门店</span>
              </div>
              <p className="text-2xl font-bold text-primary-600">上海徐汇店</p>
              <p className="text-xs text-primary-600/70 mt-1">爽约率连续3周上升</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OverviewPage;
