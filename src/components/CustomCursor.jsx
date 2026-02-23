import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setDotPosition({ x: e.clientX, y: e.clientY });
            if (!visible) setVisible(true);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .hoverable, input, textarea')) {
                setHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.closest('a, button, .hoverable, input, textarea')) {
                setHovering(false);
            }
        };

        const handleMouseLeave = () => setVisible(false);
        const handleMouseEnter = () => setVisible(true);

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <>
            <div
                className={`custom-cursor ${hovering ? 'hovering' : ''}`}
                style={{ left: position.x, top: position.y }}
            />
            <div
                className="cursor-dot"
                style={{ left: dotPosition.x, top: dotPosition.y }}
            />
        </>
    );
}
