import { useEffect } from 'react';
import { X, User, Phone, MapPin, Calendar, Lightbulb, ArrowRight } from 'lucide-react';
import type { DropoffPatient } from '@/types';
import { DOCTOR_FUNNEL_STAGES, RECEPTIONIST_FUNNEL_STAGES } from '@/types';

interface DropoffPatientPanelProps {
  isOpen: boolean;
  onClose: () => void;
  personType: 'doctor' | 'receptionist';
  personName: string;
  stage: string;
  patients: DropoffPatient[];
}

const DropoffPatientPanel = ({
  isOpen,
  onClose,
  personType,
  personName,
  stage,
  patients,
}: DropoffPatientPanelProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const stageInfo = personType === 'doctor'
    ? DOCTOR_FUNNEL_STAGES.find(s => s.value === stage)
    : RECEPTIONIST_FUNNEL_STAGES.find(s => s.value === stage);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[560px] h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-800">流失患者明细</h3>
              <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1.5">
                <span>{personName}</span>
                <ArrowRight className="w-3 h-3" />
                <span className="text-purple-600 font-medium">{stageInfo?.label}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-100">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-neutral-600">环节：</span>
              <span className="font-medium text-neutral-800">{stageInfo?.from} → {stageInfo?.to}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-danger-500" />
              <span className="text-neutral-600">流失人数：</span>
              <span className="font-semibold text-danger-600">{patients.length} 人</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4 space-y-3">
          {patients.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <User className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-sm text-neutral-500">该环节暂无流失患者</p>
              </div>
            </div>
          ) : (
            patients.map(patient => (
              <div key={patient.id} className="content-card p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">{patient.name}</p>
                      <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-50 text-primary-600">
                    {patient.treatmentType}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-1.5 text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{patient.clinicName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-500">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>最近预约：{patient.lastAppointmentDate}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-amber-700 mb-0.5">建议动作</p>
                      <p className="text-xs text-amber-600/90">{patient.suggestedAction}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-4 border-t border-neutral-100 bg-white">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              返回归因
            </button>
            <button
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-sm"
            >
              批量导出名单
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropoffPatientPanel;
