import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { Sparkles } from 'lucide-react';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (err) {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleTaskAdded = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(t => (t._id === updatedTask._id ? updatedTask : t)));
    };

    const handleTaskDeleted = (taskId) => {
        setTasks(tasks.filter(t => t._id !== taskId));
    };

    const handleAIGenerate = async (e) => {
        e.preventDefault();
        if (!aiPrompt.trim()) return;
        
        setAiLoading(true);
        setAiError(null);
        try {
            const { data } = await api.post('/ai/planner', { prompt: aiPrompt });
            // AI returned tasks array. We create them in backend.
            // Using Promise.all to save the generated tasks
            const createPromises = data.tasks.map(t => api.post('/tasks', t));
            const results = await Promise.all(createPromises);
            
            const newTasks = results.map(res => res.data);
            setTasks([...newTasks, ...tasks]);
            setAiPrompt('');
        } catch (err) {
            setAiError(err.response?.data?.message || 'AI Generation failed');
        } finally {
            setAiLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading tasks...</div>;

    return (
        <div className="tasks-page">
            <div className="tasks-header">
                <h2>Manage Tasks</h2>
            </div>
            
            <div className="ai-planner">
                <h3><Sparkles size={18} /> AI Task Planner</h3>
                <p>Describe your goal and let AI break it down into tasks.</p>
                <form onSubmit={handleAIGenerate} className="ai-form">
                    <input 
                        type="text" 
                        placeholder="e.g., Prepare for my Java exam tomorrow" 
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        disabled={aiLoading}
                    />
                    <button type="submit" disabled={aiLoading || !aiPrompt.trim()} className="btn-secondary">
                        {aiLoading ? 'Thinking...' : 'Generate'}
                    </button>
                </form>
                {aiError && <div className="error-message">{aiError}</div>}
            </div>

            <TaskForm onTaskAdded={handleTaskAdded} />

            {error && <div className="error-message">{error}</div>}

            <div className="tasks-list">
                {tasks.length === 0 ? (
                    <div className="empty-state">No tasks found. Create one above!</div>
                ) : (
                    tasks.map(task => (
                        <TaskCard 
                            key={task._id} 
                            task={task} 
                            onUpdate={handleTaskUpdated} 
                            onDelete={handleTaskDeleted} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Tasks;
