// Initialize Lucide icons
lucide.createIcons();

// Elements
const header = document.querySelector('header');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenu.classList.contains('active') ? 'x' : 'menu';
        menuToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    });
}

// Smooth scroll and active state management
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const isHome = document.body.id === 'home-page';
        const target = this.getAttribute('href');
        
        if (isHome && target.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(target);
            if (element) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({
                    top: element.offsetTop - headerHeight + 5,
                    behavior: 'smooth'
                });
            }
        }
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.innerHTML = `<i data-lucide="menu"></i>`;
            lucide.createIcons();
        }
    });
});

// ===== MODAL AFILIADO =====
const modalOverlay   = document.getElementById('modal-afiliado');
const btnOpenModal   = document.getElementById('btn-open-afiliado');
const btnCloseModal  = document.getElementById('modal-close');
const btnEnviar      = document.getElementById('btn-enviar-afiliado');
const btnFecharSuc   = document.getElementById('btn-fechar-sucesso');
const step1          = document.getElementById('modal-step-1');
const step2          = document.getElementById('modal-step-2');

function openModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Reset form
    ['af-nome','af-localizacao','af-idade'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const cb = document.getElementById('af-termos');
    if (cb) cb.checked = false;
    clearErrors();
    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
    lucide.createIcons();
}

function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function clearErrors() {
    ['err-nome','err-loc','err-idade','err-termos'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });
}

function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

if (btnOpenModal)  btnOpenModal.addEventListener('click', openModal);
if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
if (btnFecharSuc)  btnFecharSuc.addEventListener('click', closeModal);

// Close on overlay click
if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
}

// Close on ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

// Enviar candidatura
if (btnEnviar) {
    btnEnviar.addEventListener('click', function() {
        clearErrors();
        const nome       = (document.getElementById('af-nome')?.value || '').trim();
        const localizacao = (document.getElementById('af-localizacao')?.value || '').trim();
        const idade      = (document.getElementById('af-idade')?.value || '').trim();
        const termos     = document.getElementById('af-termos')?.checked;

        let valid = true;

        if (!nome || nome.length < 3) {
            showError('err-nome', 'Por favor, insira o seu nome completo.');
            valid = false;
        }
        if (!localizacao) {
            showError('err-loc', 'Por favor, insira a sua localização.');
            valid = false;
        }
        if (!idade || isNaN(idade) || Number(idade) < 16 || Number(idade) > 99) {
            showError('err-idade', 'Insira uma idade válida (16–99).');
            valid = false;
        }
        if (!termos) {
            showError('err-termos', 'Deve aceitar os termos para continuar.');
            valid = false;
        }

        if (!valid) return;

        // Montar mensagem WhatsApp
        const msg = encodeURIComponent(
            `🤝 *Nova Candidatura de Afiliado - QUASK*\n\n` +
            `👤 *Nome:* ${nome}\n` +
            `📍 *Localização:* ${localizacao}\n` +
            `🎂 *Idade:* ${idade} anos\n\n` +
            `✅ Aceitou os termos de responsabilidade.\n\n` +
            `Por favor, analisem a candidatura e enviem o código de afiliado.`
        );

        const whatsappURL = `https://wa.me/244955601748?text=${msg}`;

        // Mostrar passo de sucesso
        if (step1) step1.style.display = 'none';
        if (step2) step2.style.display = 'block';
        lucide.createIcons();

        // Abrir WhatsApp depois de um pequeno delay para o utilizador ver a mensagem de sucesso
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 800);
    });
}
