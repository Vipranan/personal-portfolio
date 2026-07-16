import { useCursorFollowers } from '../hooks/useCursorFollowers';

export default function CursorFollowers() {
    const { dotRef, ringRef } = useCursorFollowers();

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
}
