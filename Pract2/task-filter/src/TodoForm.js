import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value.trim()) return;

        onAdd(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Що потрібно зробити?"
                style={{
                    padding: '10px',
                    width: '70%',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginRight: '10px'
                }}
            />
            <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Додати
            </button>
        </form>
    );
};

export default TodoForm;