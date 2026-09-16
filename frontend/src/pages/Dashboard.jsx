import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Activity, Clock, CheckCircle, Target } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/tasks/stats');
                setStats(data);
            } catch (err) {
                setError('Failed to load dashboard statistics.');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="loading">Loading dashboard...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <Activity className="stat-icon" />
                    <div className="stat-info">
                        <h3>Total Tasks</h3>
                        <p>{stats?.totalTasks || 0}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <CheckCircle className="stat-icon" />
                    <div className="stat-info">
                        <h3>Completed</h3>
                        <p>{stats?.completedTasks || 0}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <Clock className="stat-icon" />
                    <div className="stat-info">
                        <h3>Time Spent</h3>
                        <p>{Math.floor((stats?.totalTimeSpent || 0) / 60)}h {(stats?.totalTimeSpent || 0) % 60}m</p>
                    </div>
                </div>
                <div className="stat-card">
                    <Target className="stat-icon" />
                    <div className="stat-info">
                        <h3>Estimated Time</h3>
                        <p>{Math.floor((stats?.totalEstimatedTime || 0) / 60)}h {(stats?.totalEstimatedTime || 0) % 60}m</p>
                    </div>
                </div>
            </div>

            <div className="category-breakdown">
                <h3>Category Breakdown</h3>
                {stats?.categoryBreakdown?.length > 0 ? (
                    <ul>
                        {stats.categoryBreakdown.map(cat => (
                            <li key={cat._id}>
                                <span>{cat._id || 'Uncategorized'}</span>
                                <span>{cat.count} tasks</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No category data available yet.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
