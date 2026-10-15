/**
 * LES DESSOUS DU BUSINESS — HIGH CONVERSION & TRACKING ENGINE
 * 
 * Fonctionnalités :
 * 1. Suivi de campagne Chariow (Code: SCROX9Q9UK) avec transmission dynamique des UTMs
 * 2. Déclenchement de l'événement Meta Pixel "InitiateCheckout" (valeur adaptée XOF/USD selon la page)
 * 3. Compte à rebours dynamique d'urgence
 * 4. Accordéon FAQ interactif
 * 5. Notifications de ventes en direct localisées (Social Proof)
 * 
 * NOTE SEO : La séparation des langues est gérée nativement via les URLs /fr/ et /en/
 * sans bascule automatique par IP, pour une indexation Google optimale et 0 friction.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Détection de la langue de la page courante (définie dans la balise <html lang="...">)
  const currentLang = (document.documentElement.lang || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';

  // ==========================================================================
  // 1. CONFIGURATION CHARIOW & TRANSMISSION DE LA CAMPAGNE SCROX9Q9UK
  // ==========================================================================
  const DEFAULT_CAMPAIGN_CODE = 'SCROX9Q9UK';

  function getChariowCheckoutUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const campaignCode = urlParams.get('chw_campaign') || urlParams.get('campaign') || DEFAULT_CAMPAIGN_CODE;
    
    const targetUrl = new URL('https://wyvmgyhr.mychariow.com/prd_vqzd2xnd');
    targetUrl.searchParams.set('chw_campaign', campaignCode);
    targetUrl.searchParams.set('campaign', campaignCode);

    // Transmettre également les paramètres publicitaires s'ils existent
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'].forEach(param => {
      const val = urlParams.get(param);
      if (val) targetUrl.searchParams.set(param, val);
    });

    return targetUrl.toString();
  }

  const finalCheckoutUrl = getChariowCheckoutUrl();

  // ==========================================================================
  // 2. GESTION DES BOUTONS CTA & TRACKING META ADS (InitiateCheckout)
  // ==========================================================================
  const ctaButtons = document.querySelectorAll('.track-checkout-btn');

  ctaButtons.forEach(btn => {
    btn.setAttribute('href', finalCheckoutUrl);

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Envoi de l'événement de conversion InitiateCheckout à Meta
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: currentLang === 'en' 
            ? 'Practical Guide: Speak in public with confidence' 
            : 'Guide Pratique: Prends la parole avec assurance',
          content_category: 'Digital Guide',
          currency: currentLang === 'en' ? 'USD' : 'XOF',
          value: currentLang === 'en' ? 4.99 : 2500
        });
      }

      // Envoi de l'événement de conversion begin_checkout à Google Analytics 4 (GA4)
      if (typeof gtag === 'function') {
        gtag('event', 'begin_checkout', {
          currency: currentLang === 'en' ? 'USD' : 'XOF',
          value: currentLang === 'en' ? 4.99 : 2500,
          items: [{
            item_id: 'prd_vqzd2xnd',
            item_name: currentLang === 'en' 
              ? 'Practical Guide: Speak in public with confidence' 
              : 'Guide Pratique: Prends la parole avec assurance',
            price: currentLang === 'en' ? 4.99 : 2500,
            quantity: 1
          }]
        });
      }

      // Redirection fluide vers Chariow avec la campagne affiliée
      setTimeout(() => {
        window.location.href = finalCheckoutUrl;
      }, 180);
    });
  });

  // ==========================================================================
  // 3. COMPTE À REBOURS D'URGENCE DYNAMIQUE
  // ==========================================================================
  const countdownEl = document.getElementById('countdown-timer');
  if (countdownEl) {
    let totalSeconds = 4 * 3600 + 18 * 60 + 42;

    const updateTimer = () => {
      if (totalSeconds <= 0) totalSeconds = 6 * 3600;
      totalSeconds--;

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n) => String(n).padStart(2, '0');
      countdownEl.textContent = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    };

    setInterval(updateTimer, 1000);
  }

  // ==========================================================================
  // 4. ACCORDÉON FAQ INTERACTIF
  // ==========================================================================
  const faqPanels = document.querySelectorAll('.faq-panel');
  faqPanels.forEach(panel => {
    const triggerBtn = panel.querySelector('.faq-trigger-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        const isActive = panel.classList.contains('active');

        faqPanels.forEach(other => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-trigger-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

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

  // ==========================================================================
  // 5. NOTIFICATIONS SOCIAL PROOF LOCALISÉES (Commandes récentes)
  // ==========================================================================
  const salesToast = document.getElementById('liveSalesToast');
  const toastName = document.getElementById('toastName');
  const toastLocation = document.getElementById('toastLocation');
  const toastTime = document.getElementById('toastTime');

  if (salesToast && toastName && toastLocation && toastTime) {
    const buyersFR = [
      { name: 'Koffi A.', location: 'Abidjan', time: 'il y a 4 min', action: 'A commandé le guide' },
      { name: 'David M.', location: 'Cotonou', time: 'il y a 11 min', action: 'A commandé le guide' },
      { name: 'Sébastien B.', location: 'Paris', time: 'il y a 19 min', action: 'A commandé le guide' },
      { name: 'Aïssatou D.', location: 'Dakar', time: 'il y a 27 min', action: 'A commandé le guide' },
      { name: 'Emmanuel K.', location: 'Lomé', time: 'il y a 38 min', action: 'A commandé le guide' },
      { name: 'Patrick N.', location: 'Douala', time: 'il y a 45 min', action: 'A commandé le guide' }
    ];

    const buyersEN = [
      { name: 'Michael S.', location: 'New York', time: '4 min ago', action: 'Just ordered the guide' },
      { name: 'David M.', location: 'London', time: '11 min ago', action: 'Just ordered the guide' },
      { name: 'Sarah T.', location: 'Toronto', time: '19 min ago', action: 'Just ordered the guide' },
      { name: 'Emeka O.', location: 'Lagos', time: '27 min ago', action: 'Just ordered the guide' },
      { name: 'Kwame B.', location: 'Accra', time: '38 min ago', action: 'Just ordered the guide' },
      { name: 'James K.', location: 'Johannesburg', time: '45 min ago', action: 'Just ordered the guide' }
    ];

    let buyerIndex = 0;

    const showToast = () => {
      const list = currentLang === 'en' ? buyersEN : buyersFR;
      const buyer = list[buyerIndex % list.length];
      
      toastName.textContent = buyer.name;
      toastLocation.textContent = buyer.location;
      toastTime.textContent = buyer.time;

      const actionEl = salesToast.querySelector('.toast-product-action');
      if (actionEl) {
        actionEl.innerHTML = `${buyer.action} • <span>${buyer.time}</span>`;
      }

      salesToast.classList.add('show');

      setTimeout(() => {
        salesToast.classList.remove('show');
      }, 5000);

      buyerIndex = (buyerIndex + 1) % list.length;
    };

    setTimeout(() => {
      showToast();
      setInterval(showToast, 18000);
    }, 4000);
  }
});
