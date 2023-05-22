import React, { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  // Function to handle notifications toggle
  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    // Add your logic here to update the user's notification preferences
  };

  // Function to handle theme change
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    // Add your logic here to update the user's selected theme
  };

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="notifications">
        <h3>Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationsToggle}
          />
          Receive notifications
        </label>
      </div>

      <div className="theme">
        <h3>Theme</h3>
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
