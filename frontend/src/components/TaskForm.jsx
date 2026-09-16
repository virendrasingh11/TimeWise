import React, { useState } from 'react';
import api from '../utils/api';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [priority, setPriority] = useState('medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !estimatedTime || estimatedTime <= 0) {
            setError("Please provide a valid title and estimated time.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/tasks', {
                title,
                category,
                estimatedTime: Number(estimatedTime),
                priority
            });
            onTaskAdded(data);
            setTitle('');
            setCategory('');
            setEstimatedTime('');
            setPriority('medium');
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.message || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h3>Add New Task</h3>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
                <input type="text" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            
            <div className="form-row">
                <input type="text" placeholder="Category (e.g., Study)" value={category} onChange={e => setCategory(e.target.value)} />
                <input type="number" placeholder="Est. Time (min)" value={estimatedTime} onChange={e => setEstimatedTime(e.target.value)} required min="1" />
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
            </div>
            
            <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;
