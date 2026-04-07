const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const centeredScrollCta = document.querySelector('[data-scroll="center"]');

if (centeredScrollCta) {
  centeredScrollCta.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector('#music');
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });
}

const heroReleaseCountdown = document.getElementById('hero-release-countdown');

if (heroReleaseCountdown) {
  const releaseDateRaw = heroReleaseCountdown.getAttribute('data-release-date');
  const releaseDate = releaseDateRaw ? new Date(releaseDateRaw) : null;

  const updateReleaseCountdown = () => {
    if (!releaseDate || Number.isNaN(releaseDate.getTime())) {
      heroReleaseCountdown.textContent = 'tarih bekleniyor';
      return;
    }

    const diffMs = releaseDate.getTime() - Date.now();

    if (diffMs <= 0) {
      heroReleaseCountdown.textContent = 'şimdi yayında';
      return;
    }

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    heroReleaseCountdown.textContent = `${days} gün ${hours} saat ${minutes} dk`;
  };

  updateReleaseCountdown();
  const countdownTimer = setInterval(() => {
    updateReleaseCountdown();
    if (releaseDate && Date.now() >= releaseDate.getTime()) {
      clearInterval(countdownTimer);
    }
  }, 30000);
}

const announcements = [
  {
    date: '2026-04-24',
    title: 'MKDS - Anılarım Bensiz 24 Nisan'da yayında',
    text: 'Yeni single tüm dijital platformlarda yayında olacak. Çıkış öncesi pre-save bağlantısıyla ön kayıt yapabilirsiniz.',
    linkUrl: 'https://distrokid.com/hyperfollow/mkds/anlarm-bensiz',
    linkLabel: 'Pre-save Linki'
  },
  {
    date: '2025-11-28',
    title: 'Gölgelerin Kalbinde yayında',
    text: 'MKDS - Gölgelerin Kalbinde şu anda Spotify ve YouTube üzerinden dinlenebilir.'
  },
  {
    date: '2025-11-28',
    title: 'Official Lyric Video yayında',
    text: 'MKDS - Gölgelerin Kalbinde (Official Lyric Video) resmî YouTube kanalında yayında.'
  },
  {
    date: '2026-03-12',
    title: 'Resmî web sitesi açıldı',
    text: 'MKDS resmî web sitesi yayınlandı. Spotify artist, YouTube kanal ve duyuru içerikleriyle birlikte erişime açıldı.'
  }
];

const newsList = document.getElementById('news-list');

if (newsList) {
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  sortedAnnouncements.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'news-item';

    const time = document.createElement('time');
    time.dateTime = item.date;
    time.textContent = new Date(item.date).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const title = document.createElement('h3');
    title.textContent = item.title;

    const text = document.createElement('p');
    text.textContent = item.text;

    article.append(time, title, text);

    if (item.linkUrl) {
      const link = document.createElement('a');
      link.href = item.linkUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'news-link';
      link.textContent = item.linkLabel || 'Detayı Gör';
      article.append(link);
    }

    newsList.append(article);
  });
}

const subscribeForm = document.getElementById('subscribe-form');
const feedbackEl = document.getElementById('form-feedback');

if (subscribeForm && feedbackEl) {
  subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(subscribeForm);
    const email = String(formData.get('email') || '').trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      feedbackEl.textContent = 'Lütfen geçerli bir e-posta adresi girin.';
      feedbackEl.className = 'error';
      return;
    }

    // Placeholder workflow until an email service is selected in next phase.
    feedbackEl.textContent = 'Teşekkürler. Abonelik talebiniz alındı.';
    feedbackEl.className = 'success';
    subscribeForm.reset();
  });
}
