// Sample Data
const sampleData = {
    tickets: [],
    categories: ['Billing', 'Technical', 'Account', 'General'],
    priorities: ['Low', 'Medium', 'High', 'Urgent'],
    statuses: ['Open', 'Closed', 'Pending']
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupEventListeners();
    loadDashboard();
});

// Generate sample data
function initializeData() {
    const ticketTemplates = {
        'Billing': [
            "I was charged twice for my subscription",
            "Can you explain the charges on my bill?",
            "I need a refund for last month's service",
            "Why was my payment declined?",
            "Incorrect billing amount on invoice"
        ],
        'Technical': [
            "The app is crashing when I try to login",
            "I cannot access my dashboard",
            "Feature is not working properly",
            "Getting error code when uploading files",
            "Slow performance issues"
        ],
        'Account': [
            "I forgot my password and cannot reset it",
            "How do I update my email address?",
            "My account was hacked please help",
            "I want to delete my account",
            "Cannot access my account"
        ],
        'General': [
            "How do I contact customer service?",
            "What are your business hours?",
            "I have a general question about services",
            "Can you send me more information about pricing?",
            "Feedback about your service"
        ]
    };

    // Generate 100 sample tickets
    for (let i = 1; i <= 100; i++) {
        const category = sampleData.categories[Math.floor(Math.random() * sampleData.categories.length)];
        const templates = ticketTemplates[category];
        const ticketText = templates[Math.floor(Math.random() * templates.length)];
        
        sampleData.tickets.push({
            id: i,
            text: ticketText,
            category: category,
            priority: sampleData.priorities[Math.floor(Math.random() * sampleData.priorities.length)],
            status: sampleData.statuses[Math.floor(Math.random() * sampleData.statuses.length)],
            resolutionTime: Math.random() * 48 + 2 // 2-50 hours
        });
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            showSection(target);
        });
    });

    // Example tickets
    document.querySelectorAll('.example-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            document.getElementById('ticketInput').value = text;
        });
    });

    // Analyze button
    document.getElementById('analyzeBtn').addEventListener('click', analyzeTicket);

    // Filters
    document.getElementById('categoryFilter').addEventListener('change', updateFilters);
    document.getElementById('priorityFilter').addEventListener('change', updateFilters);
    document.getElementById('statusFilter').addEventListener('change', updateFilters);

    // Populate filter dropdowns
    populateFilters();
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show target section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to clicked nav link
    document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');

    // Load section-specific content
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

// Load dashboard data
function loadDashboard() {
    updateMetrics();
    createCharts();
    loadInsights();
}

// Update key metrics
function updateMetrics() {
    const tickets = sampleData.tickets;
    
    document.getElementById('totalTickets').textContent = tickets.length;
    document.getElementById('totalCategories').textContent = sampleData.categories.length;
    
    const avgResolution = tickets.reduce((sum, ticket) => sum + ticket.resolutionTime, 0) / tickets.length;
    document.getElementById('avgResolution').textContent = `${avgResolution.toFixed(1)}h`;
    
    const urgentTickets = tickets.filter(ticket => ticket.priority === 'Urgent').length;
    document.getElementById('urgentTickets').textContent = urgentTickets;
}

// Create charts
function createCharts() {
    createCategoryChart();
    createPriorityChart();
}

function createCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const categoryCounts = {};
    
    sampleData.categories.forEach(category => {
        categoryCounts[category] = sampleData.tickets.filter(ticket => ticket.category === category).length;
    });

    // Destroy existing chart if it exists
    if (window.categoryChartInstance) {
        window.categoryChartInstance.destroy();
    }

    window.categoryChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sampleData.categories,
            datasets: [{
                label: 'Tickets',
                data: sampleData.categories.map(cat => categoryCounts[cat]),
                backgroundColor: [
                    '#e74c3c', '#3498db', '#2ecc71', '#f39c12'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });
}

function createPriorityChart() {
    const ctx = document.getElementById('priorityChart').getContext('2d');
    const priorityCounts = {};
    
    sampleData.priorities.forEach(priority => {
        priorityCounts[priority] = sampleData.tickets.filter(ticket => ticket.priority === priority).length;
    });

    // Destroy existing chart if it exists
    if (window.priorityChartInstance) {
        window.priorityChartInstance.destroy();
    }

    window.priorityChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sampleData.priorities,
            datasets: [{
                data: sampleData.priorities.map(priority => priorityCounts[priority]),
                backgroundColor: [
                    '#bdc3c7', '#3498db', '#e67e22', '#e74c3c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Load performance insights
function loadInsights() {
    loadResolutionTimes();
    loadStatusOverview();
}

function loadResolutionTimes() {
    const resolutionTimes = document.getElementById('resolutionTimes');
    resolutionTimes.innerHTML = '';
    
    sampleData.categories.forEach(category => {
        const categoryTickets = sampleData.tickets.filter(ticket => ticket.category === category);
        const avgTime = categoryTickets.reduce((sum, ticket) => sum + ticket.resolutionTime, 0) / categoryTickets.length;
        
        const item = document.createElement('div');
        item.className = 'insight-item';
        item.innerHTML = `
            <div class="d-flex justify-content-between">
                <span>${category}:</span>
                <strong>${avgTime.toFixed(1)} hours</strong>
            </div>
        `;
        resolutionTimes.appendChild(item);
    });
}

function loadStatusOverview() {
    const statusOverview = document.getElementById('statusOverview');
    statusOverview.innerHTML = '';
    
    sampleData.statuses.forEach(status => {
        const count = sampleData.tickets.filter(ticket => ticket.status === status).length;
        const percentage = (count / sampleData.tickets.length) * 100;
        
        const item = document.createElement('div');
        item.className = 'insight-item';
        item.innerHTML = `
            <div class="d-flex justify-content-between">
                <span>${status}:</span>
                <strong>${count} tickets (${percentage.toFixed(1)}%)</strong>
            </div>
        `;
        statusOverview.appendChild(item);
    });
}

// Ticket classification
function analyzeTicket() {
    const ticketText = document.getElementById('ticketInput').value.trim();
    
    if (!ticketText) {
        alert('Please enter a ticket description to analyze.');
        return;
    }

    // Simulate ML model prediction
    const ticketLower = ticketText.toLowerCase();
    let category, categoryConfidence, priority, priorityConfidence;

    // Category prediction
    if (ticketLower.includes('charge') || ticketLower.includes('bill') || ticketLower.includes('payment') || ticketLower.includes('refund') || ticketLower.includes('price')) {
        category = 'Billing';
        categoryConfidence = '92%';
    } else if (ticketLower.includes('crash') || ticketLower.includes('error') || ticketLower.includes('bug') || ticketLower.includes('not working') || ticketLower.includes('technical')) {
        category = 'Technical';
        categoryConfidence = '88%';
    } else if (ticketLower.includes('password') || ticketLower.includes('account') || ticketLower.includes('login') || ticketLower.includes('access')) {
        category = 'Account';
        categoryConfidence = '85%';
    } else {
        category = 'General';
        categoryConfidence = '78%';
    }

    // Priority prediction
    if (ticketLower.includes('urgent') || ticketLower.includes('emergency') || ticketLower.includes('immediately') || ticketLower.includes('asap')) {
        priority = 'Urgent';
        priorityConfidence = '95%';
    } else if (ticketLower.includes('not working') || ticketLower.includes('broken') || ticketLower.includes('issue') || ticketLower.includes('problem')) {
        priority = 'High';
        priorityConfidence = '82%';
    } else {
        priority = 'Medium';
        priorityConfidence = '75%';
    }

    // Display results
    document.getElementById('predictedCategory').textContent = category;
    document.getElementById('categoryConfidence').textContent = `Confidence: ${categoryConfidence}`;
    document.getElementById('predictedPriority').textContent = priority;
    document.getElementById('priorityConfidence').textContent = `Confidence: ${priorityConfidence}`;
    document.getElementById('recommendedAction').textContent = `Route to ${category} team with ${priority} priority`;

    // Show results section
    document.getElementById('resultsSection').style.display = 'block';
}

// Populate filter dropdowns
function populateFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    const statusFilter = document.getElementById('statusFilter');

    // Populate categories
    sampleData.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Populate priorities
    sampleData.priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        priorityFilter.appendChild(option);
    });

    // Populate statuses
    sampleData.statuses.forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        statusFilter.appendChild(option);
    });
}

// Update filters and refresh data
function updateFilters() {
    loadAnalytics();
}

// Load analytics data with filters
function loadAnalytics() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    // Apply filters
    let filteredTickets = sampleData.tickets.filter(ticket => {
        const categoryMatch = categoryFilter === 'all' || ticket.category === categoryFilter;
        const priorityMatch = priorityFilter === 'all' || ticket.priority === priorityFilter;
        const statusMatch = statusFilter === 'all' || ticket.status === statusFilter;
        
        return categoryMatch && priorityMatch && statusMatch;
    });

    // Update dataset info
    document.getElementById('datasetInfo').textContent = `Dataset Overview: ${sampleData.tickets.length} support tickets`;
    document.getElementById('filteredCount').textContent = `Showing ${filteredTickets.length} tickets`;

    // Update filtered metrics
    updateFilteredMetrics(filteredTickets);
    
    // Update data table
    updateDataTable(filteredTickets);
}

// Update filtered metrics
function updateFilteredMetrics(filteredTickets) {
    if (filteredTickets.length === 0) {
        document.getElementById('filteredAvgResolution').textContent = '0h';
        document.getElementById('filteredCompletion').textContent = '0%';
        document.getElementById('filteredUrgent').textContent = '0%';
        return;
    }

    // Average resolution time
    const avgResolution = filteredTickets.reduce((sum, ticket) => sum + ticket.resolutionTime, 0) / filteredTickets.length;
    document.getElementById('filteredAvgResolution').textContent = `${avgResolution.toFixed(1)}h`;

    // Completion rate
    const completionRate = (filteredTickets.filter(ticket => ticket.status === 'Closed').length / filteredTickets.length) * 100;
    document.getElementById('filteredCompletion').textContent = `${completionRate.toFixed(1)}%`;

    // Urgent rate
    const urgentRate = (filteredTickets.filter(ticket => ticket.priority === 'Urgent').length / filteredTickets.length) * 100;
    document.getElementById('filteredUrgent').textContent = `${urgentRate.toFixed(1)}%`;
}

// Update data table
function updateDataTable(filteredTickets) {
    const tableBody = document.getElementById('ticketTable');
    tableBody.innerHTML = '';

    // Show only first 15 tickets for performance
    const displayTickets = filteredTickets.slice(0, 15);

    displayTickets.forEach(ticket => {
        const row = document.createElement('tr');
        
        // Truncate long ticket text
        const truncatedText = ticket.text.length > 50 ? ticket.text.substring(0, 50) + '...' : ticket.text;
        
        row.innerHTML = `
            <td>${ticket.id}</td>
            <td title="${ticket.text}">${truncatedText}</td>
            <td>
                <span class="badge category-${ticket.category.toLowerCase()}">${ticket.category}</span>
            </td>
            <td>
                <span class="badge priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span>
            </td>
            <td>
                <span class="badge status-${ticket.status.toLowerCase()}">${ticket.status}</span>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Add badge styles dynamically
    addBadgeStyles();
}

// Add badge styles for categories, priorities, and statuses
function addBadgeStyles() {
    if (!document.getElementById('badgeStyles')) {
        const style = document.createElement('style');
        style.id = 'badgeStyles';
        style.textContent = `
            .badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 500;
            }
            .category-billing { background: #e74c3c; color: white; }
            .category-technical { background: #3498db; color: white; }
            .category-account { background: #2ecc71; color: white; }
            .category-general { background: #f39c12; color: white; }
            .priority-low { background: #bdc3c7; color: #2c3e50; }
            .priority-medium { background: #3498db; color: white; }
            .priority-high { background: #e67e22; color: white; }
            .priority-urgent { background: #e74c3c; color: white; }
            .status-open { background: #3498db; color: white; }
            .status-closed { background: #27ae60; color: white; }
            .status-pending { background: #f39c12; color: white; }
        `;
        document.head.appendChild(style);
    }
}

// Add some CSS for insight items
if (!document.getElementById('dynamicStyles')) {
    const style = document.createElement('style');
    style.id = 'dynamicStyles';
    style.textContent = `
        .insight-item {
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .insight-item:last-child {
            border-bottom: none;
        }
    `;
    document.head.appendChild(style);
}