import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Button3D({ children, className = '', ...props }) {
    const btnRef = useRef(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e) => {
        const btn = btnRef.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setTransform({ rotateX, rotateY, scale: 1.05 });
        setGlare({ x: glareX, y: glareY, opacity: 0.3 });
    };

    const handleMouseLeave = () => {
        setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
        setGlare({ x: 50, y: 50, opacity: 0 });
    };

    const handleMouseDown = () => {
        setTransform((prev) => ({ ...prev, scale: 0.95 }));
    };

    const handleMouseUp = () => {
        setTransform((prev) => ({ ...prev, scale: 1.05 }));
    };

    return (
        <motion.button
            ref={btnRef}
            className={`btn-3d ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            animate={{
                rotateX: transform.rotateX,
                rotateY: transform.rotateY,
                scale: transform.scale,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                mass: 0.5,
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '800px',
            }}
            {...props}
        >
            <span className="btn-3d-content" style={{ transform: 'translateZ(20px)' }}>
                {children}
            </span>
            <span className="btn-3d-shadow" />
            <span
                className="btn-3d-glare"
                style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
                }}
            />
        </motion.button>
    );
}
