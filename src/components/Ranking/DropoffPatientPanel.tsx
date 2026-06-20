import { useEffect, useState } from 'react';
import { X, User, Phone, MapPin, Calendar, Lightbulb, ArrowRight, UserPlus, ChevronDown } from 'lucide-react';
import type { DropoffPatient, CustomerService, AbnormalPatient } from '@/types';
import { DOCTOR_FUNNEL_STAGES, RECEPTIONIST_FUNNEL_STAGES } from '@/types';
import { customerServices } from '@/data/mockData';

interface DropoffPatientPanelProps {
  isOpen: boolean;
  onClose: () => void;
  personType: 'doctor' | 'receptionist';
  personName: string;
  personId: string;
  stage: string;
  patients: DropoffPatient[];
}

const DropoffPatientPanel = ({
  isOpen,
  onClose,
  personType,
  personName,
  personId,
  stage,
  patients,
}: DropoffPatientPanelProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedCS, setSelectedCS] = useState<string>('');
  const [csDropdownOpen, setCsDropdownOpen] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedIds([]);
      setSelectedCS('');
      setTransferSuccess(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const stageInfo = personType === 'doctor'
    ? DOCTOR_FUNNEL_STAGES.find(s => s.value === stage)
    : RECEPTIONIST_FUNNEL_STAGES.find(s => s.value === stage);

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === patients.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(patients.map(p => p.id));
    }
  };

  const getCSByClinic = (clinicName: string): CustomerService | undefined => {
    return customerServices.find(cs => cs.clinicName === clinicName);
  };

  const handleTransferToAbnormal = () => {
    if (selectedIds.length === 0 || !selectedCS) return;
    const selectedPatients = patients.filter(p => selectedIds.includes(p.id));
    const cs = customerServices.find(c => c.name === selectedCS);
    
    const newAbnormalPatients: AbnormalPatient[] = selectedPatients.map((p, i) => {
      const day = new Date();
      day.setDate(day.getDate() - 7 - i);
      const dateStr = day.toISOString().slice(0, 10);
      return {
        id: `attr_${Date.now()}_${i}`,
        name: p.name,
        phone: p.phone,
        clinicName: p.clinicName,
        treatmentType: p.treatmentType,
        abnormalType: 'no_show_repeat',
        abnormalDetail: `${stageInfo?.label || '协同'}环节流失`,
        lastVisitDate: p.lastAppointmentDate,
        daysOverdue: 7 + i,
        noShowCount: 1,
        status: 'pending',
        assignee: selectedCS,
        assigneeStatus: cs ? 'dispatched' : 'undispatched',
        source: {
          type: personType,
          personName,
          stage,
          stageLabel: stageInfo?.label || stage,
        },
      };
    });

    const event = new CustomEvent('abnormal:newPatients', { detail: newAbnormalPatients });
    window.dispatchEvent(event);
    
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      onClose();
    }, 1200);
  };

  const allSelected = patients.length > 0 && selectedIds.length === patients.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[600px] h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
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

        <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="w-3.5 h-3.5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-neutral-600">全选</span>
            </label>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-danger-500" />
              <span className="text-neutral-600">流失人数：</span>
              <span className="font-semibold text-danger-600">{patients.length} 人</span>
              {selectedIds.length > 0 && (
                <>
                  <span className="text-neutral-300">|</span>
                  <span className="text-primary-600 font-medium">已选 {selectedIds.length} 人</span>
                </>
              )}
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
              <div 
                key={patient.id} 
                className={`content-card p-4 hover:shadow-md transition-shadow ${
                  selectedIds.includes(patient.id) ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(patient.id)}
                    onChange={() => handleToggleSelect(patient.id)}
                    className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
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
                </div>
              </div>
            ))
          )}
        </div>

        {transferSuccess ? (
          <div className="px-6 py-4 border-t border-neutral-100 bg-success-50">
            <div className="text-center text-success-600 font-medium py-2">
              ✓ 已成功转至异常名单，共 {selectedIds.length} 人
            </div>
          </div>
        ) : (
          <div className="px-6 py-4 border-t border-neutral-100 bg-white space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-neutral-600 shrink-0">分派给客服</label>
              <div className="relative flex-1">
                <button
                  onClick={() => setCsDropdownOpen(!csDropdownOpen)}
                  disabled={selectedIds.length === 0}
                  className={`w-full px-3 py-2 rounded-lg text-left text-sm border flex items-center justify-between transition-colors ${
                    selectedIds.length === 0
                      ? 'bg-neutral-50 border-neutral-200 text-neutral-400 cursor-not-allowed'
                      : 'bg-white border-neutral-200 hover:border-primary-300 text-neutral-800'
                  }`}
                >
                  <span>{selectedCS || '请选择客服'}</span>
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                </button>
                {csDropdownOpen && selectedIds.length > 0 && (
                  <div className="absolute w-full z-50 top-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {customerServices.map(cs => (
                      <button
                        key={cs.id}
                        onClick={() => {
                          setSelectedCS(cs.name);
                          setCsDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-primary-50 transition-colors ${
                          selectedCS === cs.name ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'
                        }`}
                      >
                        <div className="font-medium">{cs.name}</div>
                        <div className="text-xs text-neutral-500">{cs.clinicName}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
              >
                返回归因
              </button>
              <button
                onClick={handleTransferToAbnormal}
                disabled={selectedIds.length === 0 || !selectedCS}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  selectedIds.length === 0 || !selectedCS
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                转异常名单
              </button>
            </div>
            {selectedIds.length > 0 && !selectedCS && (
              <p className="text-xs text-amber-600 text-center">请先选择分派的客服</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropoffPatientPanel;
