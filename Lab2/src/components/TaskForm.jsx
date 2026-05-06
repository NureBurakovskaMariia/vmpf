import { useState } from 'react';
import api from '../api';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;
        try {
            const response = await api.post('/tasks', { title, description, dueDate });
            onTaskAdded(response.data);
            setTitle(''); setDescription(''); setDueDate('');
        } catch (error) {
            console.error(error);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <form onSubmit={handleSubmit} className="modern-form">
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Нова задача</h3>

            <input
                type="text"
                className="modern-input"
                placeholder="Назва задачі..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />

            <textarea
                className="modern-input"
                placeholder="Детальний опис..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ minHeight: '80px', resize: 'vertical' }}
            />

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Дедлайн:</span>
                <input
                    type="date"
                    className="modern-input"
                    style={{ width: 'auto' }}
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    min={today}
                />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                Створити задачу
            </button>
        </form>
    );
};

export default TaskForm;