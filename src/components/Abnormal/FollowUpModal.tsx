import { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import type { AbnormalPatient } from '@/types';

interface FollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: AbnormalPatient | null;
  targetStatus: 'processing' | 'completed' | null;
  onConfirm: (note: string) => void;
}

const statusLabels: Record<string, string> = {
  processing: '跟进中',
  completed: '已完成',
};

const FollowUpModal = ({ isOpen, onClose, patient, targetStatus, onConfirm }: FollowUpModalProps) => {
  const [note, setNote] = useState('');

  if (!isOpen || !patient || !targetStatus) return null;

  const handleConfirm = () => {
    onConfirm(note);
    setNote('');
  };

  const handleClose = () => {
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
      
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
          <div>
            <h3 className="font-semibold text-neutral-900">推进状态</h3>
            <p className="text-sm text-neutral-500 mt-0.5">
              {patient.name} → {statusLabels[targetStatus]}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="p-3 bg-neutral-50 rounded-lg">
            <div className="text-sm text-neutral-600">
              <span className="text-neutral-500">当前状态：</span>
              <span className="font-medium">{patient.assigneeStatus === 'dispatched' ? '已分派' : '跟进中'}</span>
            </div>
            <div className="text-sm text-neutral-600 mt-1">
              <span className="text-neutral-500">目标状态：</span>
              <span className="font-medium text-teal-600">{statusLabels[targetStatus]}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              跟进备注
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="请填写本次跟进情况..."
              className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
              rows={4}
            />
          </div>
        </div>

        <div className="flex gap-3 p-5 border-t border-neutral-200 bg-neutral-50 rounded-b-xl">
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 bg-white border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            确认推进
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpModal;
