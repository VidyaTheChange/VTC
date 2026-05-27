const SUPA_URL = 'https://ninrmohzytxcygpolqsh.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbnJtb2h6eXR4Y3lncG9scXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NzMxNDIsImV4cCI6MjA5NDI0OTE0Mn0.tDHfdfO_O1hnA3UbPSj_0_38dJ6dKNqKvrC5GAtKJRM';

const RATE_KEY = 'vtc_fb_last';
const RATE_MS  = 60000;

// Star rating labels
const ratingLabels = {1:'Not helpful',2:'Okay',3:'Good',4:'Very Good',5:'Excellent'};
document.querySelectorAll('input[name="rating"]').forEach(r => {
  r.addEventListener('change', () => {
    document.getElementById('ratingLabel').textContent = ratingLabels[r.value] + ' (' + r.value + '/5)';
  });
});

// Choice button selection via event delegation
document.querySelectorAll('.choice-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const rowId   = btn.dataset.row;
    const hiddenId = btn.dataset.hidden;
    document.querySelectorAll('#' + rowId + ' .choice-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById(hiddenId).value = btn.textContent.trim();
  });
});

// Math CAPTCHA
const _a = Math.floor(Math.random() * 9) + 1;
const _b = Math.floor(Math.random() * 9) + 1;
document.getElementById('mathQ').textContent = _a + ' + ' + _b;
const _ans = _a + _b;

// Submit
document.getElementById('submitBtn').addEventListener('click', async () => {
  const btn  = document.getElementById('submitBtn');
  const err  = document.getElementById('errMsg');
  const succ = document.getElementById('successBox');
  err.style.display = 'none';

  // Rate limit
  const last = parseInt(localStorage.getItem(RATE_KEY) || '0');
  if (Date.now() - last < RATE_MS) {
    showErr('Please wait a moment before submitting again.');
    return;
  }

  const rating = document.querySelector('input[name="rating"]:checked');

  const data = {
    name:       document.getElementById('fb-name').value.trim()      || null,
    school:     document.getElementById('fb-school').value.trim()    || null,
    program:    document.getElementById('fb-program').value          || null,
    rating:     rating ? parseInt(rating.value) : null,
    trainer:    document.getElementById('fb-trainer').value          || null,
    support:    document.getElementById('fb-support').value          || null,
    enjoyed:    document.getElementById('fb-enjoyed').value.trim()   || null,
    challenges: document.getElementById('fb-challenges').value.trim()|| null,
    confident:  document.getElementById('fb-confident').value        || null,
    recommend:  document.getElementById('fb-recommend').value        || null,
    remember:   document.getElementById('fb-remember').value.trim()  || null,
    message:    document.getElementById('fb-message').value.trim()   || null,
    created_at: new Date().toISOString()
  };

  if (!data.school) {
    showErr('Please enter your school or college name.');
    return;
  }
  if (document.getElementById('honeypot').value) return;
  if (parseInt(document.getElementById('mathAns').value) !== _ans) {
    showErr('Incorrect answer to the quick check. Please try again.');
    return;
  }

  btn.textContent = 'Submitting…';
  btn.disabled = true;

  try {
    const r = await fetch(`${SUPA_URL}/rest/v1/feedback`, {
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
      document.querySelectorAll('.form-card').forEach(c => c.style.display = 'none');
      succ.style.display = 'flex';
    } else {
      throw new Error();
    }
  } catch {
    showErr('Something went wrong. Please try again.');
    btn.textContent = 'Submit Feedback →';
    btn.disabled = false;
  }
});

function showErr(msg) {
  const err = document.getElementById('errMsg');
  err.textContent = msg;
  err.style.display = 'block';
}
