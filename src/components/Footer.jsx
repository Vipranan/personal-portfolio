import { FaGithub } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text">
                © 2026 Vipranan S. Built with React & Three.js
            </p>
            <div className="footer-socials">
                <a
                    href="https://github.com/Vipranan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social"
                    aria-label="GitHub"
                >
                    <FaGithub />
                </a>
                <a
                    href="mailto:vipranan@email.com"
                    className="footer-social"
                    aria-label="Email"
                >
                    <HiOutlineExternalLink />
                </a>
            </div>
        </footer>
    );
}
