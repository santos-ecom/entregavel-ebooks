// DOM Elements
const dashboardView = document.getElementById('dashboard-view');
const navItems = document.querySelectorAll('.nav-item[data-tab]');
const tabContents = document.querySelectorAll('.tab-content');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Get saved tab or default to 'how-to-use'
    const savedTab = localStorage.getItem('activeTab_' + window.location.pathname) || 'how-to-use';
    switchTab(savedTab);

    // Bind Sidebar Nav
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // --- Module Navigation Binding ---
    bindModuleNavigation();
});

// --- Tab Switching Logic ---
function switchTab(tabId) {
    // Save state to localStorage
    localStorage.setItem('activeTab_' + window.location.pathname, tabId);
    // 0. RESET STATE of all modules/accordions
    resetSubmodules();

    // 1. Update Sidebar Active State
    navItems.forEach(item => {
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 2. Update Content Area
    tabContents.forEach(content => {
        if (content.id === tabId) {
            content.classList.remove('hidden');
            content.classList.add('active');
        } else {
            content.classList.add('hidden');
            content.classList.remove('active');
        }
    });

    // Scroll to top
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;
}

function resetSubmodules() {
    // Query elements dynamically to ensure they exist
    const allDetailViews = document.querySelectorAll('.main-content [id^="module-"][id$="-view"]');

    // Select ALL container types that act as main lists
    const allListContainers = document.querySelectorAll(
        '.hero-card, .grid-container'
    );

    // 1. Close all detailed views
    allDetailViews.forEach(view => {
        if (view) view.classList.add('hidden');
    });

    // 2. Show all main list containers
    allListContainers.forEach(container => {
        if (container) container.classList.remove('hidden');
    });
}

// --- Navigation Helpers ---
function openDetailView(viewId) {
    const view = document.getElementById(viewId);
    if (!view) return;

    const heroCard = document.querySelector('.hero-card');
    const gridContainer = document.querySelector('.grid-container');

    if (heroCard) heroCard.classList.add('hidden');
    if (gridContainer) gridContainer.classList.add('hidden');

    view.classList.remove('hidden');

    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;
}

function closeDetailView(viewId) {
    const view = document.getElementById(viewId);
    if (!view) return;

    const heroCard = document.querySelector('.hero-card');
    const gridContainer = document.querySelector('.grid-container');

    view.classList.add('hidden');
    if (heroCard) heroCard.classList.remove('hidden');
    if (gridContainer) gridContainer.classList.remove('hidden');
}

// --- Module Card Binding ---
function bindModuleNavigation() {
    // We have modules 1 to 6
    for (let i = 1; i <= 10; i++) {
        const cardId = `module-${i}-card`;
        const viewId = `module-${i}-view`;

        const card = document.getElementById(cardId);

        // Bind Click on Card
        if (card) {
            card.addEventListener('click', () => {
                const view = document.getElementById(viewId);
                // If view exists, open it, else just log or alert (since user said he will provide later, maybe views don't exist yet fully in DOM if I didn't create them all)
                if (view) {
                    openDetailView(viewId);
                } else {
                    console.warn(`View ${viewId} not found`);
                    // Create view dynamically if missing? Or just alert.
                    // alert("Conteúdo em breve!");
                    createAndOpenTemporaryView(i);
                }
            });
        }
    }

    // Bind Back Buttons (Global delegation or specific)
    // Since we might have replaced innerHTML, let's use delegation for back buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.back-btn')) {
            const view = e.target.closest('[id$="-view"]');
            if (view) {
                closeDetailView(view.id);
            }
        }
    });
}

function createAndOpenTemporaryView(moduleIndex) {
    // This is a fallback if the view HTML is not yet in index.html
    // But I plan to add placeholders in index.html as well.
    console.log(`Opening temporary view for module ${moduleIndex}`);
}

// --- Video Modal Logic (Embeds) ---
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-watch');
    if (btn) {
        e.preventDefault();
        const videoSrc = btn.getAttribute('data-video-src');
        // Simple alert for now as no modal HTML structure was guaranteed in previous steps, 
        // effectively placeholders until user provides videos.
        if (videoSrc) {
            console.log("Play video:", videoSrc);
        }
    }
});

