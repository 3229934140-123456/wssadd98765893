import { Download, FileSpreadsheet, FileText, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { AbnormalPatient } from '@/types';

interface ExportButtonProps {
  data: AbnormalPatient[];
}

const ExportButton = ({ data }: ExportButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getAbnormalTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      suture_unvisited: '拆线未回访',
      ortho_overdue: '正畸超6周未复诊',
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

  const getAssigneeStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      undispatched: '待分派',
      dispatched: '已分派',
      processing: '跟进中',
      completed: '已完成',
    };
    return labels[status] || status;
  };

  const exportCSV = () => {
    const headers = ['患者姓名', '联系电话', '所属门店', '治疗项目', '异常类型', '异常详情', '上次就诊日期', '超期天数', '爽约次数', '跟进状态', '负责人', '分派状态'];
    
    const rows = data.map(p => [
      p.name,
      p.phone,
      p.clinicName,
      p.treatmentType,
      getAbnormalTypeLabel(p.abnormalType),
      p.abnormalDetail,
      p.lastVisitDate,
      p.daysOverdue,
      p.noShowCount,
      getStatusLabel(p.status),
      p.assignee || '未分派',
      getAssigneeStatusLabel(p.assigneeStatus),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `异常患者名单_${new Date().toLocaleDateString('zh-CN')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const exportJSON = () => {
    const jsonData = data.map(p => ({
      姓名: p.name,
      电话: p.phone,
      门店: p.clinicName,
      治疗项目: p.treatmentType,
      异常类型: getAbnormalTypeLabel(p.abnormalType),
      详情: p.abnormalDetail,
      上次就诊: p.lastVisitDate,
      超期天数: p.daysOverdue,
      爽约次数: p.noShowCount,
      状态: getStatusLabel(p.status),
      负责人: p.assignee || '未分派',
      分派状态: getAssigneeStatusLabel(p.assigneeStatus),
    }));

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `异常患者名单_${new Date().toLocaleDateString('zh-CN')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        导出名单
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-100 py-1 z-50 animate-fade-in">
          <button
            onClick={exportCSV}
            className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-green-600" />
            导出 CSV 格式
          </button>
          <button
            onClick={exportJSON}
            className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3 transition-colors"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            导出 JSON 格式
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
