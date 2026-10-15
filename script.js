/**
 * LES DESSOUS DU BUSINESS — INTELLIGENT BILINGUAL & TRACKING ENGINE
 * 
 * Fonctionnalités clés :
 * 1. Détection intelligente du pays du visiteur (via API géolocalisation & navigateur)
 * 2. Bascule automatique ou manuelle en Français (FR) ou Anglais (EN)
 * 3. Adaptation dynamique de la devise (2 500 FCFA / $4.99 USD) et des badges de paiement
 * 4. Suivi de campagne Chariow (SCROX9Q9UK) et transmission des UTMs
 * 5. Tracking Meta Pixel adapté (XOF / USD)
 * 6. Compte à rebours dynamique et notifications de vente en direct localisées
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. CONFIGURATION CHARIOW & SUIVI DE CAMPAGNE
  // ==========================================================================
  const DEFAULT_CAMPAIGN_CODE = 'SCROX9Q9UK';

  function getChariowCheckoutUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const campaignCode = urlParams.get('chw_campaign') || urlParams.get('campaign') || DEFAULT_CAMPAIGN_CODE;
    
    const targetUrl = new URL('https://wyvmgyhr.mychariow.com/prd_vqzd2xnd');
    targetUrl.searchParams.set('chw_campaign', campaignCode);
    targetUrl.searchParams.set('campaign', campaignCode);

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'].forEach(param => {
      const val = urlParams.get(param);
      if (val) targetUrl.searchParams.set(param, val);
    });

    return targetUrl.toString();
  }

  const finalCheckoutUrl = getChariowCheckoutUrl();

  // ==========================================================================
  // 2. DICTIONNAIRE DE TRADUCTION BILINGUE (FR / EN)
  // ==========================================================================
  const TRANSLATIONS = {
    fr: {
      "top.badge": "🔥 OFFRE DE LANCEMENT EXCLUSIVE",
      "top.text": "Tarif préférentiel limité aux prochains lecteurs <strong>(Seulement 2 500 F CFA)</strong>",
      "top.expires": "⏱️ EXPIRE DANS :",
      "nav.transformation": "La Transformation",
      "nav.curriculum": "Le Sommaire",
      "nav.author": "L'Auteur",
      "nav.testimonials": "Témoignages",
      "nav.faq": "FAQ",
      "nav.cta": "Obtenir mon Guide →",

      "hero.badge": "<span class=\"dot-live\" aria-hidden=\"true\"></span> Édition Officielle • Guide Pratique Numérique",
      "hero.title": "Prends la parole avec <span class=\"highlight-bordeaux\">assurance</span>.",
      "hero.lead": "Développe une présence captivante, structure tes pensées en <strong>3 points percutants</strong> et élimine le trac avant chaque prise de parole.",
      "hero.pillar1": "Gagne en confiance",
      "hero.pillar2": "Structure tes idées",
      "hero.pillar3": "Captive ton audience",
      "hero.cta": "DÉCOUVRIR LE GUIDE (2 500 F)",
      "hero.trustTitle": "🔒 Paiement sécurisé :",
      "hero.rating": "Noté 4.9 / 5",
      "hero.readersCount": "+420 entrepreneurs formés",

      "stats.item1": "Lecteurs ambitieux",
      "stats.item2": "Actionnable & concret",
      "stats.item3": "Méthode étape par étape",
      "stats.item4Val": "Accès à Vie",
      "stats.item4": "Téléchargement immédiat",

      "contrast.eyebrow": "La Différence",
      "contrast.heading": "Ce qui change quand vous maîtrisez la méthode.",
      "contrast.subheading": "L'éloquence n'est pas un don de naissance. C'est un ensemble de leviers psychologiques et posturaux accessibles à tous.",
      "contrast.badgeWithout": "❌ Sans la méthode",
      "contrast.neg1": "Gorge nouée, voix hésitante et rythme cardiaque qui s'emballe dès que tous les regards se tournent vers vous.",
      "contrast.neg2": "Peur constante du trou noir et difficulté à enchaîner vos idées logiquement.",
      "contrast.neg3": "Auditoire qui se distrait, regarde son téléphone et ne retient rien de votre intervention.",
      "contrast.neg4": "Opportunités professionnelles manquées au profit d'orateurs moins compétents mais plus audibles.",
      "contrast.badgeWith": "✓ Avec le Guide Pratique",
      "contrast.pos1": "Protocole physiologique de 90 secondes pour désactiver le trac et calmer immédiatement votre respiration.",
      "contrast.pos2": "Architecture mentale invisible en 3 points : vous savez toujours exactement quoi dire ensuite sans note.",
      "contrast.pos3": "Voix posée dans les graves, pauses magnétiques et posture qui force naturellement le respect.",
      "contrast.pos4": "Une aisance remarquée lors de vos réunions, présentations, vidéos et négociations de haut niveau.",
      "contrast.cta": "JE VEUX CETTE TRANSFORMATION (2 500 F) →",

      "curriculum.eyebrow": "Programme Détaillé",
      "curriculum.heading": "4 Modules pour devenir un orateur d'impact",
      "curriculum.subheading": "Chaque module s'attaque à une étape stratégique pour transformer votre communication.",
      "curriculum.mod1Title": "La Déprogrammation du Trac",
      "curriculum.mod1Desc": "Comprenez la mécanique biologique de la peur pour la neutraliser en 90 secondes. Apprenez l'ancrage corporel qui stabilise les battements cardiaques avant d'entrer en scène.",
      "curriculum.mod2Title": "L'Architecture Invisible du Discours",
      "curriculum.mod2Desc": "Le framework en 3 points pour captiver votre audience du début à la fin. Ne récitez plus jamais par cœur : organisez vos idées comme un fil conducteur limpide et irrésistible.",
      "curriculum.mod3Title": "Le Pouvoir du Silence & de la Voix",
      "curriculum.mod3Desc": "Comment poser sa voix dans les graves, éliminer les tics de langage (« euh », hésitations) et manier les silences stratégiques qui créent une tension d'écoute maximale.",
      "curriculum.mod4Title": "Désarmer les Objections & Imprévus",
      "curriculum.mod4Desc": "La méthode des orateurs charismatiques pour répondre avec sang-froid et élégance aux questions pièges, aux contradictions ou aux incidents techniques.",
      "curriculum.cta": "DÉCOUVRIR LE CONTENU COMPLET →",

      "speaker.motto": "Comprendre • Progresser • Devenir meilleur",
      "speaker.eyebrow": "Une Philosophie Exigeante",
      "speaker.heading": "Ce que personne ne vous dit sur le charisme.",
      "speaker.p1": "Sur les réseaux sociaux, on admire souvent les orateurs magnétiques, capables de suspendre une salle à leurs lèvres. On imagine qu'ils sont nés avec ce don.",
      "speaker.quote": "« Le charisme ne naît pas sur scène. Il naît dans la préparation silencieuse de l'esprit, la rigueur de la structure et le respect de son message. »",
      "speaker.p2": "Ce guide a été rédigé avec une règle absolue : <strong>zéro remplissage, 100% d'efficacité directe</strong>. Vous le lisez en 45 minutes, et vous l'appliquez dès votre prochaine réunion ou votre prochaine vidéo.",

      "testimonials.eyebrow": "Avis Vérifiés",
      "testimonials.heading": "Ce que disent ceux qui l'ont appliqué",
      "testimonials.subheading": "Plus de 420 professionnels, créateurs et étudiants utilisent déjà ce guide au quotidien.",
      "testimonials.verified": "✓ Acheteur Vérifié",
      "testimonials.review1": "« La technique des 90 secondes avant d'entrer en réunion a tout changé pour moi. J'avais les mains moites à chaque présentation devant mon DG. Hier, j'ai pris la parole pendant 20 minutes sans la moindre hésitation. »",
      "testimonials.author1": "Armel K.",
      "testimonials.role1": "Responsable Projet • Abidjan",
      "testimonials.review2": "« Ce n'est pas un énième livre théorique de 300 pages qu'on ne finit jamais. C'est un plan de vol condensé. La structure du discours en 3 points m'a permis de closer un client stratégique la semaine dernière. »",
      "testimonials.author2": "Serge M.",
      "testimonials.role2": "Fondateur d'Agence • Cotonou",
      "testimonials.review3": "« Pour 2 500 FCFA, la valeur délivrée est tout simplement exceptionnelle. Rien que la fiche mémo d'urgence vaut dix fois ce prix. Bravo à l'équipe des Dessous du Business pour ce niveau d'exigence. »",
      "testimonials.author3": "Thierry D.",
      "testimonials.role3": "Créateur de Contenu • Dakar",

      "offer.ribbon": "Offre Spéciale de Lancement • Accès Immédiat",
      "offer.title": "Prends la parole avec assurance",
      "offer.subtitle": "Le pack complet : Guide numérique + 3 Bonus Exclusifs de progression rapide.",
      "offer.item1": "<strong>Le Guide Pratique Complet (PDF Haute Définition)</strong>",
      "offer.val1": "Valeur : 15 000 F",
      "offer.item2": "<strong>Bonus #1 :</strong> Fiche Mémo « 5 Minutes Avant d'Entrer en Scène »",
      "offer.val2": "Valeur : 5 000 F",
      "offer.item3": "<strong>Bonus #2 :</strong> Le Template de Pitch Percutant en 60 Secondes",
      "offer.val3": "Valeur : 7 500 F",
      "offer.item4": "<strong>Bonus #3 :</strong> Accès illimité aux futures rééditions et mises à jour",
      "offer.val4": "Offert à vie",
      "offer.striked": "27 500 F",
      "offer.current": "2 500",
      "offer.currency": "FCFA",
      "offer.priceNote": "Paiement unique • Aucun abonnement • Accès immédiat et illimité à vie",
      "offer.cta": "COMMANDER LE GUIDE (2 500 F) →",
      "offer.guarantee": "<strong>Garantie Sérénité 30 Jours :</strong> 100% Satisfait ou Remboursé sans question",
      "offer.security": "Paiement 100% sécurisé par protocole SSL 256 bits via la plateforme Chariow.",

      "faq.eyebrow": "Transparence Totale",
      "faq.heading": "Questions Fréquentes",
      "faq.subheading": "Tout ce que vous devez savoir avant de passer commande.",
      "faq.q1": "Comment et quand vais-je recevoir le guide ?",
      "faq.a1": "Dès la validation de votre règlement sur Chariow, vous recevez un lien de téléchargement direct instantané à l'écran ainsi qu'un email de confirmation avec votre guide au format PDF. Vous pouvez commencer votre lecture en moins de 2 minutes.",
      "faq.q2": "Est-ce adapté si je suis d'une nature très réservée ou timide ?",
      "faq.a2": "Absolument. Ce guide a été conçu spécifiquement pour les personnes qui ne se sentent pas \"naturellement extraverties\". Il vous offre des routines physiologiques et des structures mécaniques qui ne dépendent ni de votre humeur, ni de votre timidité.",
      "faq.q3": "Quels sont les moyens de paiement disponibles ?",
      "faq.a3": "Vous pouvez régler par Mobile Money (MTN MoMo, Moov Money, Wave, Celtiis, Orange Money) ainsi que par Carte Bancaire internationale (Visa, Mastercard) et cryptomonnaies via l'infrastructure sécurisée Chariow.",
      "faq.q4": "Puis-je lire le guide confortablement sur mon téléphone ?",
      "faq.a4": "Oui, le format PDF haute résolution a été optimisé pour une lecture agréable sur smartphone (iOS et Android), sur tablette ainsi que sur ordinateur.",

      "footer.motto": "« Comprendre. Progresser. Devenir meilleur. »",
      "footer.copyright": "© 2026 Les Dessous du Business. Tous droits réservés. Vente opérée via la plateforme sécurisée Chariow.",

      "dock.label": "Offre Spéciale",
      "dock.amount": "2 500 FCFA",
      "dock.cta": "COMMANDER (2 500 F) →",

      "country.prefix": "📍 En direct depuis : "
    },

    en: {
      "top.badge": "🔥 EXCLUSIVE LAUNCH OFFER",
      "top.text": "Special introductory price for early readers <strong>(Only $4.99 / ~2,500 FCFA)</strong>",
      "top.expires": "⏱️ EXPIRES IN:",
      "nav.transformation": "The Transformation",
      "nav.curriculum": "Curriculum",
      "nav.author": "The Author",
      "nav.testimonials": "Reviews",
      "nav.faq": "FAQ",
      "nav.cta": "Get the Guide →",

      "hero.badge": "<span class=\"dot-live\" aria-hidden=\"true\"></span> Official Edition • Digital Practical Guide",
      "hero.title": "Speak in public with unshakable <span class=\"highlight-bordeaux\">confidence</span>.",
      "hero.lead": "Command attention, structure your thoughts into <strong>3 punchy points</strong>, and eliminate stage fright before speaking in any room or meeting.",
      "hero.pillar1": "Master self-confidence",
      "hero.pillar2": "Structure crisp ideas",
      "hero.pillar3": "Captivate the room",
      "hero.cta": "GET THE PRACTICAL GUIDE ($4.99)",
      "hero.trustTitle": "🔒 100% Secure checkout:",
      "hero.rating": "Rated 4.9 / 5",
      "hero.readersCount": "+420 leaders trained",

      "stats.item1": "Ambitious readers",
      "stats.item2": "Actionable & practical",
      "stats.item3": "Step-by-step framework",
      "stats.item4Val": "Lifetime Access",
      "stats.item4": "Instant digital download",

      "contrast.eyebrow": "The Difference",
      "contrast.heading": "What shifts when you master the framework.",
      "contrast.subheading": "Charisma is not an innate gift. It is a set of proven psychological and physiological triggers accessible to anyone.",
      "contrast.badgeWithout": "❌ Without the framework",
      "contrast.neg1": "Tight throat, trembling voice, and racing heartbeat as soon as all eyes turn toward you.",
      "contrast.neg2": "Constant dread of going blank and struggling to connect your ideas logically.",
      "contrast.neg3": "A distracted audience checking their phones and remembering nothing of your presentation.",
      "contrast.neg4": "Missed career opportunities lost to less competent but louder, more audible speakers.",
      "contrast.badgeWith": "✓ With the Practical Guide",
      "contrast.pos1": "A 90-second physiological protocol to deactivate adrenaline spikes and instantly regain steady breath.",
      "contrast.pos2": "An invisible 3-point mental framework: you always know exactly what to say next without notes.",
      "contrast.pos3": "A grounded voice, magnetic pauses, and posture that naturally commands room authority.",
      "contrast.pos4": "Effortless poise across high-stakes meetings, keynotes, videos, and client negotiations.",
      "contrast.cta": "I WANT THIS TRANSFORMATION ($4.99) →",

      "curriculum.eyebrow": "Detailed Syllabus",
      "curriculum.heading": "4 Modules to become an impactful speaker",
      "curriculum.subheading": "Each module tackles a vital step to completely elevate your public communication.",
      "curriculum.mod1Title": "Disarming Stage Fright & Body Mastery",
      "curriculum.mod1Desc": "Understand fear's biological circuitry to neutralize it in 90 seconds. Learn physical grounding routines that stabilize heart rates before taking the stage.",
      "curriculum.mod2Title": "The Invisible Speech Architecture",
      "curriculum.mod2Desc": "The 3-point blueprint to hook and hold any audience. Never memorize scripts again: organize your thoughts into an irresistible narrative thread.",
      "curriculum.mod3Title": "The Power of Strategic Silence & Voice",
      "curriculum.mod3Desc": "How to anchor your vocal pitch, banish filler words ('um', 'uh'), and deploy calculated pauses that generate peak listening tension.",
      "curriculum.mod4Title": "Disarming Tough Q&A & Unforeseen Hiccups",
      "curriculum.mod4Desc": "The exact protocol charismatic speakers use to answer hostile inquiries, contradictions, or technical mishaps with poise and composure.",
      "curriculum.cta": "DISCOVER THE FULL CURRICULUM →",

      "speaker.motto": "Understand • Progress • Excel",
      "speaker.eyebrow": "A Demanding Standard",
      "speaker.heading": "What nobody tells you about true charisma.",
      "speaker.p1": "On social media, we admire magnetic speakers who hold an audience hanging on every word. We assume they were born gifted.",
      "speaker.quote": "“Charisma is not born on stage. It is forged in the quiet discipline of the mind, rigorous structure, and deep respect for the audience.”",
      "speaker.p2": "This guide was crafted with one ironclad rule: <strong>zero filler, 100% direct execution</strong>. Read it in 45 minutes, apply it immediately in your very next presentation.",

      "testimonials.eyebrow": "Verified Reviews",
      "testimonials.heading": "What readers are saying after applying it",
      "testimonials.subheading": "Over 420 executives, creators, and professionals rely on this practical framework daily.",
      "testimonials.verified": "✓ Verified Reader",
      "testimonials.review1": "“The 90-second routine before walking into boardroom meetings was an absolute game changer. My hands used to sweat every time. Yesterday, I spoke for 20 minutes with zero hesitation.”",
      "testimonials.author1": "Armel K.",
      "testimonials.role1": "Project Lead • Abidjan",
      "testimonials.review2": "“This isn't another 300-page academic book you never finish. It's a battle-tested flight manual. The 3-point architecture helped me close a major client last week.”",
      "testimonials.author2": "Serge M.",
      "testimonials.role2": "Agency Founder • Cotonou",
      "testimonials.review3": "“For this price, the value delivered is simply unmatched. Just the emergency pre-stage cheat sheet alone is worth ten times that. Huge congratulations to the team.”",
      "testimonials.author3": "Thierry D.",
      "testimonials.role3": "Content Creator • Dakar",

      "offer.ribbon": "Special Launch Package • Instant Access",
      "offer.title": "Speak in public with unshakable confidence",
      "offer.subtitle": "The complete package: Full Digital Guide + 3 Exclusive Fast-Action Bonuses.",
      "offer.item1": "<strong>Complete Practical Guide (High-Definition PDF)</strong>",
      "offer.val1": "Value: $30.00",
      "offer.item2": "<strong>Bonus #1:</strong> '5 Minutes Before Stage' Emergency Cheat Sheet",
      "offer.val2": "Value: $10.00",
      "offer.item3": "<strong>Bonus #2:</strong> The High-Impact 60-Second Pitch Template",
      "offer.val3": "Value: $15.00",
      "offer.item4": "<strong>Bonus #3:</strong> Lifetime access to all future editions and updates",
      "offer.val4": "Free for Life",
      "offer.striked": "$49.00",
      "offer.current": "4.99",
      "offer.currency": "USD",
      "offer.priceNote": "One-time payment • No subscription • Instant lifetime digital access",
      "offer.cta": "ORDER THE GUIDE ($4.99) →",
      "offer.guarantee": "<strong>30-Day Peace of Mind Guarantee:</strong> 100% Satisfied or Full Refund, no questions asked",
      "offer.security": "100% encrypted 256-bit SSL checkout via the secure Chariow payment platform.",

      "faq.eyebrow": "Complete Transparency",
      "faq.heading": "Frequently Asked Questions",
      "faq.subheading": "Everything you need to know before completing your order.",
      "faq.q1": "How and when do I receive the guide?",
      "faq.a1": "Instantly upon confirmation on Chariow, you will get an on-screen download button as well as a confirmation email with your PDF guide. You can begin reading in under 2 minutes.",
      "faq.q2": "Is this suited for naturally reserved or introverted people?",
      "faq.a2": "Entirely. This guide was engineered specifically for those who don't consider themselves natural extroverts. It provides mechanical frameworks and physiological routines that do not depend on your mood or personality.",
      "faq.q3": "Which payment methods are accepted?",
      "faq.a3": "You can securely pay via Credit / Debit Card (Visa, Mastercard), Apple Pay, Google Pay, as well as West/Central African Mobile Money (MTN MoMo, Moov, Wave, Orange, Celtiis) and crypto.",
      "faq.q4": "Can I read the guide comfortably on my phone?",
      "faq.a4": "Yes, the high-resolution PDF format is meticulously typeset for comfortable reading on smartphones (iOS & Android), tablets, and desktop computers.",

      "footer.motto": "“Understand • Progress • Excel”",
      "footer.copyright": "© 2026 Les Dessous du Business. All rights reserved. Checkout powered securely by Chariow.",

      "dock.label": "Special Offer",
      "dock.amount": "$4.99 USD (~2,500 F)",
      "dock.cta": "ORDER THE GUIDE ($4.99) →",

      "country.prefix": "📍 Visiting from: "
    }
  };

  // Liste des pays francophones (pour déterminer la langue et la devise par défaut)
  const FRANCOPHONE_COUNTRIES = new Set([
    'BJ', 'CI', 'SN', 'TG', 'CM', 'ML', 'BF', 'NE', 'GN', 'GA',
    'CD', 'CG', 'TD', 'MG', 'FR', 'BE', 'CH', 'LU', 'MC', 'HT',
    'DZ', 'MA', 'TN', 'BI', 'DJ', 'KM', 'RW', 'SC', 'CF'
  ]);

  const COUNTRY_NAMES = {
    BJ: { fr: "Bénin", en: "Benin" },
    CI: { fr: "Côte d'Ivoire", en: "Ivory Coast" },
    SN: { fr: "Sénégal", en: "Senegal" },
    TG: { fr: "Togo", en: "Togo" },
    CM: { fr: "Cameroun", en: "Cameroon" },
    ML: { fr: "Mali", en: "Mali" },
    BF: { fr: "Burkina Faso", en: "Burkina Faso" },
    NE: { fr: "Niger", en: "Niger" },
    GN: { fr: "Guinée", en: "Guinea" },
    GA: { fr: "Gabon", en: "Gabon" },
    CD: { fr: "RD Congo", en: "DR Congo" },
    CG: { fr: "Congo", en: "Congo" },
    FR: { fr: "France", en: "France" },
    BE: { fr: "Belgique", en: "Belgium" },
    CH: { fr: "Suisse", en: "Switzerland" },
    CA: { fr: "Canada", en: "Canada" },
    US: { fr: "États-Unis", en: "United States" },
    GB: { fr: "Royaume-Uni", en: "United Kingdom" },
    NG: { fr: "Nigeria", en: "Nigeria" },
    GH: { fr: "Ghana", en: "Ghana" },
    ZA: { fr: "Afrique du Sud", en: "South Africa" },
    DE: { fr: "Allemagne", en: "Germany" }
  };

  let currentLang = 'fr';
  let detectedCountryCode = null;

  // ==========================================================================
  // 3. FONCTION DE MISE À JOUR DE LA LANGUE DANS LE DOM
  // ==========================================================================
  function setLanguage(lang, options = {}) {
    if (!TRANSLATIONS[lang]) lang = 'fr';
    currentLang = lang;
    document.documentElement.lang = lang;

    const dict = TRANSLATIONS[lang];

    // Mise à jour de tous les éléments data-i18n (texte simple)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // Mise à jour de tous les éléments data-i18n-html (HTML riche)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Mise à jour des prix et devises
    const offerStriked = document.getElementById('offerStrikedPrice');
    const offerCurrent = document.getElementById('offerCurrentPrice');
    const offerCurr = document.getElementById('offerCurrency');
    const dockAmount = document.getElementById('dockPriceAmount');

    if (offerStriked) offerStriked.textContent = dict['offer.striked'];
    if (offerCurrent) offerCurrent.textContent = dict['offer.current'];
    if (offerCurr) offerCurr.textContent = dict['offer.currency'];
    if (dockAmount) dockAmount.textContent = dict['dock.amount'];

    // Mise à jour des puces de paiement
    const paymentChips = document.getElementById('heroPaymentChips');
    if (paymentChips) {
      if (lang === 'fr') {
        paymentChips.innerHTML = `
          <span class="chip-pay">MTN MoMo</span>
          <span class="chip-pay">Moov Money</span>
          <span class="chip-pay">Wave</span>
          <span class="chip-pay">Celtiis</span>
          <span class="chip-pay">Orange</span>
          <span class="chip-pay">Carte Visa / Mastercard</span>
        `;
      } else {
        paymentChips.innerHTML = `
          <span class="chip-pay">Visa / Mastercard</span>
          <span class="chip-pay">Apple Pay</span>
          <span class="chip-pay">Google Pay</span>
          <span class="chip-pay">Mobile Money</span>
          <span class="chip-pay">Crypto</span>
        `;
      }
    }

    // Mise à jour du sélecteur visuel de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const target = btn.getAttribute('data-lang-target');
      const isActive = target === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Mise à jour du badge pays
    updateCountryBadge();

    // Mémoriser la sélection si l'utilisateur a cliqué manuellement
    if (options.save) {
      try {
        sessionStorage.setItem('ldb_user_lang', lang);
      } catch (e) {}
    }
  }

  function updateCountryBadge() {
    const badge = document.getElementById('countryDetectBadge');
    const textEl = document.getElementById('countryDetectText');
    const flagImg = document.getElementById('countryFlagImg');
    if (!badge || !textEl || !detectedCountryCode) return;

    const countryCodeLower = detectedCountryCode.toLowerCase();
    if (flagImg) {
      flagImg.src = `https://flagcdn.com/20x15/${countryCodeLower}.png`;
      flagImg.alt = detectedCountryCode;
      flagImg.style.display = 'inline-block';
    }

    const countryInfo = COUNTRY_NAMES[detectedCountryCode] || {
      fr: detectedCountryCode,
      en: detectedCountryCode
    };

    const countryName = currentLang === 'fr' ? countryInfo.fr : countryInfo.en;
    const prefix = TRANSLATIONS[currentLang]["country.prefix"];

    textEl.textContent = `${prefix}${countryName}`;
    badge.style.display = 'inline-flex';
  }

  // ==========================================================================
  // 4. DÉTECTION INTELLIGENTE DU PAYS & LANGUE
  // ==========================================================================
  async function detectCountryAndLanguage() {
    // A. Paramètre URL explicite prioritaire (?lang=en ou ?lang=fr)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    if (urlLang === 'en' || urlLang === 'fr') {
      setLanguage(urlLang, { save: true });
      fetchCountryOnly();
      return;
    }

    // B. Choix explicite manuel de l'utilisateur pendant sa session
    let sessionLang = null;
    try {
      sessionLang = sessionStorage.getItem('ldb_user_lang');
    } catch (e) {}

    if (sessionLang === 'en' || sessionLang === 'fr') {
      setLanguage(sessionLang);
      fetchCountryOnly();
      return;
    }

    // C. Détection automatique en temps réel via Géolocalisation IP
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch('https://api.country.is/', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.country) {
          detectedCountryCode = data.country.toUpperCase();
          const isFrancophone = FRANCOPHONE_COUNTRIES.has(detectedCountryCode);
          const autoLang = isFrancophone ? 'fr' : 'en';
          setLanguage(autoLang);
          return;
        }
      }
    } catch (err) {
      // Fallback si indisponible ou bloqué
    }

    // D. Fallback basé sur la langue du navigateur
    const browserLang = (navigator.language || navigator.userLanguage || 'fr').toLowerCase();
    if (browserLang.startsWith('en')) {
      setLanguage('en');
    } else {
      setLanguage('fr');
    }
  }

  async function fetchCountryOnly() {
    try {
      const res = await fetch('https://api.country.is/');
      if (res.ok) {
        const data = await res.json();
        if (data && data.country) {
          detectedCountryCode = data.country.toUpperCase();
          updateCountryBadge();
        }
      }
    } catch (e) {}
  }

  // Écouteurs sur les boutons du sélecteur de langue
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang-target');
      if (targetLang) {
        setLanguage(targetLang, { save: true });
      }
    });
  });

  // Lancer la détection immédiatement
  detectCountryAndLanguage();

  // ==========================================================================
  // 5. GESTION DU CLIC CTA AVEC TRACKING META PIXEL ADAPTÉ
  // ==========================================================================
  const ctaButtons = document.querySelectorAll('.track-checkout-btn');

  ctaButtons.forEach(btn => {
    btn.setAttribute('href', finalCheckoutUrl);

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Envoi de l'événement de conversion InitiateCheckout adapté à la devise
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: 'Guide Pratique: Prends la parole avec assurance',
          content_category: 'Digital Guide',
          currency: currentLang === 'fr' ? 'XOF' : 'USD',
          value: currentLang === 'fr' ? 2500 : 4.99
        });
      }

      // Redirection fluide vers Chariow
      setTimeout(() => {
        window.location.href = finalCheckoutUrl;
      }, 180);
    });
  });

  // ==========================================================================
  // 6. COMPTE À REBOURS D'URGENCE DYNAMIQUE
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
  // 7. ACCORDÉON FAQ INTERACTIF & ACCESSIBLE
  // ==========================================================================
  const faqPanels = document.querySelectorAll('.faq-panel, .faq-item');
  faqPanels.forEach(panel => {
    const triggerBtn = panel.querySelector('.faq-trigger-btn, .faq-question');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        const isActive = panel.classList.contains('active');

        faqPanels.forEach(other => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-trigger-btn, .faq-question');
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
  // 8. NOTIFICATIONS SOCIAL PROOF LOCALISÉES (Commandes récentes)
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
        actionEl.innerHTML = `${buyer.action} • <span id="toastTime">${buyer.time}</span>`;
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
