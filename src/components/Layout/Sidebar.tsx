import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Trophy, AlertTriangle, Heart, Settings, Bell } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const navItems = [
    { path: '/', label: '复诊概览', icon: LayoutDashboard },
    { path: '/ranking', label: '协同排行', icon: Trophy },
    { path: '/abnormal', label: '异常名单', icon: AlertTriangle },
  ];

  const [active, setActive] = useState('/');

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-neutral-800">悦牙云</h1>
            <p className="text-xs text-neutral-500">复诊运营分析</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setActive(item.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
              active === item.path
                ? 'bg-primary-50 text-primary-700 shadow-sm'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <item.icon className={`w-5 h-5 transition-colors ${
              active === item.path ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-600'
            }`} />
            {item.label}
            {active === item.path && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-100">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
            <span className="text-sm font-semibold text-neutral-600">运</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-800 truncate">运营管理员</p>
            <p className="text-xs text-neutral-500 truncate">总部运营中心</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
