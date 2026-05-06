import { useState } from 'react';
import api from '../api';

const Auth = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isLogin) {
                response = await api.post('/user/login', { email, password });
            } else {
                response = await api.post('/user/registration', { email, password, role });
            }

            localStorage.setItem('token', response.data.token);
            onAuthSuccess();
        } catch (error) {
            alert(error.response?.data?.message || "Помилка авторизації");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <form onSubmit={handleSubmit} className="modern-form">
                <h2 style={{ margin: '0 0 1rem 0', textAlign: 'center' }}>{isLogin ? 'Вхід' : 'Реєстрація'}</h2>

                <input
                    type="email"
                    className="modern-input"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="modern-input"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                {!isLogin && (
                    <select
                        className="modern-input"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    >
                        <option value="USER">Користувач</option>
                        <option value="ADMIN">Адміністратор</option>
                    </select>
                )}

                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                    {isLogin ? 'Увійти' : 'Зареєструватися'}
                </button>

                <p
                    style={{ marginTop: '1rem', cursor: 'pointer', color: 'var(--accent)', textAlign: 'center', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onClick={() => setIsLogin(!isLogin)}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-hover)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--accent)'}
                >
                    {isLogin ? 'Немає акаунту? Зареєструйтесь' : 'Вже є акаунт? Увійдіть'}
                </p>
            </form>
        </div>
    );
};

export default Auth;