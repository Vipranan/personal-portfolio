import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

function RevealBlock({ children, className = '', delay = 0 }) {
    const { ref, visible } = useRevealOnScroll();
    return (
        <div
            ref={ref}
            className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export default function ContactFooter() {
    return (
        <section id="contact" className="contact-footer">
            <div className="contact-grid">
                <RevealBlock>
                    <div className="contact-headline">
                        LET&rsquo;S CREATE<br />SOMETHING<br />EXTRAORDINARY
                    </div>
                    <p className="contact-sub">
                        I&rsquo;M OPEN TO NEW PROJECTS<br />AND EXCITING COLLABORATIONS.
                    </p>
                </RevealBlock>

                <RevealBlock delay={100}>
                    <div className="section-heading-sm">LET&rsquo;S CONNECT</div>
                    <div className="connect-links">
                        <a href="mailto:vipranancr7@gmail.com">&#9993;&ensp;vipranancr7@gmail.com</a>
                        <a href="https://github.com/Vipranan" target="_blank" rel="noopener noreferrer">
                            &#9741;&ensp;github.com/Vipranan
                        </a>
                        <span className="connect-link">&#9906;&ensp;Chennai, India</span>
                        <a href="https://www.linkedin.com/in/vipranans/" target="_blank" rel="noopener noreferrer">
                            &#9737;&ensp;linkedin.com/in/vipranans
                        </a>
                    </div>
                </RevealBlock>

                <RevealBlock delay={200}>
                    <div className="section-heading-sm">LET&rsquo;S WORK TOGETHER</div>
                    <p className="contact-blurb">
                        Have a project in mind or just want to say hello? I&rsquo;d love to hear from you.
                    </p>
                    <a href="mailto:vipranancr7@gmail.com" className="cta-pill">GET IN TOUCH</a>
                </RevealBlock>
            </div>

            <div className="contact-bottom-bar">
                <span>&copy; 2026 VIPRANAN S</span>
                <span>EN &middot; TA &middot; DE</span>
            </div>
        </section>
    );
}
