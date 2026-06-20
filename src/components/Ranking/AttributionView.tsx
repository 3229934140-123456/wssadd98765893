import { X, ChevronRight, Users } from 'lucide-react';
import { DoctorFunnel, ReceptionistFunnel, DoctorFunnelStage, ReceptionistFunnelStage, DOCTOR_FUNNEL_STAGES, RECEPTIONIST_FUNNEL_STAGES } from '@/types';

interface AttributionViewProps {
  type: 'doctor' | 'receptionist';
  personId: string;
  personName: string;
  funnel: DoctorFunnel | ReceptionistFunnel;
  onClose: () => void;
  onStageClick?: (stage: string) => void;
}

const getStageKeyForDoctor = (index: number): DoctorFunnelStage => {
  return DOCTOR_FUNNEL_STAGES[index].value;
};

const getStageKeyForReceptionist = (index: number): ReceptionistFunnelStage => {
  return RECEPTIONIST_FUNNEL_STAGES[index].value;
};

const doctorStages = (funnel: DoctorFunnel) => [
  { label: '医嘱→预约', rate: funnel.appointmentRate, loss: 100 - funnel.appointmentRate, key: getStageKeyForDoctor(0), dropCount: funnel.suggestions - funnel.appointments },
  { label: '预约→提醒', rate: funnel.reminderRate, loss: 100 - funnel.reminderRate, key: getStageKeyForDoctor(1), dropCount: funnel.appointments - funnel.reminders },
  { label: '提醒→到诊', rate: funnel.arrivalRate, loss: 100 - funnel.arrivalRate, key: getStageKeyForDoctor(2), dropCount: funnel.reminders - funnel.arrivals },
];

const receptionistStages = (funnel: ReceptionistFunnel) => [
  { label: '分配→提醒', rate: funnel.reminderRate, loss: 100 - funnel.reminderRate, key: getStageKeyForReceptionist(0), dropCount: funnel.totalAssigned - funnel.reminded },
  { label: '提醒→响应', rate: funnel.responseRate, loss: 100 - funnel.responseRate, key: getStageKeyForReceptionist(1), dropCount: funnel.reminded - funnel.responded },
  { label: '响应→到诊', rate: funnel.arrivalRate, loss: 100 - funnel.arrivalRate, key: getStageKeyForReceptionist(2), dropCount: funnel.responded - funnel.arrived },
];

const diagnosisMap: Record<string, string> = {
  suggestion_to_appointment: '建议加强复诊医嘱沟通质量',
  appointment_to_reminder: '建议前台加强提醒频次和方式',
  reminder_to_arrival: '建议了解患者爽约原因，灵活调整预约时间',
  assigned_to_reminded: '建议优化提醒排班，确保名单分配后及时触达',
  reminded_to_responded: '建议优化提醒话术和时段，提升患者响应率',
  responded_to_arrived: '建议术前再次确认，减少临时爽约',
};

const AttributionView = ({ type, personId, personName, funnel, onClose, onStageClick }: AttributionViewProps) => {
  const stages = type === 'doctor'
    ? doctorStages(funnel as DoctorFunnel)
    : receptionistStages(funnel as ReceptionistFunnel);

  const maxLossKey = stages.reduce((max, s) => s.loss > max.loss ? s : max, stages[0]).key;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-40 p-6 translate-x-0 transition-transform duration-300 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-neutral-800">{personName} — 归因分析</h2>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-neutral-100 transition-colors">
          <X className="w-5 h-5 text-neutral-500" />
        </button>
      </div>

      <div className="flex-1 space-y-5">
        {stages.map((stage) => {
          const isMaxLoss = stage.key === maxLossKey;
          return (
            <div key={stage.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">{stage.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500">
                    流失 <span className={`font-semibold ${isMaxLoss ? 'text-red-600' : 'text-neutral-700'}`}>{stage.dropCount}</span> 人
                  </span>
                  <span className={`text-sm font-semibold ${isMaxLoss ? 'text-red-600' : 'text-neutral-600'}`}>
                    {stage.rate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isMaxLoss ? 'bg-red-500' : 'bg-primary-500'}`}
                  style={{ width: `${stage.rate}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${isMaxLoss ? 'text-red-500 font-semibold' : 'text-neutral-400'}`}>
                  流失率 {stage.loss.toFixed(1)}%
                </span>
                {isMaxLoss && (
                  <span className="text-xs text-red-600 font-semibold">⚠ 主要流失环节</span>
                )}
              </div>
              <button
                onClick={() => onStageClick?.(stage.key)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-600 text-xs font-medium flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  查看流失患者名单
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">诊断建议</h4>
        <p className="text-sm text-neutral-600 leading-relaxed">{diagnosisMap[maxLossKey]}</p>
      </div>
    </div>
  );
};

export default AttributionView;

