import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const History = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await api.get('/tasks');
                // Filter completed tasks for history
                setTasks(data.filter(t => t.completed));
            } catch (error) {
                console.error("Failed to load history", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) return <div className="loading">Loading history...</div>;

    return (
        <div className="history-page">
            <h2>Activity History</h2>
            <div className="history-list">
                {tasks.length === 0 ? (
                    <p>No completed activities yet.</p>
                ) : (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Category</th>
                                <th>Time Spent</th>
                                <th>Completed On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.category}</td>
                                    <td>{task.timeSpent} min</td>
                                    <td>{new Date(task.updatedAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default History;
