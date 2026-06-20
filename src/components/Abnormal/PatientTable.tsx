import { Phone, Clock, AlertTriangle } from 'lucide-react';
import type { AbnormalPatient } from '@/types';

interface PatientTableProps {
  data: AbnormalPatient[];
  onStatusChange?: (id: string, status: string) => void;
}

const getAbnormalTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    suture_unvisited: '拆线未回访',
    ortho_overdue: '复诊超期',
    no_show_repeat: '多次爽约',
  };
  return labels[type] || type;
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: '待跟进',
    contacted: '已联系',
    recovered: '已追回',
  };
  return labels[status] || status;
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'pending': return 'tag-danger';
    case 'contacted': return 'tag-warning';
    case 'recovered': return 'tag-success';
    default: return 'tag-neutral';
  }
};

const getAbnormalTypeClass = (type: string) => {
  switch (type) {
    case 'suture_unvisited': return 'bg-orange-50 text-orange-700';
    case 'ortho_overdue': return 'bg-danger-50 text-danger-700';
    case 'no_show_repeat': return 'bg-warning-50 text-warning-700';
    default: return 'tag-neutral';
  }
};

const PatientTable = ({ data, onStatusChange }: PatientTableProps) => {
  return (
    <div className="content-card">
      <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-neutral-800">异常患者名单</h3>
          <p className="text-sm text-neutral-500 mt-0.5">共 {data.length} 位患者需要关注</p>
        </div>
      </div>
      
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-thin">
        <table className="w-full">
          <thead className="bg-neutral-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left table-header">患者信息</th>
              <th className="px-6 py-3 text-left table-header">所属门店</th>
              <th className="px-6 py-3 text-left table-header">治疗项目</th>
              <th className="px-6 py-3 text-left table-header">异常类型</th>
              <th className="px-6 py-3 text-left table-header">异常详情</th>
              <th className="px-6 py-3 text-left table-header">超期天数</th>
              <th className="px-6 py-3 text-left table-header">状态</th>
              <th className="px-6 py-3 text-right table-header">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {data.map((patient, index) => (
              <tr 
                key={patient.id} 
                className="hover:bg-neutral-50/50 transition-colors"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-neutral-600">
                        {patient.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{patient.name}</p>
                      <p className="text-xs text-neutral-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-neutral-700">{patient.clinicName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="tag-neutral">{patient.treatmentType}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`tag ${getAbnormalTypeClass(patient.abnormalType)}`}>
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {getAbnormalTypeLabel(patient.abnormalType)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-neutral-600">{patient.abnormalDetail}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span className={`text-sm font-mono ${
                      patient.daysOverdue > 30 ? 'text-danger-600' : 
                      patient.daysOverdue > 14 ? 'text-warning-600' : 'text-neutral-600'
                    }`}>
                      {patient.daysOverdue} 天
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={getStatusClass(patient.status)}>
                    {getStatusLabel(patient.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onStatusChange?.(patient.id, 'contacted')}
                      className="px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
                    >
                      标记联系
                    </button>
                    <button 
                      onClick={() => onStatusChange?.(patient.id, 'recovered')}
                      className="px-3 py-1.5 text-xs font-medium text-success-600 bg-success-50 rounded-md hover:bg-success-100 transition-colors"
                    >
                      已追回
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-neutral-300" />
            </div>
            <p className="text-neutral-500">暂无符合条件的异常患者</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientTable;
