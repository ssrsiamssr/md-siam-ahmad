// Admin Configuration
const ADMIN_PASSWORD = '123456'; // Change this to your secure password

// Data Storage
let portfolioData = {
    about: localStorage.getItem('about') || '',
    skills: JSON.parse(localStorage.getItem('skills')) || [],
    projects: JSON.parse(localStorage.getItem('projects')) || [],
    experience: JSON.parse(localStorage.getItem('experience')) || [],
    contacts: JSON.parse(localStorage.getItem('contacts')) || [],
    socialLinks: JSON.parse(localStorage.getItem('socialLinks')) || []
};

// Login Functions
function login() {
    const password = document.getElementById('admin-password').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');
        loadAllData();
    } else {
        alert('Invalid password!');
    }
}

function logout() {
    document.getElementById('login-section').style.display = 'flex';
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('admin-password').value = '';
}

// Navigation
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Show corresponding section
        const sectionId = item.dataset.section + '-section';
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
    });
});

// About Section
function saveAbout() {
    const content = document.getElementById('about-content').value;
    portfolioData.about = content;
    localStorage.setItem('about', content);
    showSuccess('about-success');
}

// Skills Section
function addSkill() {
    const name = document.getElementById('skill-name').value;
    const level = document.getElementById('skill-level').value;
    
    if (name && level) {
        portfolioData.skills.push({ name, level });
        localStorage.setItem('skills', JSON.stringify(portfolioData.skills));
        renderSkills();
        clearInputs(['skill-name', 'skill-level']);
    }
}

function deleteSkill(index) {
    portfolioData.skills.splice(index, 1);
    localStorage.setItem('skills', JSON.stringify(portfolioData.skills));
    renderSkills();
}

function renderSkills() {
    const container = document.getElementById('skills-list');
    container.innerHTML = portfolioData.skills.map((skill, index) => `
        <div class="item">
            <span>${skill.name} - ${skill.level}%</span>
            <button class="delete-btn" onclick="deleteSkill(${index})">Delete</button>
        </div>
    `).join('');
}

// Projects Section
function addProject() {
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const image = document.getElementById('project-image').value;
    const link = document.getElementById('project-link').value;
    
    if (title && description) {
        portfolioData.projects.push({ title, description, image, link });
        localStorage.setItem('projects', JSON.stringify(portfolioData.projects));
        renderProjects();
        clearInputs(['project-title', 'project-description', 'project-image', 'project-link']);
    }
}

function deleteProject(index) {
    portfolioData.projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(portfolioData.projects));
    renderProjects();
}

function renderProjects() {
    const container = document.getElementById('projects-list');
    container.innerHTML = portfolioData.projects.map((project, index) => `
        <div class="item">
            <div>
                <strong>${project.title}</strong><br>
                <small>${project.description}</small>
            </div>
            <button class="delete-btn" onclick="deleteProject(${index})">Delete</button>
        </div>
    `).join('');
}

// Experience Section
function addExperience() {
    const title = document.getElementById('exp-title').value;
    const company = document.getElementById('exp-company').value;
    const duration = document.getElementById('exp-duration').value;
    const description = document.getElementById('exp-description').value;
    
    if (title && company && duration) {
        portfolioData.experience.push({ title, company, duration, description });
        localStorage.setItem('experience', JSON.stringify(portfolioData.experience));
        renderExperience();
        clearInputs(['exp-title', 'exp-company', 'exp-duration', 'exp-description']);
    }
}

function deleteExperience(index) {
    portfolioData.experience.splice(index, 1);
    localStorage.setItem('experience', JSON.stringify(portfolioData.experience));
    renderExperience();
}

function renderExperience() {
    const container = document.getElementById('experience-list');
    container.innerHTML = portfolioData.experience.map((exp, index) => `
        <div class="item">
            <div>
                <strong>${exp.title}</strong> at ${exp.company}<br>
                <small>${exp.duration}</small>
            </div>
            <button class="delete-btn" onclick="deleteExperience(${index})">Delete</button>
        </div>
    `).join('');
}

// Contact Section
function addContact() {
    const type = document.getElementById('contact-type').value;
    const value = document.getElementById('contact-value').value;
    
    if (type && value) {
        portfolioData.contacts.push({ type, value });
        localStorage.setItem('contacts', JSON.stringify(portfolioData.contacts));
        renderContacts();
        clearInputs(['contact-type', 'contact-value']);
    }
}

function deleteContact(index) {
    portfolioData.contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(portfolioData.contacts));
    renderContacts();
}

function renderContacts() {
    const container = document.getElementById('contact-list');
    container.innerHTML = portfolioData.contacts.map((contact, index) => `
        <div class="item">
            <span>${contact.type}: ${contact.value}</span>
            <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
        </div>
    `).join('');
}

// Social Links Section
function addSocialLink() {
    const platform = document.getElementById('social-platform').value;
    const url = document.getElementById('social-url').value;
    const icon = document.getElementById('social-icon').value;
    
    if (platform && url && icon) {
        portfolioData.socialLinks.push({ platform, url, icon });
        localStorage.setItem('socialLinks', JSON.stringify(portfolioData.socialLinks));
        renderSocialLinks();
        clearInputs(['social-platform', 'social-url', 'social-icon']);
    }
}

function deleteSocialLink(index) {
    portfolioData.socialLinks.splice(index, 1);
    localStorage.setItem('socialLinks', JSON.stringify(portfolioData.socialLinks));
    renderSocialLinks();
}

function renderSocialLinks() {
    const container = document.getElementById('social-list');
    container.innerHTML = portfolioData.socialLinks.map((link, index) => `
        <div class="item">
            <span>${link.platform} - ${link.url}</span>
            <button class="delete-btn" onclick="deleteSocialLink(${index})">Delete</button>
        </div>
    `).join('');
}

// Utility Functions
function loadAllData() {
    document.getElementById('about-content').value = portfolioData.about;
    renderSkills();
    renderProjects();
    renderExperience();
    renderContacts();
    renderSocialLinks();
}

function clearInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = '');
}

function showSuccess(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in (you might want to implement a proper session system)
    if (false) { // Change this condition based on your session management
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');
        loadAllData();
    }
});
