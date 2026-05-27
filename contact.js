const SUPA_URL = 'https://ninrmohzytxcygpolqsh.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbnJtb2h6eXR4Y3lncG9scXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NzMxNDIsImV4cCI6MjA5NDI0OTE0Mn0.tDHfdfO_O1hnA3UbPSj_0_38dJ6dKNqKvrC5GAtKJRM';

const VOL_RATE_KEY = 'vtc_vol_last';
const RATE_MS      = 60000;

// Math CAPTCHA
let _vans;
function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  document.getElementById('volMathQ').textContent = a + ' + ' + b;
  document.getElementById('vol-math').value = '';
  _vans = a + b;
}
generateCaptcha();

async function submitVolunteer() {
  const name    = document.getElementById('vol-name').value.trim();
  const email   = document.getElementById('vol-email').value.trim();
  const phone   = document.getElementById('vol-phone').value.trim();
  const role    = document.getElementById('vol-role').value;
  const message = document.getElementById('vol-message').value.trim();
  const btn     = document.getElementById('vol-submit');
  const err     = document.getElementById('vol-err');

  err.style.display = 'none';

  // Rate limit
  const last = parseInt(localStorage.getItem(VOL_RATE_KEY) || '0');
  if (Date.now() - last < RATE_MS) {
    showErr('Please wait a moment before submitting again.');
    return;
  }

  if (!name || !email) {
    showErr('Please enter your name and email.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showErr('Please enter a valid email address.');
    return;
  }
  if (phone && !/^[0-9]{10}$/.test(phone)) {
    showErr('Please enter a valid 10-digit WhatsApp number.');
    return;
  }
  if (document.getElementById('vol-honeypot').value) return;
  if (parseInt(document.getElementById('vol-math').value) !== _vans) {
    showErr('Incorrect answer to the quick check.');
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
      body: JSON.stringify({ name, email, phone, role, message, created_at: new Date().toISOString() })
    });

    if (r.ok || r.status === 201) {
      localStorage.setItem(VOL_RATE_KEY, Date.now().toString());
      document.querySelector('.vol-form').classList.add('disabled-form');
      btn.textContent = 'Submitted ✓';
      const succ = document.getElementById('volSuccessOverlay');
      succ.style.display = 'block';
      succ.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      throw new Error();
    }
  } catch {
    showErr('Something went wrong. Please try again.');
    btn.textContent = 'Submit →';
    btn.disabled = false;
  }
}

function showErr(msg) {
  const err = document.getElementById('vol-err');
  err.textContent = msg;
  err.style.display = 'block';
}

document.getElementById('vol-submit').addEventListener('click', submitVolunteer);

// Submit another response
document.getElementById('submitAnother').addEventListener('click', () => {
  document.getElementById('volSuccessOverlay').style.display = 'none';
  document.querySelector('.vol-form').classList.remove('disabled-form');
  const btn = document.getElementById('vol-submit');
  btn.disabled = false;
  btn.textContent = 'Submit →';
  document.querySelectorAll('.vol-form input:not([type=hidden]), .vol-form select, .vol-form textarea').forEach(el => {
    el.value = '';
    el.classList.remove('valid', 'invalid');
  });
  document.querySelectorAll('.vol-inline-err').forEach(el => el.textContent = '');
  generateCaptcha();
  window.scrollTo({ top: document.getElementById('volSuccessOverlay').offsetTop - 100, behavior: 'smooth' });
});

// Email inline validation
document.getElementById('vol-email').addEventListener('blur', function() {
  const errEl = document.getElementById('vol-emailErr');
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim());
  this.classList.toggle('invalid', this.value.length > 0 && !valid);
  this.classList.toggle('valid', this.value.length > 0 && valid);
  errEl.textContent = this.value.length > 0 && !valid ? 'Enter a valid email address.' : '';
});
document.getElementById('vol-email').addEventListener('input', function() {
  if (document.getElementById('vol-emailErr').textContent) {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim());
    this.classList.toggle('invalid', !valid);
    this.classList.toggle('valid', valid);
    document.getElementById('vol-emailErr').textContent = valid ? '' : 'Enter a valid email address.';
  }
});

// Phone inline validation
document.getElementById('vol-phone').addEventListener('input', function() {
  const errEl = document.getElementById('vol-phoneErr');
  const valid = /^[0-9]{10}$/.test(this.value.trim());
  this.classList.toggle('invalid', this.value.length > 0 && !valid);
  this.classList.toggle('valid', valid);
  errEl.textContent = this.value.length > 0 && !valid ? 'Enter a valid 10-digit number.' : '';
});
