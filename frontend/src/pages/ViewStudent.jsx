import React, { useState, useEffect } from 'react';
import { getStudentById } from '../services/api';

export default function ViewStudent({ studentId, onEdit, onBack, setToast }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await getStudentById(studentId);
        if (isMounted) setStudent(data);
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to fetch student details.');
          setToast({ type: 'error', message: err.message || 'Student not found.' });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    if (studentId) {
      fetchDetail();
    }
    return () => { isMounted = false; };
  }, [studentId, setToast]);

  const formatYearLabel = (yr) => {
    switch (parseInt(yr, 10)) {
      case 1: return '1st Year';
      case 2: return '2nd Year';
      case 3: return '3rd Year';
      case 4: return '4th Year';
      default: return `${yr} Year`;
    }
  };

  return (
    <div className="view-student-page">
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>Student Details</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Full record profile loaded from SQLite database</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onBack}>
            ← Back to Students
          </button>
        </div>

        {loading ? (
          <div className="empty-state">
            <span className="loading-spinner" style={{ width: '32px', height: '32px', borderTopColor: 'var(--primary-color)' }}></span>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading student profile...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <div className="empty-title" style={{ color: 'var(--accent-red)' }}>Student Not Found</div>
            <p style={{ marginBottom: '1.5rem' }}>{error}</p>
            <button className="btn btn-secondary" onClick={onBack}>
              Return to Student List
            </button>
          </div>
        ) : student ? (
          <div>
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label">Student ID</div>
                <div className="detail-value" style={{ fontFamily: 'monospace', color: 'var(--accent-blue)' }}>
                  #{student.student_id}
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Full Name</div>
                <div className="detail-value">{student.name}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Email Address</div>
                <div className="detail-value" style={{ fontSize: '0.95rem' }}>{student.email}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Department</div>
                <div className="detail-value">
                  <span className="badge badge-dept" style={{ fontSize: '0.85rem' }}>
                    {student.department}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Year of Study</div>
                <div className="detail-value">
                  <span className="badge badge-year" style={{ fontSize: '0.85rem' }}>
                    {formatYearLabel(student.year)}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Phone Number</div>
                <div className="detail-value" style={{ fontFamily: 'monospace' }}>{student.phone}</div>
              </div>
            </div>

            <div className="form-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-secondary" onClick={onBack}>
                Back to Students
              </button>
              <button className="btn btn-primary" onClick={() => onEdit(student)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit Student
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
