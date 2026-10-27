// Canvas fallback for browsers without WebGL. Each vertex is a deposited
// C-alpha coordinate from 4EY4.pdb; the view rotates the 3D coordinates.
type Point = { x: number; y: number; z: number };

export function renderBackbone(element: HTMLElement, pdb: string): () => void {
  const chains: Record<string, Point[]> = { A: [], B: [] };
  for (const line of pdb.split("\n")) {
    if (!line.startsWith("ATOM  ") || line.slice(12, 16).trim() !== "CA") continue;
    if (line[16] !== " " && line[16] !== "A") continue;
    const chain = line[21];
    if (!(chain in chains)) continue;
    const point = {
      x: Number(line.slice(30, 38)),
      y: Number(line.slice(38, 46)),
      z: Number(line.slice(46, 54)),
    };
    if (Object.values(point).every(Number.isFinite)) chains[chain].push(point);
  }
  const points = Object.values(chains).flat();
  if (!points.length) throw new Error("PDB has no C-alpha coordinates");
  const center = points.reduce((sum, p) => ({ x: sum.x + p.x, y: sum.y + p.y, z: sum.z + p.z }), { x: 0, y: 0, z: 0 });
  center.x /= points.length; center.y /= points.length; center.z /= points.length;
  const radius = Math.max(...points.map((p) => Math.hypot(p.x - center.x, p.y - center.y, p.z - center.z)));

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "display:block;width:100%;height:100%";
  element.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D unavailable");
  let frame = 0;
  let raf = 0;

  function draw() {
    if (!ctx) return;
    const width = element.clientWidth;
    const height = element.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const angle = frame * 0.008;
    const ca = Math.cos(angle), sa = Math.sin(angle);
    const tilt = -0.27, ct = Math.cos(tilt), st = Math.sin(tilt);
    const scale = Math.min(width, height) * 0.43 / radius;
    const project = (p: Point) => {
      const x = p.x - center.x, y = p.y - center.y, z = p.z - center.z;
      const rx = x * ca + z * sa;
      const rz = -x * sa + z * ca;
      const ry = y * ct - rz * st;
      return { x: width / 2 + rx * scale, y: height / 2 - ry * scale };
    };
    for (const [chain, color] of [["A", "#d8ff5f"], ["B", "#70cbd1"]] as const) {
      const residues = chains[chain];
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(1.5, Math.min(width, height) / 190);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let i = 1; i < residues.length; i++) {
        const prev = residues[i - 1], next = residues[i];
        if (Math.hypot(next.x - prev.x, next.y - prev.y, next.z - prev.z) > 5) continue;
        const a = project(prev), b = project(next);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    frame++;
    raf = requestAnimationFrame(draw);
  }
  draw();
  return () => cancelAnimationFrame(raf);
}
