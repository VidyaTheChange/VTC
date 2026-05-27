const SUPA_URL = 'https://ninrmohzytxcygpolqsh.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbnJtb2h6eXR4Y3lncG9scXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NzMxNDIsImV4cCI6MjA5NDI0OTE0Mn0.tDHfdfO_O1hnA3UbPSj_0_38dJ6dKNqKvrC5GAtKJRM';

const VOL_RATE_KEY = 'vtc_vol_last';
const RATE_MS      = 60000;

/* Animated counters */
const targets = [
  {id:'s1',val:250,fmt:v=>v+'+'}, {id:'s2',val:9,fmt:v=>String(v)},
  {id:'s3',val:3,  fmt:v=>String(v)}, {id:'s4',val:3,fmt:v=>String(v)}
];
const animateCounters = () => {
  targets.forEach(({id,val,fmt}) => {
    let cur = 0;
    const el   = document.getElementById(id);
    const step = Math.max(1, Math.ceil(val / 55));
    const t = setInterval(() => {
      cur = Math.min(cur + step, val);
      el.textContent = fmt(cur);
      if (cur >= val) clearInterval(t);
    }, 28);
  });
};
const statsEl = document.getElementById('statsEl');
if (statsEl) {
  const obs = new IntersectionObserver(e => {
    if (e[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, {threshold: 0.3});
  obs.observe(statsEl);
}

/* Volunteer form math CAPTCHA */
const _va = Math.floor(Math.random() * 9) + 1;
const _vb = Math.floor(Math.random() * 9) + 1;
document.getElementById('volMathQ').textContent = _va + ' + ' + _vb;
const _vans = _va + _vb;

/* Volunteer form submit */
async function submitVolunteer() {
  const name    = document.getElementById('vol-name').value.trim();
  const email   = document.getElementById('vol-email').value.trim();
  const phone   = document.getElementById('vol-phone').value.trim();
  const role    = document.getElementById('vol-role').value;
  const message = document.getElementById('vol-message').value.trim();
  const btn     = document.getElementById('vol-submit');
  const msg     = document.getElementById('vol-msg');
  const err     = document.getElementById('vol-err');

  msg.style.display = 'none';
  err.style.display = 'none';

  // Rate limit
  const last = parseInt(localStorage.getItem(VOL_RATE_KEY) || '0');
  if (Date.now() - last < RATE_MS) {
    err.textContent = 'Please wait a moment before submitting again.';
    err.style.display = 'block';
    return;
  }

  if (!name || !email) {
    err.textContent = 'Please enter your name and email.';
    err.style.display = 'block';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    err.textContent = 'Please enter a valid email address.';
    err.style.display = 'block';
    return;
  }
  if (phone && !/^[0-9]{10}$/.test(phone)) {
    err.textContent = 'Please enter a valid 10-digit WhatsApp number.';
    err.style.display = 'block';
    return;
  }
  if (document.getElementById('vol-honeypot').value) return;
  if (parseInt(document.getElementById('vol-math').value) !== _vans) {
    err.textContent = 'Incorrect answer to the quick check.';
    err.style.display = 'block';
    return;
  }

  btn.textContent = 'Submitting…';
  btn.disabled = true;

  try {
    const r = await fetch(`${SUPA_URL}/rest/v1/volunteers`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPA_KEY,
        'Authorization': 'Bearer ' + SUPA_KEY,
        'Prefer':        'return=minimal'
      },
      body: JSON.stringify({name, email, phone, role, message, created_at: new Date().toISOString()})
    });

    if (r.ok || r.status === 201) {
      localStorage.setItem(VOL_RATE_KEY, Date.now().toString());
      msg.style.display = 'block';
      ['vol-name','vol-email','vol-phone','vol-math'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('vol-role').value = '';
      document.getElementById('vol-message').value = '';
      btn.textContent = 'Submit →';
      btn.disabled = false;
      setTimeout(() => { msg.style.display = 'none'; }, 5000);
    } else {
      throw new Error();
    }
  } catch {
    err.textContent = 'Something went wrong. Please try again.';
    err.style.display = 'block';
    btn.textContent = 'Submit →';
    btn.disabled = false;
  }
}

document.getElementById('vol-submit').addEventListener('click', submitVolunteer);
