import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Home, CheckSquare, Clock, Settings as SettingsIcon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <h1>TimeWise</h1>
            </div>
            <ul className="nav-links">
                <li><Link to="/dashboard"><Home size={18} /> Dashboard</Link></li>
                <li><Link to="/tasks"><CheckSquare size={18} /> Tasks</Link></li>
                <li><Link to="/history"><Clock size={18} /> History</Link></li>
                <li><Link to="/settings"><SettingsIcon size={18} /> Settings</Link></li>
            </ul>
            <div className="nav-user">
                <span>{user?.name}</span>
                <button onClick={handleLogout} className="btn-logout"><LogOut size={16} /> Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
