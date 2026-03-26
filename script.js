document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initCountdown();
    setupNavigation();
    setupVideoPlayer();
}

// --- Navigation ---
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            showSection(target);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = ['home', 'aulas', 'projetos', 'bonus'];
    sections.forEach(s => {
        const el = document.getElementById(`${s}-section`);
        if (el) el.style.display = 'none';
        
        // Remove active class from nav
        const navLink = document.querySelector(`.nav-link[data-target="${s}"]`);
        if (navLink) navLink.classList.remove('active');
    });

    // Show target section
    const targetEl = document.getElementById(`${sectionId}-section`);
    if (targetEl) {
        targetEl.style.display = 'block';
        if (sectionId === 'aulas') targetEl.classList.add('active');
    }

    // Update nav active state
    const targetLink = document.querySelector(`.nav-link[data-target="${sectionId}"]`);
    if (targetLink) targetLink.classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Video Player ---
function setupVideoPlayer() {
    const videoItems = document.querySelectorAll('.video-item');
    const currentTitle = document.getElementById('current-video-title');

    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from others
            videoItems.forEach(v => v.classList.remove('active'));
            // Add active to current
            item.classList.add('active');
            // Update title
            const title = item.getAttribute('data-title');
            if (currentTitle) currentTitle.innerText = title;
            
            console.log(`Carregando: ${title}`);
        });
    });
}

// --- Countdown Logic ---
function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    const certCard = document.getElementById('certificate-card');
    const certBtn = document.getElementById('cert-btn');
    const countdownBar = document.getElementById('countdown-bar');

    // Check if enrollment date exists
    let enrollmentDate = localStorage.getItem('mini_engenheiros_enrollment');
    
    if (!enrollmentDate) {
        enrollmentDate = new Date().getTime();
        localStorage.setItem('mini_engenheiros_enrollment', enrollmentDate);
    }

    const unlockTime = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
    // const unlockTime = 60 * 1000; // Testing: 1 minute

    function updateTimer() {
        const now = new Date().getTime();
        const startTime = parseInt(enrollmentDate);
        const deadline = startTime + unlockTime;
        const distance = deadline - now;

        if (distance < 0) {
            // Unlock Certificate
            countdownEl.innerHTML = "DISPONÍVEL!";
            countdownBar.style.background = "var(--success-green)";
            
            if (certCard) {
                certCard.classList.remove('locked');
                const badge = certCard.querySelector('.locked-badge');
                if (badge) badge.innerText = "LIBERADO!";
                badge.style.background = "var(--success-green)";
                badge.style.color = "white";
            }
            
            if (certBtn) {
                certBtn.classList.remove('disabled');
                certBtn.innerText = "Baixar Certificado";
                certBtn.href = "#"; // Placeholder for certificate download
            }
            
            return;
        }

        // Calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}
