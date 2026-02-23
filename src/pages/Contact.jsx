import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import Button3D from '../components/Button3D';
import Footer from '../components/Footer';

const contactMethods = [
    {
        icon: <FaEnvelope />,
        label: 'Email',
        value: 'vipranancr7@gmail.com',
        href: 'mailto:vipranancr7@gmail.com',
    },
    {
        icon: <FaLinkedinIn />,
        label: 'LinkedIn',
        value: 'Vipranan S',
        href: 'https://www.linkedin.com/in/vipranans/',
    },
    {
        icon: <FaPhone />,
        label: 'Phone',
        value: '+91 7904479370',
        href: 'tel:+917904479370',
    },
    {
        icon: <FaGithub />,
        label: 'GitHub',
        value: 'Vipranan',
        href: 'https://github.com/Vipranan',
    },
    {
        icon: <FaMapMarkerAlt />,
        label: 'Location',
        value: 'Chennai, India',
    },
];

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
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'ed7d55f1-f354-4177-9d29-60cc01cb722f',
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    from_name: 'Portfolio Contact Form',
                    to: 'vipranancr7@gmail.com',
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 4000);
            }
        } catch (err) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

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
                        Contact
                    </motion.span>
                    <motion.h1 className="section-title" variants={itemVariants}>
                        Let's{' '}
                        <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Connect
                        </span>
                    </motion.h1>
                    <motion.p className="section-subtitle" variants={itemVariants}>
                        Have an interesting project or just want to say hi? Feel free to reach out.
                    </motion.p>
                </motion.div>

                <div className="contact-grid">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.p className="contact-info-text" variants={itemVariants}>
                            I'm always open to discussing new opportunities, interesting projects, or collaborations in the AI/ML space. Whether you have a question or just want to connect — my inbox is always open!
                        </motion.p>

                        <div className="contact-methods">
                            {contactMethods.map((method) => (
                                <motion.div key={method.label} variants={itemVariants}>
                                    {method.href ? (
                                        <a
                                            href={method.href}
                                            target={method.href.startsWith('http') ? '_blank' : undefined}
                                            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="contact-method"
                                        >
                                            <div className="contact-method-icon">{method.icon}</div>
                                            <div>
                                                <div className="contact-method-label">{method.label}</div>
                                                <div className="contact-method-value">{method.value}</div>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="contact-method">
                                            <div className="contact-method-icon">{method.icon}</div>
                                            <div>
                                                <div className="contact-method-label">{method.label}</div>
                                                <div className="contact-method-value">{method.value}</div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form"
                        onSubmit={handleSubmit}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div className="form-group" variants={itemVariants}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>

                        <motion.div className="form-group" variants={itemVariants}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>

                        <motion.div className="form-group" variants={itemVariants}>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>

                        <motion.div className="form-group" variants={itemVariants}>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button3D
                                type="submit"
                                disabled={status === 'sending'}
                                style={{ opacity: status === 'sending' ? 0.7 : 1 }}
                            >
                                {status === 'sending' ? (
                                    '⏳ Sending...'
                                ) : status === 'success' ? (
                                    '✅ Message Sent!'
                                ) : status === 'error' ? (
                                    '❌ Failed — Try Again'
                                ) : (
                                    <>
                                        Send Message <FaPaperPlane />
                                    </>
                                )}
                            </Button3D>
                        </motion.div>
                    </motion.form>
                </div>
            </section>

            <Footer />
        </div>
    );
}
