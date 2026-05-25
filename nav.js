// Vidya The Change — Shared Navigation + Global Theme
// Edit colours here once — updates all pages automatically

const VTC_THEME = `
<style>
:root{
 /* DARK BASE */
  --bg:#0f0b08;
  --bg2:#17110d;
  --bg3:#1f160f;

  --card:#17110d;
  --border:rgba(255,255,255,0.08);

  /* TEXT */
  --text:#fff7ef;
  --muted:#c9a48a;

  /* PRIMARY COLORS */
  --orange:#e86400;
  --orange-light:rgba(232,100,0,0.12);

  --yellow:#f5a800;
  --yellow-light:rgba(245,168,0,0.12);

  /* REMOVE TEAL/GREEN COMPLETELY */
  --green:var(--yellow); /* optional fallback */
  --navy:var(--bg3);
  --navy-light:var(--bg2);

  --font:'Georgia',serif;
  --sans:'Inter',sans-serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--sans)}
</style>
`;

const VTC_NAV = `
<style>
nav{position:fixed;top:0;left:0;right:0;z-index:100;
  background:rgba(255,255,255,0.97);backdrop-filter:blur(16px);
  box-shadow:0 1px 0 #dde3ee;
  padding:0.75rem 2.5rem;display:flex;align-items:center;
  justify-content:space-between;transition:padding 0.3s}
.nav-logo{font-size:15px;font-weight:700;color:#e86400;font-family:Georgia,serif;text-decoration:none}
.nav-center{display:flex;gap:2rem}
.nav-center a{font-size:13px;color:#0f1f3d;transition:color 0.2s;font-weight:500;text-decoration:none}
.nav-center a:hover{color:#e86400}
.nav-center a.active{color:#e86400;font-weight:700}
.nav-register{background:#e86400;color:#fff;border:none;
  padding:0.45rem 1.1rem;border-radius:6px;font-size:12px;font-weight:600;
  cursor:pointer;transition:all 0.2s;text-decoration:none;display:inline-block}
.nav-register:hover{background:#c85600}
.nav-right{display:flex;align-items:center;gap:0.75rem}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;
  padding:4px;background:none;border:none}
.hamburger span{display:block;width:20px;height:2px;background:#0f1f3d;
  border-radius:2px;transition:all 0.3s}
.hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.hamburger.open span:nth-child(2){opacity:0}
.hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.mobile-menu{display:none;position:fixed;top:0;left:0;right:0;bottom:0;
  background:rgba(255,255,255,0.98);z-index:99;
  flex-direction:column;align-items:center;justify-content:center;gap:1.5rem}
.mobile-menu.open{display:flex}
.mobile-menu a{font-size:1.3rem;font-weight:600;color:#0f1f3d;
  font-family:Georgia,serif;transition:color 0.2s;text-decoration:none}
.mobile-menu a:hover{color:#e86400}
.mob-cta{background:#e86400 !important;color:#fff !important;
  padding:0.75rem 2rem;border-radius:8px;font-size:1rem !important;font-weight:700 !important}
.mob-close{position:absolute;top:1.5rem;right:1.5rem;
  font-size:1.5rem;cursor:pointer;color:#5a6a85;background:none;border:none}
@media(max-width:700px){
  nav{padding:0.6rem 1rem}
  .nav-center{display:none}
  .hamburger{display:flex}
  .nav-register{display:none}
}
</style>

<nav id="vtc-navbar">
  <a class="nav-logo" href="/index.html">Vidya The Change</a>
  <div class="nav-center">
    <a href="/programs.html" data-page="programs">Programs</a>
    <a href="/index.html#impact" data-page="impact">Impact</a>
    <a href="/team.html" data-page="team">Our Team</a>
    <a href="/index.html#involve" data-page="involve">Join Us</a>
    <a href="/index.html#contact" data-page="contact">Contact</a>
  </div>
  <div class="nav-right">
    <a href="/register.html" class="nav-register">Student Registration</a>
    <button class="hamburger" id="vtc-hamburger" onclick="vtcToggleMenu()">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mobile-menu" id="vtc-mobile-menu">
  <button class="mob-close" onclick="vtcToggleMenu()">✕</button>
  <a href="/programs.html" onclick="vtcToggleMenu()">Programs</a>
  <a href="/index.html#impact" onclick="vtcToggleMenu()">Impact</a>
  <a href="/team.html" onclick="vtcToggleMenu()">Our Team</a>
  <a href="/index.html#involve" onclick="vtcToggleMenu()">Join Us</a>
  <a href="/index.html#contact" onclick="vtcToggleMenu()">Contact</a>
  <a href="/register.html" class="mob-cta">Student Registration</a>
</div>
`;

// Inject nav into page
document.addEventListener('DOMContentLoaded', () => {
  // Inject global theme first
  document.head.insertAdjacentHTML('beforeend', VTC_THEME);

  // Insert nav at top of body
  document.body.insertAdjacentHTML('afterbegin', VTC_NAV);

  // Highlight active page
  const path = window.location.pathname;
  document.querySelectorAll('.nav-center a').forEach(a => {
    const page = a.getAttribute('data-page');
    if (
      (page === 'programs' && path.includes('programs')) ||
      (page === 'team' && path.includes('team')) ||
      (page === 'involve' && path.includes('register'))
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
