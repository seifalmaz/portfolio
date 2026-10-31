
import { useEffect, useRef } from "react";

/**
 * THE LIVING DATA UNIVERSE — INTELLIGENCE IN MOTION
 *
 * Signature Visual Identity for Seif Almaz Portfolio.
 * Combines generative particle art, neural network synaptic connections,
 * occasional traveling signal packets, minimal orbital geometry, and gentle
 * gravitational cursor influence.
 *
 * Performance-First Engineering:
 * - Single HTML5 Canvas 2D context with capped DPR (1.5 on desktop, 1.0 on mobile)
 * - Single requestAnimationFrame loop with delta-time clamping
 * - Zero React state updates per frame (100% mutable ref simulation state)
 * - Spatial distance thresholding & strict max-connections-per-node (O(N) bound)
 * - Batched canvas path drawing
 * - IntersectionObserver off-screen pausing & visibilitychange tab pausing
 * - Full prefers-reduced-motion static composition support
 * - pointer-events: none layer (zero interference with DOM, links, or custom cursor)
 *
 * Refined Visual Composition:
 * - Center-biased distribution: particles favor periphery, creating a quiet zone
 *   around hero typography for readability
 * - Dynamic readability mask: particles and connections dim near central text region
 * - Three-tier depth layering with varied opacity, size, and speed
 * - Delicate orbital geometry with subtle sweep and muted satellites
 * - Organic, slow-drifting motion with high damping
 */

// Color Palette Tokens
const COLOR_CREAM = "#F2E8D5";
const COLOR_SOFT_CREAM = "#FAF6EE";
const COLOR_SAGE = "#9AA69A";
const COLOR_BURGUNDY = "#6E2638";

const PARTICLE_PALETTE = [
  { color: COLOR_CREAM, r: 242, g: 232, b: 213, weight: 0.4 },
  { color: COLOR_SAGE, r: 154, g: 166, b: 154, weight: 0.35 },
  { color: COLOR_BURGUNDY, r: 110, g: 38, b: 56, weight: 0.25 },
];

// Readability mask: central ellipse where particles & connections dim to protect text
// Values are expressed as fractions of canvas dimensions
const MASK_ELLIPSE_RX_RATIO = 0.32; // horizontal radius (covers headline width gracefully)
const MASK_ELLIPSE_RY_RATIO = 0.24; // vertical radius (covers title through intro text)
const MASK_MIN_ALPHA = 0.22; // minimum alpha multiplier inside the mask center

function LivingDataUniverse({ prefersReducedMotion = false }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animFrameId = null;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let isRunning = false;
    let lastTime = performance.now();

    // -------------------------------------------------------------------------
    // Viewport & DPR Setup
    // -------------------------------------------------------------------------
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;
    let isTablet = false;

    // Optical center Y ratio (matches hero headline & ambient lighting anchor)
    let opticalCenterYRatio = 0.38;

    // Pre-computed readability mask radii (updated on resize)
    let maskRX = 0;
    let maskRY = 0;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;

      isMobile = window.innerWidth < 768;
      isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      // Center aligns with visual typography anchor (higher on mobile due to vertical stack)
      opticalCenterYRatio = isMobile ? 0.30 : 0.38;

      // Strictly clamp DPR to prevent GPU fill-rate choke
      dpr = isMobile ? 1.0 : isTablet ? Math.min(window.devicePixelRatio || 1, 1.25) : Math.min(window.devicePixelRatio || 1, 1.5);

      width = Math.floor(w * dpr);
      height = Math.floor(h * dpr);

      canvas.width = width;
      canvas.height = height;

      // Pre-compute readability mask ellipse radii
      maskRX = width * MASK_ELLIPSE_RX_RATIO;
      maskRY = height * MASK_ELLIPSE_RY_RATIO;
    };

    updateDimensions();

    // -------------------------------------------------------------------------
    // Readability Mask: alpha multiplier based on proximity to optical center
    // -------------------------------------------------------------------------
    const getReadabilityAlpha = (x, y, cx, cy) => {
      // Normalized elliptical distance: 0 at center, 1 at edge, >1 outside
      const nx = (x - cx) / maskRX;
      const ny = (y - cy) / maskRY;
      const ellipseDist = nx * nx + ny * ny; // 1.0 = on the ellipse boundary

      if (ellipseDist >= 1.0) return 1.0; // Outside mask — full alpha
      // Smooth cubic ease from MASK_MIN_ALPHA at center to 1.0 at edge
      const t = ellipseDist; // 0..1
      const ease = t * t * (3 - 2 * t); // smoothstep
      return MASK_MIN_ALPHA + (1 - MASK_MIN_ALPHA) * ease;
    };

    // -------------------------------------------------------------------------
    // Responsive Configuration Budgets
    // -------------------------------------------------------------------------
    const getConfig = () => {
      if (isMobile) {
        return {
          particleCount: 26,
          maxConnectionDist: 75 * dpr,
          maxConnectionsPerNode: 2,
          cursorRadius: 0, // Disabled on mobile to save CPU
          cursorStrength: 0,
          maxSignals: 1,
          signalIntervalMin: 3600,
          signalIntervalMax: 6500,
          orbitInnerR: 125 * dpr,
          orbitOuterR: 205 * dpr,
        };
      }
      if (isTablet) {
        return {
          particleCount: 42,
          maxConnectionDist: 98 * dpr,
          maxConnectionsPerNode: 2,
          cursorRadius: 120 * dpr,
          cursorStrength: 0.04,
          maxSignals: 1,
          signalIntervalMin: 2800,
          signalIntervalMax: 5400,
          orbitInnerR: 155 * dpr,
          orbitOuterR: 255 * dpr,
        };
      }
      // Desktop
      return {
        particleCount: 62,
        maxConnectionDist: 125 * dpr,
        maxConnectionsPerNode: 3,
        cursorRadius: 175 * dpr,
        cursorStrength: 0.05,
        maxSignals: 2,
        signalIntervalMin: 2200,
        signalIntervalMax: 4400,
        orbitInnerR: 190 * dpr,
        orbitOuterR: 300 * dpr,
      };
    };

    let config = getConfig();

    // -------------------------------------------------------------------------
    // Simulation State with 3 Depth Tiers
    // -------------------------------------------------------------------------
    let particles = [];
    const initParticles = () => {
      config = getConfig();
      particles = [];

      const cx = width / 2;
      const cy = height * opticalCenterYRatio;

      for (let i = 0; i < config.particleCount; i++) {
        const rand = Math.random();
        let chosen = PARTICLE_PALETTE[0];
        if (rand > 0.75) chosen = PARTICLE_PALETTE[2]; // Burgundy
        else if (rand > 0.4) chosen = PARTICLE_PALETTE[1]; // Sage

        // Depth tiers:
        // Tier 0 (Background): 35% — tiny, faint, slow drift
        // Tier 1 (Midground):  40% — medium, standard
        // Tier 2 (Foreground): 25% — prominent, subtle depth anchor
        const depthTier = rand < 0.35 ? 0 : rand < 0.75 ? 1 : 2;
        const radius = (depthTier === 0 ? 1.0 : depthTier === 1 ? 1.6 : 2.4) * dpr;
        const baseAlpha = depthTier === 0 ? 0.32 : depthTier === 1 ? 0.60 : 0.85;
        const speedScale = depthTier === 0 ? 0.6 : depthTier === 1 ? 0.85 : 1.1;

        // Center-avoidance distribution: quiet zone around hero headline
        let px, py;
        let attempts = 0;
        const maxAttempts = 5;
        do {
          px = Math.random() * width;
          py = Math.random() * height;
          const nx = (px - cx) / (maskRX * 1.15);
          const ny = (py - cy) / (maskRY * 1.15);
          const inQuietZone = nx * nx + ny * ny < 1.0;
          if (!inQuietZone || Math.random() < 0.25) break;
          attempts++;
        } while (attempts < maxAttempts);

        particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * (0.20 * speedScale) * dpr,
          vy: (Math.random() - 0.5) * (0.20 * speedScale) * dpr,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: (0.004 + Math.random() * 0.005) * speedScale,
          radius,
          baseAlpha,
          alpha: baseAlpha,
          depthTier,
          colorInfo: chosen,
          connections: [],
          excitation: 0,
        });
      }
    };

    initParticles();

    // Active Signal Packets
    let activeSignals = [];
    let nextSignalTime = performance.now() + 1200;

    // Orbital State
    let orbitAngle = 0;

    // Mouse Tracking (Mutable, zero React state re-renders)
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      active: false,
    };

    const handlePointerMove = (e) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) * dpr;
      mouse.targetY = (e.clientY - rect.top) * dpr;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      mouse.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // Resize Handler
    let resizeTimer = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDimensions();
        initParticles();
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // -------------------------------------------------------------------------
    // Signal Packet Spawner
    // -------------------------------------------------------------------------
    const trySpawnSignal = (now) => {
      if (activeSignals.length >= config.maxSignals) return;
      if (now < nextSignalTime) return;

      nextSignalTime = now + config.signalIntervalMin + Math.random() * (config.signalIntervalMax - config.signalIntervalMin);

      const eligible = particles.filter((p) => p.connections.length > 0);
      if (eligible.length === 0) return;

      const source = eligible[Math.floor(Math.random() * eligible.length)];
      const target = source.connections[Math.floor(Math.random() * source.connections.length)];

      if (!target) return;

      activeSignals.push({
        source,
        target,
        progress: 0,
        speed: (0.018 + Math.random() * 0.012),
        color: Math.random() > 0.4 ? COLOR_SOFT_CREAM : COLOR_BURGUNDY,
        size: (2.2 + Math.random() * 0.6) * dpr,
      });
    };

    // -------------------------------------------------------------------------
    // Core Simulation Frame
    // -------------------------------------------------------------------------
    const render = (now) => {
      if (!isRunning) return;

      const rawDt = (now - lastTime) / 16.667;
      lastTime = now;
      const dt = Math.min(Math.max(rawDt, 0.4), 2.5);

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * opticalCenterYRatio;

      // 1. Orbital Geometry (Scientific coordinate instrument aesthetics)
      orbitAngle += (prefersReducedMotion ? 0 : 0.0014) * dt;
      const ellipseRatio = 0.54;
      const rInner = config.orbitInnerR;
      const rOuter = config.orbitOuterR;

      ctx.save();
      // Orbit Path Inner — subtle coordinate ring
      ctx.lineWidth = 1 * dpr;
      ctx.strokeStyle = "rgba(210, 199, 182, 0.07)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, rInner, rInner * ellipseRatio, 0.04, 0, Math.PI * 2);
      ctx.stroke();

      // Cardinal Coordinate Marks (Scientific instrument pips at 4 quadrants)
      const tickLen = 4 * dpr;
      ctx.strokeStyle = "rgba(210, 199, 182, 0.12)";
      ctx.lineWidth = 1 * dpr;
      // North
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - rInner * ellipseRatio - tickLen);
      ctx.lineTo(centerX, centerY - rInner * ellipseRatio + tickLen);
      ctx.stroke();
      // South
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + rInner * ellipseRatio - tickLen);
      ctx.lineTo(centerX, centerY + rInner * ellipseRatio + tickLen);
      ctx.stroke();
      // East
      ctx.beginPath();
      ctx.moveTo(centerX + rInner - tickLen, centerY);
      ctx.lineTo(centerX + rInner + tickLen, centerY);
      ctx.stroke();
      // West
      ctx.beginPath();
      ctx.moveTo(centerX - rInner - tickLen, centerY);
      ctx.lineTo(centerX - rInner + tickLen, centerY);
      ctx.stroke();

      // Orbit Path Outer — restrained burgundy ellipse
      ctx.strokeStyle = "rgba(110, 38, 56, 0.08)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, rOuter, rOuter * ellipseRatio, -0.07, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Primary Satellite (Burgundy with soft cream core)
      if (!prefersReducedMotion) {
        const sat1X = centerX + Math.cos(orbitAngle) * rInner;
        const sat1Y = centerY + Math.sin(orbitAngle) * rInner * ellipseRatio;

        // Subtle trailing sweep
        ctx.strokeStyle = "rgba(110, 38, 56, 0.18)";
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, rInner, rInner * ellipseRatio, 0.04, orbitAngle - 0.35, orbitAngle);
        ctx.stroke();

        ctx.fillStyle = COLOR_BURGUNDY;
        ctx.beginPath();
        ctx.arc(sat1X, sat1Y, 2.6 * dpr, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.beginPath();
        ctx.arc(sat1X, sat1Y, 1.1 * dpr, 0, Math.PI * 2);
        ctx.fill();

        // Outer Secondary Satellite (Muted Sage, counter-orbit)
        const orbitAngle2 = -orbitAngle * 0.65 + 1.2;
        const sat2X = centerX + Math.cos(orbitAngle2) * rOuter;
        const sat2Y = centerY + Math.sin(orbitAngle2) * rOuter * ellipseRatio;

        ctx.fillStyle = "rgba(154, 166, 154, 0.55)";
        ctx.beginPath();
        ctx.arc(sat2X, sat2Y, 1.8 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 2. Smooth Cursor Lerp
      if (mouse.active && config.cursorRadius > 0) {
        mouse.x += (mouse.targetX - mouse.x) * 0.14 * dt;
        mouse.y += (mouse.targetY - mouse.y) * 0.14 * dt;
      } else {
        mouse.x = -2000;
        mouse.y = -2000;
      }

      // 3. Update Particle Positions & Organic Drift
      const maxConnDistSq = config.maxConnectionDist * config.maxConnectionDist;
      const cursorRadiusSq = config.cursorRadius * config.cursorRadius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.connections = [];

        if (!prefersReducedMotion) {
          // Readability calmness factor: reduce drift energy near center text
          const maskVal = getReadabilityAlpha(p.x, p.y, centerX, centerY);
          const calmMultiplier = 0.5 + 0.5 * maskVal; // 0.61 at center, 1.0 at edge

          p.wanderAngle += p.wanderSpeed * dt;
          p.vx += Math.cos(p.wanderAngle) * 0.012 * calmMultiplier * dpr * dt;
          p.vy += Math.sin(p.wanderAngle) * 0.012 * calmMultiplier * dpr * dt;

          p.vx *= Math.pow(0.982, dt);
          p.vy *= Math.pow(0.982, dt);

          // Cursor Gravitational Interaction (gentle, calm near center)
          if (mouse.active && config.cursorRadius > 0) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < cursorRadiusSq && distSq > 4) {
              const dist = Math.sqrt(distSq);
              const normX = dx / dist;
              const normY = dy / dist;
              const factor = (1 - dist / config.cursorRadius) * config.cursorStrength * calmMultiplier * dt;
              p.vx += normX * factor * dpr;
              p.vy += normY * factor * dpr;
            }
          }

          p.x += p.vx * dt;
          p.y += p.vy * dt;

          const buf = 20 * dpr;
          if (p.x < -buf) p.x = width + buf;
          else if (p.x > width + buf) p.x = -buf;
          if (p.y < -buf) p.y = height + buf;
          else if (p.y > height + buf) p.y = -buf;
        }

        if (p.excitation > 0) {
          p.excitation = Math.max(0, p.excitation - 0.04 * dt);
        }
      }

      // 4. Compute Connections (Graph Synapses) & Render Connections
      ctx.lineWidth = 0.7 * dpr;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (p1.connections.length >= config.maxConnectionsPerNode) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.connections.length >= config.maxConnectionsPerNode) continue;

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnDistSq) {
            p1.connections.push(p2);
            p2.connections.push(p1);

            const dist = Math.sqrt(distSq);
            const proximity = 1 - dist / config.maxConnectionDist;
            // Depth layering: connections between deeper particles are naturally softer
            const depthWeight = (p1.baseAlpha + p2.baseAlpha) * 0.65;
            let alpha = proximity * proximity * 0.36 * depthWeight;

            // Cursor proximity boost: synapses near cursor illuminate subtly
            if (mouse.active && config.cursorRadius > 0) {
              const midX = (p1.x + p2.x) * 0.5;
              const midY = (p1.y + p2.y) * 0.5;
              const mDistSq = (mouse.x - midX) * (mouse.x - midX) + (mouse.y - midY) * (mouse.y - midY);
              if (mDistSq < cursorRadiusSq) {
                const mProximity = 1 - Math.sqrt(mDistSq) / config.cursorRadius;
                alpha += mProximity * 0.28;
              }
            }

            // Readability mask: dim connections near center to protect text
            const midX2 = (p1.x + p2.x) * 0.5;
            const midY2 = (p1.y + p2.y) * 0.5;
            const maskAlpha = getReadabilityAlpha(midX2, midY2, centerX, centerY);
            alpha *= maskAlpha;

            ctx.strokeStyle = `rgba(154, 166, 154, ${Math.min(alpha, 0.45)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            if (p1.connections.length >= config.maxConnectionsPerNode) break;
          }
        }
      }

      // 5. Signal Propagation Along Connections
      if (!prefersReducedMotion) {
        trySpawnSignal(now);

        for (let s = activeSignals.length - 1; s >= 0; s--) {
          const sig = activeSignals[s];
          sig.progress += sig.speed * dt;

          if (sig.progress >= 1) {
            sig.target.excitation = 0.9;
            activeSignals.splice(s, 1);
            continue;
          }

          const sx = sig.source.x + (sig.target.x - sig.source.x) * sig.progress;
          const sy = sig.source.y + (sig.target.y - sig.source.y) * sig.progress;

          const signalAlpha = Math.sin(sig.progress * Math.PI);
          ctx.fillStyle = sig.color === COLOR_BURGUNDY
            ? `rgba(110, 38, 56, ${signalAlpha * 0.95})`
            : `rgba(250, 246, 238, ${signalAlpha * 1.0})`;

          ctx.beginPath();
          ctx.arc(sx, sy, sig.size, 0, Math.PI * 2);
          ctx.fill();

          // Traveling comet tail
          const tailProgress = Math.max(0, sig.progress - 0.09);
          const tx = sig.source.x + (sig.target.x - sig.source.x) * tailProgress;
          const ty = sig.source.y + (sig.target.y - sig.source.y) * tailProgress;

          ctx.strokeStyle = `rgba(242, 232, 213, ${signalAlpha * 0.55})`;
          ctx.lineWidth = 1.4 * dpr;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        }
      }

      // 6. Batched Particle Rendering (Data Nodes)
      for (const info of PARTICLE_PALETTE) {
        const group = particles.filter((p) => p.colorInfo.color === info.color);
        if (group.length === 0) continue;

        for (let i = 0; i < group.length; i++) {
          const p = group[i];
          let finalAlpha = Math.min(p.baseAlpha + p.excitation, 1.0);

          // Readability mask: dim particles near center to protect text
          finalAlpha *= getReadabilityAlpha(p.x, p.y, centerX, centerY);

          ctx.fillStyle = `rgba(${info.r}, ${info.g}, ${info.b}, ${finalAlpha})`;

          ctx.beginPath();
          const r = p.radius + p.excitation * 1.6 * dpr;
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();

          if (p.excitation > 0.3) {
            ctx.fillStyle = `rgba(250, 246, 238, ${p.excitation * getReadabilityAlpha(p.x, p.y, centerX, centerY)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.2 * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (!prefersReducedMotion) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    // -------------------------------------------------------------------------
    // Lifecycle & Visibility Controls
    // -------------------------------------------------------------------------
    const startAnimation = () => {
      if (!isRunning && isVisible && isTabActive) {
        isRunning = true;
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (isRunning) {
        isRunning = false;
        if (animFrameId) cancelAnimationFrame(animFrameId);
      }
    };

    if (prefersReducedMotion) {
      render(performance.now());
    } else {
      startAnimation();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05, rootMargin: "-30px 0px" }
    );

    if (container) {
      observer.observe(container);
    }

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      if (container) observer.unobserve(container);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-90 transition-opacity duration-700"
      />
    </div>
  );
}

export default LivingDataUniverse;
