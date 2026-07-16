import { useFitTitle } from '../hooks/useFitTitle';

export default function Hero({ heroRef }) {
    const titleRef = useFitTitle();

    return (
        <header id="home" ref={heroRef} className="hero">
            <div className="hero-title-wrap">
                <h1 ref={titleRef} className="hero-title hero-anim" style={{ animationDelay: '0.15s' }}>
                    PORTFOLIO
                </h1>
                <div className="hero-portrait hero-anim-fade" style={{ animationDelay: '0.35s' }}>
                    <img
                        src="https://api.dicebear.com/9.x/adventurer/svg?seed=Vipranan&flip=true"
                        alt="Vipranan S"
                        className="hero-portrait-img"
                    />
                    <div className="hero-portrait-fade" />
                </div>
            </div>
            <div className="hero-sub">
                <div className="hero-tagline hero-anim" style={{ animationDelay: '0.45s' }}>
                    INTELLIGENT SYSTEMS<br />THAT DRIVE <em className="gold-italic">IMPACT.</em>
                </div>
                <div className="hero-blurb hero-anim" style={{ animationDelay: '0.55s' }}>
                    <p>
                        I design and build modern AI systems &mdash; multi-agent pipelines, RAG, and production
                        backends that deliver real results.
                    </p>
                    <div className="signature">Vipranan S</div>
                </div>
            </div>
        </header>
    );
}
