(() => {
  'use strict';
  const phone = '5511992610461';
  const products = {
    luar: {
      name: 'Luar', photo: 'assets/luar-kraft.webp',
      description: 'Uma tisana de perfil floral e delicado para quem deseja criar um momento de pausa e aconchego.',
      ingredients: 'Calêndula, camomila, melissa, cidreira e passiflora.',
      moment: 'Fim de tarde, leitura ou um momento tranquilo para desacelerar.',
      message: 'Olá, Lilian! Gostaria de saber preço e disponibilidade do Luar — Cantinho do Chá.'
    },
    aurora: {
      name: 'Aurora', photo: 'assets/aurora-kraft.webp',
      description: 'Um blend autoral com chá oolong e notas cítricas, envolventes e surpreendentes.',
      ingredients: 'Chá oolong, casca de laranja, cacau e pimenta-rosa (confirme a composição final no atendimento).',
      moment: 'Para acompanhar as primeiras horas do dia ou um encontro especial.',
      message: 'Olá, Lilian! Gostaria de saber preço e disponibilidade do Aurora — Cantinho do Chá.'
    },
    serenata: {
      name: 'Chá Verde Serenata', photo: 'assets/serenata-kraft.webp',
      description: 'A frescura do chá verde encontra o perfume da hortelã egípcia em uma combinação leve e elegante.',
      ingredients: 'Chá verde e hortelã egípcia.',
      moment: 'Uma pausa refrescante ao longo do dia. Consulte as opções de preparo quente ou gelado.',
      message: 'Olá, Lilian! Gostaria de saber preço e disponibilidade do Chá Verde Serenata — Cantinho do Chá.'
    },
    kit: { message: 'Olá, Lilian! Gostaria de consultar opções, valor e disponibilidade do kit presenteável Coleção Três Rituais.' },
    atendimento: { message: 'Olá, Lilian! Conheci o site do Cantinho do Chá e gostaria de saber mais sobre os chás.' }
  };
  function waLink(key) {
    const msg = (products[key] || products.atendimento).message;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }
  document.querySelectorAll('.link-wa').forEach(a => {
    a.href = waLink(a.dataset.product || 'atendimento');
    a.target = '_blank'; a.rel = 'noopener noreferrer';
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  const header = document.querySelector('.site-header');
  const progress = document.getElementById('scroll-progress');
  const immersiveBg = document.querySelector('.immersive-bg');
  const immersive = document.querySelector('.immersive');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf = 0;
  function updateScroll() {
    raf = 0;
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 32);
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.width = `${Math.min(100, 100 * y / max)}%`;
    if (!reduceMotion && immersiveBg && immersive) {
      const r = immersive.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        const offset = (window.innerHeight / 2 - (r.top + r.height / 2)) * 0.13;
        immersiveBg.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.11)`;
      }
    }
  }
  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(updateScroll);
  }, {passive:true});
  window.addEventListener('resize', updateScroll, {passive:true});
  updateScroll();

  const menuBtn = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const setMenu = open => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileNav.hidden = !open;
  };
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 980) setMenu(false); });

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, {threshold: .11, rootMargin: '0px 0px -32px 0px'});
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
  }

  const dialog = document.getElementById('product-dialog');
  const closeDialog = () => { if (dialog.open) dialog.close(); document.body.classList.remove('dialog-open'); };
  document.getElementById('dialog-close').addEventListener('click', closeDialog);
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(); });
  document.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.detail;
    const p = products[key]; if (!p) return;
    document.getElementById('dialog-title').textContent = p.name;
    document.getElementById('dialog-description').textContent = p.description;
    document.getElementById('dialog-ingredients').textContent = p.ingredients;
    document.getElementById('dialog-moment').textContent = p.moment;
    const photo = document.getElementById('dialog-image'); photo.src = p.photo; photo.alt = `Embalagem kraft ${p.name}`;
    document.getElementById('dialog-buy').href = waLink(key);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
})();
