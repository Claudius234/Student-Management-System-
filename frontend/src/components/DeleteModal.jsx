import React from 'react';

export default function DeleteModal({ student, onConfirm, onCancel, isDeleting }) {
  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Delete Student</h3>
        <p className="modal-body">
          Are you sure you want to delete this student?
        </p>
        {student && (
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--card-border)' }}>
            <div style={{ color: 'white', fontWeight: '600' }}>{student.name}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ID: {student.student_id} | {student.email}</div>
          </div>
        )}
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => onConfirm(student.student_id)} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <span className="loading-spinner"></span> Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
