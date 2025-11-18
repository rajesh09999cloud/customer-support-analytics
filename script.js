:root {
    --primary: #4361ee;
    --secondary: #3f37c9;
    --accent: #4cc9f0;
    --success: #4ade80;
    --warning: #f59e0b;
    --danger: #ef4444;
    --dark: #1e293b;
    --light: #f8fafc;
    --gray: #64748b;
    --sidebar-width: 280px;
    --header-height: 70px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: var(--dark);
}

.dashboard-container {
    display: flex;
    min-height: 100vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    margin: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

/* Sidebar Styles */
.sidebar {
    width: var(--sidebar-width);
    background: linear-gradient(180deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
}

.logo {
    display: flex;
    align-items: center;
    padding: 0 25px 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 30px;
}

.logo i {
    font-size: 28px;
    margin-right: 12px;
    color: var(--accent);
}

.logo h1 {
    font-size: 22px;
    font-weight: 700;
}

.nav-links {
    list-style: none;
    padding: 0;
    flex-grow: 1;
}

.nav-links li {
    margin-bottom: 8px;
}

.nav-links a {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
}

.nav-links a:hover, .nav-links a.active {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-left-color: var(--accent);
}

.nav-links i {
    font-size: 20px;
    margin-right: 15px;
    width: 24px;
    text-align: center;
}

.nav-links span {
    font-weight: 500;
    font-size: 16px;
}

/* Main Content Styles */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.header {
    height: var(--header-height);
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    z-index: 10;
}

.header h2 {
    font-weight: 600;
    color: var(--dark);
    margin: 0;
}

.user-info {
    display: flex;
    align-items: center;
}

.user-info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    border: 2px solid var(--accent);
}

.content-area {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
    background: var(--light);
}

.tab-content {
    display: none;
    animation: fadeIn 0.5s ease;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Dashboard Overview Styles */
.welcome-banner {
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    color: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 10px 20px rgba(67, 97, 238, 0.3);
}

.welcome-banner h3 {
    font-weight: 600;
    margin-bottom: 10px;
}

.metrics-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.metric-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-left: 5px solid var(--primary);
}

.metric-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.metric-card.urgent {
    border-left-color: var(--danger);
}

.metric-card.resolved {
    border-left-color: var(--success);
}

.metric-card.pending {
    border-left-color: var(--warning);
}

.metric-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    font-size: 24px;
    color: white;
}

.metric-card .metric-icon {
    background: var(--primary);
}

.metric-card.urgent .metric-icon {
    background: var(--danger);
}

.metric-card.resolved .metric-icon {
    background: var(--success);
}

.metric-card.pending .metric-icon {
    background: var(--warning);
}

.metric-value {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 5px;
    color: var(--dark);
}

.metric-label {
    color: var(--gray);
    font-weight: 500;
}

.charts-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.chart-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.chart-card h4 {
    margin-bottom: 20px;
    color: var(--dark);
    font-weight: 600;
}

.recent-tickets {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.recent-tickets h4 {
    margin-bottom: 20px;
    color: var(--dark);
    font-weight: 600;
}

.ticket-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s ease;
}

.ticket-item:hover {
    background: #f8fafc;
}

.ticket-item:last-child {
    border-bottom: none;
}

.ticket-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    color: white;
    font-size: 18px;
}

.ticket-info {
    flex: 1;
}

.ticket-title {
    font-weight: 500;
    margin-bottom: 5px;
}

.ticket-meta {
    display: flex;
    font-size: 13px;
    color: var(--gray);
}

.ticket-meta span {
    margin-right: 15px;
}

.ticket-priority {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.priority-high {
    background: #fee2e2;
    color: var(--danger);
}

.priority-medium {
    background: #fef3c7;
    color: var(--warning);
}

.priority-low {
    background: #d1fae5;
    color: var(--success);
}

/* Ticket Classifier Styles */
.classifier-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
}

.input-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.input-card h4 {
    margin-bottom: 20px;
    color: var(--dark);
    font-weight: 600;
}

.ticket-input {
    width: 100%;
    min-height: 200px;
    padding: 15px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 16px;
    resize: vertical;
    margin-bottom: 20px;
    transition: border 0.3s ease;
}

.ticket-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.analyze-btn {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.analyze-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(67, 97, 238, 0.4);
}

.analyze-btn i {
    margin-right: 8px;
}

.examples-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.examples-card h4 {
    margin-bottom: 20px;
    color: var(--dark);
    font-weight: 600;
}

.example-item {
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
}

.example-item:hover {
    background: #f8fafc;
    border-left-color: var(--primary);
}

.example-item:last-child {
    margin-bottom: 0;
}

.example-title {
    font-weight: 500;
    margin-bottom: 5px;
}

.example-text {
    font-size: 14px;
    color: var(--gray);
}

.results-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-top: 20px;
    display: none;
}

.results-card h4 {
    margin-bottom: 20px;
    color: var(--dark);
    font-weight: 600;
}

.results-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.result-item {
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    background: #f8fafc;
}

.result-label {
    font-size: 14px;
    color: var(--gray);
    margin-bottom: 10px;
}

.result-value {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px;
}

.result-confidence {
    font-size: 14px;
    color: var(--success);
    font-weight: 500;
}

.recommendation {
    margin-top: 20px;
    padding: 15px;
    background: #ecfdf5;
    border-radius: 10px;
    border-left: 4px solid var(--success);
}

/* Data Analytics Styles */
.filters-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
}

.filters-card h4 {
    margin-bottom: 20px;
    color: var(--dark);
    font-weight: 600;
}

.filter-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.filter-group {
    margin-bottom: 15px;
}

.filter-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--dark);
}

.filter-select {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    font-size: 14px;
}

.data-table-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.data-table-card h4 {
    margin-bottom: 20px;
    color: var(--dark);
    font-weight: 600;
}

.table-responsive {
    border-radius: 10px;
    overflow: hidden;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th {
    background: #f8fafc;
    padding: 15px;
    text-align: left;
    font-weight: 600;
    color: var(--dark);
    border-bottom: 1px solid #e2e8f0;
}

.table td {
    padding: 15px;
    border-bottom: 1px solid #f1f5f9;
}

.table tr:hover {
    background: #f8fafc;
}

.status-badge {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.status-open {
    background: #dbeafe;
    color: var(--primary);
}

.status-closed {
    background: #d1fae5;
    color: var(--success);
}

.status-pending {
    background: #fef3c7;
    color: var(--warning);
}

/* Responsive Styles */
@media (max-width: 992px) {
    .dashboard-container {
        flex-direction: column;
        margin: 10px;
    }
    
    .sidebar {
        width: 100%;
        padding: 20px;
    }
    
    .nav-links {
        display: flex;
        overflow-x: auto;
        padding-bottom: 10px;
    }
    
    .nav-links li {
        margin-bottom: 0;
        margin-right: 10px;
    }
    
    .nav-links a {
        border-left: none;
        border-bottom: 3px solid transparent;
        white-space: nowrap;
    }
    
    .nav-links a:hover, .nav-links a.active {
        border-left-color: transparent;
        border-bottom-color: var(--accent);
    }
    
    .charts-container, .classifier-container {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 576px) {
    .metrics-container {
        grid-template-columns: 1fr;
    }
    
    .results-grid {
        grid-template-columns: 1fr;
    }
    
    .header {
        padding: 0 15px;
    }
    
    .content-area {
        padding: 15px;
    }
}
