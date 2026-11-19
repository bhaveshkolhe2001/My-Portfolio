import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Mail, Menu, X, ExternalLink } from "lucide-react";
import "./styles.css";

/* ─── SVG Icons ───────────────────────────────── */
function GithubIcon({ size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
function LinkedinIcon({ size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ─── Data ────────────────────────────────────── */
const projects = [
  {
    number: "01",
    type: "E-COMMERCE / HTML TEMPLATE",
    title: "Multikart",
    subtitle: "Multi-purpose E-Commerce",
    description:
      "A fully-featured, multi-purpose e-commerce HTML template with 174+ pages covering fashion, electronics, groceries, bags, books and more. Ships with sliders, countdown timers, quick-view modals, sticky headers, mega menus and multiple category & product layouts.",
    stack: ["HTML5", "CSS3", "Bootstrap", "jQuery", "Slick Slider"],
    year: "2026",
    liveLink: "#contact",
    image: "/multikart-preview.jpg",
    accent: "#e8702a",
    bg: "#1a0f08",
  },
  {
    number: "02",
    type: "GROCERY / HTML TEMPLATE",
    title: "Nest",
    subtitle: "Mart & Grocery Store",
    description:
      "A clean, conversion-focused grocery e-commerce template with multi-category navigation, trending deals, mega menus, vendor support and a 24/7 support-ready layout. Built for performance with a fully responsive green-themed design system.",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Multi-vendor UI"],
    year: "2026",
    liveLink: "#contact",
    image: "/nest-preview.jpg",
    accent: "#29a56c",
    bg: "#071a10",
  },
];

const skills = [
  { name: "HTML5 & Semantic Markup", level: 95 },
  { name: "CSS3 & Tailwind CSS", level: 90 },
  { name: "JavaScript (ES6+)", level: 85 },
  { name: "React.js", level: 80 },
  { name: "Responsive & Mobile-first Design", level: 92 },
  { name: "Git & GitHub", level: 78 },
];

/* ─── Animation variants ──────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
};

/* ─── Custom Cursor ───────────────────────────── */
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const over = (e) => {
      if (e.target && typeof e.target.closest === "function" && e.target.closest("a, button, .project-card")) {
        setHovered(true);
      }
    };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: springX, y: springY }}
        animate={{ scale: hovered ? 0 : 1 }} transition={{ duration: 0.15 }} />
      <motion.div className="cursor-ring" style={{ x: springX, y: springY }}
        animate={{ scale: hovered ? 2.2 : 1, borderColor: hovered ? "rgba(82,108,130,0.6)" : "rgba(32,33,31,0.5)" }}
        transition={{ duration: 0.2 }} />
    </>
  );
}

/* ─── Animated counter ────────────────────────── */
function Counter({ to, duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration * 60);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, to, duration]);
  return <span ref={ref}>{count}</span>;
}

/* ─── Noise texture overlay ───────────────────── */
function Noise() {
  return <div className="noise" aria-hidden="true" />;
}

/* ─── Scroll progress bar ─────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-bar" style={{ scaleX: scrollYProgress }} />;
}

/* ─── Header ──────────────────────────────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`site-header ${scrolled ? "header-scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <a className="wordmark" href="#top" onClick={close}>BK<span>®</span></a>

      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={21} /></motion.span>
            : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={21} /></motion.span>
          }
        </AnimatePresence>
      </button>

      <nav className={open ? "nav nav-open" : "nav"}>
        {["About", "Work", "Approach", "Skills"].map((item, i) => (
          <motion.a key={item} href={`#${item.toLowerCase()}`} onClick={close}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}>
            {item}
          </motion.a>
        ))}
        <motion.a className="nav-contact" href="#contact" onClick={close}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Let's talk <ArrowUpRight size={15} />
        </motion.a>
      </nav>
    </motion.header>
  );
}

function SectionLabel({ number, children }) {
  return (
    <motion.div className="section-label" variants={fadeIn}>
      <span>{number}</span><span>{children}</span>
    </motion.div>
  );
}

/* ─── Hero ────────────────────────────────────── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const words = ["Thoughtful", "interfaces.", "Solid", "front-end."];

  return (
    <section className="hero" id="top" ref={ref}>
      <Noise />

      {/* Animated background blobs */}
      <motion.div className="hero-blob blob-1"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="hero-blob blob-2"
        animate={{ x: [0, -25, 0], y: [0, 30, 0], scale: [1, 0.94, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

      <motion.div style={{ y, opacity }} className="hero-inner">
        <motion.div className="hero-topline"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span>PORTFOLIO / 2026</span>
          <span className="availability"><motion.span className="avail-dot"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} /> OPEN TO OPPORTUNITIES</span>
        </motion.div>

        <div className="hero-grid">
          <motion.div className="hero-copy"
            initial="hidden" animate="visible" variants={stagger}>

            <motion.p className="eyebrow" variants={fadeUp}>
              FRONT-END DEVELOPER <span>—</span> PUNE, INDIA
            </motion.p>

            <h1>
              {["Thoughtful", "interfaces.", "Solid front-end."].map((line, i) => (
                <motion.span key={i} className="h1-line" variants={fadeUp}
                  transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.22, 0.61, 0.36, 1] }}>
                  {i === 1 ? <em>{line}</em> : line}
                  <br />
                </motion.span>
              ))}
            </h1>

            <motion.p className="hero-intro" variants={fadeUp}>
              I'm Bhavesh Kolhe. I build clear, responsive web experiences — with
              attention to the details people notice, and the ones they don't.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp}>
              <motion.a className="button button-dark" href="#work"
                whileHover={{ scale: 1.04, y: -4 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                View my work <ArrowUpRight size={16} />
              </motion.a>
              <motion.a className="text-link" href="#contact"
                whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                Get in touch <ArrowDownRight size={16} />
              </motion.a>
            </motion.div>

            <motion.div className="hero-stats" variants={fadeUp}>
              {[["2+", "Years coding"], ["5+", "Projects shipped"], ["174+", "Pages built"]].map(([n, l], i) => (
                <React.Fragment key={l}>
                  {i > 0 && <div className="stat-divider" />}
                  <div className="stat">
                    <strong>{n}</strong>
                    <span>{l}</span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div className="portrait-wrap"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}>
            <motion.div className="portrait-frame"
              whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }}>
              <img src="/bhavesh-portrait.webp" alt="Bhavesh Kolhe — Front-End Developer" />
              <div className="portrait-gradient" />
            </motion.div>
            <div className="portrait-caption">
              <span>BHAVESH KOLHE</span>
              <span>FRONT-END DEVELOPER · INDIA</span>
            </div>
            <span className="portrait-index">FIG. 01</span>

            {/* Floating badge */}
            <motion.div className="floating-badge"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 300 }}>
              <span>🇮🇳</span> Pune, India
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="hero-bottom"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <span>DESIGN-MINDED DEVELOPMENT</span>
          <a href="#about">SCROLL TO DISCOVER <ArrowDownRight size={14} /></a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── About ───────────────────────────────────── */
function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section about-section" id="about" ref={ref}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
        <SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel>
        <div className="about-content">
          <motion.h2 variants={fadeUp}>
            Good interfaces feel<br /> <span>effortless.</span> Getting there<br />takes intention.
          </motion.h2>
          <motion.div className="about-detail" variants={fadeUp}>
            <p className="lead">
              I'm a front-end developer based in Pune, Maharashtra — focused on
              turning ideas into accessible, useful, and well-crafted digital experiences.
            </p>
            <p>
              I care about the relationship between design and code: considered
              spacing, readable typography, purposeful interactions, and interfaces
              that work just as well on a phone as they do on a 4K display.
            </p>
            <motion.a className="inline-link" href="mailto:bhaveshkolhe275@gmail.com"
              whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              Start a conversation <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Project Card ────────────────────────────── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      className="project-card"
      style={{ "--accent": project.accent }}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 0.61, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10 }}
    >
      {/* Screenshot */}
      <div className="project-screenshot-wrap" style={{ background: project.bg }}>
        <motion.img
          className="project-screenshot"
          src={project.image}
          alt={project.title}
          loading="lazy"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        />

        {/* Gradient shimmer */}
        <motion.div className="project-shimmer"
          animate={{ x: hovered ? "100%" : "-100%" }}
          transition={{ duration: 0.7 }} />

        <AnimatePresence>
          {hovered && (
            <motion.div className="project-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              <motion.a href={project.liveLink} className="project-view-btn"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.2 }}>
                <ExternalLink size={16} /> View Project
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span className="project-num-badge" style={{ background: project.accent }}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + index * 0.1, type: "spring" }}>
          {project.number}
        </motion.span>
      </div>

      {/* Body */}
      <div className="project-card-body">
        <div className="project-meta-row">
          <span className="project-type-tag">{project.type}</span>
          <span className="project-year">{project.year}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-desc">{project.description}</p>
        <div className="tag-row">
          {project.stack.map((tag, i) => (
            <motion.span key={tag} className="project-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.05 }}>
              {tag}
            </motion.span>
          ))}
        </div>
        <motion.a href={project.liveLink} className="project-cta"
          style={{ color: project.accent }}
          whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 400 }}>
          Discuss this project <ArrowUpRight size={14} />
        </motion.a>
      </div>

      {/* Accent bottom bar */}
      <motion.div className="card-accent-bar" style={{ background: project.accent }}
        initial={{ scaleX: 0 }} animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }} />
    </motion.article>
  );
}

/* ─── Work ────────────────────────────────────── */
function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section work-section" id="work" ref={ref}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
        <SectionLabel number="02">SELECTED WORK</SectionLabel>
        <div className="section-heading-row">
          <motion.h2 variants={fadeUp}>A few things<br /><em>made with care.</em></motion.h2>
          <motion.p variants={fadeUp}>Real projects. Real code.<br />Scroll to explore each one.</motion.p>
        </div>
      </motion.div>
      <div className="project-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── Approach ────────────────────────────────── */
function Approach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const principles = [
    ["01", "Clarity over clutter", "Every element should earn its place. I aim for hierarchy that makes the next step obvious without the user having to think."],
    ["02", "Responsive by default", "A considered experience should feel natural across screen sizes, input methods and real-world conditions — from foldable phones to widescreen monitors."],
    ["03", "Details matter", "From semantic markup to micro-interactions, the small decisions add up to a more coherent, trustworthy product."],
  ];

  return (
    <section className="section approach-section" id="approach" ref={ref}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
        <SectionLabel number="03">HOW I THINK</SectionLabel>
        <div className="approach-grid">
          <motion.h2 variants={fadeUp}>Make it work.<br /><em>Make it clear.</em><br />Make it last.</motion.h2>
          <div className="principles">
            {principles.map(([n, title, body], i) => (
              <motion.div className="principle" key={n}
                variants={slideLeft}
                transition={{ delay: i * 0.12 }}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Skills ──────────────────────────────────── */
function SkillBar({ skill, index, inView }) {
  return (
    <motion.div className="skill-row" key={skill.name}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}>
      <div className="skill-top-row">
        <span className="skill-num">0{index + 1}</span>
        <span className="skill-name">{skill.name}</span>
        <span className="skill-pct">{skill.level}%</span>
      </div>
      <div className="skill-track">
        <motion.div className="skill-fill"
          style={{ background: "var(--blue)" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: 0.3 + index * 0.08, duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }} />
      </div>
    </motion.div>
  );
}

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section skills-section" id="skills" ref={ref}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
        <SectionLabel number="04">TOOLS &amp; SKILLS</SectionLabel>
        <div className="skills-layout">
          <motion.div variants={fadeUp}>
            <h2>The toolkit<br /><em>behind the work.</em></h2>
            <p className="skills-sub">Technologies I reach for every day to build polished, accessible web products.</p>
          </motion.div>
          <div className="skills-bars">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────── */
function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer className="contact-section" id="contact" ref={ref}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
        <div className="contact-top">
          <SectionLabel number="05">CONTACT</SectionLabel>
          <motion.span variants={fadeIn}>GOOD WORK STARTS WITH A CONVERSATION.</motion.span>
        </div>

        <motion.h2 variants={fadeUp}>
          Have something<br /><em>in mind?</em>
        </motion.h2>

        <motion.a className="contact-email" href="mailto:bhaveshkolhe275@gmail.com"
          variants={fadeUp} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300 }}>
          bhaveshkolhe275@gmail.com <ArrowUpRight size={22} />
        </motion.a>

        <motion.div className="contact-bottom" variants={fadeUp}>
          <div className="contact-details">
            <a href="tel:+917758089432">+91 77580 89432</a>
            <span>Pune, Maharashtra, India</span>
          </div>
          <div className="socials">
            {[
              { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: LinkedinIcon },
              { href: "https://github.com/", label: "GitHub", Icon: GithubIcon },
              { href: "mailto:bhaveshkolhe275@gmail.com", label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }, i) => (
              <motion.a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer" aria-label={label}
                whileHover={{ scale: 1.25, y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                custom={i}
                style={{ transitionDelay: `${i * 0.05}s` }}>
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
          <span className="copyright">© 2026 BHAVESH KOLHE</span>
        </motion.div>
      </motion.div>

      {/* Animated grid lines */}
      <div className="contact-grid" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="grid-line"
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.08, duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }} />
        ))}
      </div>
    </footer>
  );
}

/* ─── Error Boundary ──────────────────────────── */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "60px 7%", fontFamily: "DM Sans, sans-serif" }}>
          <h2 style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-.04em" }}>
            Something went wrong
          </h2>
          <p style={{ color: "#777", fontSize: 13, marginTop: 12 }}>
            {this.state.error?.message}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ─── App ─────────────────────────────────────── */
function App() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Approach />
        <Skills />
      </main>
      <Contact />
    </ErrorBoundary>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
