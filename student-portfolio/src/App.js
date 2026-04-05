import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./App.css";
import Cursor from "./components/Cursor";
import { useEffect } from "react";
import { useRef } from "react";

function MagneticIcon({ children }) {
  const ref = useRef();
  useMagnetic(ref);

  return (
    <div ref={ref} className="magnetic">
      {children}
    </div>
  );
}

function useMagnetic(ref) {
  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const reset = () => {
      el.style.transform = "translate(0px, 0px)";
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, [ref]);
}
export default function App() {
  return (
    <>
      <Cursor />
    <div className="app">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      {/* NAV */}
      <nav className="nav">
        <h2 className="logo">Gogo.dev</h2>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <motion.section
  className="section"
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
>
        <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}}>
          Building <span>Intelligent</span> Systems with Precision
        </motion.h1>
        <p>Machine Learning Engineer • Full Stack Developer</p>

        <div className="icons">
          <MagneticIcon><FaGithub /></MagneticIcon>
          <MagneticIcon><FaLinkedin /></MagneticIcon>
          <MagneticIcon><FaEnvelope /></MagneticIcon>
        </div>
      </motion.section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I work on machine learning systems with a focus on real-world
          applications. My work includes NLP classification models, stock
          prediction systems, and deepfake detection using transformers.
          I enjoy building efficient, scalable solutions and translating
          complex ideas into usable products.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2>Projects</h2>

        <div className="grid">
          <Card
            title="Sentiment Classification System"
            desc="TF-IDF + Logistic Regression model for multi-class emotional detection with preprocessing pipeline."
          />
          <Card
            title="Stock Market Prediction"
            desc="Regression + classification models using KNN, SVM with hyperparameter tuning and evaluation metrics."
          />
          <Card
            title="Deepfake Detection"
            desc="Vision Transformer-based model for detecting manipulated media with attention mechanisms."
          />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <h2>Skills</h2>

        <div className="skills">
          <Skill name="Machine Learning" />
          <Skill name="NLP (TF-IDF, LR)" />
          <Skill name="SVM / KNN / Decision Trees" />
          <Skill name="React.js" />
          <Skill name="Python / Scikit-learn" />
          <Skill name="Data Analysis & Visualization" />
        </div>
      </section>

      {/* EXPERIENCE STYLE */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        >
        <h2>Work Focus</h2>
        <p>
          - Model building & evaluation (F1, ROC, Accuracy)  
          - Feature engineering & preprocessing  
          - Cross-validation & hyperparameter tuning  
          - Frontend integration of ML models  
        </p>
      </motion.section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <h2>Contact</h2>
        <p>Email: you@example.com</p>
      </section>
    </div>
    </>
  );
}

function Card({ title, desc }) {
  const ref = useRef();

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * 10;

    ref.current.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const reset = () => {
    ref.current.style.transform = "rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      className="card"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Skill({ name }) {
  return <div className="skill">{name}</div>;
}