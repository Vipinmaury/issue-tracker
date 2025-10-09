import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import TaskColumn from './components/TaskColumn';
import TaskModal from './components/TaskModal';
import LoadingScreen from './components/LoadingScreen';
import * as api from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'todo' });
  const [draggedTask, setDraggedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const data = await api.fetchTasks();
      console.log('📊 Loaded tasks:', data);
      setTasks(Array.isArray(data) ? data : []);
      setApiError('');
    } catch (error) {
      console.error('Error loading tasks:', error);
      setApiError('Backend not connected. Demo mode active.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      let savedTask;
      if (editingTask) {
        // Update existing task
        savedTask = await api.updateTask(editingTask._id, formData);
        console.log('📝 Updated task:', savedTask);
        setTasks(tasks.map(t => t._id === savedTask._id ? savedTask : t));
      } else {
        // Create new task
        savedTask = await api.createTask(formData);
        console.log('✨ Created new task:', savedTask);
        
        // Add new task to the list
        setTasks(prevTasks => [...prevTasks, savedTask]);
      }

      closeModal();
      
      // Optionally: Reload all tasks from backend to ensure sync
      // await loadTasks();
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const success = await api.deleteTask(id);
        if (success) {
          console.log('🗑️ Deleted task:', id);
          setTasks(prevTasks => prevTasks.filter(t => t._id !== id));
        } else {
          alert('Failed to delete task. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  const handleEdit = (task) => {
    console.log('✏️ Editing task:', task);
    setEditingTask(task);
    setFormData({ title: task.title, description: task.description, status: task.status });
    setIsModalOpen(true);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      console.log('🔄 Changing status:', taskId, newStatus);
      const updatedTask = await api.updateTaskStatus(taskId, newStatus);
      
      if (updatedTask) {
        console.log('✅ Status changed:', updatedTask);
        setTasks(prevTasks => prevTasks.map(t => t._id === taskId ? updatedTask : t));
      } else {
        // Fallback: update locally if API fails
        console.warn('⚠️ API failed, updating locally');
        setTasks(prevTasks => prevTasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
      }
    } catch (error) {
      console.error('Error changing status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      await handleStatusChange(draggedTask._id, status);
    }
    setDraggedTask(null);
  };

  const openNewTaskModal = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '', status: 'todo' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setFormData({ title: '', description: '', status: 'todo' });
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { id: 'todo', title: 'To Do', color: 'from-slate-500 to-slate-600', bgColor: 'bg-slate-50' },
    { id: 'inprogress', title: 'In Progress', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
    { id: 'done', title: 'Done', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' }
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNewTask={openNewTaskModal}
        apiError={apiError}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <StatsBar tasks={filteredTasks} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {columns.map(column => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={filteredTasks.filter(t => t.status === column.id)}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={closeModal}
        isEditing={!!editingTask}
      />
    </div>
  );
}

export default App;