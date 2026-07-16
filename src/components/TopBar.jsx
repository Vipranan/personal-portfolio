export default function TopBar() {
    return (
        <nav className="topbar">
            <div className="topbar-label hero-anim" style={{ animationDelay: '0s' }}>
                AI ENGINEER<br />PORTFOLIO
            </div>
            <div className="topbar-monogram hero-anim" style={{ animationDelay: '0.1s' }}>
                V<span className="italic">S</span>
            </div>
            <div className="topbar-label topbar-label-right hero-anim" style={{ animationDelay: '0.2s' }}>
                AVAILABLE FOR<br />FREELANCE &amp; FULL-TIME
            </div>
        </nav>
    );
}
