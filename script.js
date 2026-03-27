document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-btn');

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const pageUrl = window.location.href;

            // Simple copy to clipboard
            navigator.clipboard.writeText(pageUrl).then(() => {
                // Feedback to user
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '📋 Link Copiado!';
                copyBtn.style.background = 'linear-gradient(135deg, #4caf50, #388e3c)';

                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar link: ', err);
                alert('Não foi possível copiar o link. Por favor, copie manualmente da barra de endereços.');
            });
        });
    }

    // Optional: Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
