/* ========================================== 
   CONTACT & SUPPORT PAGE JAVASCRIPT
   Staff Directory, Departments, and Support Resources
   ========================================== */

// Sample Contact Data
let staffContacts = [
    {
        id: 1,
        name: 'Dr. Sarah Johnson',
        position: 'Dean of Students',
        department: 'student-life',
        office: 'Main Building, Room 301',
        phone: '(555) 123-4001',
        email: 'sarah.johnson@university.edu',
        hours: 'Mon-Fri 9:00 AM - 5:00 PM'
    },
    {
        id: 2,
        name: 'Dr. Michael Chen',
        position: 'Director of Admissions',
        department: 'admissions',
        office: 'Admin Building, Room 102',
        phone: '(555) 123-4002',
        email: 'michael.chen@university.edu',
        hours: 'Mon-Fri 8:30 AM - 4:30 PM'
    },
    {
        id: 3,
        name: 'Prof. Emily Davis',
        position: 'Academic Advisor',
        department: 'academic',
        office: 'Academic Center, Room 205',
        phone: '(555) 123-4003',
        email: 'emily.davis@university.edu',
        hours: 'Mon-Fri 10:00 AM - 3:00 PM'
    },
    {
        id: 4,
        name: 'Robert Williams',
        position: 'Finance Director',
        department: 'finance',
        office: 'Finance Building, Room 101',
        phone: '(555) 123-4004',
        email: 'robert.williams@university.edu',
        hours: 'Mon-Fri 9:00 AM - 5:00 PM'
    },
    {
        id: 5,
        name: 'James Lee',
        position: 'IT Support Manager',
        department: 'it',
        office: 'Tech Center, Room 150',
        phone: '(555) 123-4005',
        email: 'james.lee@university.edu',
        hours: '24/7 Support Available'
    },
    {
        id: 6,
        name: 'Maria Garcia',
        position: 'University Librarian',
        department: 'library',
        office: 'Library, Front Desk',
        phone: '(555) 123-4006',
        email: 'maria.garcia@university.edu',
        hours: 'Mon-Fri 8:00 AM - 9:00 PM, Sat-Sun 10:00 AM - 6:00 PM'
    }
];

let departments = [
    {
        id: 1,
        name: 'Admissions Office',
        icon: '📋',
        description: 'Handles student admissions, applications, and enrollment procedures.',
        phone: '(555) 123-4100',
        email: 'admissions@university.edu',
        location: 'Admin Building, Room 102'
    },
    {
        id: 2,
        name: 'Academic Affairs',
        icon: '🎓',
        description: 'Manages academic programs, course scheduling, and faculty services.',
        phone: '(555) 123-4200',
        email: 'academic@university.edu',
        location: 'Academic Center, Room 300'
    },
    {
        id: 3,
        name: 'Student Life',
        icon: '🎉',
        description: 'Organizes student activities, clubs, and campus events.',
        phone: '(555) 123-4300',
        email: 'studentlife@university.edu',
        location: 'Main Building, Room 301'
    },
    {
        id: 4,
        name: 'Finance Office',
        icon: '💳',
        description: 'Manages tuition, billing, financial aid, and student accounts.',
        phone: '(555) 123-4400',
        email: 'finance@university.edu',
        location: 'Finance Building, Room 101'
    },
    {
        id: 5,
        name: 'IT Services',
        icon: '💻',
        description: 'Provides technical support, network services, and IT infrastructure.',
        phone: '(555) 123-4500',
        email: 'itsupport@university.edu',
        location: 'Tech Center, Room 150'
    },
    {
        id: 6,
        name: 'University Library',
        icon: '📚',
        description: 'Offers research resources, study spaces, and librarian assistance.',
        phone: '(555) 123-4600',
        email: 'library@university.edu',
        location: 'Library, Main Campus'
    }
];

let resources = [
    {
        id: 1,
        title: 'Course Registration Portal',
        icon: '🔐',
        description: 'Register for courses and manage your academic schedule.',
        link: '#'
    },
    {
        id: 2,
        title: 'Student Email',
        icon: '📧',
        description: 'Access your university email account and communication.',
        link: '#'
    },
    {
        id: 3,
        title: 'Library Database',
        icon: '📖',
        description: 'Access journals, articles, and research materials.',
        link: '#'
    },
    {
        id: 4,
        title: 'Learning Management System',
        icon: '💡',
        description: 'Access course materials and submit assignments.',
        link: '#'
    },
    {
        id: 5,
        title: 'Grade Portal',
        icon: '📊',
        description: 'View your academic grades and transcript.',
        link: '#'
    },
    {
        id: 6,
        title: 'Campus Map',
        icon: '🗺️',
        description: 'Find buildings, offices, and facilities on campus.',
        link: '#'
    }
];

let supportServices = [
    {
        id: 1,
        title: 'Campus Security',
        category: 'Emergency',
        number: '(555) 911-SAFE',
        description: 'Available 24/7 for security and emergency assistance.',
        availability: 'Available Now'
    },
    {
        id: 2,
        title: 'Counseling Services',
        category: 'Health',
        number: '(555) 123-4700',
        description: 'Free mental health support and counseling for students.',
        availability: 'Mon-Fri 9 AM - 5 PM'
    },
    {
        id: 3,
        title: 'Student Health Center',
        category: 'Medical',
        number: '(555) 123-4800',
        description: 'On-campus medical services and health resources.',
        availability: 'Mon-Fri 8 AM - 6 PM, Sat 10 AM - 2 PM'
    },
    {
        id: 4,
        title: 'Disability Services',
        category: 'Support',
        number: '(555) 123-4900',
        description: 'Accommodations and support for students with disabilities.',
        availability: 'Mon-Fri 9 AM - 5 PM'
    },
    {
        id: 5,
        title: 'Career Services',
        category: 'Career',
        number: '(555) 123-5000',
        description: 'Job placement assistance and career counseling.',
        availability: 'Mon-Fri 9 AM - 4:30 PM'
    },
    {
        id: 6,
        title: 'Tutoring Center',
        category: 'Academic',
        number: '(555) 123-5100',
        description: 'Free tutoring and academic support.',
        availability: 'Mon-Fri 10 AM - 8 PM, Sat 12 PM - 4 PM'
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupTabHandlers();
    updateStatistics();
    loadContacts();
    loadDepartments();
    loadResources();
    loadSupport();
    setupSearchListener();
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
    if (tabName === 'contacts') {
        loadContacts();
    } else if (tabName === 'departments') {
        loadDepartments();
    } else if (tabName === 'resources') {
        loadResources();
    } else if (tabName === 'support') {
        loadSupport();
    }
}

/* ========================================== 
   STATISTICS UPDATE
   ========================================== */

function updateStatistics() {
    document.getElementById('totalContacts').textContent = staffContacts.length;
    
    const uniqueDepartments = new Set(staffContacts.map(c => c.department)).size;
    document.getElementById('totalDepartments').textContent = uniqueDepartments;
    
    const locations = new Set(staffContacts.map(c => c.office.split(',')[0])).size;
    document.getElementById('totalBuildings').textContent = locations;
}

/* ========================================== 
   CONTACTS LOADING
   ========================================== */

function loadContacts() {
    const searchTerm = document.getElementById('contactSearch').value.toLowerCase();
    let filteredContacts = staffContacts;

    if (searchTerm) {
        filteredContacts = staffContacts.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.position.toLowerCase().includes(searchTerm) ||
            contact.department.toLowerCase().includes(searchTerm)
        );
    }

    const grid = document.getElementById('contactsGrid');
    grid.innerHTML = filteredContacts.map(contact => `
        <div class="contact-card">
            <div class="contact-avatar">${contact.name.charAt(0)}</div>
            <div class="contact-name">${contact.name}</div>
            <div class="contact-position">${contact.position}</div>
            
            <div class="contact-info">
                <span class="contact-icon">📍</span>
                <span>${contact.office}</span>
            </div>
            
            <div class="contact-info">
                <span class="contact-icon">📞</span>
                <span>${contact.phone}</span>
            </div>
            
            <div class="contact-info">
                <span class="contact-icon">📧</span>
                <span>${contact.email}</span>
            </div>
            
            <div class="contact-hours">
                <strong>Hours:</strong> ${contact.hours}
            </div>
            
            <div class="contact-actions">
                <a href="tel:${contact.phone.replace(/\D/g, '')}" class="contact-btn btn-call">📞 Call</a>
                <a href="mailto:${contact.email}" class="contact-btn btn-email">📧 Email</a>
            </div>
        </div>
    `).join('');
}

function setupSearchListener() {
    const searchInput = document.getElementById('contactSearch');
    searchInput.addEventListener('input', loadContacts);
}

/* ========================================== 
   DEPARTMENTS LOADING
   ========================================== */

function loadDepartments() {
    const grid = document.getElementById('departmentsGrid');
    grid.innerHTML = departments.map(dept => `
        <div class="department-card">
            <div class="department-icon">${dept.icon}</div>
            <div class="department-name">${dept.name}</div>
            <div class="department-description">${dept.description}</div>
            
            <div class="department-info-item">
                <span class="department-info-label">📞 Phone:</span>
                <div>${dept.phone}</div>
            </div>
            
            <div class="department-info-item">
                <span class="department-info-label">📧 Email:</span>
                <div>${dept.email}</div>
            </div>
            
            <div class="department-info-item">
                <span class="department-info-label">📍 Location:</span>
                <div>${dept.location}</div>
            </div>
        </div>
    `).join('');
}

/* ========================================== 
   RESOURCES LOADING
   ========================================== */

function loadResources() {
    const container = document.getElementById('resourcesContainer');
    container.innerHTML = resources.map(resource => `
        <div class="resource-card">
            <div class="resource-icon">${resource.icon}</div>
            <div class="resource-title">${resource.title}</div>
            <div class="resource-description">${resource.description}</div>
            <a href="${resource.link}" class="resource-link">Access Now →</a>
        </div>
    `).join('');
}

/* ========================================== 
   SUPPORT LOADING
   ========================================== */

function loadSupport() {
    const container = document.getElementById('supportContainer');
    container.innerHTML = supportServices.map(service => `
        <div class="support-card">
            <div class="support-category">${service.category}</div>
            <div class="support-title">${service.title}</div>
            <div class="support-number">${service.number}</div>
            <div class="support-info">${service.description}</div>
            <div class="support-availability">
                <div class="status-indicator"></div>
                <span>${service.availability}</span>
            </div>
        </div>
    `).join('');
}

/* ========================================== 
   MODAL FUNCTIONS
   ========================================== */

function openAddContactModal() {
    document.getElementById('contactForm').reset();
    document.getElementById('addContactModal').classList.add('active');
}

function closeAddContactModal() {
    document.getElementById('addContactModal').classList.remove('active');
}

/* ========================================== 
   FORM HANDLING
   ========================================== */

function setupFormListener() {
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveContact();
    });
}

function saveContact() {
    const name = document.getElementById('contactName').value;
    const position = document.getElementById('contactPosition').value;
    const department = document.getElementById('contactDepartment').value;
    const office = document.getElementById('contactOffice').value;
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;
    const hours = document.getElementById('contactHours').value;

    if (!name || !position || !department || !office || !phone || !email) {
        alert('Please fill all required fields!');
        return;
    }

    const newContact = {
        id: Math.max(...staffContacts.map(c => c.id), 0) + 1,
        name, position, department, office, phone, email,
        hours: hours || 'Contact for hours'
    };

    staffContacts.push(newContact);
    closeAddContactModal();
    loadContacts();
    updateStatistics();
    showNotification('Contact added successfully!');
}

/* ========================================== 
   UTILITY FUNCTIONS
   ========================================== */

function showNotification(message) {
    alert(message);
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('addContactModal');
    if (e.target === modal) {
        closeAddContactModal();
    }
});

// Keyboard shortcut: Escape to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAddContactModal();
    }
});

console.log('Contact & Support page loaded successfully!');
