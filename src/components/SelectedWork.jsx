import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { projects } from '../data/projects';

function ProjectCard({ project, delay }) {
    const { ref, visible } = useRevealOnScroll();
    const Tag = project.github ? 'a' : 'div';
    const linkProps = project.github
        ? { href: project.github, target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
        <Tag
            ref={ref}
            className={`project-card reveal ${visible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
            {...linkProps}
        >
            <span className="project-thumb">
                <img src={project.image} alt={project.title} loading="lazy" />
            </span>
            <span className="project-meta-row">
                <span className="project-title">{project.title}</span>
                <span className="project-category">{project.category}</span>
            </span>
            <span className="project-desc">{project.description}</span>
        </Tag>
    );
}

export default function SelectedWork() {
    const { ref, visible } = useRevealOnScroll();

    return (
        <section id="projects" className="selected-work">
            <div ref={ref} className={`selected-work-header reveal ${visible ? 'is-visible' : ''}`}>
                <span className="section-heading">SELECTED&ensp;WORK</span>
                <a href="#contact" className="view-all-link">VIEW ALL PROJECTS &#8594;</a>
            </div>
            <div className="project-grid">
                {projects.map((project, i) => (
                    <ProjectCard key={project.title} project={project} delay={(i % 3) * 80} />
                ))}
            </div>
        </section>
    );
}
