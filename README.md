# 📋 Issue Tracker

A full-stack issue management application with a modern React frontend and Node.js/Express backend. Organize, track, and manage issues efficiently with a beautiful, intuitive interface.

---

## ✨ Features

- **Create & Manage Issues** — Add new issues with title, description, and status
- **Real-time Status Tracking** — Track issues across Todo, In Progress, and Done
- **Beautiful Dashboard** — Modern UI with statistics and responsive layout
- **Modal Forms** — Clean interface for creating and editing issues
- **Responsive Design** — Works perfectly on desktop, tablet, and mobile
- **API Integration** — Seamless frontend-backend communication with fallback support
- **MongoDB Storage** — Persistent data in the cloud
- **Error Handling** — Graceful fallbacks and error messages

---

## 🛠️ Tech Stack

**Frontend**
- React 18
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Fetch API

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose
- CORS

---

## 📁 Full Project Structure

```
issue-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Top navigation bar
│   │   │   ├── StatsBar.jsx        # Statistics dashboard
│   │   │   ├── TaskColumn.jsx      # Status column (Todo/In Progress/Done)
│   │   │   ├── TaskModal.jsx       # Create/edit issue modal
│   │   │   └── LoadingScreen.jsx   # Loading indicator
│   │   ├── services/
│   │   │   └── api.js              # API client
│   │   ├── App.jsx                 # Main component
│   │   ├── App.css                 # Global styles
│   │   ├── index.css               # Base styles
│   │   └── main.jsx                # Entry point
│   ├── public/                     # Static assets
│   ├── vite.config.js              # Vite configuration with proxy
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── models/
│   │   └── Task.js                 # MongoDB schema
│   ├── routes/
│   │   └── tasks.js                # API routes
│   ├── server.js                   # Express setup
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── README.md
│
└── README.md (this file)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/issuetracker
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   You should see:
   ```
   ✅ MongoDB connected
   🚀 Server running on port 5000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Opens at `http://localhost:5173`

---

## 📡 API Reference

### Base URL
```
http://localhost:5000/api/tasks
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Fetch all issues |
| `POST` | `/api/tasks` | Create a new issue |
| `PUT` | `/api/tasks/:id` | Update entire issue |
| `PATCH` | `/api/tasks/:id/status` | Update issue status only |
| `DELETE` | `/api/tasks/:id` | Delete an issue |

### Request/Response Examples

**Create Issue**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fix login bug",
    "description": "Users cannot login with email",
    "status": "todo"
  }'
```

**Response (201 Created)**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Fix login bug",
  "description": "Users cannot login with email",
  "status": "todo",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Update Status**
```bash
curl -X PATCH http://localhost:5000/api/tasks/507f1f77bcf86cd799439011/status \
  -H "Content-Type: application/json" \
  -d '{"status": "inprogress"}'
```

**Delete Issue**
```bash
curl -X DELETE http://localhost:5000/api/tasks/507f1f77bcf86cd799439011
```

---

## 🎯 Frontend Components

### **Header**
Top navigation component with branding and controls.

```jsx
import Header from './components/Header';

<Header />
```

### **StatsBar**
Displays statistics about issues (total, completed, in progress, etc.).

```jsx
import StatsBar from './components/StatsBar';

<StatsBar stats={taskStats} />
```

### **TaskColumn**
Renders a column for a specific status with issue cards. Displays issues grouped by status.

```jsx
import TaskColumn from './components/TaskColumn';

<TaskColumn 
  title="To Do" 
  status="todo" 
  tasks={todoIssues}
  onUpdateStatus={handleStatusChange}
  onDelete={handleDelete}
/>
```

### **TaskModal**
Modal form for creating or editing issues. Handles form validation and submission.

```jsx
import TaskModal from './components/TaskModal';

<TaskModal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleCreateIssue}
/>
```

### **LoadingScreen**
Full-screen loading indicator shown while fetching data from backend.

```jsx
import LoadingScreen from './components/LoadingScreen';

{isLoading && <LoadingScreen />}
```

---

## 🔌 API Integration (Frontend)

The frontend communicates with the backend through `services/api.js`. All requests use the Vite proxy for seamless communication.

### API Functions

```javascript
import * as api from './services/api';

// Fetch all issues
const issues = await api.fetchTasks();

// Create new issue
const newIssue = await api.createTask({
  title: 'Fix authentication bug',
  description: 'Users cannot login with social accounts',
  status: 'todo'
});

// Update entire issue
const updated = await api.updateTask(issueId, {
  title: 'Updated title',
  description: 'Updated description',
  status: 'inprogress'
});

// Update status only
await api.updateTaskStatus(issueId, 'done');

// Delete issue
await api.deleteTask(issueId);
```

### Vite Proxy Configuration

The frontend automatically routes API requests to the backend:

```javascript
// vite.config.js
server: {
  port: 5173,
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      changeOrigin: true,
      secure: false,
    },
  },
}
```

**How it works:** Requests to `/api/tasks` from the frontend automatically forward to `http://localhost:5000/api/tasks`.

---

## 📊 Data Schema

### Issue Schema (Backend - MongoDB)

```javascript
{
  _id: ObjectId,
  title: String (required, trimmed),
  description: String (default: ''),
  status: String (enum: ['todo', 'inprogress', 'done'], default: 'todo'),
  createdAt: Date (default: current timestamp)
}
```

### Status Values

- `'todo'` — Issue not started
- `'inprogress'` — Issue currently being worked on
- `'done'` — Issue completed

---

## 🎨 Styling

### Tailwind CSS

All components use Tailwind's utility classes. Configuration in `tailwind.config.js`.

### Status Colors

- **Todo** — Blue (#3b82f6)
- **In Progress** — Yellow (#f59e0b)
- **Done** — Green (#10b981)

### Responsive Breakpoints

- **Mobile** — Single column layout
- **Tablet** — Two-column layout
- **Desktop** — Three-column layout (Todo, In Progress, Done)

---

## 🔄 Workflow

### Creating an Issue

1. Frontend: User clicks "New Issue" button
2. Frontend: Modal opens with form inputs
3. Frontend: User fills title and description
4. Frontend: Calls `api.createTask()` → sends POST to `/api/tasks`
5. Backend: Validates data and creates MongoDB document
6. Backend: Returns new issue with `_id`
7. Frontend: Adds issue to Todo column in real-time
8. Frontend: Closes modal and refreshes stats

### Updating Issue Status

1. Frontend: User clicks issue card and changes status
2. Frontend: Calls `api.updateTaskStatus()` → sends PATCH to `/api/tasks/:id/status`
3. Backend: Updates MongoDB document with new status
4. Backend: Returns updated issue
5. Frontend: Moves issue to new column
6. Frontend: Updates statistics

### Deleting an Issue

1. Frontend: User clicks delete button
2. Frontend: Calls `api.deleteTask()` → sends DELETE to `/api/tasks/:id`
3. Backend: Removes MongoDB document
4. Backend: Returns success message
5. Frontend: Removes issue from column
6. Frontend: Updates statistics

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Verify `MONGO_URI` in `.env` is correct
- Check MongoDB Atlas network access settings
- Ensure MongoDB service is running (if local)

**Server won't start**
- Check if port 5000 is already in use: `lsof -i :5000`
- Verify all dependencies are installed: `npm install`
- Check `.env` file exists and is properly formatted

**API returns 400 Bad Request**
- Ensure status values are lowercase: `'todo'`, `'inprogress'`, `'done'`
- Verify title is included in request (required field)
- Check request payload in DevTools Network tab

### Frontend Issues

**API requests failing / 400 errors**
- Check if backend is running on port 5000
- Verify Vite proxy is configured correctly in `vite.config.js`
- Open DevTools (F12) → Network tab to see actual requests
- Check browser console for errors

**Components not rendering**
- Verify all imports are correct
- Check browser console for JavaScript errors
- Ensure parent component is passing props correctly

**Styling issues**
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild if needed: `npm run build`
- Verify `tailwind.config.js` configuration

**Modal not opening**
- Check `isModalOpen` state management
- Verify button `onClick` handler is connected
- Check browser console for errors

### Connection Issues

**Network Error / 404**
1. Backend running? → Check terminal for "Server running on port 5000"
2. Frontend proxy working? → Open DevTools and check Network tab
3. Port conflicts? → Change port in `vite.config.js` or `server.js`

**CORS Errors**
- Backend should have `app.use(cors())` enabled
- Verify `vite.config.js` proxy `target` matches backend URL
- Check if backend CORS headers are being sent

---

## 📚 Useful Commands

### Backend
```bash
cd backend
npm install      # Install dependencies
npm start        # Start server
npm run dev      # Start with nodemon (auto-reload)
```

### Frontend
```bash
cd frontend
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/issuetracker
```

### Frontend (.env) [Optional]
```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Issue Tracker
```

Access in React components:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🚀 Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
```
Creates `dist/` folder ready for deployment.

### Deploy Backend
1. Push code to GitHub/GitLab
2. Deploy to hosting (Heroku, Railway, Render, etc.)
3. Set environment variables on hosting platform
4. Update frontend API URL to production backend

### Recommended Hosting

**Frontend:** Vercel, Netlify, Surge
**Backend:** Heroku, Railway, Render, DigitalOcean
**Database:** MongoDB Atlas (cloud)

---

## 💡 Future Enhancements

- [ ] Drag-and-drop between columns
- [ ] Issue filtering and search
- [ ] User authentication & authorization
- [ ] Issue comments and activity log
- [ ] Dark mode toggle
- [ ] Export issues to CSV/PDF
- [ ] Team collaboration features
- [ ] Priority levels
- [ ] Due dates and reminders
- [ ] Real-time WebSocket updates

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — Feel free to use this project in your own applications.

---

## 📞 Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check existing documentation
- Review troubleshooting section

---

**Made with ❤️ by the Issue Tracker Team**

**Happy tracking! 🚀**