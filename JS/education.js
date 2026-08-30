/* ========================================== 
   EDUCATION & ACADEMICS PAGE JAVASCRIPT
   Academic Records, Grades, and Progress Management
   ========================================== */

// Sample Academic Data
let academicRecords = [
    {
        id: 1,
        courseId: 'CS101',
        courseName: 'Data Structures',
        semester: '1',
        credits: 4,
        score: 85,
        grade: 'A',
        instructor: 'Dr. John Smith',
        completionDate: '2023-05-15'
    },
    {
        id: 2,
        courseId: 'CS102',
        courseName: 'Algorithms',
        semester: '1',
        credits: 4,
        score: 90,
        grade: 'A+',
        instructor: 'Dr. Sarah Johnson',
        completionDate: '2023-05-20'
    },
    {
        id: 3,
        courseId: 'CS201',
        courseName: 'Database Management',
        semester: '2',
        credits: 3,
        score: 78,
        grade: 'B+',
        instructor: 'Dr. Michael Brown',
        completionDate: '2023-11-10'
    },
    {
        id: 4,
        courseId: 'CS202',
        courseName: 'Web Development',
        semester: '2',
        credits: 3,
        score: 92,
        grade: 'A+',
        instructor: 'Dr. Emily Davis',
        completionDate: '2023-11-15'
    },
    {
        id: 5,
        courseId: 'CS301',
        courseName: 'Machine Learning',
        semester: '3',
        credits: 4,
        score: 88,
        grade: 'A',
        instructor: 'Dr. Robert Wilson',
        completionDate: '2024-05-12'
    }
];

let courses = [
    {
        id: 1,
        code: 'CS101',
        name: 'Data Structures',
        credits: 4,
        status: 'completed',
        semester: '1',
        instructor: 'Dr. John Smith'
    },
    {
        id: 2,
        code: 'CS102',
        name: 'Algorithms',
        credits: 4,
        status: 'completed',
        semester: '1',
        instructor: 'Dr. Sarah Johnson'
    },
    {
        id: 3,
        code: 'CS201',
        name: 'Database Management',
        credits: 3,
        status: 'completed',
        semester: '2',
        instructor: 'Dr. Michael Brown'
    },
    {
        id: 4,
        code: 'CS202',
        name: 'Web Development',
        credits: 3,
        status: 'ongoing',
        semester: '2',
        instructor: 'Dr. Emily Davis'
    },
    {
        id: 5,
        code: 'CS301',
        name: 'Machine Learning',
        credits: 4,
        status: 'ongoing',
        semester: '3',
        instructor: 'Dr. Robert Wilson'
    }
];

let certificates = [
    {
        id: 1,
        name: 'AWS Solutions Architect',
        organization: 'Amazon Web Services',
        issueDate: '2023-03-15',
        expiryDate: '2025-03-15',
        url: 'https://aws.amazon.com/certification',
        credentialId: 'AWS-12345XYZ',
        status: 'active'
    },
    {
        id: 2,
        name: 'Google Cloud Professional',
        organization: 'Google Cloud',
        issueDate: '2023-06-20',
        expiryDate: '2025-06-20',
        url: 'https://cloud.google.com/certification',
        credentialId: 'GCP-67890ABC',
        status: 'active'
    },
    {
        id: 3,
        name: 'Microsoft Azure Fundamentals',
        organization: 'Microsoft',
        issueDate: '2023-09-10',
        expiryDate: null,
        url: 'https://microsoft.com/learn',
        credentialId: 'AZ-900-DEMO',
        status: 'active'
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupTabHandlers();
    loadGrades();
    loadCourses();
    loadCertificates();
    updateStatistics();
    loadProgress();
    setupFormListener();
});

/* ========================================== 
   TAB MANAGEMENT
   ========================================== */

function setupTabHandlers() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Hide all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Remove active class from buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to button
    event.target.classList.add('active');

    // Reload tab-specific data
    if (tabName === 'grades') {
        loadGrades();
    } else if (tabName === 'courses') {
        loadCourses();
    } else if (tabName === 'certificates') {
        loadCertificates();
    } else if (tabName === 'progress') {
        loadProgress();
    }
}

/* ========================================== 
   GRADES MANAGEMENT
   ========================================== */

function loadGrades() {
    const semesterFilter = document.getElementById('semesterFilter').value;
    let filteredData = academicRecords;

    if (semesterFilter) {
        filteredData = academicRecords.filter(record => record.semester === semesterFilter);
    }

    const tbody = document.getElementById('gradesTableBody');
    tbody.innerHTML = filteredData.map(record => `
        <tr>
            <td>${record.courseId}</td>
            <td>${record.courseName}</td>
            <td>Sem ${record.semester}</td>
            <td>${record.credits}</td>
            <td><span class="grade-badge grade-${record.grade.toLowerCase()}">${record.grade}</span></td>
            <td>${record.score}%</td>
            <td>${record.instructor}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small btn-view" onclick="viewGrade(${record.id})">👁️ View</button>
                    <button class="action-btn-small btn-delete" onclick="deleteGrade(${record.id})">🗑️ Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    // Add filter listener
    document.getElementById('semesterFilter').removeEventListener('change', loadGrades);
    document.getElementById('semesterFilter').addEventListener('change', loadGrades);
}

function viewGrade(id) {
    const record = academicRecords.find(r => r.id === id);
    if (record) {
        alert(`Course: ${record.courseName}\nGrade: ${record.grade}\nScore: ${record.score}%\nInstructor: ${record.instructor}`);
    }
}

function deleteGrade(id) {
    if (confirm('Are you sure you want to delete this grade record?')) {
        academicRecords = academicRecords.filter(r => r.id !== id);
        loadGrades();
        updateStatistics();
        showNotification('Grade record deleted successfully!');
    }
}

/* ========================================== 
   COURSES MANAGEMENT
   ========================================== */

function loadCourses() {
    const statusFilter = document.getElementById('statusFilter').value;
    let filteredCourses = courses;

    if (statusFilter) {
        filteredCourses = courses.filter(course => course.status === statusFilter);
    }

    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = filteredCourses.map(course => `
        <div class="course-card">
            <div class="course-card-header">
                <span class="course-code">${course.code}</span>
                <span class="course-status status-${course.status}">${capitalizeText(course.status)}</span>
            </div>
            <div class="course-title">${course.name}</div>
            <div class="course-info">📚 Instructor: ${course.instructor}</div>
            <div class="course-info">📍 Semester: ${course.semester}</div>
            <div class="course-credits">${course.credits} Credits</div>
            <button class="btn-secondary" style="width: 100%;" onclick="viewCourseDetails(${course.id})">View Details →</button>
        </div>
    `).join('');

    // Add filter listener
    document.getElementById('statusFilter').removeEventListener('change', loadCourses);
    document.getElementById('statusFilter').addEventListener('change', loadCourses);
}

function viewCourseDetails(id) {
    const course = courses.find(c => c.id === id);
    if (course) {
        alert(`Course: ${course.name}\nCode: ${course.code}\nCredits: ${course.credits}\nStatus: ${capitalizeText(course.status)}\nInstructor: ${course.instructor}`);
    }
}

/* ========================================== 
   CERTIFICATES MANAGEMENT
   ========================================== */

function loadCertificates() {
    const grid = document.getElementById('certificatesGrid');
    
    if (certificates.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No certificates uploaded yet.</p>';
        return;
    }

    grid.innerHTML = certificates.map(cert => `
        <div class="certificate-card">
            <div class="certificate-icon">🏆</div>
            <div class="certificate-name">${cert.name}</div>
            <div class="certificate-org">${cert.organization}</div>
            <div class="certificate-date">Issued: ${formatDate(cert.issueDate)}</div>
            ${cert.expiryDate ? `<div style="color: #f39c12; font-size: 0.85rem;">Expires: ${formatDate(cert.expiryDate)}</div>` : ''}
            <div class="certificate-status">Valid</div>
            <div style="margin-top: 12px;">
                <a href="${cert.url}" target="_blank" class="btn-secondary" style="text-decoration: none; display: inline-block; padding: 6px 12px; font-size: 0.85rem;">View Certificate</a>
            </div>
        </div>
    `).join('');
}

/* ========================================== 
   PROGRESS MANAGEMENT
   ========================================== */

function loadProgress() {
    updateGPAProgress();
    updateCreditProgress();
    updateGradeDistribution();
    loadTimeline();
}

function updateGPAProgress() {
    // Calculate GPA
    const totalCredits = academicRecords.reduce((sum, r) => sum + r.credits, 0);
    const gradePoints = {
        'A+': 4.0,
        'A': 4.0,
        'B+': 3.5,
        'B': 3.0,
        'C+': 2.5,
        'C': 2.0,
        'D': 1.0
    };

    const gpaSum = academicRecords.reduce((sum, r) => {
        return sum + (gradePoints[r.grade] || 0) * r.credits;
    }, 0);

    const gpa = (gpaSum / totalCredits).toFixed(2);
    document.getElementById('currentGPA').textContent = gpa;
}

function updateCreditProgress() {
    const totalCredits = academicRecords.reduce((sum, r) => sum + r.credits, 0);
    const maxCredits = 120;
    const percentage = (totalCredits / maxCredits) * 100;

    const progressBar = document.getElementById('creditProgressBar');
    progressBar.style.width = percentage + '%';

    const progressText = document.getElementById('creditProgressText');
    progressText.textContent = `${totalCredits} / ${maxCredits} Credits`;
}

function updateGradeDistribution() {
    const gradeCount = {
        'A': 0,
        'B': 0,
        'C': 0
    };

    academicRecords.forEach(record => {
        if (record.grade.includes('A')) gradeCount['A']++;
        else if (record.grade.includes('B')) gradeCount['B']++;
        else if (record.grade.includes('C')) gradeCount['C']++;
    });

    const maxCount = Math.max(gradeCount['A'], gradeCount['B'], gradeCount['C'], 1);

    document.getElementById('gradeA').style.width = (gradeCount['A'] / maxCount) * 100 + '%';
    document.getElementById('gradeB').style.width = (gradeCount['B'] / maxCount) * 100 + '%';
    document.getElementById('gradeC').style.width = (gradeCount['C'] / maxCount) * 100 + '%';
}

function loadTimeline() {
    const timeline = document.getElementById('academicTimeline');
    timeline.innerHTML = academicRecords.map(record => `
        <div class="timeline-item">
            <div class="timeline-date">${formatDate(record.completionDate)}</div>
            <div class="timeline-content">
                <strong>${record.courseName}</strong> (${record.courseId})
                <br>Grade: ${record.grade} | Score: ${record.score}%
            </div>
        </div>
    `).join('');
}

/* ========================================== 
   STATISTICS UPDATE
   ========================================== */

function updateStatistics() {
    const totalCredits = academicRecords.reduce((sum, r) => sum + r.credits, 0);
    const avgScore = academicRecords.reduce((sum, r) => sum + r.score, 0) / academicRecords.length;

    // Calculate GPA
    const gradePoints = {
        'A+': 4.0,
        'A': 4.0,
        'B+': 3.5,
        'B': 3.0,
        'C+': 2.5,
        'C': 2.0,
        'D': 1.0
    };

    const gpaSum = academicRecords.reduce((sum, r) => {
        return sum + (gradePoints[r.grade] || 0) * r.credits;
    }, 0);

    const gpa = (gpaSum / totalCredits).toFixed(2);

    document.getElementById('currentGPA').textContent = gpa;
    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('totalCerts').textContent = certificates.length;
    document.getElementById('avgScore').textContent = Math.round(avgScore) + '%';
}

/* ========================================== 
   MODAL FUNCTIONS
   ========================================== */

function openAddRecordModal() {
    document.getElementById('recordForm').reset();
    document.getElementById('addRecordModal').classList.add('active');
}

function closeAddRecordModal() {
    document.getElementById('addRecordModal').classList.remove('active');
}

function openUploadCertModal() {
    document.getElementById('certForm').reset();
    document.getElementById('uploadCertModal').classList.add('active');
}

function closeUploadCertModal() {
    document.getElementById('uploadCertModal').classList.remove('active');
}

/* ========================================== 
   FORM HANDLING
   ========================================== */

function setupFormListener() {
    document.getElementById('recordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveAcademicRecord();
    });

    document.getElementById('certForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveCertificate();
    });
}

function saveAcademicRecord() {
    const courseId = document.getElementById('courseId').value;
    const courseName = document.getElementById('courseName').value;
    const semester = document.getElementById('semester').value;
    const credits = parseInt(document.getElementById('credits').value);
    const score = parseInt(document.getElementById('score').value);
    const grade = document.getElementById('grade').value;
    const instructor = document.getElementById('instructor').value;
    const completionDate = document.getElementById('completionDate').value;

    if (!courseId || !courseName || !semester || !credits || !score || !grade) {
        alert('Please fill all required fields!');
        return;
    }

    const newRecord = {
        id: Math.max(...academicRecords.map(r => r.id), 0) + 1,
        courseId, courseName, semester, credits, score, grade, instructor, completionDate
    };

    academicRecords.push(newRecord);
    closeAddRecordModal();
    loadGrades();
    updateStatistics();
    showNotification('Academic record added successfully!');
}

function saveCertificate() {
    const certName = document.getElementById('certName').value;
    const certOrg = document.getElementById('certOrg').value;
    const certIssueDate = document.getElementById('certIssueDate').value;
    const certExpiryDate = document.getElementById('certExpiryDate').value;
    const certUrl = document.getElementById('certUrl').value;
    const credentialId = document.getElementById('credentialId').value;

    if (!certName || !certOrg || !certIssueDate) {
        alert('Please fill all required fields!');
        return;
    }

    const newCert = {
        id: Math.max(...certificates.map(c => c.id), 0) + 1,
        name: certName,
        organization: certOrg,
        issueDate: certIssueDate,
        expiryDate: certExpiryDate || null,
        url: certUrl,
        credentialId: credentialId,
        status: 'active'
    };

    certificates.push(newCert);
    closeUploadCertModal();
    loadCertificates();
    updateStatistics();
    showNotification('Certificate uploaded successfully!');
}

/* ========================================== 
   UTILITY FUNCTIONS
   ========================================== */

function capitalizeText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function showNotification(message) {
    alert(message);
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const addModal = document.getElementById('addRecordModal');
    const certModal = document.getElementById('uploadCertModal');

    if (e.target === addModal) {
        closeAddRecordModal();
    }
    if (e.target === certModal) {
        closeUploadCertModal();
    }
});

// Keyboard shortcut: Escape to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAddRecordModal();
        closeUploadCertModal();
    }
});

console.log('Education dashboard loaded successfully!');
