import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const experienceEntries = [
    { title: 'Intern — Team Lead', sub: 'HCL TECHNOLOGIES' },
    { title: 'Agentic AI Instructor', sub: 'MENTORING & TEACHING' },
    { title: 'AI Researcher', sub: 'MULTI-AGENT & NLP PROJECTS' },
];

const processSteps = [
    { n: '01', label: 'RESEARCH', text: 'Understanding the problem, data, and constraints.' },
    { n: '02', label: 'ARCHITECT', text: 'Designing agents, retrieval, and system structure.' },
    { n: '03', label: 'PROTOTYPE', text: 'Fast iterations to prove the approach works.' },
    { n: '04', label: 'ENGINEER', text: 'Production-ready code with clean, scalable backends.' },
    { n: '05', label: 'EVALUATE', text: 'Testing, faithfulness scoring, and refinement.' },
];

export default function Background() {
    const { ref, visible } = useRevealOnScroll();

    return (
        <section ref={ref} className={`background-band reveal ${visible ? 'is-visible' : ''}`}>
            <div className="background-grid">
                <div className="background-cell">
                    <div className="gold-label section-diamond-label">&#9670;&ensp;EDUCATION</div>
                    <div className="background-entries">
                        <div>
                            <div className="entry-title">B.Tech &mdash; AI &amp; Data Science</div>
                            <div className="entry-sub">CRESCENT INSTITUTE, CHENNAI</div>
                            <div className="entry-sub">2022 &ndash; 2026</div>
                        </div>
                        <div>
                            <div className="entry-title">Languages</div>
                            <div className="entry-sub">ENGLISH &middot; TAMIL &middot; GERMAN</div>
                        </div>
                    </div>
                </div>

                <div className="background-cell">
                    <div className="gold-label section-diamond-label">&#9670;&ensp;EXPERIENCE</div>
                    <div className="background-entries">
                        {experienceEntries.map((entry) => (
                            <div key={entry.title}>
                                <div className="entry-title">{entry.title}</div>
                                <div className="entry-sub">{entry.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="background-cell">
                    <div className="gold-label section-diamond-label">&#9670;&ensp;MY AI PROCESS</div>
                    <div className="process-list">
                        {processSteps.map((step) => (
                            <div key={step.n} className="process-step">
                                <span className="process-num">{step.n}</span>
                                <span>
                                    <span className="process-label">{step.label}</span>
                                    <span className="process-text">{step.text}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
