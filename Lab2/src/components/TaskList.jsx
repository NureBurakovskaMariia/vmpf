import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const token = localStorage.getItem('token');
    let isAdmin = false;
    if (token) {
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            isAdmin = decodedToken.role === 'ADMIN';
        } catch (error) {}
    }

    useEffect(() => {
        api.get('/tasks').then(res => setTasks(res.data)).catch(console.error);
    }, []);

    const handleTaskAdded = (newTask) => setTasks([...tasks, newTask]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) { console.error(error); }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/tasks/${id}`, { status: newStatus });
            setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
        } catch (error) { console.error(error); }
    };

    return (
        <div>
            <TaskForm onTaskAdded={handleTaskAdded} />

            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>Всі задачі</h3>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Всього: {tasks.length}</span>
            </div>

            {tasks.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>Задач поки немає.</p>
            ) : (
                <ul className="task-list">
                    {tasks.map(task => (
                        <li key={task.id} className="task-card">
                            <div className="task-header">
                                <div>
                                    <h4 className="task-title">{task.title}</h4>
                                    {task.dueDate && (
                                        <p className="task-date">До: {new Date(task.dueDate).toLocaleDateString()}</p>
                                    )}
                                </div>
                                <span className={`status-badge status-${task.status}`}>
                                    {task.status.replace('-', ' ')}
                                </span>
                            </div>

                            <div className="task-actions">
                                <select
                                    className="modern-input"
                                    style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                >
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>

                                <Link to={`/task/${task.id}`} className="btn btn-outline" style={{ textDecoration: 'none', padding: '0.45rem 1rem' }}>
                                    Деталі
                                </Link>

                                {isAdmin && (
                                    <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>
                                        Видалити
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;