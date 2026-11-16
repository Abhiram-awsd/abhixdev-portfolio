/* Deskling characters.
   Every figurine is described once, as a short list of vector shapes on a 64x64 grid.
   The same description is drawn three ways: "soft" (shaded SVG), "pixel" (32x32 sprite)
   and "neon" (glowing outline). To add your own figurine, copy one entry in CHARS,
   change the shapes and colours, and it shows up in all three looks. See CONTRIBUTING.md. */
(function () {
  'use strict';

  // ---- tiny path helpers (everything is a path so one renderer handles all shapes)
  const E = (cx, cy, rx, ry = rx) =>
    `M${cx - rx},${cy}a${rx},${ry} 0 1,0 ${2 * rx},0a${rx},${ry} 0 1,0 ${-2 * rx},0Z`;
  const R = (x, y, w, h, r = 0) =>
    `M${x + r},${y}h${w - 2 * r}a${r},${r} 0 0 1 ${r},${r}v${h - 2 * r}a${r},${r} 0 0 1 ${-r},${r}h${-(w - 2 * r)}a${r},${r} 0 0 1 ${-r},${-r}v${-(h - 2 * r)}a${r},${r} 0 0 1 ${r},${-r}Z`;
  // a rounded "figurine" dome: centre x, top y, half width, bottom y
  const D = (cx, t, hw, b) => {
    const k = (b - t) * 0.16;
    return `M${cx - hw},${b - 12}C${cx - hw},${t + k} ${cx - hw * 0.62},${t} ${cx},${t}C${cx + hw * 0.62},${t} ${cx + hw},${t + k} ${cx + hw},${b - 12}C${cx + hw},${b - 2} ${cx + hw * 0.6},${b} ${cx},${b}C${cx - hw * 0.6},${b} ${cx - hw},${b - 2} ${cx - hw},${b - 12}Z`;
  };

  const INK = '#2b2438', WHITE = '#ffffff', BLUSH = '#ff8fa6';

  // shape = [path, fill, stroke, strokeWidth, part]; colours are palette keys or hex.
  // `part` (tail, earL, earR, flopL, flopR, lamp, tongue, footL, footR, armL, armR, jet) makes that shape move on its own; see style.css.
  // `move: 'hover'` marks buddies that glide instead of walking.
  // optional `over` shapes are drawn on top of the face (teeth, visors...)
  const CHARS = [
    { id: 'bolt', name: 'Bolt', kind: 'robot', glow: '#3df0ff', move: 'hover',
      pal: { a: '#8f9bbd', b: '#5f6a90', c: '#3df0ff', d: '#1a1f38' },
      face: { x: [25.5, 38.5], y: 27, r: 2.8, my: 32, mouth: 'smile', ink: 'c', brow: false },
      body: [
        [R(31, 6, 2, 8), 'd'], [R(28.5, 3.5, 7, 4, 1.5), 'c', null, 0, 'lamp'],
        [R(7, 22, 7, 13, 2), 'b'], [R(50, 22, 7, 13, 2), 'b'],
        [R(19, 43, 26, 13, 4), 'b'], [R(27, 47, 10, 4, 1.5), 'd'], [R(28.5, 48.2, 4, 1.6, 0.8), 'c', null, 0, 'lamp'],
        ['M22.5,58.5h6l-3,5.5Z', 'c', null, 0, 'jet'], ['M35.5,58.5h6l-3,5.5Z', 'c', null, 0, 'jet'],
        [R(21, 54.5, 9, 4, 1.5), 'd'], [R(34, 54.5, 9, 4, 1.5), 'd'],
        [R(13, 13, 38, 31, 7), 'a'], [R(17, 19, 30, 19, 4), 'd'],
      ] },
    { id: 'nova', name: 'Nova', kind: 'astronaut', glow: '#7fe7ff', move: 'hover',
      pal: { a: '#eef1f7', b: '#b9c0d2', c: '#ff8a2a', d: '#1c2440', e: '#7fe7ff', f: '#4a5a8c' },
      face: { x: [26, 38], y: 27, r: 2.6, my: 32.5, mouth: 'smile', ink: 'e', brow: false },
      body: [
        ['M12.5,52h5l-2.5,7Z', 'c', null, 0, 'jet'], ['M46.5,52h5l-2.5,7Z', 'c', null, 0, 'jet'],
        [R(11, 32, 42, 20, 6), 'b'],
        [D(32, 34, 15.5, 57), 'a'],
        [R(27, 46, 10, 6, 2), 'c', null, 0, 'lamp'],
        [R(21, 54.5, 9, 4, 2), 'b'], [R(34, 54.5, 9, 4, 2), 'b'],
        [E(32, 26, 20.5, 19), 'a'],
        [R(16.5, 16.5, 31, 20, 9.5), 'd'],
        ['M21,23q2.5,-3.5 8,-4', null, 'f', 2],
      ] },
    { id: 'miso', name: 'Miso', kind: 'cat', glow: '#ffb45c',
      pal: { a: '#f0a55a', b: '#c9772f', d: '#7a4520', w: '#fff3df' },
      face: { x: [24, 40], y: 35, r: 3, my: 42, mouth: 'cat', brow: false },
      body: [
        ['M47,53q12,-1 9,-16', null, 'b', 5, 'tail'],
        ['M13,28L15,8L30,20Z', 'a', null, 0, 'earL'], ['M51,28L49,8L34,20Z', 'a', null, 0, 'earR'],
        ['M17.5,21.5L18.5,13.5L24.5,18.5Z', 'd', null, 0, 'earL'], ['M46.5,21.5L45.5,13.5L39.5,18.5Z', 'd', null, 0, 'earR'],
        [D(32, 18, 21, 57), 'a'],
        ['M27,20.5v5M32,19.5v6M37,20.5v5', null, 'b', 2.2],
        ['M12.5,36h4M12.8,41h3.6M51.5,36h-4M51.2,41h-3.6', null, 'b', 1.8],
        [E(32, 49.5, 9.5, 6.5), 'w'],
        [E(24.5, 56, 4.5, 2.4), 'w', null, 0, 'footL'], [E(39.5, 56, 4.5, 2.4), 'w', null, 0, 'footR'],
      ],
      over: [['M30.6,39.2h2.8l-1.4,1.8Z', 'd']] },
    { id: 'biscuit', name: 'Biscuit', kind: 'dog', glow: '#ffd27a',
      pal: { a: '#d9a066', b: '#8a5a36', c: '#2f6bff', e: '#ffd23f', w: '#fff3df', t: '#ff6b81' },
      face: { x: [24, 40], y: 32.5, r: 2.9, my: 45, mouth: 'smile', nose: 41, brow: false },
      body: [
        ['M47,51q10,-3 9,-15', null, 'a', 5, 'tail'],
        [D(32, 17, 21, 57), 'a'],
        [E(40.5, 32.5, 6.8, 7.4), 'b'],
        [E(32, 44.5, 9, 6.5), 'w'],
        [E(23.5, 56.4, 4.8, 2.3), 'w', null, 0, 'footL'], [E(40.5, 56.4, 4.8, 2.3), 'w', null, 0, 'footR'],
        ['M14.6,50.5Q32,56.5 49.4,50.5', null, 'c', 3.2], [E(32, 55.6, 2.3), 'e'],
        ['M15,21C7,23 6,36 10,42C15,40 19,31 20,23Z', 'b', null, 0, 'flopL'], ['M49,21C57,23 58,36 54,42C49,40 45,31 44,23Z', 'b', null, 0, 'flopR'],
      ],
      over: [['M30,46.6h4v3.2a2,2 0 0 1 -4,0Z', 't', null, 0, 'tongue']] },
    { id: 'max', name: 'Max', kind: 'teddy', glow: '#ffc58a',
      pal: { a: '#b98d68', b: '#96704f', d: '#5f4130', e: '#dcb88f', s: '#2f3f66', w: '#ecd7bd' },
      face: { x: [25.5, 38.5], y: 22.5, r: 2.3, my: 31, mouth: 'smile', nose: 27.6, brow: false },
      body: [
        [E(17, 13.5, 6.5), 'a', null, 0, 'earL'], [E(47, 13.5, 6.5), 'a', null, 0, 'earR'],
        [E(17, 13.5, 3.2), 'w', null, 0, 'earL'], [E(47, 13.5, 3.2), 'w', null, 0, 'earR'],
        [E(21.5, 54, 7, 4.8), 'a', null, 0, 'footL'], [E(42.5, 54, 7, 4.8), 'a', null, 0, 'footR'],
        [E(20, 54.6, 3, 2.4), 'w', null, 0, 'footL'], [E(44, 54.6, 3, 2.4), 'w', null, 0, 'footR'],
        ['M16.5,40q-6,3 -5.5,10', null, 'a', 6.5, 'armL'], ['M47.5,40q6,3 5.5,10', null, 'a', 6.5, 'armR'],
        [R(17.5, 34, 29, 21, 9), 's'],
        [E(28.8, 42.4, 1.6), 'e'], [E(35.2, 42.4, 1.6), 'e'], [E(32, 45.8, 4.4, 3.9), 'e'],
        [E(32, 47, 1.5, 1.1), 'w'], ['M30.4,45h0.1M33.5,45h0.1', null, 'd', 1.1],
        [E(32, 23.5, 17.5, 15.5), 'a'],
        [E(32, 29.5, 6.6, 5.1), 'w'],
      ] },
  ];

  // every expression a buddy can make, and what the mouth does for each
  const EXPRS = ['idle', 'blink', 'happy', 'wow', 'focus', 'sleep', 'wink', 'sad', 'dizzy', 'love', 'star', 'smug', 'yawn'];
  const MOUTHS = { happy: 'open', wow: 'open', wink: 'open', love: 'open', star: 'open', sad: 'frown', focus: 'flat', smug: 'smirk', yawn: 'O', dizzy: 'o' };
  const JOY = ['happy', 'wow', 'love', 'star', 'wink'];

  // ---- face: drawn by the engine so every figurine shares the same expressions
  function faceShapes(ch, expr) {
    const f = ch.face, out = [], ink = f.ink || 'ink';
    const [x0, x1] = f.x, y = f.y, r = f.r;
    const push = (d, fill, stroke, w, extra) => out.push(Object.assign({ d, fill, stroke, w, face: true }, extra));
    if (f.cheeks) {
      const cx = f.cx || [x0 - 4.5, x1 + 4.5], cy = f.cy || y + 5.5;
      push(E(cx[0], cy, 3, 1.9), 'blush', null, 0, { o: 0.6, soft: true });
      push(E(cx[1], cy, 3, 1.9), 'blush', null, 0, { o: 0.6, soft: true });
    }
    const HOT = '#ff5d73', GOLD = '#ffd23f';
    const heart = (x, q) => `M${x},${y + q * 1.15}C${x - q * 2},${y - q * 0.2} ${x - q * 0.95},${y - q * 1.6} ${x},${y - q * 0.55}C${x + q * 0.95},${y - q * 1.6} ${x + q * 2},${y - q * 0.2} ${x},${y + q * 1.15}Z`;
    const star = (x, q) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, k = i % 2 ? q * 0.45 : q; d += `${i ? 'L' : 'M'}${(x + Math.cos(a) * k).toFixed(2)},${(y + Math.sin(a) * k).toFixed(2)}`; } return d + 'Z'; };
    const arcUp = (x) => push(`M${x - r},${y + 1}q${r},${-r * 1.5} ${2 * r},0`, null, ink, 2);
    const arcDown = (x) => push(`M${x - r},${y - 0.5}q${r},${r * 0.9} ${2 * r},0`, null, ink, 1.9);
    const dot = (x, rr) => { push(E(x, y, rr), ink); if (!f.ink && f.hl !== false) push(E(x + rr * 0.34, y - rr * 0.36, rr * 0.36), 'white', null, 0, { hl: true }); };
    for (const x of [x0, x1]) {
      if (expr === 'blink') push(`M${x - r},${y}h${2 * r}`, null, ink, 1.9);
      else if (expr === 'sleep' || expr === 'yawn') arcDown(x);
      else if (expr === 'happy' || (expr === 'wink' && x === x1)) arcUp(x);
      else if (expr === 'dizzy') push(`M${x - r},${y - r}l${2 * r},${2 * r}M${x + r},${y - r}l${-2 * r},${2 * r}`, null, ink, 1.8);
      else if (expr === 'love') push(heart(x, r * 1.15), f.ink ? ink : HOT);
      else if (expr === 'star') push(star(x, r * 1.55), f.ink ? ink : GOLD);
      else if (expr === 'smug') { push(`M${x - r},${y}a${r},${r} 0 0 0 ${2 * r},0Z`, ink); push(`M${x - r - 0.6},${y}h${2 * r + 1.2}`, null, ink, 1.6); }
      else dot(x, expr === 'wow' ? r * 1.25 : r);
    }
    if (expr === 'sad') {
      push(`M${x0 - r - 0.4},${y - r - 1.4}l${2 * r + 0.8},-2`, null, ink, 1.6);
      push(`M${x1 + r + 0.4},${y - r - 1.4}l${-(2 * r + 0.8)},-2`, null, ink, 1.6);
    } else if (f.brow !== false && (expr === 'idle' || expr === 'focus' || expr === 'wow')) {
      const k = expr === 'focus' ? 1.7 : expr === 'wow' ? -0.6 : 0.7, up = expr === 'wow' ? 4 : 2.9;
      push(`M${x0 - r - 0.6},${y - r - up}l${2 * r + 1.2},${k}`, null, ink, 1.8);
      push(`M${x1 + r + 0.6},${y - r - up}l${-(2 * r + 1.2)},${k}`, null, ink, 1.8);
    }
    if (f.nose) push(E(32, f.nose, 2.3, 1.7), f.noseInk || ink);
    const my = f.my, mm = MOUTHS[expr] || 'rest', open = mm === 'open';
    if (f.mouth === 'none') return out;
    if (mm === 'O') push(E(32, my + 1, 3, 4.1), ink);
    else if (mm === 'o') push(E(32, my + 0.6, 2, 2.4), ink);
    else if (mm === 'frown') push(`M29,${my + 2.4}q3,-3 6,0`, null, ink, 1.7);
    else if (mm === 'smirk') push(`M29,${my + 0.4}q3.8,2.6 6.2,-1.8`, null, ink, 1.7);
    else if (f.mouth === 'smile') {
      if (open) push(`M28.6,${my - 0.5}q3.4,6 6.8,0Z`, ink);
      else if (mm === 'flat') push(`M29.8,${my + 0.8}h4.4`, null, ink, 1.7);
      else push(`M29,${my}q3,3 6,0`, null, ink, 1.7);
    } else if (f.mouth === 'cat') {
      push(`M27.5,${my}q2.25,2.6 4.5,0q2.25,2.6 4.5,0`, null, ink, 1.6);
    } else if (f.mouth === 'wide') {
      push(open ? `M23,${my - 1}Q32,${my + 9} 41,${my - 1}Z` : `M22,${my - 1}Q32,${my + 6} 42,${my - 1}`, open ? ink : null, open ? null : ink, 1.8);
    } else if (f.mouth === 'o') {
      push(open ? E(32, my + 0.5, 3.2, 3.8) : E(32, my, 2.1, 2.6), ink);
    }
    return out;
  }

  function shapesFor(ch, expr) {
    const body = ch.body.map(([d, fill, stroke, w, part]) => ({ d, fill, stroke, w, part }));
    const over = (ch.over || []).map(([d, fill, stroke, w, part]) => ({ d, fill, stroke, w, part, over: true }));
    return body.concat(faceShapes(ch, expr), over);
  }

  // ---- colour helpers
  const named = { ink: INK, white: WHITE, blush: BLUSH };
  const col = (ch, k) => (k == null ? null : ch.pal[k] || named[k] || k);
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const hex = (c) => '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const mix = (h, t, a) => { const A = rgb(h), B = rgb(t); return hex(A.map((v, i) => v + (B[i] - v) * a)); };
  function neonize(h, glow) {
    let [r, g, b] = rgb(h).map((v) => v / 255);
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let l = (mx + mn) / 2, s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1)), hu = 0;
    if (s < 0.14) return glow;
    if (mx === r) hu = ((g - b) / d) % 6; else if (mx === g) hu = (b - r) / d + 2; else hu = (r - g) / d + 4;
    hu = (hu * 60 + 360) % 360; s = Math.max(s, 0.9); l = Math.min(0.74, Math.max(0.64, l));
    return `hsl(${hu.toFixed(0)} ${(s * 100).toFixed(0)}% ${(l * 100).toFixed(0)}%)`;
  }

  // ---- soft + neon: SVG
  function svg(ch, expr, look) {
    const shapes = shapesFor(ch, expr);
    let defs = '', body = '', inFace = false;
    const seen = new Set();
    for (const s of shapes) {
      if (!!s.face !== inFace) { body += s.face ? '<g class="f">' : '</g>'; inFace = !!s.face; }
      let piece = '';
      const flush = () => { body += s.part ? piece.replaceAll('<path ', `<path class="pt-${s.part}" `) : piece; };
      const fill = col(ch, s.fill), stroke = col(ch, s.stroke);
      if (look === 'neon') {
        if (s.hl || s.soft) continue;
        if (s.face) {
          const c = ch.glow;
          piece += fill
            ? `<path d="${s.d}" fill="${c}"/>`
            : `<path d="${s.d}" fill="none" stroke="${c}" stroke-width="${s.w}" stroke-linecap="round" stroke-linejoin="round"/>`;
        } else if (fill && s.over) {
          piece += `<path d="${s.d}" fill="${neonize(fill, ch.glow)}"/>`;
        } else if (fill) {
          piece += `<path d="${s.d}" fill="#17142a" fill-opacity=".92" stroke="${neonize(fill, ch.glow)}" stroke-width="1.5" stroke-linejoin="round"/>`;
        } else {
          piece += `<path d="${s.d}" fill="none" stroke="#17142a" stroke-width="${s.w + 1.6}" stroke-linecap="round"/><path d="${s.d}" fill="none" stroke="${neonize(stroke, ch.glow)}" stroke-width="1.5" stroke-linecap="round"/>`;
        }
        flush(); continue;
      }
      const op = s.o ? ` opacity="${s.o}"` : '';
      if (fill) {
        let paint = fill;
        if (!s.face) {
          const id = 'g' + fill.slice(1);
          if (!seen.has(id)) {
            seen.add(id);
            defs += `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(fill, '#ffffff', 0.22)}"/><stop offset=".55" stop-color="${fill}"/><stop offset="1" stop-color="${mix(fill, '#3a2a66', 0.2)}"/></linearGradient>`;
          }
          paint = `url(#${id})`;
        }
        piece += `<path d="${s.d}" fill="${paint}"${op}/>`;
      } else {
        piece += `<path d="${s.d}" fill="none" stroke="${stroke}" stroke-width="${s.w}" stroke-linecap="round" stroke-linejoin="round"${op}/>`;
      }
      flush();
    }
    if (inFace) body += '</g>';
    return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${defs}</defs>${body}</svg>`;
  }

  // ---- pixel: draw the same shapes on a 32x32 canvas, snap to the palette, add an outline
  const cache = new Map();
  let scratch = null;
  function pixelData(ch, expr) {
    const key = ch.id + ':' + expr;
    if (cache.has(key)) return cache.get(key);
    const N = 32;
    if (!scratch) { scratch = document.createElement('canvas'); scratch.width = scratch.height = N; }
    const ctx = scratch.getContext('2d', { willReadFrequently: true });
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, N, N); ctx.scale(N / 64, N / 64);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const pal = [];
    for (const s of ch.body.concat(ch.over || []).map(([d, fill, stroke, w, part]) => ({ d, fill, stroke, w, part }))) {
      if (s.part === 'jet' || (s.part === 'tongue' && !JOY.includes(expr))) continue;
      const p = new Path2D(s.d), c = col(ch, s.fill) || col(ch, s.stroke);
      if (!pal.includes(c)) pal.push(c);
      if (s.fill) { ctx.fillStyle = c; ctx.fill(p); }
      else { ctx.strokeStyle = c; ctx.lineWidth = Math.max(s.w, 2.2); ctx.stroke(p); }
    }
    const P = pal.map(rgb), img = ctx.getImageData(0, 0, N, N), px = img.data;
    const solid = new Uint8Array(N * N);
    for (let i = 0; i < N * N; i++) {
      const o = i * 4;
      if (px[o + 3] < 120) { px[o + 3] = 0; continue; }
      let best = 0, bd = 1e9;
      for (let k = 0; k < P.length; k++) {
        const d = (px[o] - P[k][0]) ** 2 + (px[o + 1] - P[k][1]) ** 2 + (px[o + 2] - P[k][2]) ** 2;
        if (d < bd) { bd = d; best = k; }
      }
      px[o] = P[best][0]; px[o + 1] = P[best][1]; px[o + 2] = P[best][2]; px[o + 3] = 255; solid[i] = 1;
    }
    // the face is placed by hand on the pixel grid so it stays crisp (mirrored left/right)
    const f = ch.face, ink = rgb(col(ch, f.ink || 'ink'));
    const dot = (x, y, c) => { if (x < 0 || y < 0 || x >= N || y >= N) return; const o = (y * N + x) * 4; px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]; px[o + 3] = 255; solid[y * N + x] = 1; };
    const both = (x, y, c = ink) => { dot(x, y, c); dot(N - 1 - x, y, c); };
    const L = Math.round(f.x[0] / 2) - 1, T = Math.round(f.y / 2) - 1, big = f.r >= 4, s = big ? 3 : 2;
    if (f.cheeks) {
      const cx = Math.round((f.cx ? f.cx[0] : f.x[0] - 4.5) / 2) - 1, cy = Math.round((f.cy || f.y + 5.5) / 2);
      const bl = rgb(mix(BLUSH, col(ch, 'a'), 0.3)); both(cx, cy, bl); both(cx + 1, cy, bl);
    }
    const one = (side, dx, dy, c = ink) => dot(side ? N - 1 - (L + dx) : L + dx, T + dy, c);
    const hot = f.ink ? ink : [255, 93, 115], gold = f.ink ? ink : [255, 210, 63];
    for (const side of [0, 1]) {
      const kind = expr === 'wink' ? (side ? 'happy' : 'idle') : expr;
      if (kind === 'blink' || kind === 'sleep' || kind === 'yawn') { for (let i = -1; i < s; i++) one(side, i, 1); if (kind !== 'blink') one(side, s, 1); }
      else if (kind === 'happy') { one(side, -1, 1); for (let i = 0; i < s; i++) one(side, i, 0); one(side, s, 1); }
      else if (kind === 'dizzy') { for (const [x, y] of [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]]) one(side, x + 1, y + 1); }
      else if (kind === 'love') { for (const [x, y] of [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1], [1, 2]]) one(side, x - (side ? 1 : 0), y - 1 + 1, hot); }
      else if (kind === 'star') { for (const [x, y] of [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]]) one(side, x - (side ? 1 : 0), y, gold); }
      else if (kind === 'smug') { for (let i = -1; i <= s; i++) one(side, i, 0); for (let i = 0; i < s; i++) one(side, i, 1); }
      else {
        const h = kind === 'wow' ? s + 1 : s;
        for (let y = 0; y < h; y++) for (let x = 0; x < s; x++) one(side, x, y - (h - s));
        if (!f.ink && f.hl !== false) one(side, side ? 0 : s - 1, -(h - s), [255, 255, 255]);
        if (kind === 'focus' && f.brow !== false) { one(side, -1, -2); one(side, 0, -2); one(side, 1, -1); }
        if (kind === 'sad') { one(side, -1, -1); one(side, 0, -2); one(side, 1, -2); }
      }
    }
    if (f.nose) { const c = rgb(col(ch, f.noseInk || f.ink || 'ink')), n = Math.floor(f.nose / 2); dot(15, n, c); dot(16, n, c); }
    const M = Math.round(f.my / 2), mm = MOUTHS[expr] || 'rest', open = mm === 'open';
    if (f.mouth === 'none') { /* masked or beaked: no mouth */ }
    else if (mm === 'O') { both(15, M); both(15, M + 1); }
    else if (mm === 'o') both(15, M);
    else if (mm === 'frown') { both(14, M + 1); both(15, M); }
    else if (mm === 'smirk') { dot(14, M, ink); dot(15, M + 1, ink); dot(16, M + 1, ink); dot(17, M, ink); dot(18, M - 1, ink); }
    else if (f.mouth === 'smile') {
      if (mm === 'flat') both(15, M);
      else { both(14, M); both(15, M + 1); if (open) both(15, M); }
    } else if (f.mouth === 'cat') { both(13, M); both(14, M + 1); both(15, M); }
    else if (f.mouth === 'wide') { both(11, M); for (let x = 12; x < 16; x++) both(x, M + 1); if (open) for (let x = 13; x < 16; x++) both(x, M + 2); }
    else if (f.mouth === 'o') { both(15, M); if (open) both(15, M + 1); }
    const line = rgb(mix(col(ch, 'a'), '#1d1730', 0.78));
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const i = y * N + x;
      if (solid[i]) continue;
      if ((x > 0 && solid[i - 1]) || (x < N - 1 && solid[i + 1]) || (y > 0 && solid[i - N]) || (y < N - 1 && solid[i + N])) {
        px[i * 4] = line[0]; px[i * 4 + 1] = line[1]; px[i * 4 + 2] = line[2]; px[i * 4 + 3] = 255;
      }
    }
    cache.set(key, img);
    return img;
  }

  const byId = (id) => CHARS.find((c) => c.id === id) || CHARS[0];

  function mount(el, opts) {
    const cur = { char: opts.char, look: opts.look, expr: opts.expr || 'idle' };
    function draw() {
      const ch = byId(cur.char);
      el.dataset.look = cur.look;
      el.style.setProperty('--glow', ch.glow);
      el.classList.toggle('floats', !!ch.float); el.classList.toggle('hovers', ch.move === 'hover');
      if (cur.look === 'pixel') {
        let c = el.querySelector('canvas');
        if (!c) { el.innerHTML = '<canvas width="32" height="32"></canvas>'; c = el.firstChild; el.dataset.key = ''; }
        c.getContext('2d').putImageData(pixelData(ch, cur.expr), 0, 0);
      } else {
        const html = svg(ch, cur.expr, cur.look), g = el.querySelector('g.f'), key = cur.char + cur.look;
        const m = /<g class="f">([\s\S]*?)<\/g>/.exec(html);
        if (g && m && el.dataset.key === key) g.innerHTML = m[1]; else el.innerHTML = html;
        el.dataset.key = key;
      }
      el.dataset.expr = cur.expr;
    }
    draw();
    return { set(p) { let ch = false; for (const k in p) if (cur[k] !== p[k]) { cur[k] = p[k]; ch = true; } if (ch) draw(); }, get: () => cur };
  }

  window.Buddy = { CHARS, EXPRS, LOOKS: ['pixel', 'soft', 'neon'], byId, mount, svg };
})();
