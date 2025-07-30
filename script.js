// DOM elements
const toolsGrid = document.getElementById('tools-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryLinks = document.querySelectorAll('.categories li');

// Global variables
let allTools = [];
let filteredTools = [];

// Fetch tools from localStorage
function fetchTools() {
    const tools = JSON.parse(localStorage.getItem('paktools_tools')) || [];
    allTools = tools;
    filteredTools = [...allTools];
    displayTools(filteredTools);
}

// Display tools in the grid
function displayTools(tools) {
    toolsGrid.innerHTML = '';
    
    tools.forEach((tool, index) => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card fade-in';
        toolCard.style.animationDelay = `${index * 0.1}s`;
        toolCard.innerHTML = `
            <img src="${tool.imageUrl || 'https://via.placeholder.com/150'}" alt="${tool.name}" class="tool-image">
            <h3 class="tool-name">${tool.name}</h3>
            <a href="${tool.link}" target="_blank" class="tool-link">Use Tool</a>
        `;
        toolsGrid.appendChild(toolCard);
    });
}

// Search tools by name
function searchTools(query) {
    if (!query) {
        filteredTools = [...allTools];
    } else {
        filteredTools = allTools.filter(tool => 
            tool.name.toLowerCase().includes(query.toLowerCase())
        );
    }
    displayTools(filteredTools);
}

// Filter tools by category
function filterTools(category) {
    if (category === 'all') {
        filteredTools = [...allTools];
    } else {
        filteredTools = allTools.filter(tool => tool.category === category);
    }
    displayTools(filteredTools);
}

// Event listeners
searchBtn.addEventListener('click', () => {
    searchTools(searchInput.value);
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchTools(searchInput.value);
    }
});

categoryLinks.forEach(link => {
    link.addEventListener('click', () => {
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        filterTools(link.dataset.category);
    });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.tool-card').forEach(card => {
    observer.observe(card);
});

// Initialize the app
fetchTools();
