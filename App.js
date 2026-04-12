import { useState, useEffect } from 'react';
import './App.css';
import AddStudent from './components/AddStudent';
import ViewStudents from './components/ViewStudents';

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    fetch('http://localhost:3000/student/view')
      .then(r => r.json())
      .then(setStudents);
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/student/delete/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  return (
    <div className="shell">
      <div className="hero">
        <h1>Student Portfolio</h1>
        <span className="tag">MERN · CRUD</span>
      </div>
      <AddStudent onAdd={fetchStudents} />
      <ViewStudents students={students} onDelete={handleDelete} />
    </div>
  );
}

export default App;