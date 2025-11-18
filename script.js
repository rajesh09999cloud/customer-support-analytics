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
    initializeCharts();
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

    // Generate sample tickets
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
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.nav-links a').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all tab content
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Update header title
            document.getElementById('currentTab').textContent = 
                this.querySelector('span').textContent + (tabId === 'dashboard' ? ' Overview' : '');
            
            // Initialize charts if on dashboard
            if (tabId === 'dashboard') {
                initializeCharts();
            }
        });
    });

    // Example ticket click
    document.querySelectorAll('.example-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('.example-text').textContent;
            document.querySelector('.ticket-input').value = text;
        });
    });

    // Analyze button
    document.querySelector('.analyze-btn').addEventListener('click', analyzeTicket);

    // Filter changes
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', updateFilters);
    });
}

// Initialize Charts
function initializeCharts() {
    // Destroy existing charts if they exist
    if (window.categoryChart) {
        window.categoryChart.destroy();
    }
    if (window.priorityChart) {
        window.priorityChart.destroy();
    }

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    window.categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Billing', 'Technical', 'Account', 'General'],
            datasets: [{
                data: [35, 28, 22, 15],
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
                    position: 'bottom'
                }
            }
        }
    });

    // Priority Chart
    const priorityCtx = document.getElementById('priorityChart').getContext('2d');
    window.priorityChart = new Chart(priorityCtx, {
        type: 'bar',
        data: {
            labels: ['Low', 'Medium', 'High', 'Urgent'],
            datasets: [{
                label: 'Tickets',
                data: [45, 62, 28, 12],
                backgroundColor: [
                    '#10b981', '#f59e0b', '#ef4444', '#7c3aed'
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
                        stepSize: 10
                    }
                }
            }
        }
    });
}

// Ticket Classification
function analyzeTicket() {
    const ticketText = document.querySelector('.ticket-input').value.trim();
    
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
    const resultsCard = document.querySelector('.results-card');
    resultsCard.style.display = 'block';
    
    // Update result values
    document.querySelector('.result-value:nth-child(2)').textContent = category;
    document.querySelector('.result-confidence:nth-child(3)').textContent = categoryConfidence + ' Confidence';
    
    document.querySelectorAll('.result-value')[1].textContent = priority;
    document.querySelectorAll('.result-confidence')[1].textContent = priorityConfidence + ' Confidence';
    
    document.querySelector('.recommendation strong').innerHTML = 
        `Recommended Action: Route to ${category} team with ${priority} priority`;

    // Add animation
    resultsCard.style.opacity = '0';
    resultsCard.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        resultsCard.style.transition = 'all 0.5s ease';
        resultsCard.style.opacity = '1';
        resultsCard.style.transform = 'translateY(0)';
    }, 100);
}

// Update filters
function updateFilters() {
    // In a real application, this would filter the data and update the table
    console.log('Filters updated');
    
    // Show loading state
    const tableCard = document.querySelector('.data-table-card');
    const originalContent = tableCard.innerHTML;
    
    tableCard.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Applying filters...</p>
        </div>
    `;
    
    // Simulate API call delay
    setTimeout(() => {
        tableCard.innerHTML = originalContent;
        
        // Reattach event listeners if needed
        document.querySelectorAll('.filter-select').forEach(select => {
            select.addEventListener('change', updateFilters);
        });
    }, 1000);
}

// Update metrics with real-time data
function updateMetrics() {
    // Calculate metrics from sample data
    const totalTickets = sampleData.tickets.length;
    const resolvedTickets = sampleData.tickets.filter(ticket => ticket.status === 'Closed').length;
    const pendingTickets = sampleData.tickets.filter(ticket => ticket.status === 'Pending').length;
    const urgentTickets = sampleData.tickets.filter(ticket => ticket.priority === 'Urgent').length;
    
    // Update metric cards
    document.querySelector('.metric-card:nth-child(1) .metric-value').textContent = totalTickets.toLocaleString();
    document.querySelector('.metric-card.resolved .metric-value').textContent = resolvedTickets.toLocaleString();
    document.querySelector('.metric-card.pending .metric-value').textContent = pendingTickets.toLocaleString();
    document.querySelector('.metric-card.urgent .metric-value').textContent = urgentTickets.toLocaleString();
}

// Initialize metrics on load
updateMetrics();
