import { useEffect, useRef, useState } from 'react';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Counts 0 -> target over 1.4s with cubic ease-out, starting once the
// element's top crosses 90% of viewport height.
export function useCountUp(target) {
    const ref = useRef(null);
    const [value, setValue] = useState(() => (reduceMotion() ? target : 0));

    useEffect(() => {
        const el = ref.current;
        if (!el || reduceMotion()) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    observer.disconnect();
                    const t0 = performance.now();
                    let raf;
                    const step = (t) => {
                        const p = Math.min(1, (t - t0) / 1400);
                        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
                        if (p < 1) raf = requestAnimationFrame(step);
                    };
                    raf = requestAnimationFrame(step);
                    el._countUpCleanup = () => cancelAnimationFrame(raf);
                });
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0 }
        );
        observer.observe(el);
        return () => {
            observer.disconnect();
            el._countUpCleanup?.();
        };
    }, [target]);

    return { ref, value };
}
