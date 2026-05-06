import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.get(`/tasks/${id}`);
                setTask(response.data);
            } catch (error) {
                console.error("Помилка завантаження задачі:", error);
            }
        };
        fetchTask();
    }, [id]);

    if (!task) return <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Завантаження...</p>;

    return (
        <div className="task-card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <div className="task-header" style={{ marginBottom: '1rem' }}>
                <div>
                    <h2 className="task-title" style={{ fontSize: '1.5rem' }}>{task.title}</h2>
                    {task.dueDate && (
                        <p className="task-date">Дедлайн: {new Date(task.dueDate).toLocaleDateString()}</p>
                    )}
                </div>
                <span className={`status-badge status-${task.status}`}>
                    {task.status.replace('-', ' ')}
                </span>
            </div>

            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <p style={{ margin: 0, color: task.description ? 'var(--text-main)' : 'var(--text-muted)', lineHeight: '1.6', overflowWrap: 'break-word',
                    wordBreak: 'break-word' }}>
                    {task.description ? task.description : 'Опис відсутній.'}
                </p>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                <Link to="/" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                    ← Повернутися до списку
                </Link>
            </div>
        </div>
    );
};

export default TaskDetails;