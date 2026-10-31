import { useEffect, useRef } from "react";

/**
 * THE ANALYTICAL ARCHITECTURE — 2D HIGH-PRECISION GRAPHICS ENGINE
 *
 * Professional Data-Science & AI Engineering Pipeline:
 * Stage 01: RAW DATA — The Data Source Landscape (4 Multi-Modal Clusters Converging to Ingress Horizon)
 * Stage 02: DATA ENGINEERING — Simplified Enterprise ETL Architecture (Sources -> Extract -> Transform -> Load -> Warehouse)
 * Stage 03: ANALYSIS & BI — Analytical Intelligence Workspace (Distribution Gaussian Fit & Correlation r=+0.68)
 * Stage 04: MACHINE LEARNING — Model Intelligence & Neural Lab (ViT Attention, Rollout Saliency & Hyperplane)
 * Stage 05: ACTIONABLE INSIGHT — Abstract Intelligence in Motion (Handled by IntelligenceInMotion.jsx)
 *
 * Sizing & Fit Principles:
 * - 100% boundary safety: Proportional width/height calculations guarantee zero clipping
 * - Zero internal horizontal scrolling: All elements fit strictly within available viewport
 * - High-DPI DPR scaling (up to 2.5 on Retina/4K) for vector-grade sharpness
 * - Half-pixel stroke snapping (Math.floor(v) + 0.5) to eliminate subpixel anti-aliasing blur
 * - High-contrast brand typography: Minimum font size 9px, bold numerical callouts
 */

// Brand Palette Tokens
const COLOR_BURGUNDY = "#6E2638";
const COLOR_SAGE = "#9AA69A";
const COLOR_CREAM = "#F2E8D5";
const COLOR_SOFT_CREAM = "#FAF6EE";

function AnalyticalArchitecture2D({
  activeStage = 0,
  prefersReducedMotion = false,
  selectedSourceIdx = 0,
  onSelectSource,
  selectedEtlStep = "transform",
  onSelectEtlStep,
  analysisView = "distribution",
  onSelectAnalysisView,
  mlView = "attention",
  onSelectMlView,
  selectedAttentionHead = 0,
  onSelectAttentionHead,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Sync props to refs to avoid recreating the animation loop
  const stageRef = useRef(activeStage);
  const sourceRef = useRef(selectedSourceIdx);
  const etlStepRef = useRef(selectedEtlStep);
  const analysisViewRef = useRef(analysisView);
  const mlViewRef = useRef(mlView);
  const attentionHeadRef = useRef(selectedAttentionHead);

  // Hit-testing bounding boxes in canvas logical coordinates (stored per frame)
  const hitBoxesRef = useRef({
    sources: [],
    etlSteps: [],
    stage3Buttons: [],
    stage4Modes: [],
    stage4Heads: [],
  });

  useEffect(() => {
    stageRef.current = activeStage;
  }, [activeStage]);

  useEffect(() => {
    sourceRef.current = selectedSourceIdx;
  }, [selectedSourceIdx]);

  useEffect(() => {
    etlStepRef.current = selectedEtlStep;
  }, [selectedEtlStep]);

  useEffect(() => {
    analysisViewRef.current = analysisView;
  }, [analysisView]);

  useEffect(() => {
    mlViewRef.current = mlView;
  }, [mlView]);

  useEffect(() => {
    attentionHeadRef.current = selectedAttentionHead;
  }, [selectedAttentionHead]);

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

    // Stage cross-fade state
    let prevStage = activeStage;
    let curStage = activeStage;
    let transitionProgress = 1.0;

    // Viewport & Native High-DPI DPR Setup
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;

    const updateDimensions = () => {
      const rect = container ? container.getBoundingClientRect() : canvas.getBoundingClientRect();
      const cssW = Math.max(rect.width || canvas.offsetWidth || 680, 320);
      const cssH = Math.max(rect.height || canvas.offsetHeight || 360, 280);

      isMobile = window.innerWidth < 768;
      // High-DPI: Use full native devicePixelRatio up to 2.5
      dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2.5);

      width = Math.floor(cssW * dpr);
      height = Math.floor(cssH * dpr);

      canvas.width = width;
      canvas.height = height;

      // Lock CSS display size to prevent stretching
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    updateDimensions();

    let resizeTimer = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDimensions();
      }, 100);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // -------------------------------------------------------------------------
    // Canvas Pointer Hit Testing
    // -------------------------------------------------------------------------
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * dpr;
      const clickY = (e.clientY - rect.top) * dpr;
      const cur = stageRef.current;

      if (cur === 0 && onSelectSource) {
        const boxes = hitBoxesRef.current.sources;
        for (let i = 0; i < boxes.length; i++) {
          const b = boxes[i];
          if (clickX >= b.x && clickX <= b.x + b.w && clickY >= b.y && clickY <= b.y + b.h) {
            onSelectSource(b.idx);
            return;
          }
        }
      } else if (cur === 1 && onSelectEtlStep) {
        // Stage 02: Check ETL step nodes
        const boxes = hitBoxesRef.current.etlSteps;
        for (let i = 0; i < boxes.length; i++) {
          const b = boxes[i];
          if (clickX >= b.x && clickX <= b.x + b.w && clickY >= b.y && clickY <= b.y + b.h) {
            onSelectEtlStep(b.step);
            return;
          }
        }
      } else if (cur === 2 && onSelectAnalysisView) {
        // Stage 03: Check view buttons
        const btnBoxes = hitBoxesRef.current.stage3Buttons;
        for (let i = 0; i < btnBoxes.length; i++) {
          const b = btnBoxes[i];
          if (clickX >= b.x && clickX <= b.x + b.w && clickY >= b.y && clickY <= b.y + b.h) {
            onSelectAnalysisView(b.view);
            return;
          }
        }
      } else if (cur === 3) {
        // Stage 04: Check ML view buttons and attention head pills
        const modeBoxes = hitBoxesRef.current.stage4Modes;
        for (let i = 0; i < modeBoxes.length; i++) {
          const b = modeBoxes[i];
          if (clickX >= b.x && clickX <= b.x + b.w && clickY >= b.y && clickY <= b.y + b.h) {
            if (onSelectMlView) onSelectMlView(b.mode);
            return;
          }
        }
        const headBoxes = hitBoxesRef.current.stage4Heads;
        for (let i = 0; i < headBoxes.length; i++) {
          const b = headBoxes[i];
          if (clickX >= b.x && clickX <= b.x + b.w && clickY >= b.y && clickY <= b.y + b.h) {
            if (onSelectAttentionHead) onSelectAttentionHead(b.head);
            return;
          }
        }
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    // -------------------------------------------------------------------------
    // Canvas Vector Rendering Helpers
    // -------------------------------------------------------------------------
    const drawRoundRect = (x, y, w, h, radius) => {
      const r = Math.min(radius, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    // Helper: High-DPI Vector Typography (Scales with dpr for razor-sharp rendering)
    const setFont = (weight, sizeCss, family = "monospace") => {
      const px = Math.max(Math.round(sizeCss * dpr), 9);
      ctx.font = `${weight} ${px}px ${family}`;
    };

    // Helper: Technical Grid Background (Crisp half-pixel aligned)
    const renderTechnicalGrid = () => {
      const step = 32 * dpr;
      ctx.save();
      ctx.lineWidth = 1 * dpr;
      ctx.strokeStyle = "rgba(210, 199, 182, 0.05)";

      for (let x = 0.5 * dpr; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0.5 * dpr; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    // -------------------------------------------------------------------------
    // STAGE 01: RAW DATA — The Data Source Landscape
    // Distinct Concept: Organic topological field with 4 heterogeneous clusters
    // converging into an Ingress Confluence Horizon (NO Bronze/downstream references)
    // -------------------------------------------------------------------------
    const renderStage1 = (now, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      const activeSource = sourceRef.current;
      hitBoxesRef.current.sources = [];

      const padX = width * 0.035;
      const startY = height * 0.05;
      const totalW = width - 2 * padX;
      const totalH = height * 0.90;

      // 4 Quadrants representing the 4 raw data modalities
      const gapX = 14 * dpr;
      const gapY = 12 * dpr;
      const qW = (totalW - gapX) / 2;
      const qH = (totalH - gapY) / 2;

      const centerX = width / 2;
      const centerY = startY + totalH / 2;

      const clusters = [
        {
          idx: 0,
          title: "TABULAR / RELATIONAL LOGS",
          modality: "Structured Transaction Stream",
          volume: "31,653 UK Rail Records",
          dims: "18 Schema Columns",
          color: COLOR_CREAM,
          x: padX,
          y: startY,
          w: qW,
          h: qH,
          sample: '{"event_id": "0x7F2A", "sched": "08:15", "delay_min": 18, "refund": 0}',
        },
        {
          idx: 1,
          title: "HIGH-DIMENSIONAL VECTORS",
          modality: "Continuous Latent Vectors",
          volume: "114K Acoustic Vectors",
          dims: "12 Continuous Dimensions",
          color: COLOR_SAGE,
          x: padX + qW + gapX,
          y: startY,
          w: qW,
          h: qH,
          sample: '[0.742, 0.681, 0.812, -0.214, 0.045, 124.0, 0.551, -5.42]',
        },
        {
          idx: 2,
          title: "UNSTRUCTURED IMAGE CORPORA",
          modality: "Multi-Spectral Image Tensors",
          volume: "6,166 Annotated Tensors",
          dims: "3x224x224 Spatial Pixels",
          color: COLOR_BURGUNDY,
          x: padX,
          y: startY + qH + gapY,
          w: qW,
          h: qH,
          sample: 'Tensor(shape=[3, 224, 224], μ=[0.485, 0.456, 0.406], σ=[0.229])',
        },
        {
          idx: 3,
          title: "STREAMING TELEMETRY",
          modality: "Real-Time Coordinate Ingress",
          volume: "60 FPS • 97 Hz Low-Latency",
          dims: "21 (x, y, z) Hand Landmarks",
          color: COLOR_SOFT_CREAM,
          x: padX + qW + gapX,
          y: startY + qH + gapY,
          w: qW,
          h: qH,
          sample: '{"frame": 1042, "fps": 97.0, "landmarks_3d": [21, 3], "latency": "10.3ms"}',
        },
      ];

      // Draw the 4 organic modality clusters
      clusters.forEach((cl) => {
        const isSelected = cl.idx === activeSource;

        hitBoxesRef.current.sources.push({
          idx: cl.idx,
          x: cl.x,
          y: cl.y,
          w: cl.w,
          h: cl.h,
        });

        ctx.save();
        // Cluster Background Card
        if (isSelected) {
          ctx.fillStyle = "rgba(110, 38, 56, 0.35)";
          ctx.strokeStyle = COLOR_CREAM;
          ctx.lineWidth = 1.8 * dpr;
        } else {
          ctx.fillStyle = "rgba(41, 39, 37, 0.55)";
          ctx.strokeStyle = "rgba(210, 199, 182, 0.22)";
          ctx.lineWidth = 1 * dpr;
        }

        drawRoundRect(cl.x, cl.y, cl.w, cl.h, 8 * dpr);
        ctx.fill();
        ctx.stroke();

        // Header Pill
        setFont("bold", isMobile ? 7 : 8.5);
        ctx.fillStyle = isSelected ? COLOR_SOFT_CREAM : cl.color;
        ctx.fillText(cl.title, cl.x + 10 * dpr, cl.y + 16 * dpr);

        // Volume / Modality Grain
        setFont("600", isMobile ? 6 : 7.5);
        ctx.fillStyle = isSelected ? COLOR_CREAM : COLOR_SAGE;
        ctx.fillText(`${cl.volume} • ${cl.dims}`, cl.x + 10 * dpr, cl.y + 28 * dpr);

        if (isSelected) {
          ctx.fillStyle = COLOR_BURGUNDY;
          drawRoundRect(cl.x + cl.w - (isMobile ? 48 : 58) * dpr, cl.y + 6 * dpr, (isMobile ? 42 : 50) * dpr, 14 * dpr, 4 * dpr);
          ctx.fill();
          setFont("bold", isMobile ? 6 : 7.5);
          ctx.fillStyle = COLOR_SOFT_CREAM;
          ctx.fillText("ACTIVE", cl.x + cl.w - (isMobile ? 41 : 49) * dpr, cl.y + 16 * dpr);
        }

        // Draw Cluster-Specific Generative Visual Metaphor
        const vizX = cl.x + 10 * dpr;
        const vizY = cl.y + 36 * dpr;
        const vizW = cl.w - 20 * dpr;
        const vizH = cl.h - 44 * dpr;

        if (cl.idx === 0) {
          // Tabular: Matrix grid with flickering hex/timestamp glyphs
          const rows = 4;
          const cols = 5;
          const cellW = vizW / cols;
          const cellH = vizH / rows;
          const hexTokens = ["0x7F", "0x2A", "TS", "UUID", "PK", "18m", "NULL", "GBP", "0101", "ROW", "0x4B", "DATE", "SLA", "REF"];

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const cx = vizX + c * cellW;
              const cy = vizY + r * cellH;
              const tokenIdx = (r * cols + c) % hexTokens.length;
              const flicker = Math.sin(now * 0.003 + r * 3 + c * 2) * 0.5 + 0.5;

              ctx.strokeStyle = "rgba(210, 199, 182, 0.12)";
              ctx.strokeRect(cx, cy, cellW, cellH);

              setFont("500", isMobile ? 6 : 7);
              ctx.fillStyle = flicker > 0.6 ? (isSelected ? COLOR_CREAM : COLOR_SAGE) : "rgba(154, 166, 154, 0.35)";
              ctx.fillText(hexTokens[tokenIdx], cx + 3 * dpr, cy + cellH / 2 + 3 * dpr);
            }
          }
        } else if (cl.idx === 1) {
          // Vectors: 3D Rotating Constellation / Point Cloud with Latent Distance Lines
          const vCenterX = vizX + vizW / 2;
          const vCenterY = vizY + vizH / 2;
          const numPts = 10;
          const rotAngle = prefersReducedMotion ? 0 : now * 0.0008;
          const pts = [];

          for (let p = 0; p < numPts; p++) {
            const phi = (p * Math.PI * 2) / numPts;
            const rad = Math.min(vizW * 0.38, vizH * 0.38) * (0.6 + (p % 3) * 0.2);
            const px = vCenterX + Math.cos(phi + rotAngle) * rad;
            const py = vCenterY + Math.sin(phi * 2 + rotAngle) * (rad * 0.6);
            pts.push({ x: px, y: py });
          }

          // Connect latent neighbors
          ctx.strokeStyle = isSelected ? "rgba(242, 232, 213, 0.35)" : "rgba(154, 166, 154, 0.18)";
          ctx.lineWidth = 1 * dpr;
          for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
              const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
              if (d < vizW * 0.45) {
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.stroke();
              }
            }
          }

          pts.forEach((pt, i) => {
            ctx.fillStyle = i % 2 === 0 ? COLOR_SAGE : COLOR_CREAM;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, (i % 3 === 0 ? 3.5 : 2.2) * dpr, 0, Math.PI * 2);
            ctx.fill();
          });
        } else if (cl.idx === 2) {
          // Visual Corpora: Stacked isometric RGB tensor planes
          const tCenterX = vizX + vizW / 2;
          const tCenterY = vizY + vizH * 0.52;
          const sheetW = Math.min(vizW * 0.65, 95 * dpr);
          const sheetH = Math.min(vizH * 0.45, 45 * dpr);

          for (let s = 2; s >= 0; s--) {
            const sy = tCenterY - (1 - s) * (14 * dpr);
            const channelColor = s === 0 ? "rgba(110, 38, 56, 0.7)" : s === 1 ? "rgba(154, 166, 154, 0.5)" : "rgba(242, 232, 213, 0.4)";

            ctx.fillStyle = channelColor;
            ctx.strokeStyle = isSelected ? COLOR_CREAM : "rgba(210, 199, 182, 0.4)";
            ctx.lineWidth = 1 * dpr;

            ctx.beginPath();
            ctx.moveTo(tCenterX, sy - sheetH / 2);
            ctx.lineTo(tCenterX + sheetW / 2, sy);
            ctx.lineTo(tCenterX, sy + sheetH / 2);
            ctx.lineTo(tCenterX - sheetW / 2, sy);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            setFont("bold", isMobile ? 5.5 : 6.5);
            ctx.fillStyle = COLOR_SOFT_CREAM;
            ctx.fillText(s === 0 ? "R-CHANNEL" : s === 1 ? "G-CHANNEL" : "B-CHANNEL", tCenterX - 22 * dpr, sy + 3 * dpr);
          }
        } else if (cl.idx === 3) {
          // Streaming Telemetry: Real-time oscilloscope pulse wave & coordinate crosshairs
          const waveBaseY = vizY + vizH / 2;
          ctx.strokeStyle = isSelected ? COLOR_SOFT_CREAM : COLOR_SAGE;
          ctx.lineWidth = 1.6 * dpr;

          ctx.beginPath();
          for (let wx = 0; wx < vizW; wx += 2 * dpr) {
            const normX = wx / vizW;
            const wave = Math.sin(normX * 14 - (prefersReducedMotion ? 0 : now * 0.007)) * (vizH * 0.28) +
                         Math.sin(normX * 28 + (prefersReducedMotion ? 0 : now * 0.012)) * (vizH * 0.12);
            const wy = waveBaseY + wave;
            if (wx === 0) ctx.moveTo(vizX + wx, wy);
            else ctx.lineTo(vizX + wx, wy);
          }
          ctx.stroke();

          // Coordinate Crosshairs
          const chX = vizX + (now * 0.04) % vizW;
          ctx.strokeStyle = "rgba(110, 38, 56, 0.8)";
          ctx.lineWidth = 1 * dpr;
          ctx.beginPath();
          ctx.moveTo(chX, vizY);
          ctx.lineTo(chX, vizY + vizH);
          ctx.stroke();

          setFont("600", isMobile ? 5.5 : 6.5);
          ctx.fillStyle = COLOR_CREAM;
          ctx.fillText("3D LANDMARK (x, y, z)", vizX + 4 * dpr, vizY + vizH - 4 * dpr);
        }

        // Conduit Line from Cluster to Central Ingress Confluence Horizon
        const startConnX = cl.idx % 2 === 0 ? cl.x + cl.w : cl.x;
        const startConnY = cl.y + cl.h / 2;

        ctx.beginPath();
        ctx.moveTo(startConnX, startConnY);
        const ctrlX = startConnX + (centerX - startConnX) * 0.5;
        const ctrlY = startConnY + (centerY - startConnY) * 0.2;
        ctx.quadraticCurveTo(ctrlX, ctrlY, centerX, centerY);

        if (isSelected) {
          ctx.strokeStyle = "rgba(242, 232, 213, 0.75)";
          ctx.lineWidth = 2 * dpr;
          ctx.stroke();

          if (!prefersReducedMotion) {
            for (let p = 0; p < 3; p++) {
              const prog = (now * 0.001 + p * 0.33) % 1.0;
              const t = prog;
              const invT = 1 - t;
              const px = invT * invT * startConnX + 2 * invT * t * ctrlX + t * t * centerX;
              const py = invT * invT * startConnY + 2 * invT * t * ctrlY + t * t * centerY;

              ctx.fillStyle = COLOR_CREAM;
              ctx.beginPath();
              ctx.arc(px, py, 2.8 * dpr, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        } else {
          ctx.strokeStyle = "rgba(210, 199, 182, 0.15)";
          ctx.lineWidth = 1 * dpr;
          ctx.stroke();
        }

        ctx.restore();
      });

      // Central Ingress Confluence Horizon (Pulsing gravitational aperture)
      ctx.save();
      const pulse = prefersReducedMotion ? 0 : Math.sin(now * 0.003) * 3 * dpr;
      const coreR = 20 * dpr + pulse;

      ctx.fillStyle = "rgba(28, 26, 25, 0.95)";
      ctx.strokeStyle = "rgba(110, 38, 56, 0.85)";
      ctx.lineWidth = 1.6 * dpr;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "rgba(242, 232, 213, 0.15)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreR + 8 * dpr, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = COLOR_CREAM;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3.5 * dpr, 0, Math.PI * 2);
      ctx.fill();

      setFont("bold", isMobile ? 5.5 : 7);
      ctx.fillStyle = COLOR_SOFT_CREAM;
      ctx.textAlign = "center";
      ctx.fillText("ENTROPY", centerX, centerY - 6 * dpr);
      ctx.fillText("HORIZON", centerX, centerY + 8 * dpr);
      ctx.textAlign = "left";

      ctx.restore();
      ctx.restore();
    };

    // -------------------------------------------------------------------------
    // STAGE 02: DATA ENGINEERING — Simplified Enterprise ETL Architecture
    // New Concept: Multiple Sources -> ETL Processing (Extract -> Transform -> Load) -> Data Warehouse
    // Clear, elegant, understood in 5 seconds with ZERO visual clutter
    // -------------------------------------------------------------------------
    const renderStage2 = (now, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      hitBoxesRef.current.etlSteps = [];

      const activeStep = etlStepRef.current || "transform";
      const padX = width * 0.035;
      const totalW = width - 2 * padX;
      const startY = height * 0.05;
      const totalH = height * 0.90;

      // 3 Main Horizontal Sections: Sources (24%), ETL Pipeline (46%), Warehouse (30%)
      const gapX = totalW * 0.03;
      const col1W = Math.floor(totalW * (isMobile ? 0.28 : 0.24));
      const col2W = Math.floor(totalW * (isMobile ? 0.42 : 0.45));
      const col3W = totalW - col1W - col2W - 2 * gapX;

      const col1X = padX;
      const col2X = col1X + col1W + gapX;
      const col3X = col2X + col2W + gapX;

      // -----------------------------------------------------------------------
      // A. DATA SOURCES (Left Section)
      // -----------------------------------------------------------------------
      const isSourcesActive = activeStep === "sources";
      hitBoxesRef.current.etlSteps.push({ step: "sources", x: col1X, y: startY, w: col1W, h: totalH });

      ctx.fillStyle = isSourcesActive ? "rgba(110, 38, 56, 0.25)" : "rgba(41, 39, 37, 0.55)";
      ctx.strokeStyle = isSourcesActive ? COLOR_CREAM : "rgba(210, 199, 182, 0.25)";
      ctx.lineWidth = isSourcesActive ? 1.8 * dpr : 1 * dpr;
      drawRoundRect(col1X, startY, col1W, totalH, 8 * dpr);
      ctx.fill();
      ctx.stroke();

      // Section Header
      setFont("bold", isMobile ? 7 : 8.5);
      ctx.fillStyle = isSourcesActive ? COLOR_SOFT_CREAM : COLOR_SAGE;
      ctx.fillText("DATA SOURCES", col1X + 10 * dpr, startY + 16 * dpr);

      setFont("600", isMobile ? 5.5 : 7);
      ctx.fillStyle = "rgba(154, 166, 154, 0.8)";
      ctx.fillText("Independent Origins", col1X + 10 * dpr, startY + 28 * dpr);

      // 4 Source Item Nodes
      const sourcesList = [
        { name: "Relational DBs", sub: "SQL / OLTP Tables" },
        { name: "CSV / JSON Logs", sub: "Event Timetables" },
        { name: "REST Web APIs", sub: "Audio Feature Stream" },
        { name: "Sensor & Images", sub: "Webcam & Image Tensors" },
      ];

      const sNodeStartY = startY + 38 * dpr;
      const sNodeH = (totalH - 46 * dpr - 3 * (6 * dpr)) / 4;

      sourcesList.forEach((src, idx) => {
        const sy = sNodeStartY + idx * (sNodeH + 6 * dpr);
        ctx.fillStyle = "rgba(28, 26, 25, 0.9)";
        ctx.strokeStyle = isSourcesActive ? "rgba(110, 38, 56, 0.6)" : "rgba(210, 199, 182, 0.18)";
        ctx.lineWidth = 1 * dpr;
        drawRoundRect(col1X + 6 * dpr, sy, col1W - 12 * dpr, sNodeH, 5 * dpr);
        ctx.fill();
        ctx.stroke();

        // Status beacon
        ctx.fillStyle = idx === 0 ? COLOR_BURGUNDY : idx === 1 ? COLOR_CREAM : idx === 2 ? COLOR_SAGE : COLOR_SOFT_CREAM;
        ctx.beginPath();
        ctx.arc(col1X + 13 * dpr, sy + sNodeH / 2, 2.5 * dpr, 0, Math.PI * 2);
        ctx.fill();

        setFont("bold", isMobile ? 6 : 7.5);
        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.fillText(src.name, col1X + 20 * dpr, sy + sNodeH * 0.42);

        setFont("500", isMobile ? 5 : 6.5, "sans-serif");
        ctx.fillStyle = COLOR_SAGE;
        ctx.fillText(src.sub, col1X + 20 * dpr, sy + sNodeH * 0.78);
      });

      // -----------------------------------------------------------------------
      // B. ETL PIPELINE (Center Section: Extract -> Transform -> Load)
      // -----------------------------------------------------------------------
      ctx.fillStyle = "rgba(41, 39, 37, 0.35)";
      ctx.strokeStyle = "rgba(210, 199, 182, 0.18)";
      ctx.lineWidth = 1 * dpr;
      drawRoundRect(col2X, startY, col2W, totalH, 8 * dpr);
      ctx.fill();
      ctx.stroke();

      setFont("bold", isMobile ? 7 : 8.5);
      ctx.fillStyle = COLOR_CREAM;
      ctx.fillText("ETL PROCESSING PIPELINE", col2X + 12 * dpr, startY + 16 * dpr);

      setFont("600", isMobile ? 5.5 : 7);
      ctx.fillStyle = COLOR_SAGE;
      ctx.fillText("Ingestion • Validation • Structured Delivery", col2X + 12 * dpr, startY + 28 * dpr);

      // 3 Sequential ETL Stages
      const etlStages = [
        {
          step: "extract",
          num: "01",
          name: "EXTRACT",
          desc: "Ingestion & Staging",
          meta: "Schema-on-Read",
          color: COLOR_SAGE,
        },
        {
          step: "transform",
          num: "02",
          name: "TRANSFORM",
          desc: "Cleansing & Validation",
          meta: "100% Quality Gates",
          color: COLOR_BURGUNDY,
        },
        {
          step: "load",
          num: "03",
          name: "LOAD",
          desc: "Columnar Storage",
          meta: "Star Schema Delivery",
          color: COLOR_CREAM,
        },
      ];

      const stageStartY = startY + 38 * dpr;
      const stageH = (totalH - 46 * dpr - 2 * (10 * dpr)) / 3;

      etlStages.forEach((st, idx) => {
        const sy = stageStartY + idx * (stageH + 10 * dpr);
        const isSelectedStage = activeStep === st.step;

        hitBoxesRef.current.etlSteps.push({ step: st.step, x: col2X + 8 * dpr, y: sy, w: col2W - 16 * dpr, h: stageH });

        ctx.fillStyle = isSelectedStage ? "rgba(110, 38, 56, 0.38)" : "rgba(28, 26, 25, 0.9)";
        ctx.strokeStyle = isSelectedStage ? COLOR_CREAM : "rgba(210, 199, 182, 0.28)";
        ctx.lineWidth = isSelectedStage ? 1.8 * dpr : 1 * dpr;
        drawRoundRect(col2X + 8 * dpr, sy, col2W - 16 * dpr, stageH, 6 * dpr);
        ctx.fill();
        ctx.stroke();

        // Stage Number Badge
        ctx.fillStyle = isSelectedStage ? COLOR_BURGUNDY : "rgba(41, 39, 37, 0.8)";
        drawRoundRect(col2X + 14 * dpr, sy + 8 * dpr, 20 * dpr, 14 * dpr, 3 * dpr);
        ctx.fill();

        setFont("bold", 7);
        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.fillText(st.num, col2X + 18 * dpr, sy + 18 * dpr);

        setFont("bold", isMobile ? 7 : 8.5);
        ctx.fillStyle = isSelectedStage ? COLOR_SOFT_CREAM : COLOR_CREAM;
        ctx.fillText(st.name, col2X + 40 * dpr, sy + 18 * dpr);

        setFont("500", isMobile ? 5.5 : 7, "sans-serif");
        ctx.fillStyle = isSelectedStage ? COLOR_CREAM : COLOR_SAGE;
        ctx.fillText(st.desc, col2X + 14 * dpr, sy + stageH * 0.62);

        setFont("600", isMobile ? 5 : 6.5);
        ctx.fillStyle = isSelectedStage ? COLOR_SOFT_CREAM : "rgba(154, 166, 154, 0.8)";
        ctx.fillText(st.meta, col2X + 14 * dpr, sy + stageH * 0.88);

        // Downward Flow Arrow between ETL Steps
        if (idx < 2) {
          const arrowX = col2X + col2W / 2;
          const arrowStartY = sy + stageH;
          const arrowEndY = arrowStartY + 10 * dpr;

          ctx.strokeStyle = "rgba(210, 199, 182, 0.35)";
          ctx.lineWidth = 1.2 * dpr;
          ctx.beginPath();
          ctx.moveTo(arrowX, arrowStartY);
          ctx.lineTo(arrowX, arrowEndY);
          ctx.stroke();

          if (!prefersReducedMotion) {
            const prog = (now * 0.0015 + idx * 0.5) % 1.0;
            const py = arrowStartY + prog * 10 * dpr;
            ctx.fillStyle = COLOR_CREAM;
            ctx.beginPath();
            ctx.arc(arrowX, py, 2 * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // -----------------------------------------------------------------------
      // C. CENTRAL DATA WAREHOUSE (Right Section)
      // -----------------------------------------------------------------------
      const isWarehouseActive = activeStep === "warehouse";
      hitBoxesRef.current.etlSteps.push({ step: "warehouse", x: col3X, y: startY, w: col3W, h: totalH });

      ctx.fillStyle = isWarehouseActive ? "rgba(110, 38, 56, 0.28)" : "rgba(41, 39, 37, 0.55)";
      ctx.strokeStyle = isWarehouseActive ? COLOR_CREAM : "rgba(210, 199, 182, 0.35)";
      ctx.lineWidth = isWarehouseActive ? 1.8 * dpr : 1.2 * dpr;
      drawRoundRect(col3X, startY, col3W, totalH, 8 * dpr);
      ctx.fill();
      ctx.stroke();

      setFont("bold", isMobile ? 7 : 8.5);
      ctx.fillStyle = isWarehouseActive ? COLOR_SOFT_CREAM : COLOR_CREAM;
      ctx.fillText("DATA WAREHOUSE", col3X + 10 * dpr, startY + 16 * dpr);

      setFont("600", isMobile ? 5.5 : 7);
      ctx.fillStyle = COLOR_SAGE;
      ctx.fillText("Central Star Schema Mart", col3X + 10 * dpr, startY + 28 * dpr);

      // Central Warehouse Cylinder & Analytical Layers
      const whCenterX = col3X + col3W / 2;
      const whCylinderW = col3W - 20 * dpr;
      const whLayerH = (totalH - 52 * dpr - 2 * (6 * dpr)) / 3;
      const whStartY = startY + 38 * dpr;

      const whLayers = [
        { label: "FACT_RAILWAY", sub: "Metrics & Transaction Grain", color: "rgba(240, 185, 195, 0.95)" },
        { label: "DIMENSIONS", sub: "Date, Station & Ticket Keys", color: COLOR_CREAM },
        { label: "ANALYTICS VIEWS", sub: "Curated Power BI Models", color: COLOR_SAGE },
      ];

      whLayers.forEach((wl, idx) => {
        const ly = whStartY + idx * (whLayerH + 6 * dpr);
        ctx.fillStyle = idx === 0 ? "rgba(110, 38, 56, 0.45)" : "rgba(28, 26, 25, 0.95)";
        ctx.strokeStyle = idx === 0 ? COLOR_BURGUNDY : "rgba(210, 199, 182, 0.28)";
        ctx.lineWidth = 1 * dpr;
        drawRoundRect(whCenterX - whCylinderW / 2, ly, whCylinderW, whLayerH, 5 * dpr);
        ctx.fill();
        ctx.stroke();

        setFont("bold", isMobile ? 6 : 7.5);
        ctx.fillStyle = isWarehouseActive ? COLOR_SOFT_CREAM : wl.color;
        ctx.fillText(wl.label, whCenterX - whCylinderW / 2 + 8 * dpr, ly + whLayerH * 0.42);

        setFont("500", isMobile ? 5 : 6.5, "sans-serif");
        ctx.fillStyle = COLOR_SAGE;
        ctx.fillText(wl.sub, whCenterX - whCylinderW / 2 + 8 * dpr, ly + whLayerH * 0.78);
      });

      // Directional Flow Conduits (Sources -> Extract -> ... -> Warehouse)
      // Line from Sources to Extract
      const srcOutX = col1X + col1W;
      const srcOutY = startY + totalH * 0.35;
      const extInX = col2X + 8 * dpr;
      const extInY = stageStartY + stageH / 2;

      ctx.strokeStyle = isSourcesActive || activeStep === "extract" ? "rgba(242, 232, 213, 0.75)" : "rgba(210, 199, 182, 0.22)";
      ctx.lineWidth = 1.4 * dpr;
      ctx.beginPath();
      ctx.moveTo(srcOutX, srcOutY);
      ctx.lineTo(extInX, extInY);
      ctx.stroke();

      // Line from Load to Warehouse
      const loadOutX = col2X + col2W - 8 * dpr;
      const loadOutY = stageStartY + 2 * (stageH + 10 * dpr) + stageH / 2;
      const whInX = col3X;
      const whInY = whStartY + whLayerH / 2;

      ctx.strokeStyle = activeStep === "load" || isWarehouseActive ? "rgba(242, 232, 213, 0.75)" : "rgba(210, 199, 182, 0.22)";
      ctx.lineWidth = 1.4 * dpr;
      ctx.beginPath();
      ctx.moveTo(loadOutX, loadOutY);
      ctx.lineTo(whInX, whInY);
      ctx.stroke();

      // Animated traveling flow particles
      if (!prefersReducedMotion) {
        const prog1 = (now * 0.001) % 1.0;
        const px1 = srcOutX + (extInX - srcOutX) * prog1;
        const py1 = srcOutY + (extInY - srcOutY) * prog1;
        ctx.fillStyle = COLOR_CREAM;
        ctx.beginPath();
        ctx.arc(px1, py1, 2.5 * dpr, 0, Math.PI * 2);
        ctx.fill();

        const prog2 = (now * 0.001 + 0.5) % 1.0;
        const px2 = loadOutX + (whInX - loadOutX) * prog2;
        const py2 = loadOutY + (whInY - loadOutY) * prog2;
        ctx.fillStyle = COLOR_BURGUNDY;
        ctx.beginPath();
        ctx.arc(px2, py2, 2.8 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // -------------------------------------------------------------------------
    // STAGE 03: ANALYSIS & BI — Analytical Intelligence Workspace
    // Distinct Concept: Dual-pane statistical cockpit (Distribution Histogram vs Correlation Scatter r=+0.68)
    // plus dedicated DAX terminal & KPI measures
    // -------------------------------------------------------------------------
    const renderStage3 = (now, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      hitBoxesRef.current.stage3Buttons = [];

      const padX = width * 0.035;
      const chartW = width * (isMobile ? 0.93 : 0.64);
      const chartH = height * 0.88;
      const chartX = padX;
      const chartY = height * 0.06;
      const floorY = chartY + chartH;

      const activeView = analysisViewRef.current || "distribution";

      // Main Chart Container
      ctx.fillStyle = "rgba(41, 39, 37, 0.5)";
      ctx.strokeStyle = "rgba(210, 199, 182, 0.22)";
      ctx.lineWidth = 1 * dpr;
      drawRoundRect(chartX, chartY, chartW, chartH, 10 * dpr);
      ctx.fill();
      ctx.stroke();

      // Top Interactive View Switcher Tabs inside Chart Header
      const tab1W = isMobile ? 85 * dpr : 125 * dpr;
      const tab2W = isMobile ? 100 * dpr : 145 * dpr;
      const tabH = 20 * dpr;
      const tab1X = chartX + 12 * dpr;
      const tab2X = tab1X + tab1W + 6 * dpr;
      const tabY = chartY + 10 * dpr;

      hitBoxesRef.current.stage3Buttons.push({ view: "distribution", x: tab1X, y: tabY, w: tab1W, h: tabH });
      hitBoxesRef.current.stage3Buttons.push({ view: "correlation", x: tab2X, y: tabY, w: tab2W, h: tabH });

      // Tab 1: Distribution
      ctx.fillStyle = activeView === "distribution" ? COLOR_BURGUNDY : "rgba(28, 26, 25, 0.8)";
      ctx.strokeStyle = activeView === "distribution" ? COLOR_CREAM : "rgba(210, 199, 182, 0.3)";
      drawRoundRect(tab1X, tabY, tab1W, tabH, 4 * dpr);
      ctx.fill();
      ctx.stroke();

      setFont("bold", isMobile ? 6 : 7.5);
      ctx.fillStyle = activeView === "distribution" ? COLOR_SOFT_CREAM : COLOR_SAGE;
      ctx.fillText("DISTRIBUTION FIT", tab1X + 8 * dpr, tabY + 13 * dpr);

      // Tab 2: Correlation
      ctx.fillStyle = activeView === "correlation" ? COLOR_BURGUNDY : "rgba(28, 26, 25, 0.8)";
      ctx.strokeStyle = activeView === "correlation" ? COLOR_CREAM : "rgba(210, 199, 182, 0.3)";
      drawRoundRect(tab2X, tabY, tab2W, tabH, 4 * dpr);
      ctx.fill();
      ctx.stroke();

      setFont("bold", isMobile ? 6 : 7.5);
      ctx.fillStyle = activeView === "correlation" ? COLOR_SOFT_CREAM : COLOR_SAGE;
      ctx.fillText("CORRELATION (r=+0.68)", tab2X + 8 * dpr, tabY + 13 * dpr);

      if (activeView === "distribution") {
        // VIEW A: High-Precision Delay Variance Distribution & Gaussian Fit
        setFont("600", isMobile ? 6 : 7.5);
        ctx.fillStyle = COLOR_SAGE;
        ctx.fillText("Sample N=31,653 Rail Network Records • Gaussian Fit μ=4.2m σ=1.8m", chartX + 14 * dpr, chartY + 44 * dpr);

        const barCount = 14;
        const barMargin = 4 * dpr;
        const innerW = chartW - 40 * dpr;
        const barW = innerW / barCount - barMargin;
        const barStartX = chartX + 24 * dpr;
        const barBaseY = floorY - 24 * dpr;

        const splinePts = [];

        for (let i = 0; i < barCount; i++) {
          const norm = i / (barCount - 1);
          const bell = Math.exp(-Math.pow((norm - 0.38) * 3.4, 2));
          const breathing = Math.sin(now * 0.002 + i * 0.4) * 0.04;
          const barH = bell * (chartH * 0.50) + 8 * dpr + breathing * 16 * dpr;
          const bx = barStartX + i * (barW + barMargin);
          const by = barBaseY - barH;

          splinePts.push({ x: bx + barW / 2, y: by });

          const isBottleneck = i === 5 || i === 6;

          ctx.fillStyle = isBottleneck ? "rgba(110, 38, 56, 0.9)" : "rgba(154, 166, 154, 0.32)";
          ctx.strokeStyle = isBottleneck ? COLOR_CREAM : "rgba(210, 199, 182, 0.2)";
          ctx.lineWidth = 1 * dpr;
          drawRoundRect(bx, by, barW, barH, 2.5 * dpr);
          ctx.fill();
          ctx.stroke();

          if (i % 2 === 0) {
            setFont("600", isMobile ? 6 : 7);
            ctx.fillStyle = COLOR_SAGE;
            ctx.textAlign = "center";
            ctx.fillText(`${i * 3}m`, bx + barW / 2, barBaseY + 13 * dpr);
            ctx.textAlign = "left";
          }
        }

        // Gaussian Fit Smooth Spline
        ctx.strokeStyle = COLOR_SOFT_CREAM;
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        splinePts.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        ctx.fillStyle = "rgba(242, 232, 213, 0.08)";
        ctx.lineTo(splinePts[splinePts.length - 1].x, barBaseY);
        ctx.lineTo(splinePts[0].x, barBaseY);
        ctx.closePath();
        ctx.fill();

        // Root Cause Callout Tag on Peak
        const peakPt = splinePts[5];
        if (peakPt) {
          ctx.strokeStyle = COLOR_BURGUNDY;
          ctx.lineWidth = 1.3 * dpr;
          ctx.beginPath();
          ctx.moveTo(peakPt.x, peakPt.y);
          ctx.lineTo(peakPt.x + 20 * dpr, peakPt.y - 20 * dpr);
          ctx.lineTo(peakPt.x + 75 * dpr, peakPt.y - 20 * dpr);
          ctx.stroke();

          ctx.fillStyle = "rgba(110, 38, 56, 0.95)";
          ctx.strokeStyle = COLOR_CREAM;
          drawRoundRect(peakPt.x + 16 * dpr, peakPt.y - 36 * dpr, 115 * dpr, 23 * dpr, 4 * dpr);
          ctx.fill();
          ctx.stroke();

          setFont("bold", isMobile ? 6 : 7.5);
          ctx.fillStyle = COLOR_SOFT_CREAM;
          ctx.fillText("SIGNAL DELAYS: 5.34%", peakPt.x + 21 * dpr, peakPt.y - 24 * dpr);
          setFont("600", isMobile ? 5.5 : 6.5);
          ctx.fillStyle = COLOR_CREAM;
          ctx.fillText("1,062 Incidents Concentrated", peakPt.x + 21 * dpr, peakPt.y - 15 * dpr);
        }
      } else {
        // VIEW B: Multi-Variate Acoustic Correlation Scatter Plot (Danceability vs Valence)
        setFont("600", isMobile ? 6 : 7.5);
        ctx.fillStyle = COLOR_SAGE;
        ctx.fillText("N=54,465 Spotify Catalog Tracks • Pearson r = +0.68 • p < 0.001", chartX + 14 * dpr, chartY + 44 * dpr);

        const plotX = chartX + 32 * dpr;
        const plotY = chartY + 54 * dpr;
        const plotW = chartW - 50 * dpr;
        const plotH = chartH - 85 * dpr;

        // Plot Axes
        ctx.strokeStyle = "rgba(210, 199, 182, 0.25)";
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(plotX, plotY);
        ctx.lineTo(plotX, plotY + plotH);
        ctx.lineTo(plotX + plotW, plotY + plotH);
        ctx.stroke();

        // Axis Labels
        setFont("600", isMobile ? 6 : 7);
        ctx.fillStyle = COLOR_SAGE;
        ctx.fillText("Danceability (0.0 → 1.0)", plotX + plotW / 2 - 35 * dpr, plotY + plotH + 18 * dpr);
        ctx.save();
        ctx.translate(plotX - 10 * dpr, plotY + plotH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("Valence (0.0 → 1.0)", -30 * dpr, 0);
        ctx.restore();

        // Fitted Regression Line (y = 0.68x + 0.12)
        const regStartX = plotX;
        const regStartY = plotY + plotH - (0.12 * plotH);
        const regEndX = plotX + plotW;
        const regEndY = plotY + plotH - (0.80 * plotH);

        ctx.strokeStyle = COLOR_BURGUNDY;
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.moveTo(regStartX, regStartY);
        ctx.lineTo(regEndX, regEndY);
        ctx.stroke();

        // Confidence Ribbon
        ctx.fillStyle = "rgba(110, 38, 56, 0.15)";
        ctx.beginPath();
        ctx.moveTo(regStartX, regStartY - 8 * dpr);
        ctx.lineTo(regEndX, regEndY - 8 * dpr);
        ctx.lineTo(regEndX, regEndY + 8 * dpr);
        ctx.lineTo(regStartX, regStartY + 8 * dpr);
        ctx.closePath();
        ctx.fill();

        // 50 Seeded Scatter Points
        const numScatter = 48;
        for (let s = 0; s < numScatter; s++) {
          const normX = ((s * 37) % 100) / 100;
          const noise = Math.sin(s * 1.7) * 0.18;
          const normY = Math.min(Math.max(normX * 0.68 + 0.12 + noise, 0.05), 0.95);

          const px = plotX + normX * plotW;
          const py = plotY + plotH - normY * plotH;

          ctx.fillStyle = s % 4 === 0 ? COLOR_CREAM : "rgba(154, 166, 154, 0.65)";
          ctx.beginPath();
          ctx.arc(px, py, 2.4 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }

        // Summary Metric Pill
        ctx.fillStyle = "rgba(110, 38, 56, 0.9)";
        ctx.strokeStyle = COLOR_CREAM;
        drawRoundRect(plotX + plotW - 120 * dpr, plotY + 8 * dpr, 115 * dpr, 26 * dpr, 5 * dpr);
        ctx.fill();
        ctx.stroke();

        setFont("bold", isMobile ? 6 : 7.5);
        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.fillText("PEARSON r = +0.684", plotX + plotW - 114 * dpr, plotY + 20 * dpr);
        setFont("600", isMobile ? 5 : 6.5);
        ctx.fillStyle = COLOR_CREAM;
        ctx.fillText("R² = 0.468 • p < 0.001", plotX + plotW - 114 * dpr, plotY + 30 * dpr);
      }

      // Right Side: Executive Cockpit & DAX Measure Inspector (Desktop view)
      if (!isMobile) {
        const kpiX = chartX + chartW + 12 * dpr;
        const kpiW = width - kpiX - padX;

        // Top Terminal: DAX Measure Inspector
        const termH = chartH * 0.45;
        const termY = chartY;

        ctx.fillStyle = "rgba(28, 26, 25, 0.95)";
        ctx.strokeStyle = "rgba(110, 38, 56, 0.55)";
        ctx.lineWidth = 1 * dpr;
        drawRoundRect(kpiX, termY, kpiW, termH, 7 * dpr);
        ctx.fill();
        ctx.stroke();

        // Terminal Header
        ctx.fillStyle = "rgba(110, 38, 56, 0.4)";
        drawRoundRect(kpiX, termY, kpiW, 20 * dpr, 7 * dpr);
        ctx.fill();

        setFont("bold", 7.5);
        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.fillText("DAX MEASURE INSPECTOR", kpiX + 8 * dpr, termY + 13 * dpr);

        const daxLines = [
          "// Punctuality SLA Measure",
          "Punctuality_Rate = ",
          "  VAR Total = COUNTROWS(FACT)",
          "  VAR OnTime = CALCULATE(",
          "    COUNTROWS(FACT),",
          "    FACT[delay_min] <= 5",
          "  )",
          "  RETURN DIVIDE(OnTime, Total, 0)"
        ];

        daxLines.forEach((line, idx) => {
          const ly = termY + 34 * dpr + idx * 10.5 * dpr;
          if (ly < termY + termH - 4 * dpr) {
            setFont("500", 6.8);
            ctx.fillStyle = idx === 0 ? COLOR_SAGE : idx === 1 || idx === 7 ? COLOR_BURGUNDY : COLOR_CREAM;
            ctx.fillText(line, kpiX + 8 * dpr, ly);
          }
        });

        // Bottom Executive KPI Cards
        const kpis = [
          { label: "Punctuality Baseline", value: "90.68%", sub: "Exceeds 90% SLA Target", color: COLOR_SOFT_CREAM },
          { label: "Revenue Reconciled", value: "£741.92K", sub: "31,653 passenger trips", color: COLOR_CREAM },
          { label: "Signal Bottleneck", value: "5.34%", sub: "Routing choke points", color: COLOR_BURGUNDY },
        ];

        const kpiStartY = termY + termH + 8 * dpr;
        const kpiTotalH = chartH - termH - 8 * dpr;
        const kpiCardH = (kpiTotalH - 2 * (6 * dpr)) / 3;

        kpis.forEach((kpi, idx) => {
          const ky = kpiStartY + idx * (kpiCardH + 6 * dpr);
          ctx.fillStyle = "rgba(41, 39, 37, 0.75)";
          ctx.strokeStyle = idx === 2 ? "rgba(110, 38, 56, 0.7)" : "rgba(210, 199, 182, 0.22)";
          ctx.lineWidth = 1 * dpr;
          drawRoundRect(kpiX, ky, kpiW, kpiCardH, 6 * dpr);
          ctx.fill();
          ctx.stroke();

          setFont("600", 7);
          ctx.fillStyle = COLOR_SAGE;
          ctx.fillText(kpi.label, kpiX + 8 * dpr, ky + 11 * dpr);

          setFont("bold", 11);
          ctx.fillStyle = kpi.color;
          ctx.fillText(kpi.value, kpiX + 8 * dpr, ky + 24 * dpr);

          setFont("500", 6.5, "sans-serif");
          ctx.fillStyle = "rgba(250, 246, 238, 0.75)";
          ctx.fillText(kpi.sub, kpiX + 8 * dpr, ky + 34 * dpr);
        });
      }

      ctx.restore();
    };

    // -------------------------------------------------------------------------
    // STAGE 04: MACHINE LEARNING — Model Intelligence & Neural Lab
    // Distinct Concept: Technical neural workbench with 3 interactive modes:
    // 1. ViT Attention Architecture (8 selectable heads)
    // 2. Attention Rollout Saliency vs CNN Grad-CAM
    // 3. Decision Hyperplane & Benchmark Matrix
    // -------------------------------------------------------------------------
    const renderStage4 = (now, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      hitBoxesRef.current.stage4Modes = [];
      hitBoxesRef.current.stage4Heads = [];

      const padX = width * 0.03;
      const startY = height * 0.05;
      const totalH = height * 0.90;
      const totalW = width - 2 * padX;

      const activeMode = mlViewRef.current || "attention";
      const activeHead = attentionHeadRef.current || 0;

      const contentY = startY;
      const contentH = totalH;

      if (activeMode === "attention") {
        // MODE 1: ViT Attention Architecture (4 Columns with 8 Selectable Heads)
        const gap = 8 * dpr;
        const availW = totalW - 3 * gap;

        const col1W = Math.floor(availW * 0.20);
        const col2W = Math.floor(availW * 0.34);
        const col3W = Math.floor(availW * 0.22);
        const col4W = availW - col1W - col2W - col3W;

        const col1X = padX;
        const col2X = col1X + col1W + gap;
        const col3X = col2X + col2W + gap;
        const col4X = col3X + col3W + gap;

        // Col 1: Input Patch Tokenization
        ctx.fillStyle = "rgba(41, 39, 37, 0.55)";
        ctx.strokeStyle = "rgba(210, 199, 182, 0.25)";
        drawRoundRect(col1X, contentY, col1W, contentH, 8 * dpr);
        ctx.fill();
        ctx.stroke();

        setFont("bold", isMobile ? 6 : 8);
        ctx.fillStyle = COLOR_CREAM;
        ctx.fillText("PATCH TOKENS", col1X + 8 * dpr, contentY + 16 * dpr);

        const pGridSize = Math.min(col1W - 16 * dpr, contentH * 0.40);
        const pCell = pGridSize / 4;
        const pStartX = col1X + 8 * dpr;
        const pStartY = contentY + 28 * dpr;

        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            const cx = pStartX + c * pCell;
            const cy = pStartY + r * pCell;
            const isSample = (r + c + activeHead) % 3 === 0;

            ctx.fillStyle = isSample ? "rgba(110, 38, 56, 0.6)" : "rgba(154, 166, 154, 0.18)";
            ctx.strokeStyle = "rgba(210, 199, 182, 0.28)";
            ctx.fillRect(cx + 1 * dpr, cy + 1 * dpr, pCell - 2 * dpr, pCell - 2 * dpr);
            ctx.strokeRect(cx + 1 * dpr, cy + 1 * dpr, pCell - 2 * dpr, pCell - 2 * dpr);
          }
        }

        setFont("600", isMobile ? 5 : 6.8);
        ctx.fillStyle = COLOR_SAGE;
        ctx.fillText("16x16 Patches [196D]", pStartX, pStartY + pGridSize + 16 * dpr);
        ctx.fillText("Linear Embeddings", pStartX, pStartY + pGridSize + 28 * dpr);

        // Col 2: Transformer Multi-Head Self-Attention Network
        ctx.fillStyle = "rgba(110, 38, 56, 0.14)";
        ctx.strokeStyle = "rgba(110, 38, 56, 0.55)";
        drawRoundRect(col2X, contentY, col2W, contentH, 8 * dpr);
        ctx.fill();
        ctx.stroke();

        setFont("bold", isMobile ? 6 : 8.5);
        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.fillText(`SELF-ATTENTION • HEAD ${activeHead + 1}/8`, col2X + 8 * dpr, contentY + 16 * dpr);

        // Multi-Head Attention Ring
        const ringCenterX = col2X + col2W / 2;
        const ringCenterY = contentY + contentH * 0.52;
        const ringR = Math.min(col2W * 0.35, contentH * 0.28);
        const headCount = 8;
        const headCoords = [];

        for (let h = 0; h < headCount; h++) {
          const ang = (Math.PI * 2 * h) / headCount;
          const hx = ringCenterX + Math.cos(ang) * ringR;
          const hy = ringCenterY + Math.sin(ang) * ringR;
          headCoords.push({ x: hx, y: hy });
        }

        // Dynamic cross-token attention rays based on activeHead
        ctx.strokeStyle = "rgba(110, 38, 56, 0.45)";
        ctx.lineWidth = 1 * dpr;
        for (let i = 0; i < headCoords.length; i++) {
          if ((i + activeHead) % 2 === 0) {
            ctx.beginPath();
            ctx.moveTo(headCoords[activeHead].x, headCoords[activeHead].y);
            ctx.lineTo(headCoords[i].x, headCoords[i].y);
            ctx.stroke();
          }
        }

        headCoords.forEach((pt, i) => {
          const isSelectedHead = i === activeHead;
          ctx.fillStyle = isSelectedHead ? COLOR_CREAM : (i % 2 === 0 ? COLOR_BURGUNDY : COLOR_SAGE);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (isSelectedHead ? 4.8 : 3.2) * dpr, 0, Math.PI * 2);
          ctx.fill();
        });

        // Col 3: Attention Rollout Accumulator
        ctx.fillStyle = "rgba(41, 39, 37, 0.55)";
        ctx.strokeStyle = "rgba(210, 199, 182, 0.25)";
        drawRoundRect(col3X, contentY, col3W, contentH, 8 * dpr);
        ctx.fill();
        ctx.stroke();

        setFont("bold", isMobile ? 6 : 8);
        ctx.fillStyle = COLOR_CREAM;
        ctx.fillText("ROLLOUT MASK", col3X + 8 * dpr, contentY + 16 * dpr);

        const aCenterX = col3X + col3W / 2;
        const aCenterY = contentY + contentH * 0.48;

        for (let r = 1; r <= 3; r++) {
          ctx.strokeStyle = r === 1 ? COLOR_BURGUNDY : "rgba(210, 199, 182, 0.3)";
          ctx.lineWidth = (3.5 - r) * dpr;
          ctx.beginPath();
          ctx.ellipse(aCenterX, aCenterY, r * 16 * dpr, r * 11 * dpr, 0.1, 0, Math.PI * 2);
          ctx.stroke();
        }

        setFont("500", isMobile ? 5 : 6.8, "sans-serif");
        ctx.fillStyle = COLOR_SAGE;
        ctx.fillText("Contour Saliency", col3X + 8 * dpr, aCenterY + 36 * dpr);
        ctx.fillText("PET Plastics Focus", col3X + 8 * dpr, aCenterY + 48 * dpr);

        // Col 4: Classification Logits & Benchmarks
        ctx.fillStyle = "rgba(41, 39, 37, 0.65)";
        ctx.strokeStyle = "rgba(110, 38, 56, 0.6)";
        drawRoundRect(col4X, contentY, col4W, contentH, 8 * dpr);
        ctx.fill();
        ctx.stroke();

        setFont("bold", isMobile ? 6 : 8);
        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.fillText("CLASSIFICATION", col4X + 8 * dpr, contentY + 16 * dpr);

        const logits = [
          { label: "Plastic PET", prob: "96.4%", color: COLOR_BURGUNDY },
          { label: "Metal Can", prob: "2.1%", color: COLOR_CREAM },
          { label: "Glass Jar", prob: "1.0%", color: COLOR_SAGE },
          { label: "Paper", prob: "0.5%", color: "rgba(154, 166, 154, 0.6)" },
        ];

        const logitRowH = (contentH - 32 * dpr) / 4;
        logits.forEach((lg, idx) => {
          const ly = contentY + 30 * dpr + idx * logitRowH;
          setFont("600", isMobile ? 5.5 : 7);
          ctx.fillStyle = COLOR_SAGE;
          ctx.fillText(lg.label, col4X + 8 * dpr, ly);

          setFont("bold", isMobile ? 7.5 : 9.5);
          ctx.fillStyle = lg.color;
          ctx.fillText(lg.prob, col4X + 8 * dpr, ly + 14 * dpr);
        });
      } else if (activeMode === "rollout") {
        // MODE 2: Side-by-Side Saliency Comparison (CNN Grad-CAM vs ViT Rollout)
        const halfW = (totalW - 12 * dpr) / 2;
        const leftX = padX;
        const rightX = padX + halfW + 12 * dpr;

        // Left: CNN Grad-CAM (Diffuse, blurry)
        ctx.fillStyle = "rgba(41, 39, 37, 0.55)";
        ctx.strokeStyle = "rgba(210, 199, 182, 0.25)";
        drawRoundRect(leftX, contentY, halfW, contentH, 8 * dpr);
        ctx.fill();
        ctx.stroke();

        setFont("bold", isMobile ? 6.5 : 8.5);
        ctx.fillStyle = COLOR_SAGE;
        ctx.fillText("CONVOLUTIONAL GRAD-CAM (ResNet-50)", leftX + 12 * dpr, contentY + 18 * dpr);

        const cnnCenterX = leftX + halfW / 2;
        const cnnCenterY = contentY + contentH * 0.44;

        // Blurry diffuse activation blob
        for (let rad = 45; rad >= 10; rad -= 8) {
          ctx.fillStyle = `rgba(110, 38, 56, ${0.05 + (45 - rad) * 0.012})`;
          ctx.beginPath();
          ctx.arc(cnnCenterX, cnnCenterY, rad * dpr, 0, Math.PI * 2);
          ctx.fill();
        }

        setFont("500", isMobile ? 6 : 7.5, "sans-serif");
        ctx.fillStyle = COLOR_SAGE;
        ctx.fillText("Diffuse activation blob: bleeds outside boundaries.", leftX + 12 * dpr, contentY + contentH - 32 * dpr);
        ctx.fillText("Fails on transparent plastics & reflective metals.", leftX + 12 * dpr, contentY + contentH - 18 * dpr);
        ctx.fillText("Boundary IoU Fidelity: 0.63", leftX + 12 * dpr, contentY + contentH - 6 * dpr);

        // Right: ViT Attention Rollout (Sharp boundary contour)
        ctx.fillStyle = "rgba(110, 38, 56, 0.16)";
        ctx.strokeStyle = "rgba(110, 38, 56, 0.6)";
        drawRoundRect(rightX, contentY, halfW, contentH, 8 * dpr);
        ctx.fill();
        ctx.stroke();

        setFont("bold", isMobile ? 6.5 : 8.5);
        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.fillText("ViT-B/16 ATTENTION ROLLOUT (Ours)", rightX + 12 * dpr, contentY + 18 * dpr);

        const vitCenterX = rightX + halfW / 2;
        const vitCenterY = contentY + contentH * 0.44;

        // Sharp contour strokes
        for (let r = 1; r <= 3; r++) {
          ctx.strokeStyle = r === 1 ? COLOR_SOFT_CREAM : COLOR_BURGUNDY;
          ctx.lineWidth = (3.5 - r) * dpr;
          ctx.beginPath();
          ctx.ellipse(vitCenterX, vitCenterY, r * 18 * dpr, r * 12 * dpr, 0.2, 0, Math.PI * 2);
          ctx.stroke();
        }

        setFont("500", isMobile ? 6 : 7.5, "sans-serif");
        ctx.fillStyle = COLOR_CREAM;
        ctx.fillText("Razor-sharp boundary contour isolation.", rightX + 12 * dpr, contentY + contentH - 32 * dpr);
        ctx.fillText("Preserves specular highlights & transparent rims.", rightX + 12 * dpr, contentY + contentH - 18 * dpr);
        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.fillText("Boundary IoU Fidelity: 0.89 (Top Precision)", rightX + 12 * dpr, contentY + contentH - 6 * dpr);
      } else {
        // MODE 3: Decision Hyperplane & Benchmark Matrix
        const halfW = (totalW - 12 * dpr) / 2;
        const leftX = padX;
        const rightX = padX + halfW + 12 * dpr;

        // Left: 2D Multi-Class Decision Space
        ctx.fillStyle = "rgba(41, 39, 37, 0.55)";
        ctx.strokeStyle = "rgba(210, 199, 182, 0.25)";
        drawRoundRect(leftX, contentY, halfW, contentH, 8 * dpr);
        ctx.fill();
        ctx.stroke();

        setFont("bold", isMobile ? 6.5 : 8.5);
        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.fillText("MULTI-CLASS DECISION HYPERPLANE", leftX + 12 * dpr, contentY + 18 * dpr);

        // Hyperplane Curves
        const hCenterX = leftX + halfW / 2;
        const hCenterY = contentY + contentH * 0.48;

        ctx.strokeStyle = "rgba(242, 232, 213, 0.35)";
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.moveTo(leftX + 20 * dpr, contentY + 44 * dpr);
        ctx.bezierCurveTo(hCenterX - 10 * dpr, hCenterY, hCenterX + 10 * dpr, hCenterY, leftX + halfW - 20 * dpr, contentY + contentH - 24 * dpr);
        ctx.stroke();

        // 4 Recyclable Class Clusters
        const classClusters = [
          { name: "Plastic PET", x: hCenterX - 35 * dpr, y: hCenterY - 25 * dpr, color: COLOR_BURGUNDY },
          { name: "Metal Can", x: hCenterX + 35 * dpr, y: hCenterY - 25 * dpr, color: COLOR_CREAM },
          { name: "Glass Jar", x: hCenterX - 35 * dpr, y: hCenterY + 30 * dpr, color: COLOR_SAGE },
          { name: "Paper", x: hCenterX + 35 * dpr, y: hCenterY + 30 * dpr, color: COLOR_SOFT_CREAM },
        ];

        classClusters.forEach((c) => {
          ctx.fillStyle = c.color;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 4 * dpr, 0, Math.PI * 2);
          ctx.fill();

          setFont("bold", isMobile ? 6 : 7.5);
          ctx.fillText(c.name, c.x + 7 * dpr, c.y + 3 * dpr);
        });

        // Right: Model Benchmark Matrix
        ctx.fillStyle = "rgba(110, 38, 56, 0.16)";
        ctx.strokeStyle = "rgba(110, 38, 56, 0.6)";
        drawRoundRect(rightX, contentY, halfW, contentH, 8 * dpr);
        ctx.fill();
        ctx.stroke();

        setFont("bold", isMobile ? 6.5 : 8.5);
        ctx.fillStyle = COLOR_SOFT_CREAM;
        ctx.fillText("CLASSIFIER BENCHMARK MATRIX", rightX + 12 * dpr, contentY + 18 * dpr);

        const benchmarks = [
          { model: "ResNet-50", acc: "92.1%", latency: "14.2ms", params: "25.6M", isTop: false },
          { model: "EfficientNet-B4", acc: "94.3%", latency: "19.8ms", params: "19.3M", isTop: false },
          { model: "ViT-B/16 (Ours)", acc: "96.4%", latency: "28.4ms", params: "86.6M", isTop: true },
        ];

        const bRowH = (contentH - 45 * dpr) / 3;
        benchmarks.forEach((b, idx) => {
          const by = contentY + 30 * dpr + idx * bRowH;
          ctx.fillStyle = b.isTop ? "rgba(110, 38, 56, 0.5)" : "rgba(28, 26, 25, 0.8)";
          ctx.strokeStyle = b.isTop ? COLOR_CREAM : "rgba(210, 199, 182, 0.25)";
          drawRoundRect(rightX + 10 * dpr, by, halfW - 20 * dpr, bRowH - 6 * dpr, 5 * dpr);
          ctx.fill();
          ctx.stroke();

          setFont("bold", isMobile ? 6.5 : 8);
          ctx.fillStyle = b.isTop ? COLOR_SOFT_CREAM : COLOR_CREAM;
          ctx.fillText(b.model, rightX + 16 * dpr, by + 13 * dpr);

          setFont("bold", isMobile ? 8 : 10);
          ctx.fillStyle = b.isTop ? COLOR_CREAM : COLOR_SAGE;
          ctx.fillText(b.acc, rightX + halfW - 65 * dpr, by + 14 * dpr);

          setFont("500", isMobile ? 5.5 : 6.8, "sans-serif");
          ctx.fillStyle = COLOR_SAGE;
          ctx.fillText(`Latency: ${b.latency} • Params: ${b.params}`, rightX + 16 * dpr, by + 25 * dpr);
        });
      }

      ctx.restore();
    };

    // -------------------------------------------------------------------------
    // STAGE 05: ACTIONABLE INSIGHT — Abstract Fallback
    // -------------------------------------------------------------------------
    const renderStage5 = (now, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      const padX = width * 0.04;
      const totalW = width - 2 * padX;
      const startY = height * 0.06;
      const totalH = height * 0.88;

      ctx.fillStyle = "rgba(41, 39, 37, 0.4)";
      ctx.strokeStyle = "rgba(210, 199, 182, 0.2)";
      ctx.lineWidth = 1 * dpr;
      drawRoundRect(padX, startY, totalW, totalH, 10 * dpr);
      ctx.fill();
      ctx.stroke();

      const cx = width / 2;
      const cy = height / 2;
      const rx = Math.min(totalW * 0.42, 220 * dpr);
      const ry = Math.min(totalH * 0.38, 120 * dpr);

      ctx.strokeStyle = "rgba(210, 199, 182, 0.12)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "rgba(110, 38, 56, 0.5)";
      ctx.beginPath();
      ctx.arc(cx, cy, 20 * dpr, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = COLOR_SOFT_CREAM;
      ctx.beginPath();
      ctx.arc(cx, cy, 5 * dpr, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // -------------------------------------------------------------------------
    // Master Animation Frame Loop with Stage Cross-Fade
    // -------------------------------------------------------------------------
    const render = (now) => {
      if (!isRunning) return;

      const rawDt = (now - lastTime) / 16.667;
      lastTime = now;
      const dt = Math.min(Math.max(rawDt, 0.4), 2.5);

      ctx.clearRect(0, 0, width, height);

      if (curStage !== stageRef.current) {
        prevStage = curStage;
        curStage = stageRef.current;
        transitionProgress = 0.0;
      }

      if (transitionProgress < 1.0) {
        transitionProgress = Math.min(1.0, transitionProgress + 0.055 * dt);
      }

      renderTechnicalGrid();

      const renderStageIndex = (idx, alpha) => {
        if (alpha <= 0.01) return;
        switch (idx) {
          case 0:
            renderStage1(now, alpha);
            break;
          case 1:
            renderStage2(now, alpha);
            break;
          case 2:
            renderStage3(now, alpha);
            break;
          case 3:
            renderStage4(now, alpha);
            break;
          case 4:
            renderStage5(now, alpha);
            break;
          default:
            break;
        }
      };

      if (transitionProgress < 1.0) {
        const ease = transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
        renderStageIndex(prevStage, 1 - ease);
        renderStageIndex(curStage, ease);
      } else {
        renderStageIndex(curStage, 1.0);
      }

      // Decorative Corner Coordinate Reticles
      const bracketLen = 10 * dpr;
      const margin = 8 * dpr;
      ctx.strokeStyle = "rgba(210, 199, 182, 0.28)";
      ctx.lineWidth = 1 * dpr;

      ctx.beginPath();
      ctx.moveTo(margin, margin + bracketLen);
      ctx.lineTo(margin, margin);
      ctx.lineTo(margin + bracketLen, margin);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - margin - bracketLen, margin);
      ctx.lineTo(width - margin, margin);
      ctx.lineTo(width - margin, margin + bracketLen);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(margin, height - margin - bracketLen);
      ctx.lineTo(margin, height - margin);
      ctx.lineTo(margin + bracketLen, height - margin);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - margin - bracketLen, height - margin);
      ctx.lineTo(width - margin, height - margin);
      ctx.lineTo(width - margin, height - margin - bracketLen);
      ctx.stroke();

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
      { threshold: 0.08, rootMargin: "-30px 0px" }
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
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleCanvasClick);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [
    prefersReducedMotion,
    onSelectSource,
    onSelectEtlStep,
    onSelectAnalysisView,
    onSelectMlView,
    onSelectAttentionHead,
  ]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive Analytical Architecture Pipeline"
        className="h-full w-full cursor-pointer transition-opacity duration-300"
      />
    </div>
  );
}

export default AnalyticalArchitecture2D;
