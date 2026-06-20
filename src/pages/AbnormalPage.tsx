import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import FilterPanel from '@/components/Abnormal/FilterPanel';
import PatientTable from '@/components/Abnormal/PatientTable';
import ExportButton from '@/components/Abnormal/ExportButton';
import { abnormalPatients } from '@/data/mockData';
import type { AbnormalPatient } from '@/types';
import { AlertTriangle, Users, Clock, PhoneCall } from 'lucide-react';

type AbnormalType = 'all' | 'suture_unvisited' | 'ortho_overdue' | 'no_show_repeat';
type StatusType = 'all' | 'pending' | 'contacted' | 'recovered';

const AbnormalPage = () => {
  const [abnormalType, setAbnormalType] = useState<AbnormalType>('all');
  const [status, setStatus] = useState<StatusType>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [patients, setPatients] = useState<AbnormalPatient[]>(abnormalPatients);

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      if (abnormalType !== 'all' && p.abnormalType !== abnormalType) return false;
      if (status !== 'all' && p.status !== status) return false;
      if (searchKeyword && !p.name.includes(searchKeyword) && !p.phone.includes(searchKeyword)) return false;
      return true;
    });
  }, [patients, abnormalType, status, searchKeyword]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { ...p, status: newStatus as AbnormalPatient['status'] } : p
    ));
  };

  const stats = useMemo(() => {
    const total = patients.length;
    const sutureCount = patients.filter(p => p.abnormalType === 'suture_unvisited').length;
    const overdueCount = patients.filter(p => p.abnormalType === 'ortho_overdue').length;
    const noShowCount = patients.filter(p => p.abnormalType === 'no_show_repeat').length;
    const pendingCount = patients.filter(p => p.status === 'pending').length;

    return { total, sutureCount, overdueCount, noShowCount, pendingCount };
  }, [patients]);

  return (
    <Layout title="异常名单">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-800">异常患者名单</h2>
            <p className="text-sm text-neutral-500 mt-1">一键筛选需追回的患者，分派客服跟进</p>
          </div>
          <ExportButton data={filteredPatients} />
        </div>

        <div className="grid grid-cols-4 gap-5">
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-danger-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-800 font-mono">{stats.total}</p>
            <p className="text-sm text-neutral-500 mt-1">异常患者总数</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-800 font-mono">{stats.sutureCount}</p>
            <p className="text-sm text-neutral-500 mt-1">拆线未回访</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-warning-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-800 font-mono">{stats.overdueCount}</p>
            <p className="text-sm text-neutral-500 mt-1">复诊超期</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-800 font-mono">{stats.pendingCount}</p>
            <p className="text-sm text-neutral-500 mt-1">待跟进</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <FilterPanel
              abnormalType={abnormalType}
              status={status}
              searchKeyword={searchKeyword}
              onAbnormalTypeChange={setAbnormalType}
              onStatusChange={setStatus}
              onSearchChange={setSearchKeyword}
            />

            <div className="content-card p-5 mt-6">
              <h3 className="text-sm font-semibold text-neutral-800 mb-3">快捷操作</h3>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 text-left text-sm text-neutral-700 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  📋 批量分派给客服
                </button>
                <button className="w-full px-3 py-2 text-left text-sm text-neutral-700 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  📧 发送短信提醒
                </button>
                <button className="w-full px-3 py-2 text-left text-sm text-neutral-700 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  📊 生成追回报告
                </button>
              </div>
            </div>

            <div className="content-card p-5 mt-6">
              <h3 className="text-sm font-semibold text-neutral-800 mb-3">追回建议</h3>
              <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
                <p>• <strong>拆线未回访</strong>：建议电话回访，了解术后恢复情况</p>
                <p>• <strong>复诊超期</strong>：发送提醒短信，强调定期复诊重要性</p>
                <p>• <strong>多次爽约</strong>：了解爽约原因，提供更灵活的预约时间</p>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <PatientTable data={filteredPatients} onStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AbnormalPage;
