import { useRef } from 'react';

// Sets --rx/--ry (rotation) and --gx/--gy (glare position) CSS variables from the pointer position.
export function useTilt(max = 10) {
  const ref = useRef(null);
  const set = (el, rx, ry, gx, gy) => {
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
    el.style.setProperty('--gx', `${gx}%`);
    el.style.setProperty('--gy', `${gy}%`);
  };
  const handlers = {
    onMouseMove: (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      set(el, -y * max, x * max, (x + 0.5) * 100, (y + 0.5) * 100);
    },
    onMouseLeave: () => ref.current && set(ref.current, 0, 0, 50, 50),
  };
  return { ref, handlers };
}
