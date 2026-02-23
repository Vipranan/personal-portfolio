import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBrain, FaCode, FaRobot, FaLanguage } from 'react-icons/fa';
import { SiPython, SiFastapi, SiReact, SiNodedotjs, SiNextdotjs, SiOpencv } from 'react-icons/si';
import AboutScene from '../components/AboutScene';
import Footer from '../components/Footer';

const skills = [
    {
        icon: <FaBrain />,
        title: 'AI & Machine Learning',
        tags: ['NLP', 'RAG Systems', 'Computer Vision', 'LLMs', 'Prompt Engineering', 'Multi-Agent Systems'],
    },
    {
        icon: <FaCode />,
        title: 'Backend Development',
        tags: ['FastAPI', 'Node.js', 'Next.js', 'REST APIs', 'N8N', 'Workflow Automation'],
    },
    {
        icon: <FaRobot />,
        title: 'GenAI & Agentic AI',
        tags: ['AI Agents', 'No-Code/Low-Code', 'RAG', 'Persona Profiling', 'Data Pipelines'],
    },
    {
        icon: <FaLanguage />,
        title: 'Languages & Tools',
        tags: ['Python', 'JavaScript', 'React.js', 'OpenCV', 'Git', 'Robotics'],
    },
];

const stats = [
    { number: '4+', label: 'Projects' },
    { number: '3+', label: 'Experiences' },
    { number: '3', label: 'Languages' },
];

function AnimatedSection({ children, className }) {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className="page">
            {/* Background orbs */}
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
                        About Me
                    </motion.span>
                    <motion.h1 className="section-title" variants={itemVariants}>
                        Building the future with <br />
                        <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Artificial Intelligence
                        </span>
                    </motion.h1>
                </motion.div>

                <div className="about-grid">
                    <AnimatedSection className="about-text">
                        <p>
                            I'm <strong>Vipranan S</strong>, a final-year B.Tech student specializing in
                            <strong> Artificial Intelligence and Data Science</strong> at Crescent Institute of
                            Science and Technology, Chennai.
                        </p>
                        <p>
                            With hands-on experience in <strong>AI research</strong>, <strong>multiagent systems</strong>,
                            and <strong>data-driven applications</strong>, I've contributed to projects ranging from
                            LinkedIn profile intelligence systems to automated grading pipelines.
                        </p>
                        <p>
                            I'm skilled in <strong>NLP</strong>, <strong>backend development</strong>, and
                            <strong> AI agent implementation</strong>. I thrive at the intersection of research and
                            engineering — translating complex AI concepts into production-ready solutions.
                        </p>
                        <p>
                            Beyond the technical, I speak <strong>English</strong>, <strong>Tamil</strong>, and
                            <strong> German</strong>, and enjoy mentoring others as an Agentic AI instructor.
                        </p>

                        <div className="about-stats">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="stat-card"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                >
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatedSection>

                    <AnimatedSection className="about-visual">
                        <div className="about-image-wrapper">
                            <img
                                src="/images/profile.png"
                                alt="Vipranan S"
                                className="about-profile-image"
                            />
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Skills Section */}
            <section className="section skills-section">
                <AnimatedSection>
                    <span className="section-label">Tech Stack</span>
                    <h2 className="section-title">Skills & Technologies</h2>
                    <p className="section-subtitle">
                        A blend of AI/ML expertise and full-stack development capabilities.
                    </p>
                </AnimatedSection>

                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            className="skill-category"
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="skill-category-icon">{skill.icon}</div>
                            <h3 className="skill-category-title">{skill.title}</h3>
                            <div className="skill-tags">
                                {skill.tags.map((tag) => (
                                    <span key={tag} className="skill-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
