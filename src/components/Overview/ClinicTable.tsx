import { ArrowUpDown, ArrowUp, ArrowDown, ChevronRight, ChevronDown, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import type { ClinicData, ClinicTreatmentBreakdown } from '@/types';

type SortKey = 'name' | 'appointments' | 'arrivals' | 'arrivalRate' | 'noShowRate' | 'rescheduleRate';
type SortOrder = 'asc' | 'desc';

interface ClinicTableProps {
  data: ClinicData[];
  breakdownData: ClinicTreatmentBreakdown[];
  onClinicClick?: (clinic: ClinicData) => void;
}

const ClinicTable = ({ data, breakdownData, onClinicClick }: ClinicTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>('noShowRate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const toggleRow = (clinicId: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(clinicId)) {
        next.delete(clinicId);
      } else {
        next.add(clinicId);
      }
      return next;
    });
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const SortIcon = ({ active, order }: { active: boolean; order: SortOrder }) => {
    if (!active) return <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />;
    return order === 'asc'
      ? <ArrowUp className="w-3.5 h-3.5 text-primary-600" />
      : <ArrowDown className="w-3.5 h-3.5 text-primary-600" />;
  };

  const getRateColor = (rate: number, type: 'noShow' | 'reschedule' | 'arrival') => {
    if (type === 'noShow') {
      if (rate >= 11) return 'text-danger-600 bg-danger-50';
      if (rate >= 8) return 'text-warning-600 bg-warning-50';
      return 'text-success-600 bg-success-50';
    }
    if (type === 'arrival') {
      if (rate >= 88) return 'text-success-600 bg-success-50';
      if (rate >= 83) return 'text-warning-600 bg-warning-50';
      return 'text-danger-600 bg-danger-50';
    }
    return 'text-neutral-600 bg-neutral-100';
  };

  return (
    <div className="content-card">
      <div className="px-6 py-4 border-b border-neutral-100">
        <h3 className="text-base font-semibold text-neutral-800">各门店执行情况</h3>
        <p className="text-sm text-neutral-500 mt-0.5">点击表头可排序，点击门店行可展开查看治疗项目明细</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th
                className="px-6 py-3 text-left table-header cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1.5">
                  门店名称
                  <SortIcon active={sortKey === 'name'} order={sortOrder} />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right table-header cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => handleSort('appointments')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  预约数
                  <SortIcon active={sortKey === 'appointments'} order={sortOrder} />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right table-header cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => handleSort('arrivals')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  到诊人数
                  <SortIcon active={sortKey === 'arrivals'} order={sortOrder} />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right table-header cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => handleSort('arrivalRate')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  到诊率
                  <SortIcon active={sortKey === 'arrivalRate'} order={sortOrder} />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right table-header cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => handleSort('noShowRate')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  爽约率
                  <SortIcon active={sortKey === 'noShowRate'} order={sortOrder} />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right table-header cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => handleSort('rescheduleRate')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  改约率
                  <SortIcon active={sortKey === 'rescheduleRate'} order={sortOrder} />
                </div>
              </th>
              <th className="px-6 py-3 text-right table-header">完成度</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {sortedData.map((clinic, index) => {
              const isExpanded = expandedRows.has(clinic.id);
              const clinicBreakdown = breakdownData.filter(item => item.clinicId === clinic.id);

              return (
                <>
                  <tr
                    key={clinic.id}
                    className="hover:bg-neutral-50/50 transition-colors cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => toggleRow(clinic.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {isExpanded
                          ? <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                          : <ChevronRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                        }
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 text-xs font-bold">
                          {clinic.name.slice(0, 2)}
                        </div>
                        <span className="text-sm font-medium text-neutral-800">{clinic.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClinicClick?.(clinic);
                          }}
                          className="ml-auto w-7 h-7 rounded-lg bg-neutral-100 hover:bg-primary-100 text-neutral-500 hover:text-primary-600 flex items-center justify-center transition-all group"
                          title="查看近4周趋势"
                        >
                          <BarChart3 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-neutral-800 font-mono">{clinic.appointments}</span>
                      <span className="text-xs text-neutral-400 ml-1">人次</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-neutral-800 font-mono">{clinic.arrivals}</span>
                      <span className="text-xs text-neutral-400 ml-1">人</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${getRateColor(clinic.arrivalRate, 'arrival')}`}>
                        {clinic.arrivalRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${getRateColor(clinic.noShowRate, 'noShow')}`}>
                        {clinic.noShowRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-neutral-600 font-mono">{clinic.rescheduleRate}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 progress-bar min-w-[80px]">
                          <div
                            className={`progress-fill ${
                              clinic.arrivalRate >= 88 ? 'bg-success-500' :
                              clinic.arrivalRate >= 83 ? 'bg-warning-500' : 'bg-danger-500'
                            }`}
                            style={{ width: `${clinic.arrivalRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && clinicBreakdown.length > 0 && (
                    <tr key={`${clinic.id}-breakdown`}>
                      <td colSpan={7} className="p-0">
                        <div className="bg-neutral-50 pl-14 pr-6 py-3">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-neutral-200">
                                <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500">治疗项目</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-neutral-500">预约数</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-neutral-500">到诊人数</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-neutral-500">到诊率</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-neutral-500">爽约率</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-neutral-500">改约率</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                              {clinicBreakdown.map(item => (
                                <tr key={`${item.clinicId}-${item.treatment}`} className="hover:bg-neutral-100/50">
                                  <td className="px-4 py-2.5 text-sm text-neutral-700">{item.treatment}</td>
                                  <td className="px-4 py-2.5 text-right text-sm font-semibold text-neutral-800 font-mono">{item.appointments}</td>
                                  <td className="px-4 py-2.5 text-right text-sm font-semibold text-neutral-800 font-mono">{item.arrivals}</td>
                                  <td className="px-4 py-2.5 text-right">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${getRateColor(item.arrivalRate, 'arrival')}`}>
                                      {item.arrivalRate}%
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5 text-right">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${getRateColor(item.noShowRate, 'noShow')}`}>
                                      {item.noShowRate}%
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5 text-right text-sm text-neutral-600 font-mono">{item.rescheduleRate}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClinicTable;
