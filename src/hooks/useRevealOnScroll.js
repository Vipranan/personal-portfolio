import { useEffect, useRef, useState } from 'react';

// Fires once when the element's top crosses 88% of viewport height, matching
// the design spec's reveal-on-scroll trigger. rootMargin shrinks the
// intersection root's bottom edge to approximate that threshold.
export function useRevealOnScroll() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        const el = ref.current;
        if (!el || visible) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [visible]);

    return { ref, visible };
}
