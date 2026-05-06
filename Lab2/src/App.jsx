import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import Auth from './components/Auth';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <BrowserRouter>
            <div className="app-container">
                <header className="app-header">
                    <h1>Управління задачами</h1>
                    {isAuthenticated && (
                        <button className="btn btn-outline" onClick={handleLogout}>
                            Вийти
                        </button>
                    )}
                </header>

                <Routes>
                    {!isAuthenticated ? (
                        <Route path="*" element={<Auth onAuthSuccess={() => setIsAuthenticated(true)} />} />
                    ) : (
                        <>
                            <Route path="/" element={<TaskList />} />
                            <Route path="/task/:id" element={<TaskDetails />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;