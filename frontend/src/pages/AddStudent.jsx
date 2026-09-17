import React, { useState } from 'react';
import { createStudent, DEPARTMENT_OPTIONS, YEAR_OPTIONS } from '../services/api';

export default function AddStudent({ onSuccess, onCancel, setToast }) {
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    email: '',
    department: '',
    year: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const errs = {};
    if (!formData.student_id.trim()) {
      errs.student_id = 'Student ID is required.';
    } else if (isNaN(formData.student_id)) {
      errs.student_id = 'Student ID must be a number.';
    }

    if (!formData.name.trim()) {
      errs.name = 'Name is required.';
    } else if (/^\d+$/.test(formData.name.trim())) {
      errs.name = 'Name cannot contain numeric-only values.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter a valid email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.department) {
      errs.department = 'Department is required.';
    }

    if (!formData.year) {
      errs.year = 'Year is required.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else {
      const digits = formData.phone.trim().replace(/\D/g, '');
      if (digits.length < 7 || digits.length > 15) {
        errs.phone = 'Please enter a valid phone number (7 to 15 digits).';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        student_id: parseInt(formData.student_id, 10),
        name: formData.name.trim(),
        email: formData.email.trim(),
        department: formData.department,
        year: parseInt(formData.year, 10),
        phone: formData.phone.trim(),
      };

      const res = await createStudent(payload);
      setToast({ type: 'success', message: res.message || 'Student added successfully.' });
      onSuccess();
    } catch (err) {
      if (err.details) {
        // Backend serializer errors mapping
        const backendErrs = {};
        for (const key in err.details) {
          const val = err.details[key];
          backendErrs[key] = Array.isArray(val) ? val.join(' ') : val;
        }
        setErrors(backendErrs);
        setToast({ type: 'error', message: 'Please fix the errors below.' });
      } else {
        setToast({ type: 'error', message: err.message || 'Failed to add student.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-student-page">
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
          Add Student
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
          Create a new student record in the database.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Student ID */}
            <div className="form-group">
              <label className="form-label">Student ID *</label>
              <input
                type="number"
                name="student_id"
                className="form-control"
                placeholder="e.g. 101"
                value={formData.student_id}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.student_id && <div className="error-text">{errors.student_id}</div>}
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="e.g. john.doe@college.edu"
                value={formData.email}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            {/* Department */}
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select
                name="department"
                className="form-control"
                value={formData.department}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="">Select Department</option>
                {DEPARTMENT_OPTIONS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <div className="error-text">{errors.department}</div>}
            </div>

            {/* Year */}
            <div className="form-group">
              <label className="form-label">Year of Study *</label>
              <select
                name="year"
                className="form-control"
                value={formData.year}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="">Select Year</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y.value} value={y.value}>{y.label}</option>
                ))}
              </select>
              {errors.year && <div className="error-text">{errors.year}</div>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.phone && <div className="error-text">{errors.phone}</div>}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="loading-spinner"></span> Saving...
                </>
              ) : (
                'Add Student'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
