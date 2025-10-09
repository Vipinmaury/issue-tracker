import React from 'react';
import { Circle, Clock, CheckCircle2 } from 'lucide-react';

const StatsBar = ({ tasks }) => {
  const stats = [
    {
      label: 'To Do',
      count: tasks.filter(t => t.status === 'todo').length,
      icon: Circle,
      iconColor: 'text-slate-500',
      textColor: 'text-slate-800',
      bgColor: 'bg-slate-100'
    },
    {
      label: 'In Progress',
      count: tasks.filter(t => t.status === 'inprogress').length,
      icon: Clock,
      iconColor: 'text-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Done',
      count: tasks.filter(t => t.status === 'done').length,
      icon: CheckCircle2,
      iconColor: 'text-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {stat.label}
                </p>
                <p className={`text-xl sm:text-2xl font-bold ${stat.textColor} mt-1`}>
                  {stat.count}
                </p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsBar;