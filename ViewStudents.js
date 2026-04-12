function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}


function ViewStudents({ students = [], onDelete }) {
  return (
    <div className="card">
      <div className="card-title">All Students</div>
      {students.length === 0
        ? <div className="empty">No students yet.</div>
        : students.map(s => (
          <div className="student-row" key={s._id}>
            <div className="avatar">{initials(s.name)}</div>
            <div style={{flex:1}}>
              <div className="student-name">{s.name}</div>
              <div className="student-meta">{s.email}</div>
            </div>
            <span className="badge">{s.course}</span>
            <button className="del-btn" onClick={() => onDelete(s._id)}>Remove</button>
          </div>
        ))
      }
    </div>
  );
}

export default ViewStudents;