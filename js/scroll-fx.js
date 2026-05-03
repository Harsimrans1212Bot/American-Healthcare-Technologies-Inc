/* ========== Scroll effects engine ========== */
(function(){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Scroll progress bar ---
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  // --- Cursor spotlight ---
  if (window.matchMedia('(hover:hover)').matches && !reduced){
    const spot = document.createElement('div');
    spot.className = 'spotlight';
    document.body.appendChild(spot);
    window.addEventListener('pointermove', (e)=>{
      spot.style.setProperty('--mx', e.clientX+'px');
      spot.style.setProperty('--my', e.clientY+'px');
    }, {passive:true});
  }

  // --- Stagger children auto-index ---
  document.querySelectorAll('.stagger').forEach(g=>{
    [...g.children].forEach((c,i)=>c.style.setProperty('--i', i));
  });

  // --- Unified IntersectionObserver for reveals (upgrades the one in shared.js) ---
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal, .stagger, .section-head').forEach(el=>io.observe(el));

  // --- Counter animation ---
  const cio = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const start = performance.now();
      const ease = t => 1 - Math.pow(1-t, 3);
      function tick(now){
        const t = Math.min(1, (now-start)/dur);
        const val = target * ease(t);
        el.textContent = (target >= 100 ? Math.round(val) : val.toFixed(1).replace(/\.0$/,'')) + suffix;
        if(t<1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, {threshold:0.4});
  document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

  // --- Scroll progress + parallax ---
  let ticking = false;
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  function onScroll(){
    const y = window.scrollY || 0;
    const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    bar.style.setProperty('--scroll-progress', (Math.min(1, y/max)*100)+'%');

    if (!reduced){
      parallaxEls.forEach(el=>{
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height/2 - window.innerHeight/2;
        const offset = -center * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', ()=>{
    if(!ticking){ requestAnimationFrame(onScroll); ticking = true; }
  }, {passive:true});
  onScroll();

  if (reduced) return;

  // --- Tilt cards (desktop hover only -- skipped on touch devices) ---
  if (window.matchMedia('(hover:hover)').matches){
    document.querySelectorAll('.tilt, .mod-card').forEach(card=>{
      let raf = null;
      card.addEventListener('pointermove', (e)=>{
        if (e.pointerType !== 'mouse') return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(()=>{
          card.style.transform = `perspective(900px) rotateX(${(-py*4).toFixed(2)}deg) rotateY(${(px*5).toFixed(2)}deg) translateY(-2px)`;
        });
      });
      card.addEventListener('pointerleave', ()=>{
        card.style.transform = '';
      });
    });
  }

  // --- Magnetic buttons (desktop hover only -- skipped on touch devices) ---
  if (window.matchMedia('(hover:hover)').matches){
    document.querySelectorAll('.btn, .phone-cta, .mag').forEach(btn=>{
      btn.addEventListener('pointermove', (e)=>{
        if (e.pointerType !== 'mouse') return;
        const r = btn.getBoundingClientRect();
        const px = (e.clientX - r.left - r.width/2) * 0.18;
        const py = (e.clientY - r.top - r.height/2) * 0.18;
        btn.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`;
      });
      btn.addEventListener('pointerleave', ()=>{ btn.style.transform = ''; });
    });
  }
})();
