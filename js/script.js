// Admin Configuration
const ADMIN_PASSWORD = '123456'; // Change this to your desired password

// Initialize data storage
let socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [];
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let isAdminLoggedIn = false;

// Admin Modal Functions
document.querySelector('.admin-link').addEventListener('click', (e) => {
    e.preventDefault();
    if (!isAdminLoggedIn) {
        document.getElementById('admin-modal').style.display = 'block';
    } else {
        document.getElementById('admin-dashboard').classList.remove('hidden');
    }
});

function loginAdmin() {
    const password = document.getElementById('admin-password').value;
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        document.getElementById('admin-modal').style.display = 'none';
        document.getElementById('admin-dashboard').classList.remove('hidden');
        document.getElementById('admin-password').value = '';
    } else {
        alert('Invalid password');
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    document.getElementById('admin-dashboard').classList.add('hidden');
}

// Admin Menu Navigation
document.querySelectorAll('.admin-menu li').forEach(item => {
    item.addEventListener('click', () => {
        const section = item.dataset.section;
        document.querySelectorAll('.admin-section').forEach(sec => {
            sec.classList.add('hidden');
        });
        document.getElementById(`${section}-section`).classList.remove('hidden');
    });
});

// Render functions
function renderSocialLinks() {
    const container = document.getElementById('social-icons');
    container.innerHTML = '';
    
    socialLinks.forEach((link, index) => {
        const socialIcon = document.createElement('a');
        socialIcon.href = link.url;
        socialIcon.target = '_blank';
        socialIcon.className = 'social-icon';
        socialIcon.innerHTML = `
            <i class="${link.icon}"></i>
            <i class="fas fa-times delete-icon" onclick="deleteSocialLink(${index}); event.preventDefault();"></i>
        `;
        container.appendChild(socialIcon);
    });
}

function renderContacts() {
    const container = document.getElementById('contact-list');
    container.innerHTML = '';
    
    contacts.forEach((contact, index) => {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.innerHTML = `
            <div>
                <strong>${contact.type}:</strong> ${contact.value}
            </div>
            <i class="fas fa-trash delete-btn" onclick="deleteContact(${index})"></i>
        `;
        container.appendChild(contactItem);
    });
}

// Add functions
function addSocialLink() {
    const name = document.getElementById('social-name').value;
    const url = document.getElementById('social-url').value;
    const icon = document.getElementById('social-icon').value;
    
    if (name && url && icon) {
        socialLinks.push({ name, url, icon });
        localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
        renderSocialLinks();
        
        // Clear inputs
        document.getElementById('social-name').value = '';
        document.getElementById('social-url').value = '';
        document.getElementById('social-icon').value = '';
    }
}

function addContact() {
    const type = document.getElementById('contact-type').value;
    const value = document.getElementById('contact-value').value;
    
    if (type && value) {
        contacts.push({ type, value });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
        
        // Clear inputs
        document.getElementById('contact-type').value = '';
        document.getElementById('contact-value').value = '';
    }
}

// Delete functions
function deleteSocialLink(index) {
    socialLinks.splice(index, 1);
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
    renderSocialLinks();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}

// Initialize renderings
document.addEventListener('DOMContentLoaded', () => {
    renderSocialLinks();
    renderContacts();
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
