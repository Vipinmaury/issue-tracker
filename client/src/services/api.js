// API Configuration - Uses Vite proxy (no need for full URL)
const API_URL = '/api/tasks';

// Demo data for fallback (only used if backend is completely down)
const DEMO_TASKS = [
  {
    _id: '1',
    title: 'Setup Backend API',
    description: 'Configure the backend API endpoints for task management',
    status: 'done'
  },
  {
    _id: '2',
    title: 'Design UI Components',
    description: 'Create modern and responsive UI components for the tracker',
    status: 'done'
  },
  {
    _id: '3',
    title: 'Implement Drag & Drop',
    description: 'Add drag and drop functionality for task status updates',
    status: 'inprogress'
  },
  {
    _id: '4',
    title: 'Add Search Feature',
    description: 'Implement search functionality to filter tasks',
    status: 'todo'
  }
];

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Fetched tasks from backend:', data);
    return data;
  } catch (error) {
    console.error('❌ API Error (fetchTasks):', error);
    console.warn('⚠️ Using demo data as fallback');
    return DEMO_TASKS;
  }
};

// Create new task
export const createTask = async (task) => {
  try {
    console.log('🔄 Creating task:', task);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Task created successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ API Error (createTask):', error);
    // Return task with temporary ID as fallback
    const fallbackTask = { ...task, _id: `temp_${Date.now()}` };
    console.warn('⚠️ Using fallback task:', fallbackTask);
    return fallbackTask;
  }
};

// Update task
export const updateTask = async (id, task) => {
  try {
    console.log('🔄 Updating task:', id, task);
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Task updated successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ API Error (updateTask):', error);
    return { ...task, _id: id };
  }
};

// Update task status only
export const updateTaskStatus = async (id, status) => {
  try {
    console.log('🔄 Updating task status:', id, status);
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Task status updated successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ API Error (updateTaskStatus):', error);
    return null;
  }
};

// Delete task
export const deleteTask = async (id) => {
  try {
    console.log('🔄 Deleting task:', id);
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    console.log('✅ Task deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ API Error (deleteTask):', error);
    return false;
  }
};