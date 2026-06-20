import { Bell, Search, ChevronDown, Calendar } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [selectedClinic, setSelectedClinic] = useState('全部门店');
  const selectedDate = '本周 (6月16日 - 6月22日)';

  const clinics = ['全部门店', '北京朝阳店', '北京海淀店', '上海浦东店', '上海徐汇店', '广州天河店', '深圳南山店'];

  return (
    <header className="h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
        <div className="h-6 w-px bg-neutral-200" />
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-neutral-400" />
          <span className="text-neutral-600">{selectedDate}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="搜索患者、医生..."
            className="w-64 pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
          />
        </div>

        <div className="relative">
          <select
            value={selectedClinic}
            onChange={(e) => setSelectedClinic(e.target.value)}
            className="appearance-none pl-4 pr-8 py-2 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all cursor-pointer"
          >
            {clinics.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>

        <button className="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors">
          <Bell className="w-5 h-5 text-neutral-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
        </button>
      </div>
    </header>
  );
};

export default Header;
