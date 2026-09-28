"use client";

import { useEffect, useState } from "react";
import WaveField from "./WaveField";

type Language = "es" | "en";
type Theme = "dark" | "light";

const KOSMA_AGENT_URL = "https://kosma-agent-v1.jotapol.chatgpt.site/";
const KOSMA_WHATSAPP_NUMBER = "573216444807";

const content = {
  es: {
    hero: {
      eyebrow: "CONSTRUIR · SINCRONIZAR · CALIBRAR",
      signals: ["CONSTRUIR", "SINCRONIZAR", "CALIBRAR"],
      title: "COMPLEJIDAD,\nEN ORDEN.",
      body: "Hacemos que tu operación crezca sin que el desorden crezca con ella.",
      cta: "Calibremos el sistema",
      whatsappMessage: "Hola, llegué desde la web de Kosma y quisiera conversar sobre cómo calibrar el sistema de mi empresa.",
      scroll: "Explorar el sistema",
    },
    products: {
      kicker: "LO QUE CONSTRUIMOS",
      items: [
        ["01", "OPERACIÓN + AUTOMATIZACIÓN", "Encontramos dónde el crecimiento consume tiempo, personas o capacidad y construimos el sistema que lo resuelve."],
        ["02", "SISTEMAS CONECTADOS", "Conectamos herramientas, datos y procesos para eliminar trabajo manual entre áreas y hacer que la operación funcione como un sistema."],
        ["03", "IA APLICADA A TU OPERACIÓN", "Construimos automatizaciones y agentes para la lógica particular de tu empresa, donde las herramientas estándar ya no alcanzan."],
      ],
      secondary: "WHITE-LABEL / Construimos la capa técnica para consultoras, agencias y partners.",
    },
    about: {
      kicker: "ABOUT KOSMA",
      title: "Hacemos que tu operación crezca sin que el desorden crezca con ella.",
    },
    team: {
      kicker: "TEAM / 04",
      title: "ESTOS SOMOS.",
      members: [
        {
          index: "TEAM / 01",
          name: "SEBASTIAN",
          role: "CREATIVE DIRECTOR & TECHNOLOGIST",
          bio: "Director creativo y tecnólogo que une diseño, animación, storytelling y tecnología emergente para convertir ideas complejas en experiencias claras.",
          image: "/team/sebastian.webp",
        },
        {
          index: "TEAM / 02",
          name: "POL",
          role: "PRODUCT & PROJECT MANAGER",
          bio: "Product & Project Manager enfocado en convertir ideas complejas en hojas de ruta claras, equipos alineados y sistemas que hacen avanzar el trabajo.",
          image: "/team/juan-friendly-glasses-v2.webp",
        },
        {
          index: "TEAM / 03",
          name: "AMAURY",
          role: "FULL-STACK & AI ENGINEER",
          bio: "Ingeniero full-stack con experiencia en investigación computacional, construyendo sistemas inteligentes, modelos predictivos y productos digitales confiables.",
          image: "/team/amaury.webp",
        },
        {
          index: "TEAM / 04",
          name: "ANDRÉS",
          role: "SENIOR FULL-STACK AI ENGINEER",
          bio: "Ingeniero full-stack senior que combina arquitectura de software, nube e IA para construir sistemas escalables, rápidos y confiables.",
          image: "/team/andres.webp",
        },
      ],
    },
    questions: {
      kicker: "TE HAS PREGUNTADO",
      items: [
        "¿Qué tendrías que contratar, pagar o sacrificar si mañana tu operación creciera al doble?",
        "¿Cuánto tiempo pierde tu equipo moviendo información entre herramientas que no se hablan?",
        "¿Qué parte de tu operación se detendría si mañana faltara una persona clave?",
      ],
      source: "Preguntas construidas a partir de una primera encuesta a cerca de 30 pymes en Antioquia.",
    },
    contact: {
      kicker: "WE’VE GOT YOUR BACK.",
      title: "¿NO SABES POR DÓNDE EMPEZAR?",
      body: "Calibremos el punto de partida.",
      action: "Habla con Kosma",
      note: "Canal de contacto · Kosma Agent",
    },
    footer: "Kosmos significaba orden antes que universo. Nosotros lo convertimos en sistemas que siguen funcionando.",
    labels: { theme: "Cambiar tema", language: "Cambiar idioma", skip: "Ir al contenido" },
  },
  en: {
    hero: {
      eyebrow: "BUILD · SYNCHRONIZE · CALIBRATE",
      signals: ["BUILD", "SYNCHRONIZE", "CALIBRATE"],
      title: "COMPLEXITY.\nORGANIZED.",
      body: "We help your operation grow without adding disorder.",
      cta: "Calibrate the system",
      whatsappMessage: "Hello, I came from Kosma’s website and would like to talk about calibrating my company’s system.",
      scroll: "Explore the system",
    },
    products: {
      kicker: "WHAT WE BUILD",
      items: [
        ["01", "OPERATIONS + AUTOMATION", "We find where growth is consuming time, people, or capacity and build the system that solves it."],
        ["02", "CONNECTED SYSTEMS", "We connect tools, data, and processes to eliminate manual work between teams and make operations work as one system."],
        ["03", "AI APPLIED TO YOUR OPERATION", "We build automations and agents around the particular logic of your business, where standard tools fall short."],
      ],
      secondary: "WHITE-LABEL / We build the technical layer for consulting firms, agencies, and partners.",
    },
    about: {
      kicker: "ABOUT KOSMA",
      title: "We help your operation grow without adding disorder.",
    },
    team: {
      kicker: "TEAM / 04",
      title: "THIS IS US.",
      members: [
        {
          index: "TEAM / 01",
          name: "SEBASTIAN",
          role: "CREATIVE DIRECTOR & TECHNOLOGIST",
          bio: "Creative director and technologist connecting design, animation, storytelling, and emerging technology to turn complex ideas into clear experiences.",
          image: "/team/sebastian.webp",
        },
        {
          index: "TEAM / 02",
          name: "POL",
          role: "PRODUCT & PROJECT MANAGER",
          bio: "Product & Project Manager focused on turning complex ideas into clear roadmaps, aligned teams, and systems that move work forward.",
          image: "/team/juan-friendly-glasses-v2.webp",
        },
        {
          index: "TEAM / 03",
          name: "AMAURY",
          role: "FULL-STACK & AI ENGINEER",
          bio: "Full-stack engineer with experience in computational research, building intelligent systems, predictive models, and reliable digital products.",
          image: "/team/amaury.webp",
        },
        {
          index: "TEAM / 04",
          name: "ANDRÉS",
          role: "SENIOR FULL-STACK AI ENGINEER",
          bio: "Senior full-stack AI engineer combining software architecture, cloud infrastructure, and AI to build scalable, high-performance systems.",
          image: "/team/andres.webp",
        },
      ],
    },
    questions: {
      kicker: "HAVE YOU EVER WONDERED",
      items: [
        "What would you have to hire, pay for, or sacrifice if your operation doubled tomorrow?",
        "How much time does your team lose moving information between tools that don’t talk to each other?",
        "Which part of your operation would stop if a key person were unavailable tomorrow?",
      ],
      source: "Questions built from an initial survey of around 30 SMEs in Antioquia.",
    },
    contact: {
      kicker: "WE’VE GOT YOUR BACK.",
      title: "NOT SURE WHERE TO START?",
      body: "Let’s calibrate the starting point.",
      action: "Talk to Kosma",
      note: "Contact channel · Kosma Agent",
    },
    footer: "Kosmos meant order before it meant universe. We turn it into systems that keep working.",
    labels: { theme: "Switch theme", language: "Change language", skip: "Skip to content" },
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [theme, setTheme] = useState<Theme>("dark");
  const t = content[language];
  const whatsappUrl = `https://wa.me/${KOSMA_WHATSAPP_NUMBER}?text=${encodeURIComponent(t.hero.whatsappMessage)}`;

  useEffect(() => {
    const iconHref = theme === "dark" ? "/kosma-tab-dark-v4.png" : "/kosma-tab-light-v4.png";
    document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]').forEach((link) => {
      link.href = iconHref;
    });
  }, [theme]);

  return (
    <div className="site-shell" data-theme={theme}>
      <a className="skip-link" href="#contenido">{t.labels.skip}</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Kosma — inicio">
          <img src="/kosma-logo.svg" alt="Kosma" />
        </a>
        <div className="header-actions">
          <button
            className="theme-switch"
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t.labels.theme}
          >
            <span aria-hidden="true">{theme === "dark" ? "○" : "●"}</span>
          </button>
          <div className="language-switch" aria-label={t.labels.language}>
            <button className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")} aria-pressed={language === "es"}>ES</button>
            <span>/</span>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
          </div>
        </div>
      </header>

      <main id="contenido">
        <section className="hero" id="top">
          <WaveField theme={theme} />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="hero-body">{t.hero.body}</p>
            <a
              className="button hero-button"
              href={whatsappUrl}
              aria-label={language === "es" ? "Conversar con Kosma por WhatsApp" : "Talk to Kosma on WhatsApp"}
            >
              {t.hero.cta}<span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-side" aria-hidden="true">{t.hero.signals.map((signal) => <span key={signal}>{signal}</span>)}</div>
          <a className="scroll-cue" href="#productos">{t.hero.scroll}<span aria-hidden="true">↓</span></a>
        </section>

        <section className="info-strip" id="productos">
          <article className="info-panel about-panel">
            <p className="kicker">{t.about.kicker}</p>
            <h2>{t.about.title}</h2>
          </article>

          <article className="info-panel services-panel">
            <div className="services-heading">
              <p className="kicker">{t.products.kicker}</p>
            </div>
            <div className="compact-services">
              {t.products.items.map(([number, title, body]) => (
                <div className="compact-service" key={number}>
                  <span className={`service-symbol service-symbol-${number}`} aria-hidden="true">
                    {number === "01" && <><i /><i /><i /><i /></>}
                    {number === "02" && <><i /><i /><i /></>}
                    {number === "03" && <><i /><i /></>}
                  </span>
                  <span className="item-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <p className="services-secondary">{t.products.secondary}</p>
          </article>

          <article className="info-panel compact-question-panel" id="preguntas">
            <p className="kicker">{t.questions.kicker}</p>
            <div className="compact-questions">
              {t.questions.items.map((question, index) => (
                <p key={question}><span>0{index + 1}</span>{question}</p>
              ))}
            </div>
          </article>
        </section>

        <section className="team" id="equipo">
          <div className="team-heading">
            <p className="kicker">{t.team.kicker}</p>
            <h2>{t.team.title}</h2>
          </div>
          <div className="team-grid">
            {t.team.members.map((member) => (
              <article className={`team-card${member.image ? "" : " team-card-empty"}`} key={member.name}>
                {member.image && (
                  <div className="team-card-image">
                    <img src={member.image} alt={`${member.name}, ${member.role} at Kosma`} />
                  </div>
                )}
                <span className="team-card-index">{member.name}</span>
                <div className="team-card-copy">
                  {member.role && <p className="member-role">{member.role}</p>}
                  {member.bio && <p className="member-bio">{member.bio}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contacto">
          <div className="contact-copy">
            <p className="kicker">{t.contact.kicker}</p>
            <h2>{t.contact.title}</h2>
            <a className="contact-body contact-inline-link" href={KOSMA_AGENT_URL}>{t.contact.body}</a>
          </div>
          <div className="contact-action">
            <a className="button contact-button" href={KOSMA_AGENT_URL}>{t.contact.action}<span aria-hidden="true">↗</span></a>
            <span>{t.contact.note}</span>
            <div className="social-links" aria-label={language === "es" ? "Redes sociales" : "Social media"}>
              <a className="social-link" href="https://www.linkedin.com/company/wekosma" target="_blank" rel="noreferrer" title="Kosma en LinkedIn" aria-label={language === "es" ? "Visitar Kosma en LinkedIn" : "Visit Kosma on LinkedIn"}>
                <img src="/icons/linkedin.svg" alt="" />
              </a>
              <a className="social-link" href="https://www.instagram.com/wekosma/" target="_blank" rel="noreferrer" title="Kosma en Instagram" aria-label={language === "es" ? "Visitar Kosma en Instagram" : "Visit Kosma on Instagram"}>
                <img src="/icons/instagram.svg" alt="" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <img className="footer-logo" src="/kosma-logo.svg" alt="Kosma" />
        <p>{t.footer}</p>
        <div className="footer-meta">
          <a className="footer-email" href="mailto:hello@wearekosma.com">hello@wearekosma.com</a>
          <div className="social-links footer-socials" aria-label={language === "es" ? "Redes sociales" : "Social media"}>
            <a className="social-link" href="https://www.linkedin.com/company/wekosma" target="_blank" rel="noreferrer" title="Kosma en LinkedIn" aria-label={language === "es" ? "Visitar Kosma en LinkedIn" : "Visit Kosma on LinkedIn"}>
              <img src="/icons/linkedin.svg" alt="" />
            </a>
            <a className="social-link" href="https://www.instagram.com/wekosma/" target="_blank" rel="noreferrer" title="Kosma en Instagram" aria-label={language === "es" ? "Visitar Kosma en Instagram" : "Visit Kosma on Instagram"}>
              <img src="/icons/instagram.svg" alt="" />
            </a>
          </div>
          <span>© 2026 KOSMA</span>
        </div>
      </footer>
    </div>
  );
}
