const students = [
  { id: 1, firstName: 'Aarav', lastName: 'Sharma', email: 'aarav@gmail.com', phone: '+91-9876543210', category: 'students', status: 'active', gpa: 3.8 },
  { id: 2, firstName: 'Priya', lastName: 'Patel', email: 'priya@gmail.com', phone: '+91-9876543211', category: 'education', status: 'active', gpa: 3.9 },
  { id: 3, firstName: 'Rohit', lastName: 'Kumar', email: 'rohit@gmail.com', phone: '+91-9876543212', category: 'finance', status: 'active', gpa: 3.7 }
];

document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
});

function updateDashboard() {
  const total = students.length;
  document.getElementById('totalStudents').textContent = total;
  document.getElementById('activeStudents').textContent = students.filter(s => s.status === 'active').length;
  document.getElementById('avgGPA').textContent = (students.reduce((sum, s) => sum + s.gpa, 0) / total).toFixed(1);
  document.getElementById('totalFinance').textContent = '$' + (total * 50000).toLocaleString();

  const recent = document.getElementById('recentStudents');
  recent.innerHTML = students.map(student => `
    <div class="student-card">
      <div><strong>${student.firstName} ${student.lastName}</strong></div>
      <div>${student.email}</div>
      <div>${student.phone}</div>
      <div>GPA: ${student.gpa}</div>
    </div>
  `).join('');
}

function openAddStudentModal() { alert('Add Student modal is ready to be connected.'); }
function loadStudents() { updateDashboard(); }
