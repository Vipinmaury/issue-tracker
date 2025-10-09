import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ 
  column, 
  tasks, 
  onDragOver, 
  onDrop, 
  onEdit, 
  onDelete, 
  onStatusChange,
  onDragStart 
}) => {
  return (
    <div className="flex flex-col">
      <div className={`bg-gradient-to-r ${column.color} text-white px-4 py-3 rounded-t-xl shadow-sm`}>
        <h2 className="font-semibold text-lg flex items-center justify-between">
          {column.title}
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
            {tasks.length}
          </span>
        </h2>
      </div>
      
      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, column.id)}
        className={`${column.bgColor} min-h-96 p-4 rounded-b-xl shadow-sm flex-1 space-y-3`}
      >
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onDragStart={onDragStart}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs mt-1">Drag tasks here or create new ones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;