/* ===================================================
   RÉPTEIS MOTO CLUBE — MAIN.JS
   Scroll reveal + Calango scroll storytelling
   =================================================== */

// ───── HAMBURGER MENU ─────
(function () {
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  if (!hamburger || !navLinks) return;

  // Toggle menu when hamburger is clicked
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });
})();

// ───── SCROLL REVEAL ─────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


// ───── FORMULÁRIO DE CONTATO VIA WHATSAPP ─────
// Monta uma mensagem com os dados digitados e abre o WhatsApp do clube.
// Número do clube (presidente): +55 84 98624-6736
(function () {
  const ZAP_CLUBE = '5584986246736'; // 55 (Brasil) + 84 (DDD) + número
  const btn = document.getElementById('btnWhatsapp');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const nome = document.getElementById('contatoNome').value.trim();
    const zap  = document.getElementById('contatoZap').value.trim();
    const msg  = document.getElementById('contatoMsg').value.trim();

    if (!nome || !msg) {
      alert('Por favor, preencha pelo menos seu nome e a mensagem.');
      return;
    }

    // Monta o texto da mensagem
    let texto = `Olá, Répteis MC! Meu nome é ${nome}.`;
    if (zap) texto += ` Meu WhatsApp: ${zap}.`;
    texto += `\n\n${msg}`;

    // encodeURIComponent transforma o texto em formato seguro para URL
    const url = `https://wa.me/${ZAP_CLUBE}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  });
})();


// ───── VEGETAÇÃO DA CAATINGA (cactos espalhados) ─────
(function plantCacti() {
  const scene = document.getElementById('rotasScene');
  if (!scene) return;

  // mandacaru (cacto alto de braços) em SVG
  const mandacaru = (cor) => `
    <svg viewBox="0 0 60 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,120 L30,30" stroke="${cor}" stroke-width="12" stroke-linecap="round"/>
      <path d="M30,70 q-16,0 -16,-18 l0,-12" fill="none" stroke="${cor}" stroke-width="9" stroke-linecap="round"/>
      <path d="M30,60 q16,0 16,-16 l0,-14" fill="none" stroke="${cor}" stroke-width="9" stroke-linecap="round"/>
      <path d="M30,120 L30,30" stroke="rgba(120,180,90,0.25)" stroke-width="3" stroke-linecap="round"/>
    </svg>`;

  // xiquexique (touceira baixa)
  const xique = (cor) => `
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="25" cy="32" rx="9" ry="18" fill="${cor}"/>
      <ellipse cx="13" cy="36" rx="6" ry="13" fill="${cor}"/>
      <ellipse cx="37" cy="35" rx="6" ry="14" fill="${cor}"/>
    </svg>`;

  // posições: {left%, top%, escala, tipo}  — espalhados pelas laterais
  const C = '#1c2e13';
  const itens = [
    {l: 6,  t: 8,  s: 1.4, f: mandacaru}, {l: 90, t: 14, s: 1.1, f: mandacaru},
    {l: 4,  t: 30, s: 0.8, f: xique},     {l: 93, t: 34, s: 1.5, f: mandacaru},
    {l: 8,  t: 48, s: 1.7, f: mandacaru}, {l: 91, t: 54, s: 0.9, f: xique},
    {l: 3,  t: 68, s: 1.0, f: xique},     {l: 92, t: 72, s: 1.3, f: mandacaru},
    {l: 7,  t: 86, s: 1.5, f: mandacaru}, {l: 90, t: 90, s: 0.8, f: xique},
  ];

  itens.forEach((it) => {
    const div = document.createElement('div');
    div.style.cssText = `position:absolute; left:${it.l}%; top:${it.t}%;
      width:${60*it.s}px; height:${120*it.s}px; z-index:0; opacity:0.55;
      pointer-events:none; transform:translateX(-50%);`;
    div.innerHTML = it.f(C);
    scene.appendChild(div);
  });
})();



// A estrada acompanha o mesmo zig-zag que o calango faz
(function drawRoad() {
  const scene = document.getElementById('rotasScene');
  if (!scene) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 1000 1000');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;z-index:1;pointer-events:none;';

  // Gera o path da estrada com curvas S (mesmo seno do calango)
  // O calango usa: sin(p * PI * 3) * amplitude
  // Aqui replicamos isso como um path SVG
  const amplitude = 38; // balanço mais suave, longe dos cards
  const centerX = 500;
  let d = `M ${centerX} 0`;
  const steps = 200;
  for (let i = 1; i <= steps; i++) {
    const p = i / steps;
    const y = p * 1000;
    const x = centerX + Math.sin(p * Math.PI * 3) * amplitude;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  // Asfalto (largo)
  const asphalt = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  asphalt.setAttribute('d', d);
  asphalt.setAttribute('stroke', '#1e1810');
  asphalt.setAttribute('stroke-width', '56');
  asphalt.setAttribute('fill', 'none');
  asphalt.setAttribute('stroke-linecap', 'round');
  asphalt.setAttribute('opacity', '0.9');
  svg.appendChild(asphalt);

  // Bordas douradas
  const edge = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  edge.setAttribute('d', d);
  edge.setAttribute('stroke', 'rgba(200,168,75,0.2)');
  edge.setAttribute('stroke-width', '58');
  edge.setAttribute('fill', 'none');
  edge.setAttribute('stroke-linecap', 'round');
  svg.insertBefore(edge, asphalt);

  // Linha tracejada central
  const dash = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  dash.setAttribute('d', d);
  dash.setAttribute('stroke', 'rgba(200,168,75,0.4)');
  dash.setAttribute('stroke-width', '3');
  dash.setAttribute('fill', 'none');
  dash.setAttribute('stroke-dasharray', '16 30');
  svg.appendChild(dash);

  scene.insertBefore(svg, scene.firstChild);
})();


// ───── ROTAS — CALANGO DESCE A ESTRADA (toca + fumaça) ─────
(function () {
  const scene = document.getElementById('rotasScene');
  const wrap  = document.getElementById('calangoWrap');
  const stops = [...document.querySelectorAll('.rota-stop')];
  const marcos = stops.map((s) => s.querySelector('.rota-marco'));
  const conts  = stops.map((s) => s.querySelector('.rota-content'));
  const fired  = new Array(stops.length).fill(false);

  if (!scene || !wrap) return;

  // ── Cria os dois túneis (arco no topo de entrada e no fim de saída) ──
  function criaTunel(topPct, label) {
    const t = document.createElement('div');
    t.className = 'rota-tunel';
    t.style.top = topPct;
    t.innerHTML = `
      <svg viewBox="0 0 140 90" xmlns="http://www.w3.org/2000/svg">
        <!-- montanha/terra do túnel -->
        <path d="M0,90 L0,50 Q70,-15 140,50 L140,90 Z" fill="#1a1409"/>
        <path d="M0,90 L0,50 Q70,-15 140,50 L140,90 Z" fill="none"
              stroke="rgba(200,168,75,0.25)" stroke-width="2"/>
        <!-- boca escura do túnel -->
        <ellipse cx="70" cy="78" rx="42" ry="34" fill="#000"/>
        <ellipse cx="70" cy="78" rx="42" ry="34" fill="none"
                 stroke="rgba(200,168,75,0.3)" stroke-width="2.5"/>
        <ellipse cx="70" cy="82" rx="34" ry="26" fill="#0a0a08"/>
      </svg>`;
    scene.appendChild(t);
    return t;
  }
  criaTunel('-2%');   // túnel de entrada (topo)
  const tunelFim = criaTunel('96%');  // Adjusted tunnel end position
  // o túnel do fim fica invertido (boca virada pra cima)
  tunelFim.style.transform = 'translateX(-50%) scaleY(-1)';

  // ── Controle de fumaça ──
  let ultimaFumaca = 0;
  function soltaFumaca(x, y) {
    const agora = performance.now();
    if (agora - ultimaFumaca < 110) return; // limita a frequência
    ultimaFumaca = agora;

    const f = document.createElement('div');
    f.className = 'rota-fumaca';
    const desvio = (Math.random() - 0.5) * 14;
    f.style.left = (x + desvio) + 'px';
    f.style.top = y + 'px';
    scene.appendChild(f);

    // anima a fumaça subindo e sumindo
    const inicio = performance.now();
    const dur = 900 + Math.random() * 400;
    const driftX = (Math.random() - 0.5) * 30;
    (function anima() {
      const t = (performance.now() - inicio) / dur;
      if (t >= 1) { f.remove(); return; }
      const escala = 1 + t * 2.5;
      f.style.transform = `translate(${driftX * t}px, ${-40 * t}px) scale(${escala})`;
      f.style.opacity = (1 - t) * 0.5;
      requestAnimationFrame(anima);
    })();
  }

  function tick() {
    const rect = scene.getBoundingClientRect();
    const vh = window.innerHeight;

    // p = progresso de 0 a 1 pela seção
    let p = (vh * 0.45 - rect.top) / rect.height;
    p = Math.max(0, Math.min(1, p));

    // Posição vertical e horizontal (zig-zag igual à estrada)
    const yPos = p * rect.height;
    const calangoScreenY = rect.top + yPos;
    // mesma proporção da estrada (amplitude 38 / 1000 = 0.038 da largura)
    const zig = Math.sin(p * Math.PI * 3) * (rect.width * 0.038);

    // ── ENTRA/SAI DOS TÚNEIS ──
    // Os túneis (z-index maior) cobrem o calango nas pontas, criando o efeito
    // de sair de dentro do túnel e entrar no outro. Só um fade curtinho nas bordas.
    let opac = 1;
    if (p < 0.04) opac = p / 0.04;
    else if (p > 0.96) opac = (1 - p) / 0.04;
    wrap.style.opacity = opac;
    wrap.style.transform = `translate(${zig}px, ${yPos}px)`;

    // ── FUMAÇA da moto (atrás dela = topo, pois é visão de cima) ──
    if (p > 0.06 && p < 0.96) {
      const cx = rect.width / 2 + zig;
      const cy = yPos - 10;
      soltaFumaca(cx, cy);
    }

    // ── Paradas: marco acende + conteúdo aparece ──
    stops.forEach((s, i) => {
      const stopRect = s.getBoundingClientRect();
      const stopMid = stopRect.top + stopRect.height / 2;

      if (!fired[i] && calangoScreenY >= stopMid - 50) {
        fired[i] = true;
        marcos[i].classList.add('hit');
        setTimeout(() => conts[i].classList.add('revealed'), 150);
      }
      if (fired[i] && calangoScreenY < stopMid - 140) {
        fired[i] = false;
        marcos[i].classList.remove('hit');
        conts[i].classList.remove('revealed');
      }
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
