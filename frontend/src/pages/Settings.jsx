import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="settings-page">
            <h2>Settings</h2>
            
            <div className="settings-section">
                <h3>Profile Information</h3>
                <div className="profile-info">
                    <p><strong>Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Role:</strong> <span className="badge">{user?.role}</span></p>
                </div>
            </div>

            <div className="settings-section">
                <h3>Application Preferences</h3>
                <p className="text-muted">Preferences sync is coming soon.</p>
                <div className="form-group row">
                    <label>Theme</label>
                    <select disabled>
                        <option>Light</option>
                        <option>Dark</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Settings;
