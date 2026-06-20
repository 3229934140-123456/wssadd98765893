import type { FollowUpRecord } from '@/types';
import { Clock, User, MessageSquare } from 'lucide-react';

interface FollowUpTimelineProps {
  records: FollowUpRecord[];
}

const statusLabels: Record<string, string> = {
  undispatched: '待分派',
  dispatched: '已分派',
  processing: '跟进中',
  completed: '已完成',
};

const statusColors: Record<string, string> = {
  undispatched: 'bg-neutral-400',
  dispatched: 'bg-blue-500',
  processing: 'bg-warning-500',
  completed: 'bg-success-500',
};

const FollowUpTimeline = ({ records }: FollowUpTimelineProps) => {
  if (records.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>暂无跟进记录</p>
      </div>
    );
  }

  const sortedRecords = [...records].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="relative">
      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-neutral-200" />
      
      <div className="space-y-6">
        {sortedRecords.map((record, index) => (
          <div key={record.id} className="relative pl-11">
            <div className={`absolute left-2 w-5 h-5 rounded-full ${statusColors[record.toStatus]} border-2 border-white shadow flex items-center justify-center`}>
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium text-white ${statusColors[record.toStatus]}`}>
                      {statusLabels[record.toStatus]}
                    </span>
                    {record.fromStatus !== record.toStatus && (
                      <span className="text-xs text-neutral-400">
                        {statusLabels[record.fromStatus]} → {statusLabels[record.toStatus]}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {record.operator}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {record.timestamp}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-neutral-400">
                  第 {index + 1} 次
                </div>
              </div>
              
              {record.note && (
                <div className="mt-3 pt-3 border-t border-neutral-200">
                  <div className="flex items-start gap-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{record.note}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUpTimeline;
