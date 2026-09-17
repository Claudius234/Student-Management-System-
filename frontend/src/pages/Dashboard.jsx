import React from 'react';

export default function Dashboard({ studentCount, loading, error, setActiveTab }) {
  return (
    <div className="dashboard-page">
      <div className="glass-card dashboard-hero">
        <h1 className="hero-title">Student Management System</h1>
        <p className="hero-subtitle">
          A full-stack web application designed for seamlessly managing student records with database persistence, live REST API integration, and validation.
        </p>

        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <div className="stat-value">{loading ? '...' : studentCount}</div>
              <div className="stat-label">Total Students</div>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ color: 'var(--accent-red)', marginBottom: '1.5rem', fontSize: '0.925rem' }}>
            {error}
          </div>
        )}

        {studentCount === 0 && !loading && (
          <div style={{ margin: '1.5rem 0 2rem 0', color: 'var(--text-secondary)' }}>
            <p className="empty-title">No students found.</p>
            <p style={{ fontSize: '0.9rem' }}>The database starts completely empty. Get started by manually adding your first student record.</p>
          </div>
        )}

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => setActiveTab('add')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Student
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('students')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            View Students
          </button>
        </div>
      </div>
    </div>
  );
}
