import { useEffect } from 'react';
import { X, Phone, MapPin, Calendar, AlertTriangle, Clock, User } from 'lucide-react';
import type { AbnormalPatient } from '@/types';
import FollowUpTimeline from './FollowUpTimeline';

interface PatientDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  patient: AbnormalPatient | null;
}

const abnormalTypeLabels: Record<string, string> = {
  suture_unvisited: '拆线未回访',
  ortho_overdue: '正畸超期',
  no_show_repeat: '多次爽约',
};

const statusLabels: Record<string, string> = {
  undispatched: '待分派',
  dispatched: '已分派',
  processing: '跟进中',
  completed: '已完成',
};

const statusColors: Record<string, string> = {
  undispatched: 'bg-neutral-100 text-neutral-700',
  dispatched: 'bg-blue-50 text-blue-700',
  processing: 'bg-warning-50 text-warning-700',
  completed: 'bg-success-50 text-success-700',
};

const PatientDetailDrawer = ({ isOpen, onClose, patient }: PatientDetailDrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !patient) return null;

  const latestRecord = patient.followUpRecords && patient.followUpRecords.length > 0
    ? [...patient.followUpRecords].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )[0]
    : null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-[600px] max-w-[90vw] bg-white shadow-xl animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">患者详情</h2>
            <p className="text-sm text-neutral-500 mt-0.5">查看完整跟进过程和信息</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{patient.name}</h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-neutral-600">
                    <Phone className="w-4 h-4" />
                    <span>{patient.phone}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.assigneeStatus]}`}>
                  {statusLabels[patient.assigneeStatus]}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  <span className="text-neutral-500">门店：</span>
                  <span className="font-medium text-neutral-800">{patient.clinicName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-neutral-500" />
                  <span className="text-neutral-500">项目：</span>
                  <span className="font-medium text-neutral-800">{patient.treatmentType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-danger-500" />
                  <span className="text-neutral-500">异常类型：</span>
                  <span className="font-medium text-danger-700">{abnormalTypeLabels[patient.abnormalType]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-neutral-500" />
                  <span className="text-neutral-500">超期天数：</span>
                  <span className="font-medium text-warning-600">{patient.daysOverdue} 天</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white/70 rounded-lg">
                <div className="text-xs text-neutral-500 mb-1">异常详情</div>
                <div className="text-sm text-neutral-700">{patient.abnormalDetail}</div>
              </div>

              {patient.source && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-medium text-purple-700">
                      来源：{patient.source.type === 'doctor' ? '医生' : '前台'} {patient.source.personName} · {patient.source.stageLabel}
                    </span>
                  </div>
                </div>
              )}

              {latestRecord && (
                <div className="mt-4 p-3 bg-white/70 rounded-lg">
                  <div className="text-xs text-neutral-500 mb-1">最近跟进</div>
                  <div className="text-sm text-neutral-700">
                    <span className="font-medium">{latestRecord.operator}</span>
                    <span className="text-neutral-400 mx-2">·</span>
                    <span>{latestRecord.timestamp}</span>
                    {latestRecord.note && (
                      <div className="mt-1 text-neutral-600">{latestRecord.note}</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-neutral-900">跟进时间线</h4>
                <span className="text-xs text-neutral-500">共 {patient.followUpRecords?.length || 0} 条记录</span>
              </div>
              <FollowUpTimeline records={patient.followUpRecords || []} />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-neutral-200 bg-neutral-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailDrawer;
