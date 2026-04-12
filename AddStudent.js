import { useState } from 'react';

function AddStudent({ onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', course: '' });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.course) return;
    await fetch('http://localhost:3000/student/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', email: '', course: '' });
    onAdd();
  };

  return (
    <div className="card">
      <div className="card-title">Add Student</div>
      <div className="row">
        <div className="input-wrap">
          <label>Name</label>
          <input placeholder="Arjun Mehta" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div className="input-wrap">
          <label>Email</label>
          <input placeholder="arjun@email.com" value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} />
        </div>
        <div className="input-wrap">
          <label>Course</label>
          <input placeholder="B.Tech CSE" value={form.course}
            onChange={e => setForm({...form, course: e.target.value})} />
        </div>
      </div>
      <button className="btn" onClick={handleSubmit}>Add Student</button>
    </div>
  );
}

export default AddStudent;