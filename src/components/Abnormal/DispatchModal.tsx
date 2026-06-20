import { useState, useMemo } from 'react';
import { UserPlus, X } from 'lucide-react';

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientIds: string[];
  customerServices: { id: string; name: string; clinicName: string }[];
  onDispatch: (patientIds: string[], assignee: string) => void;
}

const DispatchModal = ({ isOpen, onClose, patientIds, customerServices, onDispatch }: DispatchModalProps) => {
  const [selectedAssignee, setSelectedAssignee] = useState('');

  const groupedServices = useMemo(() => {
    const groups: Record<string, { id: string; name: string; clinicName: string }[]> = {};
    customerServices.forEach((cs) => {
      if (!groups[cs.clinicName]) {
        groups[cs.clinicName] = [];
      }
      groups[cs.clinicName].push(cs);
    });
    return groups;
  }, [customerServices]);

  const handleConfirm = () => {
    if (!selectedAssignee) return;
    onDispatch(patientIds, selectedAssignee);
    setSelectedAssignee('');
    onClose();
  };

  const handleClose = () => {
    setSelectedAssignee('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary-600" />
            <h3 className="text-base font-semibold text-neutral-800">分派客服</h3>
            <span className="px-2 py-0.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-full">
              已选 {patientIds.length} 人
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">选择客服人员</label>
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option value="">请选择客服</option>
            {Object.entries(groupedServices).map(([clinicName, services]) => (
              <optgroup key={clinicName} label={clinicName}>
                {services.map((cs) => (
                  <option key={cs.id} value={cs.name}>
                    {cs.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedAssignee}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            确认分派
          </button>
        </div>
      </div>
    </div>
  );
};

export default DispatchModal;
