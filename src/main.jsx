import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowUpRight, Mail, Menu, X } from "lucide-react";
import "./styles.css";

function Github({ size = 18, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ size = 18, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const projects = [
  {
    number: "01",
    type: "CASE STUDY / WEB EXPERIENCE",
    title: "Project name goes here",
    description: "A short, outcome-focused description of the product, the problem it solves, and Bhavesh’s contribution.",
    stack: ["React", "JavaScript", "CSS"],
    year: "2026",
    link: "#contact",
    className: "project-art project-art-one",
    initials: "01"
  },
  {
    number: "02",
    type: "INTERFACE / FRONT-END",
    title: "Another selected project",
    description: "Replace this with a real project summary. Explain the most important interaction or technical challenge.",
    stack: ["Responsive UI", "API", "React"],
    year: "2026",
    link: "#contact",
    className: "project-art project-art-two",
    initials: "02"
  }
];

const skills = ["HTML5", "CSS3", "JavaScript", "React", "Responsive design", "Git & GitHub"];

function Header() {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" onClick={close}>BK<span>®</span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
        {open ? <X size={21}/> : <Menu size={21}/>}
      </button>
      <nav className={open ? "nav nav-open" : "nav"}>
        <a href="#about" onClick={close}>About</a>
        <a href="#work" onClick={close}>Selected work</a>
        <a href="#approach" onClick={close}>Approach</a>
        <a className="nav-contact" href="#contact" onClick={close}>Let’s talk <ArrowUpRight size={15}/></a>
      </nav>
    </header>
  );
}

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-topline">
        <span>PORTFOLIO / 2026</span>
        <span className="availability"><i/> OPEN TO OPPORTUNITIES</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">FRONT-END DEVELOPER <span>—</span> PUNE, INDIA</p>
          <h1>Thoughtful<br/><em>interfaces.</em><br/>Solid front-end.</h1>
          <p className="hero-intro">I’m Bhavesh Kolhe. I build clear, responsive web experiences with attention to the details people notice — and the ones they don’t.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">Explore my work <ArrowUpRight size={16}/></a>
            <a className="text-link" href="#contact">Get in touch <ArrowDownRight size={16}/></a>
          </div>
        </div>
        <div className="portrait-wrap">
          <div className="portrait-frame">
            <img src="/bhavesh-portrait.webp" alt="Bhavesh Kolhe wearing a black suit and white shirt" />
          </div>
          <div className="portrait-caption"><span>BHAVESH KOLHE</span><span>FRONT-END DEVELOPER · INDIA</span></div>
          <span className="portrait-index">FIG. 01</span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>DESIGN-MINDED DEVELOPMENT</span>
        <a href="#about">SCROLL TO DISCOVER <ArrowDownRight size={14}/></a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel>
      <div className="about-content">
        <h2>Good interfaces feel<br/> <span>effortless.</span> Getting there<br/>takes intention.</h2>
        <div className="about-detail">
          <p className="lead">I’m a front-end developer based in Pune, Maharashtra, focused on turning ideas into accessible, useful and well-crafted digital experiences.</p>
          <p>I care about the relationship between design and code: considered spacing, readable typography, purposeful interactions and interfaces that work just as well on a phone as they do on a desktop.</p>
          <a className="inline-link" href="mailto:bhaveshkolhe275@gmail.com">Start a conversation <ArrowUpRight size={16}/></a>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="section work-section" id="work">
      <SectionLabel number="02">SELECTED WORK</SectionLabel>
      <div className="section-heading-row">
        <h2>A few things<br/><em>made with care.</em></h2>
        <p>Selected projects will live here.<br/>Replace the sample entries with real work.</p>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project" key={project.number}>
            <a className={project.className} href={project.link} aria-label={`Discuss ${project.title}`}>
              <span className="art-top"><span>BK / WORK</span><span>{project.year}</span></span>
              <span className="art-center">{project.initials}</span>
              <span className="art-bottom"><span>SELECTED PROJECT</span><ArrowUpRight size={20}/></span>
            </a>
            <div className="project-info">
              <div className="project-meta"><span>{project.number} / {project.type}</span><span>{project.year}</span></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
      <p className="work-note">NOTE: These are editable placeholders, not claimed client projects.</p>
    </section>
  );
}

function Approach() {
  const principles = [
    ["01", "Clarity over clutter", "Every element should have a reason to be on the page. I aim for hierarchy that makes the next step obvious."],
    ["02", "Responsive by default", "A considered experience should feel natural across screen sizes, input methods and real-world conditions."],
    ["03", "Details matter", "From semantic markup to hover feedback, the small decisions add up to a more coherent product."]
  ];
  return (
    <section className="section approach-section" id="approach">
      <SectionLabel number="03">HOW I THINK</SectionLabel>
      <div className="approach-grid">
        <div><h2>Make it work.<br/><em>Make it clear.</em><br/>Make it last.</h2></div>
        <div className="principles">
          {principles.map(([n, title, body]) => <div className="principle" key={n}>
            <span>{n}</span><div><h3>{title}</h3><p>{body}</p></div>
          </div>)}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills-section">
      <SectionLabel number="04">TOOLS & SKILLS</SectionLabel>
      <div className="skills-layout">
        <h2>The toolkit<br/><em>behind the work.</em></h2>
        <div className="skills-list">{skills.map((skill, i) => <div key={skill}><span>0{i + 1}</span><b>{skill}</b><ArrowUpRight size={15}/></div>)}</div>
      </div>
      <p className="skills-note">Edit this list to match Bhavesh’s actual experience and proficiency.</p>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact-section" id="contact">
      <div className="contact-top"><SectionLabel number="05">CONTACT</SectionLabel><span>GOOD WORK STARTS WITH A CONVERSATION.</span></div>
      <h2>Have something<br/><em>in mind?</em></h2>
      <a className="contact-email" href="mailto:bhaveshkolhe275@gmail.com">bhaveshkolhe275@gmail.com <ArrowUpRight size={22}/></a>
      <div className="contact-bottom">
        <div className="contact-details">
          <a href="tel:+917758089432">+91 77580 89432</a>
          <span>Pune, Maharashtra, India</span>
        </div>
        <div className="socials">
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a>
          <a href="mailto:bhaveshkolhe275@gmail.com" aria-label="Email"><Mail size={18}/></a>
        </div>
        <span className="copyright">© 2026 BHAVESH KOLHE</span>
      </div>
    </footer>
  );
}

function App() {
  return <><Header/><main><Hero/><About/><Work/><Approach/><Skills/></main><Contact/></>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);