import { Filter, Search, X } from 'lucide-react';

type AbnormalType = 'all' | 'suture_unvisited' | 'ortho_overdue' | 'no_show_repeat';
type StatusType = 'all' | 'pending' | 'contacted' | 'recovered';
type AssigneeStatusType = 'all' | 'undispatched' | 'dispatched' | 'processing' | 'completed';

interface FilterPanelProps {
  abnormalType: AbnormalType;
  status: StatusType;
  assigneeStatus: AssigneeStatusType;
  searchKeyword: string;
  onAbnormalTypeChange: (type: AbnormalType) => void;
  onStatusChange: (status: StatusType) => void;
  onAssigneeStatusChange: (status: AssigneeStatusType) => void;
  onSearchChange: (keyword: string) => void;
}

const abnormalTypes = [
  { value: 'all', label: '全部异常' },
  { value: 'suture_unvisited', label: '术后拆线未回访' },
  { value: 'ortho_overdue', label: '正畸超6周未复诊' },
  { value: 'no_show_repeat', label: '多次爽约' },
];

const statuses = [
  { value: 'all', label: '全部状态' },
  { value: 'pending', label: '待跟进' },
  { value: 'contacted', label: '已联系' },
  { value: 'recovered', label: '已追回' },
];

const assigneeStatuses = [
  { value: 'all', label: '全部分派' },
  { value: 'undispatched', label: '待分派' },
  { value: 'dispatched', label: '已分派' },
  { value: 'processing', label: '跟进中' },
  { value: 'completed', label: '已完成' },
];

const FilterPanel = ({
  abnormalType,
  status,
  assigneeStatus,
  searchKeyword,
  onAbnormalTypeChange,
  onStatusChange,
  onAssigneeStatusChange,
  onSearchChange,
}: FilterPanelProps) => {
  return (
    <div className="content-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-primary-600" />
        <h3 className="text-sm font-semibold text-neutral-800">筛选条件</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-neutral-500 mb-2 block">异常类型</label>
          <div className="flex flex-wrap gap-2">
            {abnormalTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => onAbnormalTypeChange(type.value as AbnormalType)}
                className={abnormalType === type.value ? 'filter-chip-active' : 'filter-chip-inactive'}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-500 mb-2 block">跟进状态</label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => onStatusChange(s.value as StatusType)}
                className={status === s.value ? 'filter-chip-active' : 'filter-chip-inactive'}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-500 mb-2 block">分派状态</label>
          <div className="flex flex-wrap gap-2">
            {assigneeStatuses.map((s) => (
              <button
                key={s.value}
                onClick={() => onAssigneeStatusChange(s.value as AssigneeStatusType)}
                className={assigneeStatus === s.value ? 'filter-chip-active' : 'filter-chip-inactive'}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-500 mb-2 block">搜索患者</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="输入患者姓名或电话..."
              className="w-full pl-10 pr-10 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
            />
            {searchKeyword && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
