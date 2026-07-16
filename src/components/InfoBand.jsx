import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useCountUp } from '../hooks/useCountUp';

function Counter({ target, suffix = '', label }) {
    const { ref, value } = useCountUp(target);
    return (
        <div className="stat-row">
            <span ref={ref} className="stat-number">{value}{suffix}</span>
            <span className="stat-label">{label}</span>
        </div>
    );
}

export default function InfoBand() {
    const { ref, visible } = useRevealOnScroll();

    return (
        <section ref={ref} className={`info-band reveal ${visible ? 'is-visible' : ''}`}>
            <div className="info-band-grid">
                <div className="info-cell">
                    <div className="info-name">VIPRANAN&nbsp;S</div>
                    <div className="info-role gold-label">AI ENGINEER &amp; DEVELOPER</div>
                </div>
                <div className="info-cell">
                    <p className="info-blurb">
                        I help ambitious teams turn AI research into production &mdash; multi-agent NLP,
                        retrieval systems, and clean, scalable backends.
                    </p>
                    <div className="info-location-row">
                        <span className="info-location">&#9906;&ensp;CHENNAI, INDIA</span>
                        <span className="pill">AVAILABLE WORLDWIDE</span>
                    </div>
                </div>
                <div className="info-stats">
                    <Counter target={6} label="PROJECTS BUILT" />
                    <Counter target={3} suffix="+" label="EXPERIENCES" />
                    <Counter target={3} label="LANGUAGES SPOKEN" />
                </div>
            </div>
        </section>
    );
}
