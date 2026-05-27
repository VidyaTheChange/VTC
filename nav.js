// Vidya The Change — Shared Navigation + Global Theme
// Edit colours here once — updates all pages automatically

const VTC_THEME = `
<style>
:root{
 --bg:#ffffff;
  --bg2:#fffbe6;
  --bg3:#fff5c5;

  --card:#ffffff;
  --border:#f0dfcf;

  --text:#1f1a17;
  --muted:#7b6858;

  --orange:#e86400;
  --orange-light:#fff1e4;

  --yellow:#f5a800;
  --yellow-light:#fff8df;

  --navy:#2b2d42;
  --navy-light:#eef0f6;

  --green:#4d7c4d;

  --font:'Georgia',serif;
  --sans:'Inter',sans-serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--sans)}
</style>
`;

const VTC_NAV = `
<style>
/* ── Top accent bar ── */
.nav-accent{
  position:fixed;top:0;left:0;right:0;height:3px;z-index:101;
  background:linear-gradient(90deg,#e86400 0%,#f5a800 60%,#e86400 100%);
}

/* ── Main nav ── */
nav{
  position:fixed;top:3px;left:0;right:0;z-index:100;
  background:rgba(255,255,255,0.97);backdrop-filter:blur(20px);
  box-shadow:0 2px 20px rgba(0,0,0,0.07);
  padding:0.6rem 2.5rem;
  display:flex;align-items:center;justify-content:space-between;
  transition:padding 0.3s,box-shadow 0.3s;
}
nav.scrolled{
  padding:0.4rem 2.5rem;
  box-shadow:0 4px 24px rgba(0,0,0,0.11);
}

/* ── Logo ── */
.nav-logo{display:flex;align-items:center;text-decoration:none;}
.nav-logo img{height:72px;width:auto;display:block;transition:height 0.3s;}
nav.scrolled .nav-logo img{height:56px;}

/* ── Centre links ── */
.nav-center{display:flex;gap:0.25rem;align-items:center;}
.nav-center a{
  position:relative;
  font-size:13px;color:#0f1f3d;font-weight:500;
  text-decoration:none;padding:0.45rem 0.75rem;border-radius:6px;
  transition:color 0.2s,background 0.2s;
}
.nav-center a::after{
  content:'';position:absolute;bottom:4px;left:50%;right:50%;
  height:2px;background:#e86400;border-radius:2px;
  transition:left 0.25s,right 0.25s;
}
.nav-center a:hover{color:#e86400;background:rgba(232,100,0,0.06);}
.nav-center a:hover::after{left:0.75rem;right:0.75rem;}
.nav-center a.active{color:#e86400;font-weight:700;}
.nav-center a.active::after{left:0.75rem;right:0.75rem;}

/* ── Right side ── */
.nav-right{display:flex;align-items:center;gap:0.75rem;}

/* ── Register button ── */
.nav-register{
  background:linear-gradient(135deg,#e86400 0%,#d05800 100%);
  color:#fff;border:none;
  padding:0.5rem 1.2rem;border-radius:7px;
  font-size:12px;font-weight:700;letter-spacing:0.02em;
  cursor:pointer;transition:all 0.2s;text-decoration:none;
  display:inline-block;
  box-shadow:0 3px 12px rgba(232,100,0,0.35);
}
.nav-register:hover{
  background:linear-gradient(135deg,#c85600 0%,#b04800 100%);
  transform:translateY(-1px);
  box-shadow:0 5px 18px rgba(232,100,0,0.45);
}

/* ── Hamburger ── */
.hamburger{
  display:none;flex-direction:column;gap:5px;
  cursor:pointer;padding:6px;background:none;border:none;border-radius:6px;
  transition:background 0.2s;
}
.hamburger:hover{background:rgba(232,100,0,0.08);}
.hamburger span{
  display:block;width:22px;height:2px;
  background:#0f1f3d;border-radius:2px;transition:all 0.3s;
}
.hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}
.hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

/* ── Mobile full-screen menu ── */
.mobile-menu{
  display:none;position:fixed;top:0;left:0;right:0;bottom:0;
  background:rgba(255,252,248,0.99);backdrop-filter:blur(20px);
  z-index:99;flex-direction:column;align-items:center;justify-content:center;
  gap:0;
}
.mobile-menu.open{display:flex;}
.mobile-menu a{
  font-size:1.25rem;font-weight:600;color:#0f1f3d;
  font-family:Georgia,serif;transition:color 0.2s,transform 0.2s;
  text-decoration:none;padding:0.85rem 2rem;width:100%;text-align:center;
  border-bottom:1px solid rgba(232,100,0,0.08);
}
.mobile-menu a:hover{color:#e86400;transform:translateX(4px);}
.mob-cta{
  background:linear-gradient(135deg,#e86400,#d05800) !important;
  color:#fff !important;
  margin-top:1.5rem;border-radius:10px !important;
  font-size:1rem !important;font-weight:700 !important;
  box-shadow:0 4px 18px rgba(232,100,0,0.35);
  border-bottom:none !important;
  padding:0.85rem 2.5rem !important;
  width:auto !important;
}
.mob-close{
  position:absolute;top:1.5rem;right:1.5rem;
  font-size:1.4rem;cursor:pointer;color:#7b6858;
  background:rgba(0,0,0,0.06);border:none;border-radius:50%;
  width:36px;height:36px;display:flex;align-items:center;justify-content:center;
  transition:background 0.2s;
}
.mob-close:hover{background:rgba(0,0,0,0.12);}

@media(max-width:820px){
  nav{padding:0.5rem 1.25rem;}
  .nav-center{gap:0;}
  .nav-center a{padding:0.4rem 0.45rem;font-size:12px;white-space:nowrap;}
  .nav-register{padding:0.45rem 0.75rem;font-size:11px;}
  .nav-logo img{height:60px;}
}
@media(max-width:700px){
  nav{padding:0.5rem 1rem;}
  nav.scrolled{padding:0.35rem 1rem;}
  .nav-center{display:none;}
  .hamburger{display:flex;}
  .nav-register{display:none;}
}
</style>

<div class="nav-accent"></div>
<nav id="vtc-navbar">
  <a class="nav-logo" href="/">
    <img src="/images/logo.png" alt="Vidya The Change">
  </a>
  <div class="nav-center">
    <a href="/" data-page="home">Home</a>
    <a href="/programs/" data-page="programs">Programs</a>
    <a href="/impact/" data-page="impact">Impact</a>
    <a href="/team/" data-page="team">Our Team</a>
    <a href="/#involve" data-page="involve">Get Involved</a>
    <a href="/#contact" data-page="contact">Contact</a>
  </div>
  <div class="nav-right">
    <a href="/register/" class="nav-register">Student Registration</a>
    <button class="hamburger" id="vtc-hamburger">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mobile-menu" id="vtc-mobile-menu">
  <button class="mob-close" id="vtc-mob-close">✕</button>
  <a href="/programs/">Programs</a>
  <a href="/impact/">Impact</a>
  <a href="/team/">Our Team</a>
  <a href="/#involve">Get Involved</a>
  <a href="/#contact">Contact</a>
  <a href="/register/" class="mob-cta">Student Registration</a>
</div>
`;

const VTC_FOOTER = `
<style>
footer{background:#fff;border-top:1px solid var(--border);padding:0}
.footer-top{
  display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:3rem;
  max-width:1100px;margin:0 auto;padding:3.5rem 2.5rem;
}
.footer-logo img{height:50px;width:auto;display:block;margin-bottom:0.75rem}
.footer-tagline{font-size:12px;color:var(--muted);line-height:1.65;max-width:240px;margin-bottom:1.25rem}
.social-links{display:flex;gap:0.5rem}
.soc-btn{
  display:flex;align-items:center;justify-content:center;
  width:36px;height:36px;border-radius:8px;border:1px solid var(--border);
  color:var(--muted);transition:all 0.2s;background:#fff;
}
.soc-btn.instagram:hover{background:#c13584;border-color:#c13584;color:#fff}
.soc-btn.linkedin:hover{background:#0077b5;border-color:#0077b5;color:#fff}
.soc-btn.facebook:hover{background:#1877f2;border-color:#1877f2;color:#fff}
.footer-col h4{
  font-size:11px;font-weight:700;letter-spacing:0.12em;
  text-transform:uppercase;color:var(--text);margin-bottom:1rem;
}
.footer-col ul{list-style:none;display:flex;flex-direction:column;gap:0.6rem}
.footer-col ul li a{font-size:13px;color:var(--muted);transition:color 0.2s}
.footer-col ul li a:hover{color:var(--orange)}
.footer-bottom{
  border-top:1px solid var(--border);padding:1.25rem 2.5rem;
  max-width:1100px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;
}
.footer-copy{font-size:11px;color:var(--muted)}
.footer-bottom-right{display:flex;align-items:center;gap:1rem}
.footer-bottom-right a{font-size:11px;color:var(--muted);transition:color 0.2s}
.footer-bottom-right a:hover{color:var(--orange)}
.wa-float{
  position:fixed;bottom:1.5rem;right:1.5rem;z-index:999;
  display:flex;align-items:center;gap:7px;
  background:#25d366;color:#fff;border-radius:100px;
  padding:0.55rem 1rem 0.55rem 0.75rem;
  box-shadow:0 4px 18px rgba(37,211,102,0.35);
  text-decoration:none;font-size:12px;font-weight:600;
  transition:all 0.2s;font-family:var(--sans);
}
.wa-float:hover{background:#1ebe5d;transform:translateY(-2px);box-shadow:0 6px 22px rgba(37,211,102,0.45)}
@media(max-width:900px){
  .footer-top{grid-template-columns:1fr 1fr;gap:2rem}
  .footer-brand{grid-column:1/-1}
}
@media(max-width:640px){
  .footer-top{grid-template-columns:1fr;gap:2rem;padding:2rem 1.25rem}
  .footer-bottom{flex-direction:column;text-align:center;padding:1rem 1.25rem}
  .wa-float span{display:none}
  .wa-float{padding:0.75rem}
}
</style>

<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <div class="footer-logo"><img src="/images/logo.png" alt="Vidya The Change"/></div>
      <div class="footer-tagline">Identifying and nurturing unique skills of students in rural areas — through innovative teaching and purposeful learning. Founded 2022, Tadipatri AP.</div>
      <div class="social-links">
        <a class="soc-btn instagram" href="https://www.instagram.com/vidyathechange?igsh=MWY5YmdlMXNnOGJpNA==" target="_blank" rel="noopener" title="Instagram">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a class="soc-btn linkedin" href="https://www.linkedin.com/company/vidya-the-change/" target="_blank" rel="noopener" title="LinkedIn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a class="soc-btn facebook" href="https://www.facebook.com/share/18SDE6RHGS/" target="_blank" rel="noopener" title="Facebook">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/programs/">Programs</a></li>
        <li><a href="/impact/">Our Impact</a></li>
        <li><a href="/team/">Our Team</a></li>
        <li><a href="/register/">Student Registration</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Connect</h4>
      <ul>
        <li><a href="/#involve">Get Involved</a></li>
        <li><a href="/#contact">Contact Us</a></li>
        <li><a href="/feedback/">Share Feedback</a></li>
        <li><a href="/privacy/">Privacy Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">© 2026 Vidya The Change · Registered Non-Profit Society in Andhra Pradesh · Tadipatri, Anantapur District</div>
    <div class="footer-bottom-right">
      <a href="https://wa.me/919398177507?text=Namaste!%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more%20about%20Vidya%20The%20Change." target="_blank" rel="noopener">WhatsApp Us</a>
    </div>
  </div>
</footer>

<a class="wa-float" href="https://wa.me/919398177507?text=Namaste!%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more%20about%20Vidya%20The%20Change." target="_blank" rel="noopener">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  <span>Chat with us</span>
</a>
`;

// Inject nav into page
document.addEventListener('DOMContentLoaded', () => {
  // Inject global theme first
  document.head.insertAdjacentHTML('beforeend', VTC_THEME);

  // Insert nav at top of body
  document.body.insertAdjacentHTML('afterbegin', VTC_NAV);

  // Insert global footer at bottom of body
  document.body.insertAdjacentHTML('beforeend', VTC_FOOTER);

  // Wire up hamburger and mobile menu (no inline onclick needed)
  document.getElementById('vtc-hamburger').addEventListener('click', vtcToggleMenu);
  document.getElementById('vtc-mob-close').addEventListener('click', vtcToggleMenu);
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', vtcToggleMenu));

  // Highlight active page
  const path = window.location.pathname;
  const hash = window.location.hash;
  const onHome = path.endsWith('index.html') || path.endsWith('/');

  document.querySelectorAll('.nav-center a').forEach(a => {
    const page = a.getAttribute('data-page');
    if (
      (page === 'home'    && onHome && !hash) ||
      (page === 'involve' && (path.includes('register') || (onHome && hash === '#involve'))) ||
      (page === 'contact' && onHome && hash === '#contact') ||
      (page === 'programs' && path.includes('programs')) ||
      (page === 'impact'   && path.includes('impact')) ||
      (page === 'team'     && path.includes('team'))
    ) {
      a.classList.add('active');
    }
  });
});

// Mobile menu toggle
function vtcToggleMenu() {
  const h = document.getElementById('vtc-hamburger');
  const m = document.getElementById('vtc-mobile-menu');
  if (h) h.classList.toggle('open');
  if (m) m.classList.toggle('open');
}

// Scroll-shrink effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('vtc-navbar');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
});
