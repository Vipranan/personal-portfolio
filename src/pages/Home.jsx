import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { FaGithub, FaBrain, FaRocket, FaCode, FaUsers } from 'react-icons/fa';
import { HiArrowRight, HiChevronDown, HiOutlineChip, HiOutlineDocumentText, HiOutlineCode, HiOutlineEye } from 'react-icons/hi';
import ParticleField from '../components/ParticleField';
import Robot3D from '../components/Robot3D';
import Footer from '../components/Footer';

const roles = [
    'GenAI Engineer',
    'AI Researcher',
];

const featuredProjects = [
    {
        title: 'Multi-Agent Profile Intelligence',
        description: 'Aggregates image data, technical skills, and preferences from multiple online sources using multi-agent NLP.',
        tech: ['Python', 'OpenCV', 'NLP', 'Multi-Agent'],
        icon: <HiOutlineChip />,
        link: '/projects',
    },
    {
        title: 'AIRMAN — Aviation AI Chat',
        description: 'RAG system for aviation documents with hybrid FAISS + BM25 retrieval, cross-encoder reranking, and citation tracking.',
        tech: ['Python', 'LangChain', 'FAISS', 'Ollama'],
        icon: <HiOutlineEye />,
        link: '/projects',
    },
    {
        title: 'RAG Agent — Nike Data',
        description: 'Retrieval-Augmented Generation agent for analyzing Nike quarterly data using N8N workflow automation.',
        tech: ['N8N', 'RAG', 'LLMs', 'API'],
        icon: <HiOutlineEye />,
        link: '/projects',
    },
    {
        title: 'SQL Buddy',
        description: 'Natural language to SQL system supporting 55+ languages. Ask in any language, get instant SQL results.',
        tech: ['Python', 'FastAPI', 'Ollama', 'LLM'],
        icon: <HiOutlineCode />,
        link: '/projects',
    },
];

const stats = [
    { icon: <FaBrain />, number: 6, suffix: '+', label: 'AI Projects', color: '#6c5ce7' },
    { icon: <FaRocket />, number: 3, suffix: '+', label: 'Work Experiences', color: '#00cec9' },
    { icon: <FaCode />, number: 10, suffix: '+', label: 'Technologies', color: '#a855f7' },
    { icon: <FaUsers />, number: 3, suffix: '', label: 'Languages Spoken', color: '#fd79a8' },
];

const skills = [
    'Python', 'NLP', 'RAG', 'LLMs', 'FastAPI', 'React.js', 'Node.js',
    'Next.js', 'OpenCV', 'N8N', 'Multi-Agent', 'Workflow Automation',
    'Computer Vision', 'Git', 'Prompt Engineering',
];

/* Animated Counter Component */
function AnimatedCounter({ target, suffix = '' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const stepTime = duration / target;
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= target) clearInterval(timer);
        }, stepTime);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* Parallax Section */
function ParallaxSection({ children, offset = 50 }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <motion.div ref={ref} style={{ y: smoothY }}>
            {children}
        </motion.div>
    );
}

export default function Home() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter effect
    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (!isDeleting && displayText === currentRole) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayText === '') {
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }, 0);
        } else {
            timeout = setTimeout(
                () => {
                    setDisplayText(
                        isDeleting
                            ? currentRole.substring(0, displayText.length - 1)
                            : currentRole.substring(0, displayText.length + 1)
                    );
                },
                isDeleting ? 50 : 100
            );
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    return (
        <div className="page">
            {/* ==================== HERO ==================== */}
            <section className="hero">
                <ParticleField />

                <div className="particles-bg">
                    <div className="floating-orb" />
                    <div className="floating-orb" />
                    <div className="floating-orb" />
                </div>

                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p className="hero-greeting" variants={itemVariants}>
                        — Hey there, I'm
                    </motion.p>

                    <motion.h1 className="hero-name" variants={itemVariants}>
                        <span className="gradient-text">Vipranan S</span>
                    </motion.h1>

                    <motion.h2 className="hero-title" variants={itemVariants}>
                        I'm a <span className="typed-text">{displayText}</span>
                    </motion.h2>

                    <motion.p className="hero-description" variants={itemVariants}>
                        Final-year AI & Data Science student building intelligent systems —
                        from multiagent NLP pipelines to production-ready backends.
                        Passionate about pushing the boundaries of GenAI.
                    </motion.p>

                    <motion.div className="hero-buttons" variants={itemVariants}>
                        <Link to="/projects" className="btn-primary">
                            View My Work <HiArrowRight />
                        </Link>
                        <a
                            href="https://github.com/Vipranan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            <FaGithub /> GitHub
                        </a>
                    </motion.div>
                </motion.div>

                {/* Profile Picture */}
                <motion.div
                    className="hero-profile"
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="profile-image-wrapper">
                        <img
                            src="/images/profile.png"
                            alt="Vipranan S"
                            className="profile-image"
                        />
                        <div className="profile-glow" />
                        <div className="profile-ring" />
                        <div className="profile-ring profile-ring-2" />
                    </div>

                    {/* Floating badges around profile */}
                    <motion.div
                        className="profile-badge badge-1"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        🤖 AI
                    </motion.div>
                    <motion.div
                        className="profile-badge badge-2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                        🧠 NLP
                    </motion.div>
                    <motion.div
                        className="profile-badge badge-3"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                        ⚡ GenAI
                    </motion.div>
                </motion.div>

                {/* Side social links */}
                <div className="hero-socials">
                    <a
                        href="https://github.com/Vipranan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-social-link"
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </a>
                </div>

                <div className="hero-scroll-indicator">
                    <span>SCROLL</span>
                    <div className="scroll-line" />
                    <HiChevronDown />
                </div>
            </section>

            {/* ==================== 3D ROBOT ==================== */}
            <section className="home-section robot-section">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">Interactive</span>
                    <h2 className="section-title">
                        Meet my AI{' '}
                        <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Buddy
                        </span>
                    </h2>
                    <p className="section-subtitle">
                        Move your cursor around — it follows you! Click to make it wave.
                    </p>
                </motion.div>
                <Robot3D />
            </section>

            {/* ==================== STATS SECTION ==================== */}
            <section className="home-section stats-section">
                <ParallaxSection offset={30}>
                    <motion.div
                        className="stats-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {stats.map((stat) => (
                            <motion.div
                                key={stat.label}
                                className="home-stat-card"
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                <div className="home-stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                                    {stat.icon}
                                </div>
                                <div className="home-stat-number" style={{ color: stat.color }}>
                                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                                </div>
                                <div className="home-stat-label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </ParallaxSection>
            </section>

            {/* ==================== FEATURED PROJECTS ==================== */}
            <section className="home-section">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">Featured Work</span>
                    <h2 className="section-title">
                        Selected{' '}
                        <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Projects
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    className="featured-projects-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            variants={itemVariants}
                        >
                            <ParallaxSection offset={15 + index * 5}>
                                <Link to={project.link} className="featured-project-card">
                                    <div className="featured-project-number">0{index + 1}</div>
                                    <div className="featured-project-icon">{project.icon}</div>
                                    <h3 className="featured-project-title">{project.title}</h3>
                                    <p className="featured-project-desc">{project.description}</p>
                                    <div className="featured-project-tech">
                                        {project.tech.map((t) => (
                                            <span key={t} className="project-tech-tag">{t}</span>
                                        ))}
                                    </div>
                                    <span className="featured-project-arrow">
                                        <HiArrowRight />
                                    </span>
                                </Link>
                            </ParallaxSection>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="home-section-cta"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <Link to="/projects" className="btn-secondary">
                        View All Projects <HiArrowRight />
                    </Link>
                </motion.div>
            </section>

            {/* ==================== SKILLS MARQUEE ==================== */}
            <section className="home-section skills-marquee-section">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">Tech Stack</span>
                    <h2 className="section-title">
                        Tools I{' '}
                        <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Work With
                        </span>
                    </h2>
                </motion.div>

                <div className="marquee-container">
                    <div className="marquee-track">
                        {[...skills, ...skills].map((skill, i) => (
                            <div key={i} className="marquee-item">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="marquee-container marquee-reverse">
                    <div className="marquee-track">
                        {[...skills.slice().reverse(), ...skills.slice().reverse()].map((skill, i) => (
                            <div key={i} className="marquee-item marquee-item-alt">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ==================== CTA SECTION ==================== */}
            <section className="home-section cta-section">
                <ParallaxSection offset={20}>
                    <motion.div
                        className="cta-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="cta-title">
                            Let's build something{' '}
                            <span className="gradient-text">amazing</span> together
                        </h2>
                        <p className="cta-description">
                            I'm always open to new opportunities, collaborations, and interesting AI projects.
                            Let's connect and create something impactful.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn-primary">
                                Get In Touch <HiArrowRight />
                            </Link>
                            <Link to="/experience" className="btn-secondary">
                                View Experience
                            </Link>
                        </div>
                    </motion.div>
                </ParallaxSection>
            </section>

            <Footer />
        </div>
    );
}
