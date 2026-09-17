import React from 'react';
import { DEPARTMENT_OPTIONS, YEAR_OPTIONS } from '../services/api';

export default function StudentList({
  students,
  loading,
  error,
  search,
  setSearch,
  departmentFilter,
  setDepartmentFilter,
  yearFilter,
  setYearFilter,
  onView,
  onEdit,
  onDeleteRequest,
  onAddNew,
}) {
  const formatYear = (yr) => {
    switch (parseInt(yr, 10)) {
      case 1: return '1st Year';
      case 2: return '2nd Year';
      case 3: return '3rd Year';
      case 4: return '4th Year';
      default: return `${yr} Year`;
    }
  };

  return (
    <div className="student-list-page">
      <div className="glass-card" style={{ padding: '1.5rem 2rem 1rem 2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>Students</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage all registered student records</p>
          </div>
          <button className="btn btn-primary" onClick={onAddNew}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Student
          </button>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="search-box">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search students by ID, Name, Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              className="select-control"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="All Departments">All Departments</option>
              {DEPARTMENT_OPTIONS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              className="select-control"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="All Years">All Years</option>
              {YEAR_OPTIONS.map((y) => (
                <option key={y.value} value={y.value}>{y.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        {loading ? (
          <div className="empty-state">
            <span className="loading-spinner" style={{ width: '32px', height: '32px', borderTopColor: 'var(--primary-color)' }}></span>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading students...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <div className="empty-title" style={{ color: 'var(--accent-red)' }}>Error Loading Data</div>
            <p>{error}</p>
          </div>
        ) : students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="17" y1="8" x2="23" y2="14"></line>
                <line x1="23" y1="8" x2="17" y2="14"></line>
              </svg>
            </div>
            <div className="empty-title">No students found.</div>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {search || departmentFilter !== 'All Departments' || yearFilter !== 'All Years'
                ? 'No student matches your current search or filter criteria.'
                : 'The database is currently empty. Click "Add Student" to create a record.'}
            </p>
            <button className="btn btn-primary btn-sm" onClick={onAddNew}>
              Add Student
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Phone</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.student_id}>
                    <td>
                      <span className="id-badge">#{student.student_id}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{student.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{student.email}</td>
                    <td>
                      <span className="badge badge-dept">{student.department}</span>
                    </td>
                    <td>
                      <span className="badge badge-year">{formatYear(student.year)}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{student.phone}</td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          title="View Details"
                          onClick={() => onView(student)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          title="Edit Student"
                          onClick={() => onEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          title="Delete Student"
                          onClick={() => onDeleteRequest(student)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
