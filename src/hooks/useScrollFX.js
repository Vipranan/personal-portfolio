import { useEffect, useRef } from 'react';

// Single rAF loop driving the scroll progress bar and the Apple-style
// lerp-smoothed hero scrub (fade/translate/scale as the user scrolls the
// first ~90vh), mirroring the design reference's combined scrub() loop.
export function useScrollFX() {
    const progressRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let curY = window.scrollY || document.documentElement.scrollTop || 0;
        let raf;

        const tick = () => {
            const realY = window.scrollY || document.documentElement.scrollTop || 0;
            curY += (realY - curY) * 0.12;
            if (Math.abs(realY - curY) < 0.1) curY = realY;

            const vh = window.innerHeight;
            const docEl = document.documentElement;
            const max = docEl.scrollHeight - docEl.clientHeight;

            if (progressRef.current) {
                const scale = max > 0 ? Math.min(1, Math.max(0, curY / max)) : 0;
                progressRef.current.style.transform = `scaleX(${scale})`;
            }
            if (heroRef.current) {
                const p = Math.min(1, Math.max(0, curY / (vh * 0.9)));
                heroRef.current.style.opacity = String(1 - p * 0.85);
                heroRef.current.style.transform = `translateY(${p * 60}px) scale(${1 - p * 0.05})`;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf);
    }, []);

    return { progressRef, heroRef };
}
