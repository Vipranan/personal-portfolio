import { useEffect, useRef } from 'react';

// Measures the title's parent width and scales font-size so the text fills
// it exactly, since Bodoni Moda has no fluid-width CSS equivalent for this.
export function useFitTitle() {
    const ref = useRef(null);

    useEffect(() => {
        const title = ref.current;
        if (!title) return;

        const fit = () => {
            const parent = title.parentElement;
            if (!parent) return;
            const avail = parent.clientWidth;
            title.style.fontSize = '100px';
            const w = title.scrollWidth;
            if (w > 0) title.style.fontSize = `${Math.floor(100 * (avail / w) * 0.995)}px`;
        };

        fit();
        const t1 = setTimeout(fit, 300);
        const t2 = setTimeout(fit, 1200);
        window.addEventListener('resize', fit);
        document.fonts?.ready?.then(fit);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            window.removeEventListener('resize', fit);
        };
    }, []);

    return ref;
}
