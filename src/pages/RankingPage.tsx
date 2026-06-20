import { useState } from 'react';
import Layout from '@/components/Layout';
import DoctorRankList from '@/components/Ranking/DoctorRankList';
import ReceptionistRankList from '@/components/Ranking/ReceptionistRankList';
import FunnelChart from '@/components/Ranking/FunnelChart';
import AttributionView from '@/components/Ranking/AttributionView';
import { doctors, receptionists } from '@/data/mockData';
import type { DoctorData, ReceptionistData } from '@/types';
import { Users, PhoneCall, TrendingUp, Target } from 'lucide-react';

type TabType = 'doctor' | 'receptionist' | 'both' | 'attribution';
type AttributionTarget = {
  type: 'doctor' | 'receptionist';
  personId: string;
  personName: string;
} | null;

const RankingPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('both');
  const [attributionTarget, setAttributionTarget] = useState<AttributionTarget>(null);

  const handleDoctorClick = (doctor: DoctorData) => {
    setAttributionTarget({
      type: 'doctor',
      personId: doctor.id,
      personName: doctor.name,
    });
  };

  const handleReceptionistClick = (receptionist: ReceptionistData) => {
    setAttributionTarget({
      type: 'receptionist',
      personId: receptionist.id,
      personName: receptionist.name,
    });
  };

  const getAttributionFunnel = () => {
    if (!attributionTarget) return null;
    if (attributionTarget.type === 'doctor') {
      const doctor = doctors.find(d => d.id === attributionTarget.personId);
      return doctor?.funnel || null;
    }
    const receptionist = receptionists.find(r => r.id === attributionTarget.personId);
    return receptionist?.funnel || null;
  };

  return (
    <Layout title="协同排行">
      <div className={`space-y-6 animate-fade-in transition-all duration-300 ${attributionTarget ? 'mr-96' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-800">医生与前台协同排行</h2>
            <p className="text-sm text-neutral-500 mt-1">评估各岗位协作效率，定位问题环节</p>
          </div>
          
          <div className="flex gap-2 bg-neutral-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'both'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              综合视图
            </button>
            <button
              onClick={() => setActiveTab('doctor')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'doctor'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <Users className="w-4 h-4" />
              医生
            </button>
            <button
              onClick={() => setActiveTab('receptionist')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'receptionist'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              前台
            </button>
            <button
              onClick={() => setActiveTab('attribution')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'attribution'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <Target className="w-4 h-4" />
              归因
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5">
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-800 font-mono">89.2</p>
            <p className="text-sm text-neutral-500 mt-1">平均预约完成率</p>
            <p className="text-xs text-success-600 mt-1">↑ 较上月 3.5%</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-800 font-mono">92.5%</p>
            <p className="text-sm text-neutral-500 mt-1">前台平均提醒率</p>
            <p className="text-xs text-success-600 mt-1">↑ 较上月 2.1%</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-success-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-800 font-mono">84.7%</p>
            <p className="text-sm text-neutral-500 mt-1">患者最终到诊率</p>
            <p className="text-xs text-success-600 mt-1">↑ 较上月 4.2%</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-warning-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-warning-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-800 font-mono">15.3%</p>
            <p className="text-sm text-neutral-500 mt-1">最大流失率(医嘱→预约)</p>
            <p className="text-xs text-danger-600 mt-1">↓ 需重点改善</p>
          </div>
        </div>

        {(activeTab === 'both' || activeTab === 'attribution') && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <DoctorRankList data={doctors} onDoctorClick={handleDoctorClick} />
            </div>
            <div className="col-span-1">
              <ReceptionistRankList data={receptionists} onReceptionistClick={handleReceptionistClick} />
            </div>
            <div className="col-span-1">
              <FunnelChart />
            </div>
          </div>
        )}

        {activeTab === 'doctor' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <DoctorRankList data={doctors} onDoctorClick={handleDoctorClick} />
            </div>
            <div className="col-span-1">
              <FunnelChart />
            </div>
          </div>
        )}

        {activeTab === 'receptionist' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <ReceptionistRankList data={receptionists} onReceptionistClick={handleReceptionistClick} />
            </div>
            <div className="col-span-1">
              <FunnelChart />
            </div>
          </div>
        )}

        {activeTab === 'attribution' && !attributionTarget && (
          <div className="content-card p-12 text-center">
            <Target className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-700 mb-2">问题归因视图</h3>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              点击左侧医生或前台列表中的任意人员，即可查看其各环节转化漏斗，定位主要流失环节
            </p>
          </div>
        )}
      </div>

      {attributionTarget && (
        <AttributionView
          type={attributionTarget.type}
          personId={attributionTarget.personId}
          personName={attributionTarget.personName}
          funnel={getAttributionFunnel()!}
          onClose={() => setAttributionTarget(null)}
        />
      )}
    </Layout>
  );
};

export default RankingPage;
