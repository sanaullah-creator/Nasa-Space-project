import { useEffect, useRef } from 'react';

/** Full-screen animated starfield drawn on a canvas, fixed behind all content. */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let stars: { x: number; y: number; r: number; a: number; s: number; tw: number }[] = [];
    let shooting: { x: number; y: number; vx: number; vy: number; life: number } | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 4200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.8 + 0.2,
        s: Math.random() * 0.15 + 0.02,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const alpha = st.a * (0.65 + 0.35 * Math.sin(t / 900 + st.tw));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = st.r > 1 ? '#cfe6ff' : '#ffffff';
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          st.y += st.s;
          if (st.y > h) st.y = 0;
        }
      }
      if (!reduce) {
        if (!shooting && Math.random() < 0.003) {
          shooting = { x: Math.random() * w * 0.8, y: Math.random() * h * 0.4, vx: 7, vy: 3, life: 1 };
        }
        if (shooting) {
          ctx.globalAlpha = shooting.life;
          const grad = ctx.createLinearGradient(shooting.x, shooting.y, shooting.x - shooting.vx * 12, shooting.y - shooting.vy * 12);
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(shooting.x, shooting.y);
          ctx.lineTo(shooting.x - shooting.vx * 12, shooting.y - shooting.vy * 12);
          ctx.stroke();
          shooting.x += shooting.vx;
          shooting.y += shooting.vy;
          shooting.life -= 0.015;
          if (shooting.life <= 0) shooting = null;
        }
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10" aria-hidden />;
}
