/* ========================================== 
   MULTI-STEP SIGNUP FORM JAVASCRIPT
   Form Validation, Navigation, and Dynamic Fields
   ========================================== */

let currentStep = 1;
const totalSteps = 3;

// Initialize the form
document.addEventListener('DOMContentLoaded', () => {
    updateProgressBar();
    setupDynamicFields();
});

// Update progress bar and indicators
function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Update step indicators
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step${i}Indicator`);
        if (i < currentStep) {
            indicator.classList.remove('active');
            indicator.classList.add('completed');
        } else if (i === currentStep) {
            indicator.classList.add('active');
            indicator.classList.remove('completed');
        } else {
            indicator.classList.remove('active', 'completed');
        }
    }

    // Update button visibility
    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'flex';
    document.getElementById('nextBtn').style.display = currentStep === totalSteps ? 'none' : 'flex';
    document.getElementById('submitBtn').style.display = currentStep === totalSteps ? 'block' : 'none';
}

// Go to next step
function nextStep() {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
        updateProgressBar();
        window.scrollTo(0, 0);
    }
}

// Go to previous step
function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgressBar();
        window.scrollTo(0, 0);
    }
}

// Show specific step
function showStep(stepNumber) {
    for (let i = 1; i <= totalSteps; i++) {
        const step = document.getElementById(`step${i}`);
        if (i === stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    }
}

// Validate form fields for current step
function validateStep(stepNumber) {
    clearErrors();

    if (stepNumber === 1) {
        return validateStep1();
    } else if (stepNumber === 2) {
        return validateStep2();
    } else if (stepNumber === 3) {
        return validateStep3();
    }

    return true;
}

// Validate Step 1: Contact Information
function validateStep1() {
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const confirmEmail = document.getElementById('confirmEmail').value.trim();
    let isValid = true;

    // Validate phone
    if (!phone) {
        showError('phoneError', 'Phone number is required');
        isValid = false;
    } else if (!/^[\d\s\-\+()]{10,}$/.test(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate email
    if (!email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('emailError', 'Please enter a valid email');
        isValid = false;
    }

    // Validate confirm email
    if (!confirmEmail) {
        showError('confirmEmailError', 'Please confirm your email');
        isValid = false;
    } else if (email !== confirmEmail) {
        showError('confirmEmailError', 'Emails do not match');
        isValid = false;
    }

    return isValid;
}

// Validate Step 2: Personal Details
function validateStep2() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    let isValid = true;

    if (!firstName) {
        showError('firstNameError', 'First name is required');
        isValid = false;
    }

    if (!lastName) {
        showError('lastNameError', 'Last name is required');
        isValid = false;
    }

    if (!dob) {
        showError('dobError', 'Date of birth is required');
        isValid = false;
    }

    if (!gender) {
        showError('genderError', 'Gender is required');
        isValid = false;
    }

    if (!address) {
        showError('addressError', 'Address is required');
        isValid = false;
    }

    if (!city) {
        showError('cityError', 'City is required');
        isValid = false;
    }

    if (!state) {
        showError('stateError', 'State is required');
        isValid = false;
    }

    if (!zip) {
        showError('zipError', 'Zip code is required');
        isValid = false;
    } else if (!/^\d{5,10}$/.test(zip)) {
        showError('zipError', 'Please enter a valid zip code');
        isValid = false;
    }

    return isValid;
}

// Validate Step 3: Skills & Project Links
function validateStep3() {
    const checkboxes = document.querySelectorAll('input[name="category"]:checked');
    const terms = document.getElementById('terms').checked;
    let isValid = true;

    if (checkboxes.length === 0) {
        showError('categoryError', 'Please select at least one category');
        isValid = false;
    }

    if (!terms) {
        showError('termsError', 'You must agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

// Show error message
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
    });
}

// Setup dynamic field management
function setupDynamicFields() {
    // Add education entry
    document.getElementById('addEducation').addEventListener('click', (e) => {
        e.preventDefault();
        addEducationEntry();
    });

    // Add project link
    document.getElementById('addLink').addEventListener('click', (e) => {
        e.preventDefault();
        addLinkEntry();
    });

    // Event delegation for remove buttons
    document.getElementById('educationDetails').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-education')) {
            e.preventDefault();
            e.target.closest('.education-entry').remove();
        }
    });

    document.getElementById('projectLinks').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-link')) {
            e.preventDefault();
            e.target.closest('.link-entry').remove();
        }
    });
}

// Add education entry
function addEducationEntry() {
    const container = document.getElementById('educationDetails');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <input type="text" class="education-year" placeholder="Year (e.g., 2020-2021)">
        <input type="text" class="education-degree" placeholder="Degree/Stream">
        <input type="text" class="education-school" placeholder="School/College">
        <button type="button" class="remove-education">✕</button>
    `;
    container.appendChild(newEntry);
}

// Add project link entry
function addLinkEntry() {
    const container = document.getElementById('projectLinks');
    const newEntry = document.createElement('div');
    newEntry.className = 'link-entry';
    newEntry.innerHTML = `
        <select class="link-type">
            <option value="">Select Platform</option>
            <option value="github">GitHub</option>
            <option value="linkedin">LinkedIn</option>
            <option value="naukri">Naukri</option>
            <option value="portfolio">Portfolio</option>
            <option value="other">Other</option>
        </select>
        <input type="url" class="link-url" placeholder="https://example.com/profile">
        <button type="button" class="remove-link">✕</button>
    `;
    container.appendChild(newEntry);
}

// Handle form submission
document.getElementById('multiStepForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateStep(currentStep)) {
        // Collect all form data
        const formData = new FormData(document.getElementById('multiStepForm'));
        const data = {
            // Step 1
            phone: formData.get('phone'),
            email: formData.get('email'),
            // Step 2
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            dob: formData.get('dob'),
            gender: formData.get('gender'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip'),
            // Step 3
            categories: Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value),
            certifications: formData.get('certifications'),
            education: collectEducationData(),
            projectLinks: collectProjectLinks(),
        };

        // Log the data (in real application, send to server)
        console.log('Form Data Submitted:', data);

        // Show success message
        showSuccessMessage();
    }
});

// Collect education data
function collectEducationData() {
    const education = [];
    document.querySelectorAll('.education-entry').forEach(entry => {
        const year = entry.querySelector('.education-year').value;
        const degree = entry.querySelector('.education-degree').value;
        const school = entry.querySelector('.education-school').value;
        if (year || degree || school) {
            education.push({ year, degree, school });
        }
    });
    return education;
}

// Collect project links data
function collectProjectLinks() {
    const links = [];
    document.querySelectorAll('.link-entry').forEach(entry => {
        const type = entry.querySelector('.link-type').value;
        const url = entry.querySelector('.link-url').value;
        if (type && url) {
            links.push({ type, url });
        }
    });
    return links;
}

// Show success message
function showSuccessMessage() {
    const formCard = document.querySelector('.form-card');
    formCard.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">✓</div>
            <h2 style="color: #667eea; font-size: 1.8rem; margin-bottom: 15px;">Registration Successful!</h2>
            <p style="color: #666; font-size: 1.05rem; margin-bottom: 30px;">Welcome to the Student Management System</p>
            <p style="color: #999; margin-bottom: 30px;">A confirmation email has been sent to your email address.</p>
            <a href="../HTML/sigin.html" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                Sign In Now
            </a>
        </div>
    `;
}

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentStep < totalSteps) {
        nextStep();
    } else if (e.key === 'ArrowLeft' && currentStep > 1) {
        previousStep();
    }
});
