import { useState, useMemo, useEffect, useCallback } from 'react';
import Layout from '@/components/Layout';
import FilterPanel from '@/components/Abnormal/FilterPanel';
import PatientTable from '@/components/Abnormal/PatientTable';
import ExportButton from '@/components/Abnormal/ExportButton';
import DispatchModal from '@/components/Abnormal/DispatchModal';
import PatientDetailDrawer from '@/components/Abnormal/PatientDetailDrawer';
import FollowUpModal from '@/components/Abnormal/FollowUpModal';
import { abnormalPatients, customerServices } from '@/data/mockData';
import type { AbnormalPatient, FollowUpRecord } from '@/types';
import { AlertTriangle, Users, Clock, PhoneCall, UserCheck, Inbox, UserPlus, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';

type AbnormalType = 'all' | 'suture_unvisited' | 'ortho_overdue' | 'no_show_repeat';
type StatusType = 'all' | 'pending' | 'contacted' | 'recovered';
type AssigneeStatusType = 'all' | 'undispatched' | 'dispatched' | 'processing' | 'completed';
type OverdueFilterType = 'all' | 'overdue';

const STORAGE_KEY = 'abnormalPatients_v2';
const OVERDUE_HOURS = 24;

const getInitialPatients = (): AbnormalPatient[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((p: AbnormalPatient) => ({
        ...p,
        followUpRecords: p.followUpRecords || [],
      }));
    }
  } catch {
    // ignore
  }
  return abnormalPatients;
};

const generateId = () => `f_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const nowStr = () => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

const AbnormalPage = () => {
  const [abnormalType, setAbnormalType] = useState<AbnormalType>('all');
  const [status, setStatus] = useState<StatusType>('all');
  const [assigneeStatus, setAssigneeStatus] = useState<AssigneeStatusType>('all');
  const [overdueFilter, setOverdueFilter] = useState<OverdueFilterType>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [patients, setPatients] = useState<AbnormalPatient[]>(getInitialPatients);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [dispatchTargetIds, setDispatchTargetIds] = useState<string[]>([]);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<AbnormalPatient | null>(null);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [followUpTarget, setFollowUpTarget] = useState<AbnormalPatient | null>(null);
  const [followUpTargetStatus, setFollowUpTargetStatus] = useState<'processing' | 'completed' | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    const onNewPatients = (e: CustomEvent) => {
      const newPatients: AbnormalPatient[] = e.detail.map((p: AbnormalPatient) => ({
        ...p,
        followUpRecords: p.followUpRecords || [],
      }));
      setPatients(prev => [...newPatients, ...prev]);
    };
    window.addEventListener('abnormal:newPatients' as any, onNewPatients as any);
    return () => window.removeEventListener('abnormal:newPatients' as any, onNewPatients as any);
  }, []);

  const isOverdue = useCallback((patient: AbnormalPatient): boolean => {
    if (patient.assigneeStatus !== 'dispatched' || !patient.dispatchedAt) {
      return false;
    }
    const dispatchedTime = new Date(patient.dispatchedAt).getTime();
    const now = Date.now();
    const diffHours = (now - dispatchedTime) / (1000 * 60 * 60);
    return diffHours >= OVERDUE_HOURS;
  }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      if (abnormalType !== 'all' && p.abnormalType !== abnormalType) return false;
      if (status !== 'all' && p.status !== status) return false;
      if (assigneeStatus !== 'all' && p.assigneeStatus !== assigneeStatus) return false;
      if (overdueFilter === 'overdue' && !isOverdue(p)) return false;
      if (searchKeyword && !p.name.includes(searchKeyword) && !p.phone.includes(searchKeyword)) return false;
      return true;
    });
  }, [patients, abnormalType, status, assigneeStatus, overdueFilter, searchKeyword, isOverdue]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { ...p, status: newStatus as AbnormalPatient['status'] } : p
    ));
  };

  const handleAdvanceStatus = (patient: AbnormalPatient, targetStatus: 'processing' | 'completed') => {
    setFollowUpTarget(patient);
    setFollowUpTargetStatus(targetStatus);
    setFollowUpModalOpen(true);
  };

  const handleFollowUpConfirm = (note: string) => {
    if (!followUpTarget || !followUpTargetStatus) return;

    const newRecord: FollowUpRecord = {
      id: generateId(),
      patientId: followUpTarget.id,
      fromStatus: followUpTarget.assigneeStatus,
      toStatus: followUpTargetStatus,
      operator: followUpTarget.assignee || '当前用户',
      timestamp: nowStr(),
      note: note || undefined,
    };

    setPatients(prev => prev.map(p => {
      if (p.id === followUpTarget.id) {
        return {
          ...p,
          assigneeStatus: followUpTargetStatus,
          followUpRecords: [...(p.followUpRecords || []), newRecord],
        };
      }
      return p;
    }));

    setFollowUpModalOpen(false);
    setFollowUpTarget(null);
    setFollowUpTargetStatus(null);
  };

  const handlePatientClick = (patient: AbnormalPatient) => {
    setSelectedPatient(patient);
    setDetailDrawerOpen(true);
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
    const now = nowStr();
    setPatients(prev => prev.map(p => {
      if (patientIds.includes(p.id)) {
        const newRecord: FollowUpRecord = {
          id: generateId(),
          patientId: p.id,
          fromStatus: p.assigneeStatus,
          toStatus: 'dispatched',
          operator: '店长',
          timestamp: now,
          note: `分派给 ${assignee}`,
        };
        return { 
          ...p, 
          assignee, 
          assigneeStatus: 'dispatched' as AbnormalPatient['assigneeStatus'],
          dispatchedAt: now,
          followUpRecords: [...(p.followUpRecords || []), newRecord],
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
    const followOverdueCount = patients.filter(isOverdue).length;

    return { 
      total, sutureCount, overdueCount, noShowCount, pendingCount, 
      undispatchedCount, dispatchedCount, processingCount, completedCount,
      followOverdueCount
    };
  }, [patients, isOverdue]);

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

        {stats.followOverdueCount > 0 && (
          <div className="bg-gradient-to-r from-danger-50 to-warning-50 border border-danger-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-danger-100 flex items-center justify-center animate-pulse">
                <AlertCircle className="w-5 h-5 text-danger-600" />
              </div>
              <div>
                <h4 className="font-semibold text-danger-800">
                  {stats.followOverdueCount} 个任务跟进超时
                </h4>
                <p className="text-sm text-danger-600">
                  分派超过 {OVERDUE_HOURS} 小时未进入跟进中，请及时催办
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOverdueFilter(overdueFilter === 'overdue' ? 'all' : 'overdue')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  overdueFilter === 'overdue'
                    ? 'bg-danger-600 text-white'
                    : 'bg-white text-danger-700 border border-danger-200 hover:bg-danger-100'
                }`}
              >
                {overdueFilter === 'overdue' ? (
                  <span className="flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    取消筛选
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    一键筛选超时任务
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

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
              onAdvanceStatus={handleAdvanceStatus}
              onPatientClick={handlePatientClick}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              onDispatch={handleDispatch}
              customerServices={customerServices}
              isOverdue={isOverdue}
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

      <PatientDetailDrawer
        isOpen={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        patient={selectedPatient}
      />

      <FollowUpModal
        isOpen={followUpModalOpen}
        onClose={() => {
          setFollowUpModalOpen(false);
          setFollowUpTarget(null);
          setFollowUpTargetStatus(null);
        }}
        patient={followUpTarget}
        targetStatus={followUpTargetStatus}
        onConfirm={handleFollowUpConfirm}
      />
    </Layout>
  );
};

export default AbnormalPage;
