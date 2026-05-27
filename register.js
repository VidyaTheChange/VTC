const SUPA_URL = 'https://ninrmohzytxcygpolqsh.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbnJtb2h6eXR4Y3lncG9scXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NzMxNDIsImV4cCI6MjA5NDI0OTE0Mn0.tDHfdfO_O1hnA3UbPSj_0_38dJ6dKNqKvrC5GAtKJRM';

const RATE_KEY = 'vtc_reg_last';
const RATE_MS  = 60000;

async function submitForm() {
  const btn     = document.getElementById('submitBtn');
  const err     = document.getElementById('errMsg');
  const success = document.getElementById('successBox');

  err.style.display = 'none';
  err.textContent   = '';
  success.style.display = 'none';

  // Rate limit
  const last = parseInt(localStorage.getItem(RATE_KEY) || '0');
  if (Date.now() - last < RATE_MS) {
    err.textContent = 'Please wait a moment before submitting again.';
    err.style.display = 'block';
    return;
  }

  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();

  const data = {
    fullname:   document.getElementById('fullname').value.trim(),
    fathername: document.getElementById('fathername').value.trim(),
    mothername: document.getElementById('mothername').value.trim(),
    dob:        document.getElementById('dob').value,
    gender:     document.getElementById('gender').value,
    phone, email,
    address:    document.getElementById('address').value.trim(),
    school:     document.getElementById('school').value.trim(),
    classyear:  document.getElementById('classyear').value,
    medium:     document.getElementById('medium').value,
    smartphone: document.getElementById('smartphone').value,
    laptop:     document.getElementById('laptop').value,
    program:    document.getElementById('program').value,
    reason:     document.getElementById('reason').value.trim(),
    source:     document.getElementById('source').value,
    created_at: new Date().toISOString()
  };

  // Required fields
  const required = ['fullname','fathername','mothername','gender','phone','email',
                    'address','school','classyear','program','reason','source'];
  if (required.some(f => !data[f])) {
    err.textContent = 'Please fill in all required fields marked with *.';
    err.style.display = 'block';
    return;
  }

  // Format validation
  if (!/^[0-9]{10}$/.test(phone)) {
    err.textContent = 'Please enter a valid 10-digit WhatsApp number.';
    err.style.display = 'block';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    err.textContent = 'Please enter a valid email address.';
    err.style.display = 'block';
    return;
  }

  // Bot checks
  if (document.getElementById('honeypot').value) return;
  if (parseInt(document.getElementById('mathAns').value) !== _ans) {
    err.textContent = 'Incorrect answer to the quick check. Please try again.';
    err.style.display = 'block';
    return;
  }

  // Consent
  if (!document.getElementById('consentCheck').checked) {
    err.textContent = 'Please confirm your consent to the privacy policy before submitting.';
    err.style.display = 'block';
    return;
  }

  btn.textContent = 'Submitting…';
  btn.disabled = true;

  try {
    const r = await fetch(`${SUPA_URL}/rest/v1/students`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPA_KEY,
        'Authorization': 'Bearer ' + SUPA_KEY,
        'Prefer':        'return=minimal'
      },
      body: JSON.stringify(data)
    });

    if (r.ok || r.status === 201) {
      localStorage.setItem(RATE_KEY, Date.now().toString());
      // Disable all form inputs
      document.querySelectorAll('.form-card input:not(#honeypot), .form-card select, .form-card textarea').forEach(el => { el.disabled = true; });
      btn.textContent = 'Submitted ✓';
      // Show inline success
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      throw new Error();
    }
  } catch {
    err.textContent = 'Something went wrong. Please try again.';
    err.style.display = 'block';
    btn.textContent = 'Submit Registration →';
    btn.disabled = false;
  }
}

// Math CAPTCHA
let _ans;
function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  document.getElementById('mathQ').textContent = a + ' + ' + b;
  document.getElementById('mathAns').value = '';
  _ans = a + b;
}
generateCaptcha();

document.getElementById('submitBtn').addEventListener('click', submitForm);

// Submit another registration
document.getElementById('submitAnother').addEventListener('click', () => {
  document.getElementById('successBox').style.display = 'none';
  document.querySelectorAll('.form-card input:not(#honeypot), .form-card select, .form-card textarea').forEach(el => {
    el.disabled = false;
    el.value = '';
    el.classList.remove('valid', 'invalid');
  });
  document.getElementById('consentCheck').checked = false;
  document.querySelectorAll('.inline-err').forEach(el => el.textContent = '');
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('submitBtn').textContent = 'Submit Registration →';
  generateCaptcha();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// DOB auto-format: types as DD/MM/YYYY
document.getElementById('dob').addEventListener('input', function() {
  let v = this.value.replace(/\D/g, '').slice(0, 8);
  let out = '';
  if (v.length > 0) out = v.slice(0, 2);
  if (v.length > 2) out += '/' + v.slice(2, 4);
  if (v.length > 4) out += '/' + v.slice(4, 8);
  this.value = out;
});

// Inline field validation
document.getElementById('phone').addEventListener('input', function() {
  const err   = document.getElementById('phoneErr');
  const valid = /^[0-9]{10}$/.test(this.value.trim());
  this.classList.toggle('invalid', this.value.length > 0 && !valid);
  this.classList.toggle('valid', valid);
  err.textContent = this.value.length > 0 && !valid ? 'Enter a valid 10-digit number.' : '';
});

document.getElementById('email').addEventListener('blur', function() {
  const err   = document.getElementById('emailErr');
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim());
  this.classList.toggle('invalid', this.value.length > 0 && !valid);
  this.classList.toggle('valid', this.value.length > 0 && valid);
  err.textContent = this.value.length > 0 && !valid ? 'Enter a valid email address.' : '';
});

document.getElementById('email').addEventListener('input', function() {
  if (document.getElementById('emailErr').textContent) {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim());
    this.classList.toggle('invalid', !valid);
    this.classList.toggle('valid', valid);
    document.getElementById('emailErr').textContent = valid ? '' : 'Enter a valid email address.';
  }
});
