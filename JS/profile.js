const profileData = [
    { name: 'Harsha', phone: '9611467390' },
    { name: 'kushith', phone: '7483195267' },
    { name: 'shiva', phone: '8152076673' },
    { name: 'gowramma', phone: '9535302538' },
    { name: 'Ashoka', phone: '6362232019' },
    { name: 'Anand', phone: '9945056092' }
];

const profileDetailsList = document.getElementById('profileDetailsList');
const profileContactList = document.getElementById('profileContactList');
const profileHolderName = document.getElementById('profileHolderName');
const profileAvatar = document.getElementById('profileAvatar');

const mainProfile = profileData[0];
profileHolderName.textContent = mainProfile.name;
profileAvatar.textContent = mainProfile.name.charAt(0).toUpperCase();

profileDetailsList.innerHTML = `
  <div class="detail-item">
    <div class="item-icon">👤</div>
    <div class="item-content"><span class="item-label">Full Name</span><span class="item-value">Harsha</span></div>
  </div>
  <div class="detail-item">
    <div class="item-icon">🎓</div>
    <div class="item-content"><span class="item-label">Role</span><span class="item-value">Student Management User</span></div>
  </div>
  <div class="detail-item">
    <div class="item-icon">📞</div>
    <div class="item-content"><span class="item-label">Phone</span><span class="item-value">9611467390</span></div>
  </div>
  <div class="detail-item">
    <div class="item-icon">✅</div>
    <div class="item-content"><span class="item-label">Status</span><span class="item-value">Active</span></div>
  </div>
`;

profileContactList.innerHTML = profileData.map(person => `
  <div class="contact-item">
    <div class="item-icon">${person.name.charAt(0).toUpperCase()}</div>
    <div class="item-content">
      <span class="item-label">${person.name}</span>
      <span class="item-value">📞 ${person.phone}</span>
    </div>
  </div>
`).join('');
