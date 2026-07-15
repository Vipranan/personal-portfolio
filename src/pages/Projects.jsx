import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiOutlineCode, HiOutlineEye, HiOutlineChip, HiOutlineDocumentText, HiOutlineDatabase, HiOutlinePaperAirplane } from 'react-icons/hi';
import Footer from '../components/Footer';

const projects = [
    {
        title: 'Multi-Agent Profile Intelligence System',
        category: 'AI / NLP',
        description:
            'Delivers a personalized profile snapshot by aggregating image data, technical skills, and preferences from multiple online sources. Implements LinkedIn scraping via li_at cookie method and uses OpenCV for facial analysis.',
        tech: ['Python', 'OpenCV', 'NLP', 'Multi-Agent', 'LinkedIn API'],
        github: 'https://github.com/Vipranan/image_collector',
        icon: <HiOutlineChip />,
        image: '/images/project-multiagent.png',
    },
    {
        title: 'INTELLI-GRADE',
        category: 'Machine Learning',
        description:
            'Machine learning system for extracting handwritten marks from marksheets with a two-step confirmation model to improve accuracy. Automates the tedious process of manual grade entry.',
        tech: ['Python', 'ML', 'Computer Vision', 'OCR', 'Image Processing'],
        github: 'https://github.com/Vipranan/INTELLI-GRADE',
        icon: <HiOutlineDocumentText />,
        image: '/images/project-intelligrade.png',
    },
    {
        title: 'RAG Agent on Nike Quarterly Data',
        category: 'GenAI / RAG',
        description:
            'Built a Retrieval-Augmented Generation agent for analyzing Nike quarterly data using N8N workflow automation and API integrations. Demonstrates practical agentic AI in enterprise use cases.',
        tech: ['N8N', 'RAG', 'LLMs', 'API Integration', 'Workflow Automation'],
        icon: <HiOutlineEye />,
        image: '/images/project-rag.png',
    },
    {
        title: 'SQL Buddy',
        category: 'GenAI / NLP',
        description:
            'Natural language to SQL query system supporting 55+ languages. Ask questions in Tamil, Hindi, English, or any language and get instant SQL results. Features security-first design with read-only queries, SQL injection prevention, and local LLM via Ollama.',
        tech: ['Python', 'FastAPI', 'SQLAlchemy', 'Ollama', 'LLM', 'langdetect'],
        github: 'https://github.com/Vipranan/SQL-BUDDY',
        icon: <HiOutlineDatabase />,
        image: '/images/project-sqlbuddy.png',
    },
    {
        title: 'AIRMAN — Aviation Document AI Chat',
        category: 'RAG / AI',
        description:
            'A RAG system for aviation documents including PPL/CPL/ATPL textbooks, SOPs, and Flight Manuals. Features hybrid retrieval combining FAISS vector search and BM25, cross-encoder reranking, citation tracking, and faithfulness scoring.',
        tech: ['Python', 'FastAPI', 'LangChain', 'FAISS', 'Ollama', 'OCR'],
        github: 'https://github.com/Vipranan/AIRMAN-RAG',
        icon: <HiOutlinePaperAirplane />,
        image: '/images/project-airman.png',
    },
    {
        title: 'Antenna Booking & Testing System',
        category: 'Full Stack',
        description:
            'Web-based antenna booking and testing system built during an internship at HCL Technologies. Led a team to deliver this complex engineering project within timeline using modern web technologies.',
        tech: ['FastAPI', 'React.js', 'Node.js', 'Next.js'],
        icon: <HiOutlineCode />,
        image: '/images/project-antenna.png',
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
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Projects() {
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
                        Projects
                    </motion.span>
                    <motion.h1 className="section-title" variants={itemVariants}>
                        Things I've{' '}
                        <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Built
                        </span>
                    </motion.h1>
                    <motion.p className="section-subtitle" variants={itemVariants}>
                        A selection of projects that showcase my expertise in AI, machine learning, and full-stack development.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            className="project-card"
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            <div className="project-image">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="project-image-bg" />
                                ) : (
                                    <span className="project-image-icon">{project.icon}</span>
                                )}
                                <div className="project-image-overlay" />
                            </div>

                            <div className="project-content">
                                <div className="project-meta">
                                    <span className="project-category">{project.category}</span>
                                </div>

                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-tech">
                                    {project.tech.map((t) => (
                                        <span key={t} className="project-tech-tag">{t}</span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <FaGithub /> Source Code
                                        </a>
                                    )}
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <FaExternalLinkAlt /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
