/* ========== Shared NAV + FOOTER injection ==========
   Pages include an empty <header id="site-nav"></header>
   and <footer id="site-footer"></footer>. This script fills them.
*/
(function(){
  const PHONE = '+1-(917)-856-5211';
  const PHONE_TEL = 'tel:+19178565211';
  const EMAIL = 'info@ahtiny.com';

  const NAV_HTML = `
  <nav class="nav">
    <div class="container nav-inner">
      <a class="caliper-logo" href="index.html" aria-label="American Healthcare Technologies — home">
        <img class="caliper-mark" src="assets/aht_mark.png" alt="AHT mark"/>
        <span class="logo-words"><b>American <i class="hc">Healthcare</i><br/>Technologies</b><span>Est. 1992 · New York, NY</span></span>
      </a>
      <ul class="nav-links" role="menubar">
        <li><a data-nav="home" href="index.html">Home</a></li>
        <li>
          <a class="navtop" href="equipment.html" data-nav="equipment" role="menuitem" aria-haspopup="true">Equipment <span class="caret"></span></a>
          <div class="dropdown" role="menu">
            <a href="equipment.html"><span>All equipment</span><span class="dd-sub">Overview</span></a>
            <a href="equipment-mri.html"><span>MRI systems</span><span class="dd-sub">1.5T · 3T</span></a>
            <a href="equipment-ct.html"><span>CT scanners</span><span class="dd-sub">16–128 slice</span></a>
            <a href="equipment-ultrasound.html"><span>Ultrasound</span><span class="dd-sub">GE · Philips · Mindray</span></a>
            <a href="equipment-xray.html"><span>X-Ray</span><span class="dd-sub">DR · CR · RF</span></a>
            <a href="equipment-mammography.html"><span>Mammography</span><span class="dd-sub">2D · 3D tomo</span></a>
            <a href="equipment-carm.html"><span>C-Arms</span><span class="dd-sub">Surgical · mobile</span></a>
          </div>
        </li>
        <li>
          <a class="navtop" href="service.html" data-nav="services" role="menuitem" aria-haspopup="true">Services <span class="caret"></span></a>
          <div class="dropdown" role="menu">
            <a href="service.html"><span>Service & Maintenance</span><span class="dd-sub">24/7 support</span></a>
            <a href="parts.html"><span>Parts</span><span class="dd-sub">OEM · refurbished</span></a>
            <a href="installation.html"><span>Installation & De-install</span><span class="dd-sub">Rigging · site-prep</span></a>
          </div>
        </li>
        <li><a data-nav="about" href="about.html">About</a></li>
        <li><a data-nav="contact" href="contact.html">Contact</a></li>
      </ul>
      <div class="nav-cta">
        <a class="phone-cta" href="${PHONE_TEL}" aria-label="Call ${PHONE}">
          <span class="ring" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
          </span>
          <span class="pnum">${PHONE}</span>
        </a>
      </div>
    </div>
  </nav>`;

  const FOOT_HTML = `
  <div class="container">
    <div class="foot-big">American <em>Healthcare</em> Technologies</div>
    <div class="foot-grid">
      <div class="foot-col foot-brand">
        <a class="caliper-logo" href="index.html">
          <img class="caliper-mark" src="assets/aht_mark.png" alt=""/>
          <span class="logo-words"><b>American <i class="hc">Healthcare</i><br/>Technologies</b><span>Est. 1992 · New York, NY</span></span>
        </a>
        <p>Pre-owned and refurbished medical imaging equipment, service, parts and installation — supporting imaging facilities across North America.</p>
      </div>
      <div class="foot-col">
        <h6>Equipment</h6>
        <a href="equipment-mri.html">MRI systems</a>
        <a href="equipment-ct.html">CT scanners</a>
        <a href="equipment-ultrasound.html">Ultrasound</a>
        <a href="equipment-xray.html">X-Ray</a>
        <a href="equipment-mammography.html">Mammography</a>
        <a href="equipment-carm.html">C-Arms</a>
      </div>
      <div class="foot-col">
        <h6>Services</h6>
        <a href="service.html">Service & Maintenance</a>
        <a href="parts.html">Parts</a>
        <a href="installation.html">Installation & De-install</a>
        <a href="about.html">About us</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="foot-col">
        <h6>Contact</h6>
        <div class="foot-contact">
          <a href="${PHONE_TEL}">${PHONE}</a><br/>
          <a href="mailto:${EMAIL}">${EMAIL}</a>
          <b>Hours</b>
          Mon–Fri · 8:00–18:00 ET<br/>
          Sat · On-call<br/>
          24/7 emergency service
          <b>Address <span class="ph">Placeholder</span></b>
          [Placeholder street]<br/>
          [Placeholder city, state ZIP]
          <b>Social</b>
          <a href="#" aria-label="LinkedIn">LinkedIn →</a>
        </div>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© <span data-year></span> American Healthcare Technologies, Inc.</span>
      <span>All rights reserved · ISO 13485 [placeholder]</span>
    </div>
  </div>`;

  // Nav/footer are now inlined statically in every page so handoff bundlers
  // can follow links. Only inject as a fallback if the placeholder is empty.
  const nav = document.getElementById('site-nav');
  if (nav && !nav.innerHTML.trim()) nav.innerHTML = NAV_HTML;
  const foot = document.getElementById('site-footer');
  if (foot && !foot.innerHTML.trim()) foot.innerHTML = FOOT_HTML;

  // active nav
  const page = document.body.getAttribute('data-page');
  document.querySelectorAll('.nav-links [data-nav]').forEach(el=>{
    if(el.getAttribute('data-nav') === page) el.classList.add('active');
  });

  // year
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent = new Date().getFullYear());

  // Reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Mobile menu: inject hamburger toggle and wire up open/close
  (function setupMobileMenu(){
    const navInner = document.querySelector('.nav .nav-inner');
    const navEl = document.querySelector('.nav');
    if (!navInner || !navEl) return;
    if (navInner.querySelector('.nav-menu-toggle')) return; // idempotent
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-menu-toggle';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-controls', 'nav-links-panel');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    navInner.appendChild(btn);
    const links = navEl.querySelector('.nav-links');
    if (links && !links.id) links.id = 'nav-links-panel';
    function close(){
      navEl.classList.remove('nav--menu-open');
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label','Open menu');
      document.body.classList.remove('menu-open');
    }
    function open(){
      navEl.classList.add('nav--menu-open');
      btn.setAttribute('aria-expanded','true');
      btn.setAttribute('aria-label','Close menu');
      document.body.classList.add('menu-open');
    }
    btn.addEventListener('click', () => {
      navEl.classList.contains('nav--menu-open') ? close() : open();
    });
    // Close on nav link click (but not on dropdown parent "navtop" which should still reveal submenu)
    navEl.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 980) close();
      });
    });
    // Close on window resize back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980 && navEl.classList.contains('nav--menu-open')) close();
    });
    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navEl.classList.contains('nav--menu-open')) close();
    });
  })();

  // Hide nav on scroll down, show on scroll up (or at top)
  const navEl = document.querySelector('.nav');
  if (navEl){
    let lastY = window.scrollY || 0;
    let ticking = false;
    const THRESH = 8; // ignore micro-movements
    function onScroll(){
      const y = window.scrollY || 0;
      const delta = y - lastY;
      if (y < 40){
        navEl.classList.remove('nav--hidden','nav--scrolled');
      } else {
        if (Math.abs(delta) > THRESH){
          if (delta > 0 && y > 120) navEl.classList.add('nav--hidden');
          else navEl.classList.remove('nav--hidden');
          lastY = y;
        }
        navEl.classList.add('nav--scrolled');
      }
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking){ requestAnimationFrame(onScroll); ticking = true; }
    }, {passive:true});
  }
})();
