import React from 'react';
import { Edit2, Trash2, GripVertical, Circle, Clock, CheckCircle2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, onDragStart }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'todo': return <Circle className="w-5 h-5 text-slate-400" />;
      case 'inprogress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'done': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-move group"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-1">
            <GripVertical className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <h3 className="font-semibold text-slate-800 line-clamp-2">
              {task.title}
            </h3>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit task"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <p className="text-slate-600 text-sm mb-3 line-clamp-3">
          {task.description}
        </p>
        
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <div className="flex gap-1">
            {['todo', 'inprogress', 'done'].map(status => (
              <button
                key={status}
                onClick={() => onStatusChange(task._id, status)}
                className={`p-1.5 rounded-lg transition-all ${
                  task.status === status 
                    ? 'bg-slate-100' 
                    : 'hover:bg-slate-50 opacity-40 hover:opacity-100'
                }`}
                title={status === 'inprogress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
              >
                {getStatusIcon(status)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;