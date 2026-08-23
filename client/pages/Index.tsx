import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Menu,
  Play,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const artwork = {
  proof:
    "https://cdn.builder.io/api/v1/image/assets%2F53e4fd32dd724f51a2e513f718e61215%2F050f3caa68954ff7a49b3fce735b8a71?format=webp&width=1600",
  world:
    "https://cdn.builder.io/api/v1/image/assets%2F53e4fd32dd724f51a2e513f718e61215%2F411110054363454eb31b4ce63c4a7008?format=webp&width=1600",
  harmony:
    "https://cdn.builder.io/api/v1/image/assets%2F53e4fd32dd724f51a2e513f718e61215%2F2ee7e401141a4153bd6c8d1255ea3c9b?format=webp&width=1600",
  chapters:
    "https://cdn.builder.io/api/v1/image/assets%2F53e4fd32dd724f51a2e513f718e61215%2F64236fc0b6e343028ef796d1f539cab4?format=webp&width=1600",
  people:
    "https://cdn.builder.io/api/v1/image/assets%2F53e4fd32dd724f51a2e513f718e61215%2F45641d9af5dc4412b6016feefbd37072?format=webp&width=1600",
  understanding:
    "https://cdn.builder.io/api/v1/image/assets%2F53e4fd32dd724f51a2e513f718e61215%2F60659dcdb8ff477e90e9df69528cbf90?format=webp&width=1600",
};

const navItems = [
  { label: "The idea", target: "idea" },
  { label: "How it works", target: "how-it-works" },
  { label: "Why now", target: "why-now" },
];

function scrollToSection(target: string) {
  document
    .getElementById(target)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeroArtwork() {
  return (
    <div className="hero-artwork">
      <div className="hero-artwork-label">
        <span>STORY / 001</span>
        <span>08 chapters</span>
      </div>
      <img
        src={artwork.world}
        alt="Illustrated world emerging from an open book"
      />
      <div className="hero-artwork-caption">
        <span>the world, opened</span>
        <strong>
          Every story
          <br />
          <em>deserves a world.</em>
        </strong>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  const slides = [
    {
      number: "01",
      title: "Understand",
      text: "Find the people, places, events, and feelings that make the story work.",
      image: artwork.understanding,
    },
    {
      number: "02",
      title: "Plan",
      text: "Break the book into chapters and scenes that flow from one to the next.",
      image: artwork.chapters,
    },
    {
      number: "03",
      title: "Create",
      text: "Add visuals, animation, voice, and sound to make the story watchable.",
      image: artwork.harmony,
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <main className="site-shell">
      <nav className="site-nav">
        <button
          className="wordmark"
          onClick={() => scrollToSection("top")}
          aria-label="Go to top"
        >
          <span className="wordmark-mark">
            <span />
            <span />
            <span />
          </span>
          <span>movella</span>
        </button>
        <div className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollToSection(item.target)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => scrollToSection("join")}>
          Join the journey <ArrowUpRight size={15} />
        </button>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => {
                  scrollToSection(item.target);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                scrollToSection("join");
                setMenuOpen(false);
              }}
            >
              Join the journey <ArrowUpRight size={15} />
            </button>
          </div>
        )}
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-grain" />
        <div className="hero-copy">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-dot" /> The book-to-cinema engine
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>
              Turn the page.
              <br />
              <span>Enter the world.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="hero-description">
              Movella turns books into chapter-based visual stories with
              animation, voice, and sound.
            </p>
          </Reveal>

          <Reveal delay={0.32} className="hero-proof">
            <span className="proof-line" />
            <span>One book. One connected visual story.</span>
          </Reveal>
        </div>
        <div className="hero-visual">
          <HeroArtwork />
          <div className="scroll-cue">
            <ArrowDown size={15} /> scroll to explore
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="proof-strip-inner">
          <div className="proof-amount">
            <strong>₹13.6L</strong>
            <span>
              funding won
              <br />
              <b>MSME 5.0 Hackathon 2026</b>
            </span>
          </div>
          <div className="proof-divider" />
          <div className="proof-stat">
            <span className="stat-icon">✦</span>
            <span>
              <b>Pre-revenue.</b>
              <br />
              Working prototype.
            </span>
          </div>
        </div>
      </section>

      <section className="product-summary section-pad">
        <div className="product-summary-label">The product</div>
        <div className="product-summary-grid">
          <h2>Stories that stay with you.</h2>
          <div>
            <p className="large-body">
              Movella turns books and study material into connected visual
              experiences through animation, voice, and sound.
            </p>
            <p className="small-note">
              It helps students learn, educators teach, readers engage, and
              creators bring written ideas to life.
            </p>
          </div>
        </div>
      </section>

      <section id="idea" className="intro-section section-pad">
        <Reveal className="section-label">
          <span>01</span>
          <span className="label-line" /> the idea
        </Reveal>
        <div className="intro-grid">
          <Reveal>
            <h2>
              Books hold
              <br />
              entire <span>worlds.</span>
              <br />
              We make them
              <br />
              easier to see.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="large-body">
              A book can be hard to finish and study material can be hard to
              picture. Movella turns both into a clear, visual experience while
              keeping the original story at its centre.
            </p>
            <p className="small-note">Read it. Watch it. Learn from it.</p>
          </Reveal>
        </div>
        <div className="banner-wrap">
          <img
            src={artwork.world}
            alt="Illustrated open book and story world"
            className="section-art banner-art"
          />
        </div>
      </section>

      <section id="how-it-works" className="engine-section section-pad">
        <div className="section-heading-row">
          <Reveal className="section-label">
            <span>02</span>
            <span className="label-line" /> the engine
          </Reveal>
          <Reveal>
            <p className="section-side-copy">
              One book.
              <br />
              <b>One connected story.</b>
            </p>
          </Reveal>
        </div>
        <div className="story-layout">
          <div className="story-sticky">
            <Reveal>
              <h2>
                From chapter
                <br />
                to <span>cinematic.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                We read the book, find the important parts, plan the scenes,
                then create the visuals and narration. Every chapter stays part
                of the same world.
              </p>
            </Reveal>
            <div className="slide-controls">
              <button
                onClick={() =>
                  setActiveSlide(
                    (activeSlide + slides.length - 1) % slides.length,
                  )
                }
                aria-label="Previous slide"
              >
                <ArrowUpRight size={16} className="rotate-left" />
              </button>
              <span>
                0{activeSlide + 1} <i>/</i> 03
              </span>
              <button
                onClick={() =>
                  setActiveSlide((activeSlide + 1) % slides.length)
                }
                aria-label="Next slide"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
          <div className="story-slider">
            <motion.article
              key={slides[activeSlide].number}
              className="story-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="story-card-copy">
                <span className="card-number">
                  {slides[activeSlide].number}
                </span>
                <h3>{slides[activeSlide].title}</h3>
                <p>{slides[activeSlide].text}</p>
              </div>
              <div className="story-card-image">
                <img
                  src={slides[activeSlide].image}
                  alt={slides[activeSlide].title}
                />
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section id="why-now" className="continuity-section section-pad">
        <div className="continuity-copy">
          <Reveal className="section-label">
            <span>03</span>
            <span className="label-line" /> why now
          </Reveal>
          <Reveal>
            <h2>
              Make stories
              <br />
              <span>easier to see.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Books and study material are rich, but not always easy to follow.
              Movella makes them more visual, engaging, and easier to remember.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="continuity-list">
              <div>
                <span>01</span> Understand the full story
              </div>
              <div>
                <span>02</span> Keep people and places consistent
              </div>
              <div>
                <span>03</span> Make learning easier to remember
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="market-snapshot">
              <div className="market-row">
                <span>Where it fits</span>
                <b>Education · publishing · digital media · creator tools</b>
              </div>
              <div className="market-row">
                <span>Can grow to</span>
                <b>
                  Textbooks · children’s books · regional languages · publisher
                  catalogs
                </b>
              </div>
              <div className="market-row">
                <span>Impact</span>
                <b>
                  Help more people understand, remember, and enjoy what they
                  read
                </b>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="continuity-art">
          <div className="art-window">
            <img src={artwork.people} alt="Readers, educators and creators" />
            <div className="window-caption">
              <span>made for</span>
              <b>curious minds</b>
            </div>
          </div>
          <div className="floating-chip chip-red">story × technology</div>
          <div className="floating-chip chip-white">● continuity layer</div>
        </div>
      </section>

      <section className="audience-section section-pad">
        <Reveal className="section-label">
          <span>04</span>
          <span className="label-line" /> who can use it
        </Reveal>
        <div className="audience-head">
          <Reveal>
            <h2>
              Who can
              <br />
              <span>use Movella.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p>
              The same product can help people learn, teach, read, and create.
            </p>
          </Reveal>
        </div>
        <div className="audience-image">
          <img src={artwork.proof} alt="Movella funding and mission artwork" />
        </div>
        <div className="audience-grid">
          <div className="audience-item">
            <span>01</span>
            <div>
              <b>Students</b>
              <p>
                Visual study material that makes complex ideas easier to follow.
              </p>
            </div>
          </div>
          <div className="audience-item">
            <span>02</span>
            <div>
              <b>Educators & institutions</b>
              <p>
                Chapter-based explanations that supplement teaching and
                curriculum.
              </p>
            </div>
          </div>
          <div className="audience-item">
            <span>03</span>
            <div>
              <b>Readers</b>
              <p>A visual way to enjoy novels and stories.</p>
            </div>
          </div>
          <div className="audience-item">
            <span>04</span>
            <div>
              <b>Content creators</b>
              <p>
                A faster path from written imagination to cinematic content.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="join-section">
        <div className="join-orbit orbit-ring-one" />
        <Reveal className="join-content">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> This is chapter one
          </p>
          <h2>
            We are at the start.
            <br />
            <span>Help us build it.</span>
          </h2>
          <p>
            We have a working prototype and are pre-revenue. Next, we will build
            the MVP, test it with users, learn what they will pay for, and work
            with schools and content owners.
          </p>
          {submitted ? (
            <div className="submitted-message">
              <span>
                <Check size={17} />
              </span>{" "}
              You’re on the list. We’ll be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="waitlist-form">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
                required
              />
              <button type="submit">
                Keep me posted <ArrowUpRight size={16} />
              </button>
            </form>
          )}
          <span className="form-note">
            MVP · users · pricing · partnerships
          </span>
        </Reveal>
        <div className="join-art">
          <img src={artwork.harmony} alt="Cinematic Movella visual" />
        </div>
      </section>

      <footer className="site-footer">
        <button className="wordmark" onClick={() => scrollToSection("top")}>
          <span className="wordmark-mark">
            <span />
            <span />
            <span />
          </span>
          <span>movella</span>
        </button>
        <span>Turning words into worlds.</span>
        <span>© 2026 Movella</span>
      </footer>
    </main>
  );
}

export default App;
