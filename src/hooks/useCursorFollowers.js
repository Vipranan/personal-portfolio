import { useEffect, useRef } from 'react';

// Gold dot follows the cursor instantly; gold ring follows with a 0.12 lerp
// on rAF. Skipped entirely on coarse (touch) pointers and reduced motion.
export function useCursorFollowers() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx;
        let ry = my;
        let raf;

        const onMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
        };
        window.addEventListener('mousemove', onMove);

        const loop = () => {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
            raf = requestAnimationFrame(loop);
        };
        if (!reduce) loop();

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return { dotRef, ringRef };
}
