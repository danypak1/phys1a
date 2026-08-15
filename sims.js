/* Interactive trainers — the engine.
 *
 * The split that matters: THIS FILE IS PUBLIC and carries no course content. It
 * knows how to draw a projectile, a free-body diagram on an incline, a field
 * from point charges — the mechanics of a scene, nothing about what a student is
 * meant to notice. Every word a buyer pays for (the setup, the prompts, the
 * "what to watch", the challenges and their explanations, the section to
 * re-read) lives in chNN-sims.json, which ships inside the Worker for every paid
 * module and is served under the same token as the notes.
 *
 * So a leaked copy of this file gives you a physics toy with no teaching in it,
 * which is the same bargain the rest of the course makes: the machinery is
 * visible, the product is not.
 *
 * No dependencies, no build step, and no eval: a scene's `type` selects a
 * function from SCENES below. A config can parameterise a scene but can never
 * introduce code — a sims file is data, and data from the network stays data.
 */
const SIMS = (() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  /* Quotes included: these values land inside HTML attributes, and a config
     arrives over the network. Author-controlled today, but the file claims a
     config can never introduce code, and that claim has to be true rather than
     nearly true. */
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  /* Numeric attributes go through Number(): a slider bound is a number or the
     control is broken, so there is nothing to escape and nothing to inject. */
  const numAttr = (v, fallback = 0) => (Number.isFinite(Number(v)) ? Number(v) : fallback);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  /* Anything that rounds to zero at the printed precision IS zero here: cos 90°
     comes back as 6.1e-17, and "Aₓ = 3.06e-16" teaches a student that a component
     which should vanish merely gets small. Exponential form is kept for values
     that are genuinely tiny but non-zero at this precision (fields, charges). */
  const fmt = (v, dp = 2) => {
    if (Math.abs(v) < 0.5 * Math.pow(10, -dp)) return (0).toFixed(dp);
    return (Math.abs(v) >= 1e4 || Math.abs(v) < 1e-2) ? v.toExponential(2) : v.toFixed(dp);
  };

  /* ---------- canvas helpers ---------------------------------------------
     Every scene draws in "world" units and lets the view do the mapping, so a
     scene never has to know the pixel size — which is what makes the same scene
     legible on a 375px phone and on a desktop. */
  function view(ctx, { xmin, xmax, ymin, ymax, pad = 28 }) {
    const w = ctx.canvas.clientWidth, h = ctx.canvas.clientHeight;
    const sx = (w - 2 * pad) / (xmax - xmin), sy = (h - 2 * pad) / (ymax - ymin);
    const s = Math.min(sx, sy);
    // One scale for both axes keeps angles honest — a 45° vector must look like
    // 45°. The leftover space is then split evenly instead of piling up on one
    // side, which had the vector scene hugging the left edge of a phone.
    const ox = (w - (xmax - xmin) * s) / 2, oy = (h - (ymax - ymin) * s) / 2;
    return {
      w, h, s,
      X: x => ox + (x - xmin) * s,
      Y: y => h - oy - (y - ymin) * s,
    };
  }

  function css(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#888";
  }

  function line(ctx, x1, y1, x2, y2, colour, width = 2, dash) {
    ctx.save();
    ctx.strokeStyle = colour; ctx.lineWidth = width;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.restore();
  }

  function arrow(ctx, x1, y1, x2, y2, colour, width = 2.5) {
    const a = Math.atan2(y2 - y1, x2 - x1), head = Math.min(11, Math.hypot(x2 - x1, y2 - y1) * 0.35);
    line(ctx, x1, y1, x2, y2, colour, width);
    ctx.save();
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - head * Math.cos(a - 0.4), y2 - head * Math.sin(a - 0.4));
    ctx.lineTo(x2 - head * Math.cos(a + 0.4), y2 - head * Math.sin(a + 0.4));
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  function label(ctx, text, x, y, colour, align = "left", size = 12) {
    ctx.save();
    ctx.fillStyle = colour;
    ctx.font = `${size}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = align; ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function axes(ctx, v, xlab, ylab) {
    const ink = css("--ink-faint"), lineC = css("--line");
    line(ctx, v.X(0), v.h - 28, v.w - 10, v.h - 28, lineC, 1);
    line(ctx, v.X(0), v.h - 28, v.X(0), 10, lineC, 1);
    if (xlab) label(ctx, xlab, v.w - 12, v.h - 14, ink, "right", 11);
    if (ylab) label(ctx, ylab, v.X(0) + 6, 14, ink, "left", 11);
  }

  /* ---------- scenes -------------------------------------------------------
     Each takes the current parameter values and returns the readouts to print
     under the canvas. Pure functions of `p` plus a canvas: no scene keeps state,
     so re-rendering after a slider move is always correct. */
  const SCENES = {
    /* Vector components and the resultant — the ch01 trainer. */
    vectors(ctx, p) {
      const A = p.A, tA = p.thetaA * Math.PI / 180, B = p.B, tB = p.thetaB * Math.PI / 180;
      const ax = A * Math.cos(tA), ay = A * Math.sin(tA);
      const bx = B * Math.cos(tB), by = B * Math.sin(tB);
      const rx = ax + bx, ry = ay + by;
      // Fit the window to what is actually drawn rather than to a symmetric box:
      // two vectors in the upper half left the bottom half of a phone screen empty.
      const xs = [0, ax, rx, bx], ys = [0, ay, ry, by];
      const m = 0.18 * Math.max(2, Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
      const v = view(ctx, {
        xmin: Math.min(...xs) - m, xmax: Math.max(...xs) + m,
        ymin: Math.min(...ys) - m, ymax: Math.max(...ys) + m,
      });
      const span = Math.max(...xs.map(Math.abs), ...ys.map(Math.abs)) + m;
      const lineC = css("--line"), ink = css("--ink-faint");
      line(ctx, v.X(-span), v.Y(0), v.X(span), v.Y(0), lineC, 1);
      line(ctx, v.X(0), v.Y(-span), v.X(0), v.Y(span), lineC, 1);
      label(ctx, "x", v.X(span) - 8, v.Y(0) - 10, ink, "right", 11);
      label(ctx, "y", v.X(0) + 10, v.Y(span) + 10, ink, "left", 11);
      // components of A, drawn dashed so "a component is a number, not the vector"
      line(ctx, v.X(0), v.Y(0), v.X(ax), v.Y(0), css("--accent"), 1.5, [4, 4]);
      line(ctx, v.X(ax), v.Y(0), v.X(ax), v.Y(ay), css("--accent"), 1.5, [4, 4]);
      arrow(ctx, v.X(0), v.Y(0), v.X(ax), v.Y(ay), css("--accent"));
      label(ctx, "A", v.X(ax) + 8, v.Y(ay), css("--accent"), "left", 13);
      arrow(ctx, v.X(ax), v.Y(ay), v.X(rx), v.Y(ry), css("--green"));
      label(ctx, "B", v.X((ax + rx) / 2) + 8, v.Y((ay + ry) / 2), css("--green"), "left", 13);
      arrow(ctx, v.X(0), v.Y(0), v.X(rx), v.Y(ry), css("--red"), 3);
      label(ctx, "R = A + B", v.X(rx) + 8, v.Y(ry) - 12, css("--red"), "left", 13);
      const dir = (Math.atan2(ry, rx) * 180 / Math.PI + 360) % 360;
      return [
        ["Aₓ", `${fmt(ax)}`], ["Aᵧ", `${fmt(ay)}`],
        ["Rₓ", `${fmt(rx)}`], ["Rᵧ", `${fmt(ry)}`],
        ["|R|", `${fmt(Math.hypot(rx, ry))}`], ["direction", `${fmt(dir, 1)}°`],
      ];
    },

    /* Block on an incline: the free-body diagram, and the sin/cos decision that
       decides most of Chapter 5's marks — ch05. */
    incline(ctx, p) {
      const g = 9.8, m = p.m, th = p.theta * Math.PI / 180, mus = p.mu;
      const w = m * g, along = w * Math.sin(th), perp = w * Math.cos(th);
      const fmax = mus * perp, slides = along > fmax + 1e-9;
      const a = slides ? (along - fmax) / m : 0;
      const v = view(ctx, { xmin: -1.1, xmax: 1.1, ymin: -0.75, ymax: 0.75, pad: 22 });
      const ink = css("--ink-faint");
      // the slope itself
      const x0 = -1.0, y0 = -0.55, len = 1.9;
      const sx = x0 + len * Math.cos(th), sy = y0 + len * Math.sin(th);
      line(ctx, v.X(x0), v.Y(y0), v.X(sx), v.Y(sy), css("--line"), 3);
      line(ctx, v.X(x0), v.Y(y0), v.X(sx), v.Y(y0), css("--line"), 1, [4, 4]);
      label(ctx, `${p.theta}°`, v.X(x0) + 26, v.Y(y0) - 10, ink, "left", 12);
      // the block, drawn on the slope at its midpoint
      const bx = x0 + 0.95 * Math.cos(th), by = y0 + 0.95 * Math.sin(th);
      ctx.save();
      ctx.translate(v.X(bx), v.Y(by)); ctx.rotate(-th);
      ctx.fillStyle = css("--accent-soft"); ctx.strokeStyle = css("--accent"); ctx.lineWidth = 2;
      ctx.fillRect(-17, -30, 34, 26); ctx.strokeRect(-17, -30, 34, 26);
      ctx.restore();
      // forces, scaled so the longest is a fixed length on screen
      const big = Math.max(w, perp, fmax, 1e-6), sc = 70 / big;
      const cx = v.X(bx), cy = v.Y(by) - 16;
      arrow(ctx, cx, cy, cx, cy + w * sc, css("--red"));
      label(ctx, "w = mg", cx + 6, cy + w * sc + 10, css("--red"), "left", 11);
      // The normal is perpendicular to the SLOPE, not to the ground, so it leans
      // off vertical by θ towards the UPHILL side: world (−sin θ, cos θ), which
      // is (−sin θ, −cos θ) in pixels because Y runs downwards. Leaning it the
      // other way draws the one picture this trainer exists to correct.
      const nx = cx - perp * sc * Math.sin(th), ny = cy - perp * sc * Math.cos(th);
      arrow(ctx, cx, cy, nx, ny, css("--green"));
      label(ctx, "n", nx - 6, ny - 4, css("--green"), "right", 11);
      // Friction opposes the block's tendency to slide, and here that tendency is
      // down the slope in both cases — static and holding, or kinetic and merely
      // slowing the slide. So the arrow points UP the slope either way:
      // world (cos θ, sin θ) → pixels (cos θ, −sin θ).
      const fmag = slides ? fmax : along;
      const fx = cx + fmag * sc * Math.cos(th), fy = cy - fmag * sc * Math.sin(th);
      arrow(ctx, cx, cy, fx, fy, css("--accent"));
      label(ctx, slides ? "fₖ (sliding)" : "fₛ (holding)", fx + 6, fy - 10, css("--accent"), "left", 11);
      return [
        ["w = mg", `${fmt(w, 1)} N`],
        ["along slope", `${fmt(along, 1)} N`],
        ["perpendicular", `${fmt(perp, 1)} N`],
        ["max static f", `${fmt(fmax, 1)} N`],
        ["verdict", slides ? "slides" : "stays put"],
        ["acceleration", `${fmt(a, 2)} m/s²`],
      ];
    },

    /* Work as the area under a force-displacement graph — ch06. A constant force
       for part of the trip, then a spring: the two shapes the exam uses. */
    workArea(ctx, p) {
      const F = p.F, d = p.d, k = p.k, x = p.x;
      const wConst = F * d, wSpring = -0.5 * k * x * x;
      const xmax = d + x + 0.5, ymax = Math.max(F, k * x, 1) * 1.25;
      const v = view(ctx, { xmin: 0, xmax, ymin: -ymax * 0.15, ymax });
      axes(ctx, v, "x (m)", "F (N)");
      // constant-force block
      ctx.save();
      ctx.fillStyle = css("--accent-soft"); ctx.strokeStyle = css("--accent"); ctx.lineWidth = 2;
      ctx.fillRect(v.X(0), v.Y(F), v.X(d) - v.X(0), v.Y(0) - v.Y(F));
      ctx.strokeRect(v.X(0), v.Y(F), v.X(d) - v.X(0), v.Y(0) - v.Y(F));
      ctx.restore();
      label(ctx, `${fmt(wConst, 0)} J`, (v.X(0) + v.X(d)) / 2, v.Y(F / 2), css("--accent"), "center", 12);
      // spring triangle, below the axis because the force opposes the motion
      if (x > 0) {
        ctx.save();
        ctx.fillStyle = css("--red-soft"); ctx.strokeStyle = css("--red"); ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(v.X(d), v.Y(0)); ctx.lineTo(v.X(d + x), v.Y(0));
        ctx.lineTo(v.X(d + x), v.Y(-k * x * 0.999 * 0.15)); ctx.closePath();
        ctx.fill(); ctx.stroke(); ctx.restore();
        line(ctx, v.X(d), v.Y(0), v.X(d + x), v.Y(-ymax * 0.15 * Math.min(1, k * x / (ymax))),
             css("--red"), 2);
        label(ctx, `${fmt(wSpring, 0)} J`, v.X(d + x / 2), v.Y(0) + 16, css("--red"), "center", 12);
      }
      return [
        ["W by the push", `${fmt(wConst, 1)} J`],
        ["W by the spring", `${fmt(wSpring, 1)} J`],
        ["net work", `${fmt(wConst + wSpring, 1)} J`],
        ["spring force at x", `${fmt(k * x, 1)} N`],
      ];
    },

    /* Two point charges: the field on the axis between and beyond them — ch11. */
    charges(ctx, p) {
      const k = 8.99e9, q1 = p.q1 * 1e-9, q2 = p.q2 * 1e-9, d = p.d, xp = p.x;
      const r1 = Math.abs(xp), r2 = Math.abs(d - xp);
      const e1 = r1 > 0.02 ? k * q1 / (r1 * r1) * Math.sign(xp || 1) : NaN;
      const e2 = r2 > 0.02 ? -k * q2 / (r2 * r2) * Math.sign(d - xp || 1) : NaN;
      const net = e1 + e2;
      const v = view(ctx, { xmin: -0.6, xmax: d + 0.6, ymin: -0.5, ymax: 0.5, pad: 24 });
      line(ctx, v.X(-0.6), v.Y(0), v.X(d + 0.6), v.Y(0), css("--line"), 1);
      const draw = (x, q, name) => {
        ctx.save();
        ctx.fillStyle = q >= 0 ? css("--red") : css("--accent");
        ctx.beginPath(); ctx.arc(v.X(x), v.Y(0), 11, 0, 7); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = "bold 13px system-ui"; ctx.textAlign = "center";
        ctx.textBaseline = "middle"; ctx.fillText(q >= 0 ? "+" : "−", v.X(x), v.Y(0));
        ctx.restore();
        label(ctx, name, v.X(x), v.Y(0) - 22, css("--ink-faint"), "center", 11);
      };
      draw(0, q1, `${p.q1} nC`); draw(d, q2, `${p.q2} nC`);
      // the test point and the net field there
      line(ctx, v.X(xp), v.Y(0.28), v.X(xp), v.Y(-0.28), css("--ink-faint"), 1, [3, 3]);
      if (isFinite(net)) {
        const L = Math.min(90, Math.max(12, Math.log10(Math.abs(net) + 1) * 26));
        arrow(ctx, v.X(xp), v.Y(0.14), v.X(xp) + Math.sign(net) * L, v.Y(0.14), css("--green"), 3);
      }
      return [
        ["distance to q₁", `${fmt(r1)} m`],
        ["distance to q₂", `${fmt(r2)} m`],
        ["E from q₁", isFinite(e1) ? `${fmt(e1, 0)} N/C` : "—"],
        ["E from q₂", isFinite(e2) ? `${fmt(e2, 0)} N/C` : "—"],
        ["net E", isFinite(net) ? `${fmt(net, 0)} N/C` : "—"],
        // A zero field has no direction, and printing one where the two
        // contributions cancel is exactly the misconception this trainer exists
        // to kill.
        ["points", !isFinite(net) ? "—"
          : Math.abs(net) < 0.5 ? "nowhere — it cancels"
          : net > 0 ? "towards +x" : "towards −x"],
      ];
    },

    /* Charging and discharging a capacitor through a resistor — ch16. */
    rc(ctx, p) {
      const R = p.R, C = p.C * 1e-6, emf = p.emf, tau = R * C;
      const tmax = Math.max(5 * tau, 1e-3);
      const v = view(ctx, { xmin: 0, xmax: tmax, ymin: 0, ymax: emf * 1.15 });
      axes(ctx, v, "t (s)", "V (V)");
      const curve = (f, colour) => {
        ctx.save(); ctx.strokeStyle = colour; ctx.lineWidth = 2.5; ctx.beginPath();
        for (let i = 0; i <= 140; i++) {
          const t = tmax * i / 140;
          i ? ctx.lineTo(v.X(t), v.Y(f(t))) : ctx.moveTo(v.X(t), v.Y(f(t)));
        }
        ctx.stroke(); ctx.restore();
      };
      curve(t => emf * (1 - Math.exp(-t / tau)), css("--accent"));
      curve(t => emf * Math.exp(-t / tau), css("--red"));
      line(ctx, v.X(tau), v.Y(0), v.X(tau), v.Y(emf * 1.1), css("--ink-faint"), 1, [4, 4]);
      label(ctx, "τ", v.X(tau) + 5, v.Y(emf * 1.05), css("--ink-faint"), "left", 12);
      label(ctx, "charging", v.X(tmax * 0.55), v.Y(emf * 0.93), css("--accent"), "left", 11);
      label(ctx, "discharging", v.X(tmax * 0.35), v.Y(emf * 0.18), css("--red"), "left", 11);
      return [
        ["time constant τ", `${fmt(tau, 3)} s`],
        ["V after one τ", `${fmt(emf * (1 - Math.exp(-1)), 2)} V`],
        ["V after 5τ", `${fmt(emf * (1 - Math.exp(-5)), 2)} V`],
        ["initial current", `${fmt(emf / R * 1000, 2)} mA`],
        ["final charge", `${fmt(C * emf * 1e6, 1)} μC`],
      ];
    },

    /* Projectile launched from a height — ch03. */
    projectile(ctx, p) {
      const g = 9.8, v0 = p.v0, th = p.angle * Math.PI / 180, h0 = p.h0;
      const vx = v0 * Math.cos(th), vy0 = v0 * Math.sin(th);
      const tHit = (vy0 + Math.sqrt(vy0 * vy0 + 2 * g * h0)) / g;
      const range = vx * tHit;
      const hMax = h0 + vy0 * vy0 / (2 * g);
      const vImpact = Math.hypot(vx, vy0 - g * tHit);
      const xmax = Math.max(range * 1.1, 5), ymax = Math.max(hMax * 1.25, 5);
      const v = view(ctx, { xmin: 0, xmax, ymin: 0, ymax });
      axes(ctx, v, "x (m)", "y (m)");
      // the ground, then the path
      line(ctx, v.X(0), v.Y(0), v.X(xmax), v.Y(0), css("--line"), 2);
      ctx.save();
      ctx.strokeStyle = css("--accent"); ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const t = tHit * i / 120, x = vx * t, y = h0 + vy0 * t - 0.5 * g * t * t;
        i ? ctx.lineTo(v.X(x), v.Y(y)) : ctx.moveTo(v.X(x), v.Y(y));
      }
      ctx.stroke(); ctx.restore();
      // apex marker and the launch velocity split into its components
      const tApex = vy0 / g, xApex = vx * tApex;
      if (tApex > 0 && tApex < tHit) {
        line(ctx, v.X(xApex), v.Y(0), v.X(xApex), v.Y(hMax), css("--ink-faint"), 1, [3, 3]);
        label(ctx, `h = ${fmt(hMax, 1)} m`, v.X(xApex) + 6, v.Y(hMax) - 10, css("--ink-faint"), "left", 11);
      }
      const sc = Math.min(60, v.s * v0 * 0.35) / Math.max(v0, 1e-6);
      arrow(ctx, v.X(0), v.Y(h0), v.X(0) + vx * sc, v.Y(h0), css("--green"), 2);
      arrow(ctx, v.X(0), v.Y(h0), v.X(0), v.Y(h0) - vy0 * sc, css("--red"), 2);
      label(ctx, "vₓ constant", v.X(0) + vx * sc + 6, v.Y(h0) + 2, css("--green"), "left", 11);
      return [
        ["vₓ", `${fmt(vx)} m/s`], ["v₀ᵧ", `${fmt(vy0)} m/s`],
        ["time of flight", `${fmt(tHit)} s`], ["range", `${fmt(range)} m`],
        ["max height", `${fmt(hMax)} m`], ["impact speed", `${fmt(vImpact)} m/s`],
      ];
    },
  };

  /* ---------- rendering ---------------------------------------------------- */
  function paint(canvas, sim, values) {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const scene = SCENES[sim.type];
    if (!scene) { label(ctx, `unknown scene "${sim.type}"`, 12, 20, css("--red")); return []; }
    return scene(ctx, values) || [];
  }

  function controls(sim, values, onChange) {
    return sim.params.map(prm => `
      <label class="sim-ctl">
        <span class="sim-ctl-label">${esc(prm.label)}</span>
        <output id="out-${esc(sim.id)}-${esc(prm.key)}">${values[prm.key]}${esc(prm.unit || "")}</output>
        <input type="range" id="sim-${esc(sim.id)}-${esc(prm.key)}"
               min="${numAttr(prm.min)}" max="${numAttr(prm.max, 1)}"
               step="${numAttr(prm.step ?? 1, 1)}"
               value="${numAttr(values[prm.key])}" aria-label="${esc(prm.label)}">
      </label>`).join("");
  }

  /* A challenge is the only part of a trainer that can be got wrong, which is
     why it is also the part that is paid for: "set the angle that maximises the
     range" is a question; a slider is not. */
  function challengeState(sim, values) {
    return (sim.challenges || []).map(c => {
      const v = values[c.check.param];
      return Math.abs(v - c.check.target) <= (c.check.tol ?? 1);
    });
  }

  function render(host, sim) {
    const values = {};
    for (const prm of sim.params) values[prm.key] = prm.value ?? prm.min;

    host.innerHTML = `
      <section class="sim-card" id="sim-card-${esc(sim.id)}">
        <h3 class="sim-title">${esc(sim.title)}</h3>
        ${sim.intro ? `<p class="sim-intro">${esc(sim.intro)}</p>` : ""}
        <div class="sim-stage"><canvas class="sim-canvas" aria-label="${esc(sim.title)} diagram"></canvas></div>
        <div class="sim-controls">${controls(sim, values, null)}</div>
        <dl class="sim-readouts"></dl>
        ${(sim.watch || []).length ? `<ul class="sim-watch">${sim.watch.map(w => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}
        ${(sim.challenges || []).length ? `<div class="sim-challenges">${
          sim.challenges.map((c, i) => `<div class="sim-challenge" data-i="${i}">
            <span class="sim-chal-mark" aria-hidden="true">○</span>
            <div><p class="sim-chal-prompt">${esc(c.prompt)}</p>
            <p class="sim-chal-explain" hidden>${esc(c.explain || "")}</p></div>
          </div>`).join("")}</div>` : ""}
        ${sim.review ? `<p class="sim-review">Re-read <a href="#/${esc(sim.module)}/learn" data-review="${esc(sim.review)}">§${esc(sim.review)}</a></p>` : ""}
      </section>`;

    const canvas = $(".sim-canvas", host);
    const dl = $(".sim-readouts", host);

    function refresh() {
      const readouts = paint(canvas, sim, values);
      dl.innerHTML = readouts.map(([k, v]) =>
        `<div class="sim-ro"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
      const done = challengeState(sim, values);
      host.querySelectorAll(".sim-challenge").forEach((el, i) => {
        el.classList.toggle("done", !!done[i]);
        const mark = $(".sim-chal-mark", el), exp = $(".sim-chal-explain", el);
        if (mark) mark.textContent = done[i] ? "✓" : "○";
        if (exp) exp.hidden = !done[i];
      });
    }

    for (const prm of sim.params) {
      const input = $(`#sim-${CSS.escape(sim.id)}-${CSS.escape(prm.key)}`, host);
      const out = $(`#out-${CSS.escape(sim.id)}-${CSS.escape(prm.key)}`, host);
      input.addEventListener("input", () => {
        values[prm.key] = clamp(parseFloat(input.value), prm.min, prm.max);
        if (out) out.textContent = `${values[prm.key]}${prm.unit || ""}`;
        refresh();
      });
    }

    // A canvas sized by CSS has no intrinsic pixels until layout has happened,
    // and it has to be repainted whenever the box changes — rotating a phone is
    // the ordinary case, and the first paint of a hidden tab is the sneaky one.
    const ro = new ResizeObserver(() => refresh());
    ro.observe(canvas);
    refresh();
    return () => ro.disconnect();
  }

  /* `scenes` is exported so the numbers a scene reports can be tested without a
     browser — tools/sims-scenes.test.mjs runs every one of them against a stub
     canvas. A trainer that prints a wrong readout teaches a wrong fact with more
     authority than prose does, and no gate reads these numbers. */
  return { render, types: () => Object.keys(SCENES), scenes: SCENES };
})();
