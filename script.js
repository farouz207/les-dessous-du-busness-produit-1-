/**
 * LES DESSOUS DU BUSINESS — INTERACTION & META TRACKING SCRIPT
 * Gère le suivi du Pixel Meta (1969381983752388), le compte à rebours,
 * l'accordéon FAQ et les notifications de commande en direct.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration du lien Chariow & suivi de campagne automatique
  const DEFAULT_CAMPAIGN_CODE = 'SCROX9Q9UK';

  function getChariowCheckoutUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const campaignCode = urlParams.get('chw_campaign') || urlParams.get('campaign') || DEFAULT_CAMPAIGN_CODE;
    
    const targetUrl = new URL('https://wyvmgyhr.mychariow.com/prd_vqzd2xnd');
    targetUrl.searchParams.set('chw_campaign', campaignCode);
    targetUrl.searchParams.set('campaign', campaignCode);

    // Transmettre également les paramètres publicitaires (UTM, Facebook Click ID) s'ils existent
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'].forEach(param => {
      const val = urlParams.get(param);
      if (val) {
        targetUrl.searchParams.set(param, val);
      }
    });

    return targetUrl.toString();
  }

  const finalCheckoutUrl = getChariowCheckoutUrl();

  // 1. GESTION DU CLIC CTA AVEC TRACKING META PIXEL (InitiateCheckout)
  const ctaButtons = document.querySelectorAll('.track-checkout-btn');

  ctaButtons.forEach(btn => {
    // Mettre à jour l'attribut href pour la sécurité et le fallback natif
    btn.setAttribute('href', finalCheckoutUrl);

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Envoi de l'événement de conversion InitiateCheckout à Meta
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: 'Guide Pratique: Prends la parole avec assurance',
          content_category: 'Digital Guide',
          currency: 'XOF',
          value: 2500
        });
      }

      // Redirection fluide vers Chariow avec la campagne de suivi
      setTimeout(() => {
        window.location.href = finalCheckoutUrl;
      }, 200);
    });
  });

  // 2. COMPTE À REBOURS D'URGENCE DYNAMIQUE
  const countdownEl = document.getElementById('countdown-timer');
  if (countdownEl) {
    let totalSeconds = 4 * 3600 + 18 * 60 + 42; // 04h 18m 42s

    const updateTimer = () => {
      if (totalSeconds <= 0) {
        totalSeconds = 6 * 3600; // Reset si expiration
      }
      totalSeconds--;

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n) => String(n).padStart(2, '0');
      countdownEl.textContent = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    };

    setInterval(updateTimer, 1000);
  }

  // 3. ACCORDÉON FAQ INTERACTIF & ACCESSIBLE
  const faqPanels = document.querySelectorAll('.faq-panel, .faq-item');
  faqPanels.forEach(panel => {
    const triggerBtn = panel.querySelector('.faq-trigger-btn, .faq-question');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        const isActive = panel.classList.contains('active');

        // Fermer tous les autres panneaux
        faqPanels.forEach(other => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-trigger-btn, .faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Basculer l'état du panneau actuel
        if (!isActive) {
          panel.classList.add('active');
          triggerBtn.setAttribute('aria-expanded', 'true');
        } else {
          panel.classList.remove('active');
          triggerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // 4. NOTIFICATIONS SOCIAL PROOF (Commandes récentes en direct)
  const salesToast = document.getElementById('liveSalesToast');
  const toastName = document.getElementById('toastName');
  const toastLocation = document.getElementById('toastLocation');
  const toastTime = document.getElementById('toastTime');

  if (salesToast) {
    const buyers = [
      { name: 'Koffi A.', location: 'Abidjan', time: 'il y a 4 min' },
      { name: 'David M.', location: 'Cotonou', time: 'il y a 11 min' },
      { name: 'Sébastien B.', location: 'Paris', time: 'il y a 19 min' },
      { name: 'Aïssatou D.', location: 'Dakar', time: 'il y a 27 min' },
      { name: 'Emmanuel K.', location: 'Lomé', time: 'il y a 38 min' },
      { name: 'Patrick N.', location: 'Douala', time: 'il y a 45 min' }
    ];

    let buyerIndex = 0;

    const showToast = () => {
      const buyer = buyers[buyerIndex];
      toastName.textContent = buyer.name;
      toastLocation.textContent = buyer.location;
      toastTime.textContent = buyer.time;

      salesToast.classList.add('show');

      // Cache après 5 secondes
      setTimeout(() => {
        salesToast.classList.remove('show');
      }, 5000);

      buyerIndex = (buyerIndex + 1) % buyers.length;
    };

    // Première notification après 4 secondes, puis toutes les 18 secondes
    setTimeout(() => {
      showToast();
      setInterval(showToast, 18000);
    }, 4000);
  }
});
