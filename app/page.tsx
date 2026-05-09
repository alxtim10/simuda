"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const PROGRAMS = [
  {
    icon: "🎨",
    title: "Creative Arts",
    desc: "Music, digital media, and performance — express yourself through every medium imaginable.",
    color: "#FF3CAC",
    bg: "linear-gradient(135deg, #FF3CAC22, #FF3CAC05)",
  },
  {
    icon: "👥",
    title: "Community Impact",
    desc: "Real change starts with one determined person.",
    color: "#00FFB2",
    bg: "linear-gradient(135deg, #00FFB222, #00FFB205)",
  },
  {
    icon: "🎤",
    title: "Leadership & Voice",
    desc: "Public speaking and group discussions. Make your voice impossible to ignore.",
    color: "#FF6B35",
    bg: "linear-gradient(135deg, #FF6B3522, #FF6B3505)",
  },
  {
    icon: "⚡",
    title: "Sports & Wellness",
    desc: "Team sports, mindfulness, nutrition coaching. Every body, every level, every goal.",
    color: "#7B61FF",
    bg: "linear-gradient(135deg, #7B61FF22, #7B61FF05)",
  },
  {
    icon: "🌍",
    title: "Global Exchange",
    desc: "Connect, collaborate, and co-create with youth communities across the world.",
    color: "#00C6FF",
    bg: "linear-gradient(135deg, #00C6FF22, #00C6FF05)",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState({ members: 0, programs: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = { members: 100, programs: 6 };
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount({
        members: Math.round(targets.members * ease),
        programs: Math.round(targets.programs * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const about = useInView();
  const programs = useInView();
  const contact = useInView();

  return (
    <main style={{ fontFamily: "'Syne', sans-serif", background: "#050505", color: "#F0EDE6", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Epilogue:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #FF6B35; }

        @keyframes float-a { 0%,100%{transform:translateY(0) rotate(0deg) scale(1)} 33%{transform:translateY(-28px) rotate(4deg) scale(1.04)} 66%{transform:translateY(-14px) rotate(-2deg) scale(0.98)} }
        @keyframes float-b { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(-5deg)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes gradient-shift {
          0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%}
        }
        @keyframes noise {
          0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(3%,2%)}
          30%{transform:translate(-1%,4%)} 40%{transform:translate(4%,-1%)} 50%{transform:translate(-3%,3%)}
          60%{transform:translate(2%,-4%)} 70%{transform:translate(-4%,1%)} 80%{transform:translate(1%,-2%)} 90%{transform:translate(3%,3%)}
        }

        .reveal { opacity:0; transform:translateY(60px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity:1; transform:translateY(0); }
        .d1{transition-delay:0.05s} .d2{transition-delay:0.12s} .d3{transition-delay:0.2s}
        .d4{transition-delay:0.28s} .d5{transition-delay:0.36s} .d6{transition-delay:0.44s}

        .prog-card { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease; cursor: pointer; }
        .prog-card:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 24px 60px rgba(0,0,0,0.4); }

        .nav-pill { transition: color 0.2s ease; }
        .nav-pill:hover { color: #FF6B35 !important; }

        .hero-gradient-text {
          background: linear-gradient(90deg, #FF6B35, #FF3CAC, #FAFF00, #00FFB2, #FF6B35);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }

        .cta-primary {
          position: relative; overflow: hidden; cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
          z-index: 0;
        }
        .cta-primary:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 20px 50px rgba(255,107,53,0.45) !important; }
        .cta-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, #FF6B35, #FF3CAC, #FF6B35);
          background-size: 200% 100%; animation: gradient-shift 2.5s ease infinite;
          z-index: -1;
        }

        .cta-ghost { transition: all 0.25s ease; cursor: pointer; }
        .cta-ghost:hover { background: rgba(255,107,53,0.1) !important; border-color: #FF6B35 !important; color: #FF6B35 !important; transform: translateY(-2px); }

        .input-field { transition: border-color 0.2s, box-shadow 0.2s; outline: none; }
        .input-field:focus { border-color: #FF6B35 !important; box-shadow: 0 0 0 3px rgba(255,107,53,0.15) !important; }

        .noise-overlay {
          position: fixed; inset: -50%; width: 200%; height: 200%;
          opacity: 0.025; pointer-events: none; z-index: 9999;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: noise 0.5s steps(2) infinite;
        }

        @media(max-width:768px){
          .two-col{grid-template-columns:1fr !important}
          .three-col{grid-template-columns:1fr 1fr !important}
          .stats-row{grid-template-columns:1fr 1fr !important; gap:32px !important}
          .hide-mobile{display:none !important}
          .hero-btns{flex-direction:column !important}
        }
      `}</style>

      <div className="noise-overlay" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? "12px 40px" : "24px 40px",
        background: scrolled ? "rgba(5,5,5,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* <div style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.04em", cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <span style={{ color: "#FF6B35" }}>●</span> Youth<span style={{ color: "#FF6B35" }}>.</span>
        </div> */}
        <div>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </div>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {["About", "Programs", "Contact"].map(l => (
            <button key={l} className="nav-pill" onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none", color: "rgba(240,237,230,0.6)",
              cursor: "pointer", fontSize: "0.88rem", fontWeight: 500,
              fontFamily: "Epilogue, sans-serif", letterSpacing: "0.02em",
            }}>{l}</button>
          ))}
          <button className="cta-primary" onClick={() => scrollTo("contact")} style={{
            background: "none", border: "none", color: "#fff",
            borderRadius: "100px", padding: "10px 24px", fontSize: "0.85rem", fontWeight: 700,
          }}>Join Us →</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "140px 40px 80px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255,60,172,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 20% 80%, rgba(0,255,178,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 60% 60%, rgba(255,107,53,0.1) 0%, transparent 60%)
          `,
        }} />

        {/* Floating shapes */}
        <div style={{
          position: "absolute", top: "15%", right: "8%", width: 220, height: 220,
          border: "1px solid rgba(255,107,53,0.2)", borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          animation: "float-a 7s ease-in-out infinite", pointerEvents: "none",
          background: "radial-gradient(circle at 30% 30%, rgba(255,107,53,0.06), transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "20%", left: "3%", width: 140, height: 140,
          border: "1px solid rgba(250,255,0,0.15)", borderRadius: "50%",
          animation: "float-b 9s ease-in-out infinite", pointerEvents: "none",
        }} />
        <div className="hide-mobile" style={{
          position: "absolute", top: "40%", right: "18%", width: 80, height: 80,
          border: "1px solid rgba(0,255,178,0.2)", borderRadius: 8,
          animation: "float-a 5s 1s ease-in-out infinite", pointerEvents: "none",
          transform: "rotate(30deg)",
        }} />

        {/* Spinning text ring */}
        <div className="hide-mobile" style={{
          position: "absolute", top: "12%", right: "14%",
          width: 120, height: 120, animation: "spin 20s linear infinite", pointerEvents: "none",
        }}>
          <svg viewBox="0 0 120 120" width="120" height="120">
            <defs><path id="ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
            <text fontSize="10.5" fill="rgba(255,107,53,0.45)" fontFamily="Syne" letterSpacing="4.5" fontWeight="700">
              <textPath href="#ring">YOUTH COMMUNITY • BOLD • LOUD • </textPath>
            </text>
          </svg>
        </div>

        <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%", position: "relative" }}>
          {/* Live badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.25)",
            borderRadius: 100, padding: "8px 18px", marginBottom: 40,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "#FF6B35",
              display: "block", boxShadow: "0 0 8px #FF6B35", animation: "blink 1.5s ease-in-out infinite",
            }} />
            <span style={{ fontFamily: "Epilogue, sans-serif", fontSize: "0.78rem", color: "#FF6B35", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
              Open for new members — 2026
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(3.4rem, 11vw, 10rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.88, marginBottom: 40 }}>
            <span style={{ display: "block", color: "#F0EDE6" }}>Soli</span>
            <span style={{ display: "block", color: "#F0EDE6" }}>Deo</span>
            <span className="hero-gradient-text" style={{ display: "block" }}>Gloria</span>
          </h1>

          <div className="hero-btns" style={{ display: "flex", alignItems: "flex-start", gap: 48, flexWrap: "wrap" }}>
            <p style={{
              fontFamily: "Epilogue, sans-serif", fontWeight: 300,
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)", color: "rgba(240,237,230,0.55)",
              maxWidth: 420, lineHeight: 1.8, flex: "1 1 300px",
            }}>
              A movement-driven community where young people don't wait for permission — they take the mic, write the code, and lead the change.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: "0 0 auto" }}>
              <button className="cta-primary" onClick={() => scrollTo("programs")} style={{
                background: "none", border: "none", color: "#fff",
                borderRadius: 14, padding: "18px 44px", fontSize: "1rem", fontWeight: 700,
              }}>
                Explore Programs →
              </button>
              <button className="cta-ghost" onClick={() => scrollTo("about")} style={{
                background: "transparent", border: "1px solid rgba(240,237,230,0.15)",
                color: "rgba(240,237,230,0.6)", borderRadius: 14, padding: "18px 44px",
                fontSize: "0.95rem", fontFamily: "Epilogue, sans-serif", fontWeight: 400,
              }}>
                Our Story ↓
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row" style={{
            display: "grid", gridTemplateColumns: "repeat(3, auto)",
            gap: "0 56px", marginTop: 96,
            borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 48,
            width: "fit-content",
          }}>
            {[
              [count.members.toLocaleString() + "+", "Youth Members"],
              [count.programs.toString(), "Core Programs"],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "Epilogue, sans-serif", fontSize: "0.8rem", color: "rgba(240,237,230,0.4)", marginTop: 6, letterSpacing: "0.04em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{
        overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,107,53,0.03)", padding: "16px 0",
      }}>
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", width: "max-content" }}>
          {Array(10).fill(null).map((_, i) => (
            <span key={i} style={{
              fontFamily: "Epilogue, sans-serif", fontSize: "0.82rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: i % 3 === 0 ? "#FF6B35" : i % 3 === 1 ? "#FF3CAC" : "rgba(240,237,230,0.2)",
              padding: "0 36px", fontWeight: 500,
            }}>
              {["BE THE CHANGE ✦", "YOUTH POWER ✦", "SPEAK UP ✦", "CREATE IMPACT ✦", "LEAD NOW ✦"][i % 5]}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ padding: "140px 40px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div ref={about.ref} className="two-col" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className={`reveal ${about.inView ? "in" : ""}`} style={{ marginBottom: 16 }}>
                <span style={{ fontFamily: "Epilogue, sans-serif", fontSize: "0.78rem", color: "#FF6B35", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>Our Story</span>
              </div>
              <h2 className={`reveal d1 ${about.inView ? "in" : ""}`} style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800,
                letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 32,
              }}>
                Built by youth.<br />
                <span style={{ WebkitTextStroke: "1px rgba(255,107,53,0.7)", WebkitTextFillColor: "transparent", color: "transparent" }}>
                  Powered by fire.
                </span>
              </h2>
              <p className={`reveal d2 ${about.inView ? "in" : ""}`} style={{
                fontFamily: "Epilogue, sans-serif", fontWeight: 300,
                color: "rgba(240,237,230,0.55)", lineHeight: 1.85, fontSize: "1rem", marginBottom: 24,
              }}>
                We started in 2022 with 5 young adult in a small room. Today we're a network of over 100 young leaders who refused to wait for permission to change their world.
              </p>
              <p className={`reveal d3 ${about.inView ? "in" : ""}`} style={{
                fontFamily: "Epilogue, sans-serif", fontWeight: 300,
                color: "rgba(240,237,230,0.55)", lineHeight: 1.85, fontSize: "1rem", marginBottom: 48,
              }}>
                Every program is co-designed with youth, not just for them. We believe in loud ideas, messy creativity, and real impact — not polished presentations for boardrooms.
              </p>
              <button className={`cta-primary reveal d4 ${about.inView ? "in" : ""}`} onClick={() => scrollTo("programs")} style={{
                background: "none", border: "none", color: "#fff",
                borderRadius: 12, padding: "16px 36px", fontSize: "0.95rem", fontWeight: 700,
              }}>
                See Our Programs →
              </button>
            </div>

            {/* Card stack */}
            <div className={`reveal d2 ${about.inView ? "in" : ""}`} style={{ position: "relative", height: 460 }}>
              <div style={{
                position: "absolute", top: 30, left: 30, right: -10, height: 380, borderRadius: 24,
                background: "linear-gradient(135deg, rgba(255,60,172,0.12), rgba(123,97,255,0.08))",
                border: "1px solid rgba(255,60,172,0.15)", transform: "rotate(-4deg)",
              }} />
              <div style={{
                position: "absolute", top: 15, left: 15, right: -5, height: 390, borderRadius: 24,
                background: "linear-gradient(135deg, rgba(0,255,178,0.08), rgba(0,198,255,0.06))",
                border: "1px solid rgba(0,255,178,0.12)", transform: "rotate(-1.5deg)",
              }} />
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 400, borderRadius: 24,
                background: "linear-gradient(135deg, #111111, #0d0d0d)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                padding: 36, overflow: "hidden",
              }}>
                <div style={{ fontSize: "4rem" }}>🔥</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.04em", marginBottom: 8 }}>15+ Years<br />of Real Impact</div>
                  <div style={{ fontFamily: "Epilogue, sans-serif", fontWeight: 300, color: "rgba(240,237,230,0.45)", fontSize: "0.9rem" }}>100+ members. Countless stories.</div>
                </div>
                <div style={{
                  position: "absolute", bottom: -40, right: -40, width: 200, height: 200, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%)", pointerEvents: "none",
                }} />
              </div>
              <div style={{
                position: "absolute", bottom: 50, right: -20, zIndex: 10,
                background: "#111", border: "1px solid rgba(250,255,0,0.25)", borderRadius: 16, padding: "16px 20px",
              }}>
                <div style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.04em", color: "#FAFF00" }}>98%</div>
                <div style={{ fontFamily: "Epilogue, sans-serif", fontSize: "0.75rem", color: "rgba(240,237,230,0.4)", marginTop: 2 }}>Would recommend</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" style={{ padding: "140px 40px", background: "#080808" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div ref={programs.ref}>
            <div className={`reveal ${programs.inView ? "in" : ""}`} style={{ marginBottom: 12 }}>
              <span style={{ fontFamily: "Epilogue, sans-serif", fontSize: "0.78rem", color: "#FF6B35", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>What We Do</span>
            </div>
            <div className={`reveal d1 ${programs.inView ? "in" : ""}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, flexWrap: "wrap", gap: 24 }}>
              <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
                Six pathways.<br />Zero excuses.
              </h2>
              <p style={{ fontFamily: "Epilogue, sans-serif", fontWeight: 300, color: "rgba(240,237,230,0.45)", maxWidth: 300, lineHeight: 1.75, fontSize: "0.95rem" }}>
                Find the program that makes you forget to check your phone.
              </p>
            </div>

            <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {PROGRAMS.map((p, i) => (
                <div key={p.title} className={`prog-card reveal d${i + 1} ${programs.inView ? "in" : ""}`} style={{
                  background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: p.color, borderRadius: "20px 20px 0 0" }} />
                  <div style={{ fontSize: "2rem", marginBottom: 20 }}>{p.icon}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontFamily: "Epilogue, sans-serif", fontWeight: 300, color: "rgba(240,237,230,0.5)", fontSize: "0.88rem", lineHeight: 1.7 }}>{p.desc}</p>
                  {/* <div style={{ marginTop: 24, fontSize: "0.82rem", color: p.color, fontWeight: 600, letterSpacing: "0.04em", fontFamily: "Epilogue, sans-serif" }}>
                    Learn more →
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "140px 40px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div ref={contact.ref} className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <div className={`reveal ${contact.inView ? "in" : ""}`} style={{ marginBottom: 16 }}>
                <span style={{ fontFamily: "Epilogue, sans-serif", fontSize: "0.78rem", color: "#FF6B35", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>Get Involved</span>
              </div>
              <h2 className={`reveal d1 ${contact.inView ? "in" : ""}`} style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800,
                letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 28,
              }}>
                Ready to<br />make noise?
              </h2>
              <p className={`reveal d2 ${contact.inView ? "in" : ""}`} style={{
                fontFamily: "Epilogue, sans-serif", fontWeight: 300,
                color: "rgba(240,237,230,0.5)", lineHeight: 1.85, fontSize: "1rem", marginBottom: 56,
              }}>
                Whether you're 14 or 24, a creator, a coder, a leader-in-waiting — there's a place here for you. Come as you are. Leave louder.
              </p>
              <div className={`reveal d3 ${contact.inView ? "in" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  ["📍", "Community Hub, Youth District"],
                  ["📧", "hello@youthcommunity.org"],
                  ["📞", "+1 (800) YOUTH-01"],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, background: "rgba(255,107,53,0.08)",
                      border: "1px solid rgba(255,107,53,0.15)", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0,
                    }}>{icon}</div>
                    <span style={{ fontFamily: "Epilogue, sans-serif", fontWeight: 300, color: "rgba(240,237,230,0.55)", fontSize: "0.9rem" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`reveal d2 ${contact.inView ? "in" : ""}`} style={{
              background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 24, padding: "44px 40px",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {["First Name", "Last Name"].map(ph => (
                    <input key={ph} placeholder={ph} className="input-field" style={{
                      background: "#111", border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 12, padding: "14px 16px", color: "#F0EDE6",
                      fontSize: "0.9rem", fontFamily: "Epilogue, sans-serif",
                    }} />
                  ))}
                </div>
                <input placeholder="Email Address" type="email" className="input-field" style={{
                  background: "#111", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "14px 16px", color: "#F0EDE6",
                  fontSize: "0.9rem", fontFamily: "Epilogue, sans-serif",
                }} />
                <select className="input-field" style={{
                  background: "#111", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "14px 16px", color: "rgba(240,237,230,0.5)",
                  fontSize: "0.9rem", fontFamily: "Epilogue, sans-serif", cursor: "pointer",
                }}>
                  <option value="">Interested in...</option>
                  {PROGRAMS.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
                  <option value="partnership">Partnership / Collaboration</option>
                </select>
                <textarea placeholder="Tell us about yourself..." rows={4} className="input-field" style={{
                  background: "#111", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "14px 16px", color: "#F0EDE6",
                  fontSize: "0.9rem", fontFamily: "Epilogue, sans-serif", resize: "vertical",
                }} />
                <button className="cta-primary" style={{
                  background: "none", border: "none", color: "#fff",
                  borderRadius: 12, padding: "17px", fontSize: "0.95rem", fontWeight: 700, marginTop: 4,
                }}>
                  Send It →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20,
      }}>
        <div style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.04em" }}>
          <span style={{ color: "#FF6B35" }}>●</span> Youth<span style={{ color: "#FF6B35" }}>.</span>
        </div>
        <div style={{ fontFamily: "Epilogue, sans-serif", fontSize: "0.78rem", color: "rgba(240,237,230,0.25)", letterSpacing: "0.04em" }}>
          © 2026 Youth Community. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["About", "Programs", "Contact"].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none", color: "rgba(240,237,230,0.3)",
              cursor: "pointer", fontSize: "0.82rem", fontFamily: "Epilogue, sans-serif",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#FF6B35")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,237,230,0.3)")}>
              {l}
            </button>
          ))}
        </div>
      </footer>
    </main>
  );
}
