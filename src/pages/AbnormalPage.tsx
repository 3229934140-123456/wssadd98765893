import { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/Layout';
import FilterPanel from '@/components/Abnormal/FilterPanel';
import PatientTable from '@/components/Abnormal/PatientTable';
import ExportButton from '@/components/Abnormal/ExportButton';
import DispatchModal from '@/components/Abnormal/DispatchModal';
import { abnormalPatients, customerServices } from '@/data/mockData';
import type { AbnormalPatient } from '@/types';
import { AlertTriangle, Users, Clock, PhoneCall, UserCheck, Inbox, UserPlus, Loader2, CheckCircle2 } from 'lucide-react';

type AbnormalType = 'all' | 'suture_unvisited' | 'ortho_overdue' | 'no_show_repeat';
type StatusType = 'all' | 'pending' | 'contacted' | 'recovered';
type AssigneeStatusType = 'all' | 'undispatched' | 'dispatched' | 'processing' | 'completed';

const getInitialPatients = () => {
  try {
    const stored = sessionStorage.getItem('abnormalPatients');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return abnormalPatients;
};

const AbnormalPage = () => {
  const [abnormalType, setAbnormalType] = useState<AbnormalType>('all');
  const [status, setStatus] = useState<StatusType>('all');
  const [assigneeStatus, setAssigneeStatus] = useState<AssigneeStatusType>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [patients, setPatients] = useState<AbnormalPatient[]>(getInitialPatients);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [dispatchTargetIds, setDispatchTargetIds] = useState<string[]>([]);

  useEffect(() => {
    sessionStorage.setItem('abnormalPatients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    const onNewPatients = (e: CustomEvent) => {
      setPatients(prev => [...e.detail, ...prev]);
    };
    window.addEventListener('abnormal:newPatients' as any, onNewPatients as any);
    return () => window.removeEventListener('abnormal:newPatients' as any, onNewPatients as any);
  }, []);

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

  const handleAssigneeStatusChange = (id: string, newAssigneeStatus: string) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { ...p, assigneeStatus: newAssigneeStatus as AbnormalPatient['assigneeStatus'] } : p
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
    const dispatchedCount = patients.filter(p => p.assigneeStatus === 'dispatched').length;
    const processingCount = patients.filter(p => p.assigneeStatus === 'processing').length;
    const completedCount = patients.filter(p => p.assigneeStatus === 'completed').length;

    return { 
      total, sutureCount, overdueCount, noShowCount, pendingCount, 
      undispatchedCount, dispatchedCount, processingCount, completedCount 
    };
  }, [patients]);

  const assigneeStatusList: { value: AssigneeStatusType; label: string; count: number; icon: any; color: string; bg: string; border: string }[] = [
    { value: 'undispatched', label: '待分派', count: stats.undispatchedCount, icon: Inbox, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
    { value: 'dispatched', label: '已分派', count: stats.dispatchedCount, icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { value: 'processing', label: '跟进中', count: stats.processingCount, icon: Loader2, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
    { value: 'completed', label: '已完成', count: stats.completedCount, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
  ];

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
            <p className="text-sm text-neutral-500 mt-1">正畸超6周未复诊</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-800 font-mono">{stats.noShowCount}</p>
            <p className="text-sm text-neutral-500 mt-1">多次爽约</p>
          </div>
        </div>

        <div className="content-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-800">分派状态看板</h3>
            <p className="text-xs text-neutral-500">点击卡片可快速筛选对应状态</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {assigneeStatusList.map(item => {
              const Icon = item.icon;
              const isActive = assigneeStatus === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => setAssigneeStatus(isActive ? 'all' : item.value)}
                  className={`p-4 rounded-xl text-left border-2 transition-all ${
                    isActive ? `${item.border} ${item.bg} shadow-sm` : 'border-neutral-100 hover:border-neutral-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center`}>
                      <Icon className={`w-4.5 h-4.5 ${item.color}`} />
                    </div>
                    <span className="text-xs font-medium text-neutral-400">
                      {Math.round((item.count / stats.total) * 100)}%
                    </span>
                  </div>
                  <p className={`text-2xl font-bold font-mono ${item.color}`}>{item.count}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{item.label}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-4 h-2 bg-neutral-100 rounded-full overflow-hidden flex">
            {assigneeStatusList.map(item => {
              const width = stats.total > 0 ? (item.count / stats.total) * 100 : 0;
              const colorMap: Record<string, string> = {
                undispatched: 'bg-red-500',
                dispatched: 'bg-blue-500',
                processing: 'bg-orange-500',
                completed: 'bg-green-500',
              };
              return (
                <div
                  key={item.value}
                  className={`h-full ${colorMap[item.value]} transition-all`}
                  style={{ width: `${width}%` }}
                />
              );
            })}
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
              onAssigneeStatusChange={handleAssigneeStatusChange}
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
