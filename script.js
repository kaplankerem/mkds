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

const announcements = [
  {
    date: '2026-04-24',
    title: 'MKDS - Anılarım Bensiz yayında!',
    text: 'Yeni single Anılarım Bensiz tüm dijital platformlarda yayında. Hemen dinleyin!',
    linkUrl: 'https://open.spotify.com/track/3LbDr4lvkzxyift2mnecMO',
    linkLabel: 'Spotify\'da Dinle'
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
