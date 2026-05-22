// LOADER
let pct = 0;
const loaderPct = document.getElementById('loader-pct');
const loaderInterval = setInterval(() => {
  pct += Math.random() * 15;
  if (pct >= 100) {
    pct = 100;
    clearInterval(loaderInterval);
    loaderPct.textContent = '100%';
    setTimeout(() => {
      document.getElementById('loader').classList.add('done');
    }, 300);
  }
  loaderPct.textContent = Math.floor(pct) + '%';
}, 80);
 
// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
 
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
 
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();
 
document.querySelectorAll('a, button, .project-card, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    ring.style.width = '60px';
    ring.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    ring.style.width = '40px';
    ring.style.height = '40px';
  });
});
 
// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Count up numbers
      const statNum = e.target.querySelector('.stat-num[data-target]');
      if (statNum) {
        const target = parseInt(statNum.getAttribute('data-target'));
        let current = 0;
        const step = target / 30;
        const interval = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(interval); }
          statNum.textContent = Math.floor(current).toString().padStart(2, '0');
        }, 40);
      }
    }
  });
}, { threshold: 0.15 });
 
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
 
// FILTER
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
 
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
 
    cards.forEach(card => {
      const cat = card.dataset.cat;
      if (filter === 'all' || cat === filter) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.pointerEvents = 'auto';
      } else {
        card.style.opacity = '0.15';
        card.style.transform = 'scale(0.97)';
        card.style.pointerEvents = 'none';
      }
      card.style.transition = 'opacity 0.4s, transform 0.4s';
    });
  });
});
 
// PARALLAX on hero
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroNum = document.querySelector('.hero-number');
  if (heroNum) heroNum.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
});
 
// Duplicate marquee for infinite loop
const track = document.getElementById('marquee');
track.innerHTML += track.innerHTML;
