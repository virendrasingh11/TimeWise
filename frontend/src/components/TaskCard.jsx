import React from 'react';
import Timer from './Timer';
import api from '../utils/api';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
    
    const handleToggleComplete = async () => {
        try {
            const { data } = await api.patch(`/tasks/${task._id}`, { completed: !task.completed });
            onUpdate(data);
        } catch (error) {
            console.error("Failed to toggle completion", error);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/tasks/${task._id}`);
            onDelete(task._id);
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    return (
        <div className={`task-card ${task.completed ? 'completed' : ''}`}>
            <div className="task-header">
                <div className="task-title-group">
                    <button onClick={handleToggleComplete} className="btn-icon">
                        {task.completed ? <CheckCircle className="text-success" /> : <Circle />}
                    </button>
                    <h4>{task.title}</h4>
                </div>
                <button onClick={handleDelete} className="btn-icon text-danger" title="Delete">
                    <Trash2 size={16} />
                </button>
            </div>
            
            <div className="task-body">
                <span className="badge category">{task.category || 'General'}</span>
                <span className={`badge priority ${task.priority}`}>{task.priority}</span>
                <span className="badge estimated">Est: {task.estimatedTime}m</span>
            </div>

            <div className="task-footer">
                <Timer task={task} onUpdate={onUpdate} />
            </div>
        </div>
    );
};

export default TaskCard;
