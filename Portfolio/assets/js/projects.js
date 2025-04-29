// Project data
const projects = [
    {
        id: 1,
        title: "Tsere Musna",
        description: "Blockchain-based system revolutionizing Ethiopian corruption removal by ensuring transparent fund allocation and usage tracking. A high-impact solution addressing real societal issues.",
        category: "blockchain",
        technologies: ["blockchain", "smart-contracts", "web3"],
        year: "2024",
        image: "assets/images/projects/tsere-musna.jpg",
        links: {
            demo: "#",
            github: "#"
        },
        featured: true,
        impact: "High",
        techRelevance: "High"
    },
    {
        id: 2,
        title: "QuizMe-AI",
        description: "AI-powered web app and Telegram bot that generates quizzes from documents with high accuracy. Semifinalist in Generative AI Hackathon. Leverages cutting-edge AI for education.",
        category: "ai",
        technologies: ["python", "django", "ai", "nlp"],
        year: "応23",
        image: "assets/images/projects/quizme.jpg",
        links: {
            demo: "#",
            github: "#"
        },
        featured: true,
        impact: "High",
        techRelevance: "High"
    },
    {
        id: 3,
        title: "Unix Shell Implementation",
        description: "A custom shell implementation in C from scratch, featuring command execution, piping, and process management. Demonstrates deep system programming knowledge.",
        category: "system",
        technologies: ["c", "system-programming"],
        year: "2023",
        image: "assets/images/projects/shell.jpg",
        links: {
            demo: "#",
            github: "#"
        },
        featured: true,
        impact: "Medium",
        techRelevance: "High"
    },
    {
        id: 4,
        title: "E-Commerce Mobile App",
        description: "Full-featured e-commerce application built with Flutter using clean architecture and BLoC pattern. Showcases modern mobile development practices.",
        category: "mobile",
        technologies: ["flutter", "dart", "bloc"],
        year: "2023",
        image: "assets/images/projects/ecommerce.jpg",
        links: {
            demo: "#",
            github: "#"
        },
        featured: true,
        impact: "Medium",
        techRelevance: "High"
    },
    {
        id: 5,
        title: "CareerPilot",
        description: "AI-powered career guidance system that predicts suitable career paths based on user behavior and preferences using ML models. Combines AI with practical career development.",
        category: "ai",
        technologies: ["nextjs", "python", "fastapi", "ml"],
        year: "2023",
        image: "assets/images/projects/careerpilot.jpg",
        links: {
            demo: "#",
            github: "#"
        },
        featured: true,
        impact: "High",
        techRelevance: "High"
    },
    {
        id: 6,
        title: "Rapid Jobs",
        description: "Platform connecting low-level workers with gig opportunities, built during A2SV Internal Hackathon. Addresses real employment challenges.",
        category: "web",
        technologies: ["react", "nodejs", "mongodb"],
        year: "2023",
        image: "assets/images/projects/rapidjobs.jpg",
        links: {
            demo: "#",
            github: "#"
        },
        featured: false,
        impact: "Medium",
        techRelevance: "Medium"
    },
    {
        id: 7,
        title: "ASTU Event Management",
        description: "Comprehensive event management system for ASTU Student Union to prevent event collisions and streamline scheduling.",
        category: "web",
        technologies: ["java", "servlet", "jsp"],
        year: "2023",
        image: "assets/images/projects/astu-events.jpg",
        links: {
            demo: "#",
            github: "#"
        },
        featured: false,
        impact: "Medium",
        techRelevance: "Medium"
    },
    {
        id: 8,
        title: "8-bit Processor Design",
        description: "Complete implementation of an 8-bit processor including control unit and ALU using Logisim, achieving high project scores.",
        category: "system",
        technologies: ["digital-design", "logisim"],
        year: "2022",
        image: "assets/images/projects/processor.jpg",
        links: {
            demo: "#",
            github: "#"
        },
        featured: false,
        impact: "Medium",
        techRelevance: "Medium"
    }
];

// Sort projects by impact and tech relevance
projects.sort((a, b) => {
    // First sort by featured status
    if (a.featured !== b.featured) {
        return b.featured ? 1 : -1;
    }
    
    // Then sort by impact
    const impactOrder = { "High": 3, "Medium": 2, "Low": 1 };
    if (impactOrder[a.impact] !== impactOrder[b.impact]) {
        return impactOrder[b.impact] - impactOrder[a.impact];
    }
    
    // Finally sort by tech relevance
    const techOrder = { "High": 3, "Medium": 2, "Low": 1 };
    return techOrder[b.techRelevance] - techOrder[a.techRelevance];
});

// DOM Elements
const projectsGrid = document.querySelector('.projects-grid');
const filterOptions = document.querySelectorAll('.filter-option input');
const clearFiltersBtn = document.querySelector('.clear-filters');

// Initialize projects
function initializeProjects() {
    // Show only featured projects on the main page
    const featuredProjects = projects.filter(project => project.featured);
    renderProjects(featuredProjects);
}

// Render projects
function renderProjects(projectsToRender) {
    projectsGrid.innerHTML = '';
    
    projectsToRender.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card reveal-fade';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-technologies', project.technologies.join(','));
    card.setAttribute('data-year', project.year);

    card.innerHTML = `
        <div class="project-image" style="background: linear-gradient(45deg, #2d3436, #636e72);">
            <div class="project-overlay">
                <div class="project-links">
                    <a href="${project.links.demo}" class="project-link">View Project</a>
                    <a href="${project.links.github}" class="project-link">Source Code</a>
                </div>
            </div>
        </div>
        <div class="project-content">
            <div class="project-badge">${project.category}</div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                <span>${project.year}</span>
            </div>
        </div>
    `;

    return card;
}

// Filter projects
function filterProjects() {
    const selectedCategories = Array.from(document.querySelectorAll('input[value^="system"], input[value^="web"], input[value^="mobile"], input[value^="ai"], input[value^="blockchain"]:checked')).map(input => input.value);
    const selectedTechnologies = Array.from(document.querySelectorAll('input[value^="c"], input[value^="python"], input[value^="java"], input[value^="react"], input[value^="flutter"], input[value^="nextjs"], input[value^="blockchain"]:checked')).map(input => input.value);
    const selectedYears = Array.from(document.querySelectorAll('input[value^="202"]:checked')).map(input => input.value);

    const filteredProjects = projects.filter(project => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(project.category);
        const technologyMatch = selectedTechnologies.length === 0 || project.technologies.some(tech => selectedTechnologies.includes(tech));
        const yearMatch = selectedYears.length === 0 || selectedYears.includes(project.year);

        return categoryMatch && technologyMatch && yearMatch;
    });

    renderProjects(filteredProjects);
}

// Event Listeners
filterOptions.forEach(option => {
    option.addEventListener('change', filterProjects);
});

clearFiltersBtn.addEventListener('click', () => {
    filterOptions.forEach(option => {
        option.checked = false;
    });
    renderProjects(projects);
});

// Initialize
document.addEventListener('DOMContentLoaded', initializeProjects); 