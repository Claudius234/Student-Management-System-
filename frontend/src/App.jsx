import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import DeleteModal from './components/DeleteModal';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import ViewStudent from './pages/ViewStudent';
import { getStudents, deleteStudent } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search & Filters
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [yearFilter, setYearFilter] = useState('All Years');

  // Selected student for view/edit/delete
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Global Toast
  const [toast, setToast] = useState(null);

  // Fetch students from Django REST API
  const fetchStudentsList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudents(search, departmentFilter, yearFilter);
      setStudents(data);

      // If unfiltered, update total count
      if (!search && departmentFilter === 'All Departments' && yearFilter === 'All Years') {
        setTotalCount(data.length);
      }
    } catch (err) {
      setError(err.message || 'Unable to connect to the server. Please make sure the Django backend is running.');
    } finally {
      setLoading(false);
    }
  }, [search, departmentFilter, yearFilter]);

  // Initial fetch and on filter/tab changes
  useEffect(() => {
    fetchStudentsList();
  }, [fetchStudentsList]);

  // Separate call to maintain accurate total student count for dashboard
  useEffect(() => {
    async function fetchTotal() {
      try {
        const data = await getStudents();
        setTotalCount(data.length);
      } catch (err) {
        // Silently handled by primary fetch
      }
    }
    fetchTotal();
  }, [activeTab]);

  // View Handler
  const handleView = (student) => {
    setSelectedStudent(student);
    setActiveTab('view');
  };

  // Edit Handler
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setActiveTab('edit');
  };

  // Delete Handlers
  const handleDeleteRequest = (student) => {
    setDeleteTarget(student);
  };

  const handleConfirmDelete = async (studentId) => {
    setIsDeleting(true);
    try {
      const res = await deleteStudent(studentId);
      setToast({ type: 'success', message: res.message || 'Student deleted successfully.' });
      setDeleteTarget(null);
      await fetchStudentsList();
      
      // Update total count
      const updatedList = await getStudents();
      setTotalCount(updatedList.length);

      if (activeTab === 'view' && selectedStudent?.student_id === studentId) {
        setActiveTab('students');
      }
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to delete student.' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="app-container">
        {activeTab === 'dashboard' && (
          <Dashboard
            studentCount={totalCount}
            loading={loading}
            error={error}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'students' && (
          <StudentList
            students={students}
            loading={loading}
            error={error}
            search={search}
            setSearch={setSearch}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            yearFilter={yearFilter}
            setYearFilter={setYearFilter}
            onView={handleView}
            onEdit={handleEdit}
            onDeleteRequest={handleDeleteRequest}
            onAddNew={() => setActiveTab('add')}
          />
        )}

        {activeTab === 'add' && (
          <AddStudent
            onSuccess={() => {
              setActiveTab('students');
              fetchStudentsList();
            }}
            onCancel={() => setActiveTab('students')}
            setToast={setToast}
          />
        )}

        {activeTab === 'edit' && selectedStudent && (
          <EditStudent
            student={selectedStudent}
            onSuccess={() => {
              setActiveTab('students');
              fetchStudentsList();
            }}
            onCancel={() => setActiveTab('students')}
            setToast={setToast}
          />
        )}

        {activeTab === 'view' && selectedStudent && (
          <ViewStudent
            studentId={selectedStudent.student_id}
            onEdit={(st) => handleEdit(st)}
            onBack={() => setActiveTab('students')}
            setToast={setToast}
          />
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        student={deleteTarget}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />

      {/* Global Toast Alerts */}
      <Toast toast={toast} setToast={setToast} />
    </div>
  );
}
