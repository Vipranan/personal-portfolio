import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const experiences = [
    {
        role: 'Agentic AI Mentor',
        company: 'Spark Solutions',
        date: 'Mar 2025 – Present',
        points: [
            'Conducted a bootcamp on building AI agents using no-code and low-code tools.',
            'Implemented a Retrieval-Augmented Generation (RAG) agent on Nike quarterly data using N8N and API integrations.',
        ],
        tech: ['N8N', 'RAG', 'AI Agents', 'No-Code', 'Low-Code'],
    },
    {
        role: 'Project Intern',
        company: 'HCL Technologies',
        date: 'Jun 2025 – Jul 2025',
        points: [
            'Designed a web-based antenna booking and testing system.',
            'Led a team to deliver a complex engineering project within timeline.',
        ],
        tech: ['FastAPI', 'React.js', 'Node.js', 'Next.js'],
    },
    {
        role: 'AI Research Contributor',
        company: 'KACTII Technologies',
        date: 'Research',
        points: [
            'Developed an authenticated LinkedIn profile extraction module using li_at cookie-based session mechanism.',
            'Built content extraction pipelines for Medium and Substack, converting longform posts into normalized text features.',
            'Integrated multi-platform profile data into a multi-agent NLP system for automated persona and interest profiling.',
            'Contributed to an international conference paper submission.',
        ],
        tech: ['Python', 'NLP', 'LinkedIn API', 'OpenCV', 'Multi-Agent'],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Experience() {
    return (
        <div className="page">
            <div className="particles-bg">
                <div className="floating-orb" />
                <div className="floating-orb" />
                <div className="floating-orb" />
            </div>

            <section className="section">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.span className="section-label" variants={itemVariants}>
                        Experience
                    </motion.span>
                    <motion.h1 className="section-title" variants={itemVariants}>
                        Where I've{' '}
                        <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Worked
                        </span>
                    </motion.h1>
                    <motion.p className="section-subtitle" variants={itemVariants}>
                        My professional journey through AI research, mentoring, and engineering.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="timeline"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            className="timeline-item"
                            variants={itemVariants}
                        >
                            <div className="timeline-dot" />
                            <span className="timeline-date">{exp.date}</span>
                            <motion.div
                                className="timeline-card"
                                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                            >
                                <h3 className="timeline-role">{exp.role}</h3>
                                <p className="timeline-company">{exp.company}</p>
                                <ul className="timeline-description">
                                    {exp.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                                <div className="timeline-tech-tags">
                                    {exp.tech.map((t) => (
                                        <span key={t} className="project-tech-tag">{t}</span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Education */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginTop: '4rem' }}
                >
                    <span className="section-label">Education</span>
                    <h2 className="section-title">Academic Background</h2>

                    <motion.div
                        className="education-card"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <h3 className="education-degree">
                            Bachelor of Technology — Artificial Intelligence & Data Science
                        </h3>
                        <p className="education-school">
                            Crescent Institute of Science and Technology
                        </p>
                        <span className="education-year">2022 – 2026</span>
                    </motion.div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
