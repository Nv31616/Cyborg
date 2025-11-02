document.addEventListener('DOMContentLoaded', function() {
    
    // --- SPA Navigation Logic ---
    const loginPage = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentViews = document.querySelectorAll('.content-view');
    const loginForm = document.getElementById('login-form');

    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
    }

    function showContent(viewId) {
        contentViews.forEach(view => view.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
        
        // Update active class in navigation
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`.nav-link[data-page="${viewId}"]`).classList.add('active');
        
        // Re-initialize chart if we switch to the insights view
        if (viewId === 'insights') {
             initializeSpendingChart();
        }
    }

    // Login Simulation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app: Perform secure ZKP verification here.
        alert("ZKP Verified. Welcome to ARCUS!");
        loginPage.classList.remove('active');
        mainApp.classList.add('active');
        // Start on the Spending Insights page
        showContent('insights'); 
    });

    // Navigation Handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');

            if (targetPage === 'logout') {
                alert("Logged out securely.");
                showPage('login-page');
                // Hide main app content on logout
                mainApp.classList.remove('active');
                loginForm.reset(); // Clear login form
                document.title = "ARCUS Digital Finance - Secure Login";
            } else if (targetPage === 'payments' || targetPage === 'insights') {
                showContent(targetPage);
                document.title = `ARCUS - ${targetPage.charAt(0).toUpperCase() + targetPage.slice(1)} View`;
            }
        });
    });

    // --- Chart Initialization (Must be called when the canvas is visible) ---
    let spendingChartInstance = null;
    
    function initializeSpendingChart() {
        // Destroy existing chart instance to prevent duplicates/errors
        if (spendingChartInstance) {
            spendingChartInstance.destroy();
        }

        const spendingCtx = document.getElementById('spendingChart').getContext('2d');
        
        const spendingData = {
            labels: ['Groceries', 'Rent/Housing', 'Bills & Utilities', 'Transportation', 'Dining Out', 'Savings/Investments'],
            datasets: [{
                data: [350, 800, 150, 100, 120, 450], 
                backgroundColor: [
                    '#dc3545', 
                    '#007bff',
                    '#ffc107',
                    '#20c997',
                    '#6f42c1',
                    '#28a745' 
                ],
                hoverOffset: 4
            }]
        };

        spendingChartInstance = new Chart(spendingCtx, {
            type: 'doughnut',
            data: spendingData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }
    
    // --- Initial Load State ---
    showPage('login-page'); 
    document.title = "ARCUS Digital Finance - Secure Login";

    // Initialize the chart only if the insights view is initially active (not in this case, but good practice)
    // The chart initialization is now handled by the showContent('insights') function after login.
});