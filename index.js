const SUPA_URL = 'https://ninrmohzytxcygpolqsh.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbnJtb2h6eXR4Y3lncG9scXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NzMxNDIsImV4cCI6MjA5NDI0OTE0Mn0.tDHfdfO_O1hnA3UbPSj_0_38dJ6dKNqKvrC5GAtKJRM';

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

