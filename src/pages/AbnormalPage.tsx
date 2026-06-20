import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import FilterPanel from '@/components/Abnormal/FilterPanel';
import PatientTable from '@/components/Abnormal/PatientTable';
import ExportButton from '@/components/Abnormal/ExportButton';
import DispatchModal from '@/components/Abnormal/DispatchModal';
import { abnormalPatients, customerServices } from '@/data/mockData';
import type { AbnormalPatient } from '@/types';
import { AlertTriangle, Users, Clock, PhoneCall, UserCheck } from 'lucide-react';

type AbnormalType = 'all' | 'suture_unvisited' | 'ortho_overdue' | 'no_show_repeat';
type StatusType = 'all' | 'pending' | 'contacted' | 'recovered';
type AssigneeStatusType = 'all' | 'undispatched' | 'dispatched' | 'processing' | 'completed';

const AbnormalPage = () => {
  const [abnormalType, setAbnormalType] = useState<AbnormalType>('all');
  const [status, setStatus] = useState<StatusType>('all');
  const [assigneeStatus, setAssigneeStatus] = useState<AssigneeStatusType>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [patients, setPatients] = useState<AbnormalPatient[]>(abnormalPatients);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [dispatchTargetIds, setDispatchTargetIds] = useState<string[]>([]);

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      if (abnormalType !== 'all' && p.abnormalType !== abnormalType) return false;
      if (status !== 'all' && p.status !== status) return false;
      if (assigneeStatus !== 'all' && p.assigneeStatus !== assigneeStatus) return false;
      if (searchKeyword && !p.name.includes(searchKeyword) && !p.phone.includes(searchKeyword)) return false;
      return true;
    });
  }, [patients, abnormalType, status, assigneeStatus, searchKeyword]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { ...p, status: newStatus as AbnormalPatient['status'] } : p
    ));
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allFilteredIds = filteredPatients.map(p => p.id);
    const allSelected = allFilteredIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !allFilteredIds.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...allFilteredIds])]);
    }
  };

  const handleDispatch = (ids: string[]) => {
    setDispatchTargetIds(ids);
    setDispatchModalOpen(true);
  };

  const handleDispatchConfirm = (patientIds: string[], assignee: string) => {
    setPatients(prev => prev.map(p => {
      if (patientIds.includes(p.id)) {
        return { 
          ...p, 
          assignee, 
          assigneeStatus: 'dispatched' as AbnormalPatient['assigneeStatus'] 
        };
      }
      return p;
    }));
    setSelectedIds([]);
  };

  const stats = useMemo(() => {
    const total = patients.length;
    const sutureCount = patients.filter(p => p.abnormalType === 'suture_unvisited').length;
    const overdueCount = patients.filter(p => p.abnormalType === 'ortho_overdue').length;
    const noShowCount = patients.filter(p => p.abnormalType === 'no_show_repeat').length;
    const pendingCount = patients.filter(p => p.status === 'pending').length;
    const undispatchedCount = patients.filter(p => p.assigneeStatus === 'undispatched').length;

    return { total, sutureCount, overdueCount, noShowCount, pendingCount, undispatchedCount };
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

        <div className="grid grid-cols-5 gap-5">
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
            <p className="text-sm text-neutral-500 mt-1">正畸超6周未复诊</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-800 font-mono">{stats.undispatchedCount}</p>
            <p className="text-sm text-neutral-500 mt-1">待分派</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-primary-600" />
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
              assigneeStatus={assigneeStatus}
              searchKeyword={searchKeyword}
              onAbnormalTypeChange={setAbnormalType}
              onStatusChange={setStatus}
              onAssigneeStatusChange={setAssigneeStatus}
              onSearchChange={setSearchKeyword}
            />

            <div className="content-card p-5 mt-6">
              <h3 className="text-sm font-semibold text-neutral-800 mb-3">追回建议</h3>
              <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
                <p>• <strong>拆线未回访</strong>：建议电话回访，了解术后恢复情况</p>
                <p>• <strong>正畸超6周未复诊</strong>：发送提醒短信，强调定期复诊重要性</p>
                <p>• <strong>多次爽约</strong>：了解爽约原因，提供更灵活的预约时间</p>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <PatientTable 
              data={filteredPatients} 
              onStatusChange={handleStatusChange}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              onDispatch={handleDispatch}
              customerServices={customerServices}
            />
          </div>
        </div>
      </div>

      <DispatchModal
        isOpen={dispatchModalOpen}
        onClose={() => setDispatchModalOpen(false)}
        patientIds={dispatchTargetIds}
        customerServices={customerServices}
        onDispatch={handleDispatchConfirm}
      />
    </Layout>
  );
};

export default AbnormalPage;
