/* ========= script.js — ZidMatrix (Real Estate Luxury) ========= */

/* ---------- particles background (subtle) ---------- */
(function(){
  const canvas = document.getElementById('particles-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const particles = [];
  const count = Math.floor((w*h) / 90000); // adaptive count

  function rand(min,max){ return Math.random()*(max-min)+min; }
  function init(){
    particles.length = 0;
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: rand(0.6,2.2),
        vx: rand(-0.2,0.2),
        vy: rand(-0.1,0.1),
        alpha: rand(0.06,0.25)
      });
    }
  }
  function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; init(); }
  window.addEventListener('resize', resize);
  init();

  function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < -10) p.x = w + 10;
      if(p.x > w + 10) p.x = -10;
      if(p.y < -10) p.y = h + 10;
      if(p.y > h + 10) p.y = -10;
      ctx.beginPath();
      ctx.fillStyle = `rgba(200,160,75,${p.alpha})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- mouse follower ---------- */
(function(){
  const fol = document.getElementById('mouse-follower');
  if(!fol) return;
  let mouseX = innerWidth/2, mouseY = innerHeight/2;
  let x = mouseX, y = mouseY;
  window.addEventListener('mousemove', e=>{
    mouseX = e.clientX; mouseY = e.clientY;
    fol.style.display = 'block';
  });
  function loop(){
    x += (mouseX - x) * 0.18;
    y += (mouseY - y) * 0.18;
    fol.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ---------- AOS init + UI ---------- */
document.addEventListener('DOMContentLoaded', function(){
  if(window.AOS) AOS.init({duration:700, once:true});

  // mobile toggle
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle && toggle.addEventListener('click', ()=> navLinks && navLinks.classList.toggle('open'));

  // smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // footer year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // contact button demo
  const send = document.getElementById('sendBtn');
  if(send) send.addEventListener('click', ()=> {
    alert('Demo contact form — configure Netlify Forms or Formspree to receive messages.');
  });
});
