import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import { FaTrash } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/tasks';
const statusLabels = { all: "Всі", active: "Активні", completed: "Завершені" };

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (err) {
            console.error("Помилка завантаження:", err);
        }
    };

    const addTask = async (text) => {
        try {
            const response = await axios.post(API_URL, { text });
            setTasks([...tasks, response.data]);
        } catch (err) {
            console.error("Помилка додавання:", err);
        }
    };

    const toggleTask = async (id, currentStatus) => {
        try {
            await axios.put(`${API_URL}/${id}`, { completed: !currentStatus });
            setTasks(tasks.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
        } catch (err) {
            console.error("Помилка оновлення:", err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            console.error("Помилка видалення:", err);
        }
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'completed') return t.completed;
        if (filter === 'active') return !t.completed;
        return true;
    });

    return (
        <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>Мій Todo Список</h1>
            <TodoForm onAdd={addTask} />

            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                {Object.keys(statusLabels).map(key => (
                    <button key={key} onClick={() => setFilter(key)} style={{ background: filter === key ? '#ddd' : '#fff' }}>
                        {statusLabels[key]}
                    </button>
                ))}
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <li key={task.id} style={{
                            display: 'flex', justifyContent: 'space-between', padding: '12px', marginBottom: '8px',
                            borderRadius: '6px', background: task.completed ? '#e8f5e9' : '#fff3e0',
                            borderLeft: `5px solid ${task.completed ? '#4caf50' : '#ff9800'}`
                        }}>
              <span onClick={() => toggleTask(task.id, task.completed)} style={{ cursor: 'pointer', flexGrow: 1, textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
                            <button onClick={() => deleteTask(task.id)} style={{
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                color: 'red',
                                fontSize: '18px',
                                opacity: 0.7
                            }}><FaTrash />️</button>
                        </li>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px', border: '2px dashed #ccc', color: '#888' }}>
                        <p>У категорії "<strong>{statusLabels[filter]}</strong>" завдань немає.</p>
                    </div>
                )}
            </ul>
        </div>
    );
}

export default App;