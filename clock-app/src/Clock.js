import React, { useState, useEffect } from 'react';
import './Clock.css';

function Clock() {
  const [time, setTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timezones = [
    { name: 'UTC', offset: 0, label: 'Coordinated Universal Time' },
    { name: 'EST', offset: -5, label: 'Eastern Standard Time' },
    { name: 'CST', offset: -6, label: 'Central Standard Time' },
    { name: 'MST', offset: -7, label: 'Mountain Standard Time' },
    { name: 'PST', offset: -8, label: 'Pacific Standard Time' },
    { name: 'GMT', offset: 0, label: 'Greenwich Mean Time' },
    { name: 'CET', offset: 1, label: 'Central European Time' },
    { name: 'IST', offset: 5.5, label: 'Indian Standard Time' },
    { name: 'JST', offset: 9, label: 'Japan Standard Time' },
    { name: 'AEST', offset: 10, label: 'Australian Eastern Time' },
    { name: 'NZST', offset: 12, label: 'New Zealand Standard Time' },
  ];

  const getTimeInTimezone = (timezone) => {
    const tzOffset = timezones.find(tz => tz.name === timezone)?.offset || 0;
    const utcDate = new Date(time.getTime() + time.getTimezoneOffset() * 60000);
    const tzDate = new Date(utcDate.getTime() + tzOffset * 60 * 60 * 1000);
    return tzDate;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tzDate = getTimeInTimezone(selectedTimezone);
  const selectedTz = timezones.find(tz => tz.name === selectedTimezone);

  return (
    <div className="clock-container">
      <div className="clock-wrapper">
        <div className="main-clock">
          <div className="clock-header">
            <h1>Global Digital Clock</h1>
            <p className="clock-subtitle">Current Time Across Timezones</p>
          </div>

          <div className="timezone-selector">
            <label>Select Timezone:</label>
            <select 
              value={selectedTimezone} 
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="timezone-dropdown"
            >
              {timezones.map((tz) => (
                <option key={tz.name} value={tz.name}>
                  {tz.name} - {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div className="main-display">
            <div className="time-display">
              <div className="digital-time">
                {formatTime(tzDate)}
              </div>
              <div className="timezone-info">
                <span className="tz-name">{selectedTimezone}</span>
                <span className="tz-offset">
                  UTC {selectedTz?.offset >= 0 ? '+' : ''}{selectedTz?.offset}
                </span>
              </div>
            </div>

            <div className="date-display">
              {formatDate(tzDate)}
            </div>
          </div>

          <div className="all-timezones">
            <h2>All Timezones</h2>
            <div className="timezone-grid">
              {timezones.map((tz) => {
                const tzTime = getTimeInTimezone(tz.name);
                return (
                  <div 
                    key={tz.name} 
                    className={`timezone-card ${selectedTimezone === tz.name ? 'active' : ''}`}
                    onClick={() => setSelectedTimezone(tz.name)}
                  >
                    <div className="tz-card-name">{tz.name}</div>
                    <div className="tz-card-time">
                      {formatTime(tzTime)}
                    </div>
                    <div className="tz-card-offset">
                      UTC {tz.offset >= 0 ? '+' : ''}{tz.offset}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="local-time">
            <h3>Your Local Time</h3>
            <div className="local-display">
              <div className="local-time-text">{formatTime(time)}</div>
              <div className="local-date-text">{formatDate(time)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
