"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { Dictionary } from "./dictionaries";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type Locale = "sq" | "en";

const menuEmojis = ["🍔", "⭐", "🔥", "🐔", "🥩", "🧀", "🍟", "🫙"];

// ─── Icons ──────────────────────────────────────────────────────────────────
function BurgerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <path
        d="M12 36h40v4c0 4-4 8-8 8H20c-4 0-8-4-8-8v-4z"
        fill="currentColor"
        opacity="0.9"
      />
      <rect x="10" y="28" width="44" height="6" rx="2" fill="currentColor" />
      <circle cx="20" cy="31" r="1.5" fill="#0a0a0a" />
      <circle cx="32" cy="31" r="1.5" fill="#0a0a0a" />
      <circle cx="44" cy="31" r="1.5" fill="#0a0a0a" />
      <path
        d="M14 26c0-10 8-14 18-14s18 4 18 14H14z"
        fill="currentColor"
        opacity="0.8"
      />
      <ellipse cx="32" cy="16" rx="6" ry="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FireIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 23c-4.97 0-9-3.58-9-8 0-3.07 2.31-6.64 4-8.5.68-.75 1.86-.2 1.74.8-.2 1.63.68 3.2 2.26 3.2 2.21 0 2.5-2.1 2.5-3.5 0-1.93-.78-3.58-1.5-4.5-.5-.64.08-1.56.85-1.33C16.24 2.56 21 6.5 21 15c0 4.42-4.03 8-9 8z" />
    </svg>
  );
}

function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ─── Language Switcher ──────────────────────────────────────────────────────
function LanguageSwitcher({ lang }: { lang: Locale }) {
  const otherLang = lang === "sq" ? "en" : "sq";

  return (
    <a
      href={`/${otherLang}`}
      className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide hover:border-blanko-yellow/40 hover:bg-blanko-yellow/5 transition-all duration-300"
    >
      <span className={lang === "sq" ? "text-blanko-yellow" : "text-white/50"}>
        SQ
      </span>
      <span className="text-white/20">|</span>
      <span className={lang === "en" ? "text-blanko-yellow" : "text-white/50"}>
        EN
      </span>
    </a>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { label: dict.nav.home, href: "#ballina" },
    { label: dict.nav.menu, href: "#menu" },
    { label: dict.nav.about, href: "#rreth-nesh" },
    { label: dict.nav.contact, href: "#kontakti" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-blanko-dark/90 backdrop-blur-xl border-b border-blanko-yellow/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#ballina" className="flex items-center gap-3 group">
          <div className="relative">
            <BurgerIcon className="w-8 h-8 text-blanko-yellow transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-blanko-yellow/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-blanko-yellow/70 font-medium tracking-[0.2em] uppercase leading-none">
              Te
            </span>
            <span className="text-xl font-bold text-white tracking-wider leading-none">
              BLANKO
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/60 hover:text-blanko-yellow transition-colors duration-300 tracking-wide"
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher lang={lang} />
          <a
            href="tel:+38343700217"
            className="flex items-center gap-2 bg-blanko-yellow text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blanko-orange transition-all duration-300 hover:scale-105"
          >
            <PhoneIcon className="w-4 h-4" />
            {dict.nav.callUs}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`hamburger-line w-6 h-0.5 bg-white block ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`hamburger-line w-6 h-0.5 bg-white block ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`hamburger-line w-6 h-0.5 bg-white block ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4 bg-blanko-dark/95 backdrop-blur-xl border-t border-white/5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-blanko-yellow transition-colors py-2"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center justify-between">
            <LanguageSwitcher lang={lang} />
            <a
              href="tel:+38343700217"
              className="flex items-center justify-center gap-2 bg-blanko-yellow text-black px-5 py-3 rounded-full font-semibold"
            >
              <PhoneIcon className="w-4 h-4" />
              043 700 217
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ───────────────────────────────────────────────────────────
function HeroSection({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      badgeRef.current,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
      .fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

    // Floating decorative elements
    if (decorRef.current) {
      const floaters = decorRef.current.querySelectorAll(".floater");
      floaters.forEach((el, i) => {
        gsap.to(el, {
          y: gsap.utils.random(-30, 30),
          x: gsap.utils.random(-20, 20),
          rotation: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    }

    // ScrollSmoother handles parallax via data-speed attributes
  }, []);

  return (
    <section
      id="ballina"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0">
        <div data-speed="0.8" className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blanko-yellow/5 rounded-full blur-[150px]" />
        <div data-speed="0.6" className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blanko-orange/5 rounded-full blur-[120px]" />
      </div>

      {/* Floating decorative elements — parallax at different speeds */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div data-speed="0.7" className="floater absolute top-[15%] left-[10%] text-5xl opacity-10">
          🍔
        </div>
        <div data-speed="0.5" className="floater absolute top-[25%] right-[15%] text-4xl opacity-10">
          🍟
        </div>
        <div data-speed="0.9" className="floater absolute bottom-[30%] left-[20%] text-3xl opacity-10">
          🔥
        </div>
        <div data-speed="0.6" className="floater absolute bottom-[20%] right-[10%] text-5xl opacity-10">
          🧀
        </div>
        <div data-speed="0.8" className="floater absolute top-[60%] left-[5%] text-4xl opacity-10">
          🥩
        </div>
      </div>

      <div data-speed="0.9" className="hero-content relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 bg-blanko-yellow/10 border border-blanko-yellow/20 rounded-full px-5 py-2 mb-8">
          <FireIcon className="w-4 h-4 text-blanko-yellow" />
          <span className="text-sm text-blanko-yellow font-medium tracking-wide">
            {dict.hero.badge}
          </span>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="mb-6">
          <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">
            <span className="text-white">TE</span>{" "}
            <span className="text-gradient">BLANKO</span>
          </span>
          <span className="block mt-4 text-xl sm:text-2xl md:text-3xl text-white/50 font-light tracking-[0.15em]">
            {dict.hero.subtitle}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {dict.hero.description}
          <br className="hidden sm:block" />
          {dict.hero.descriptionLine2}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#menu"
            className="group relative inline-flex items-center gap-3 bg-blanko-yellow text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-blanko-orange transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,166,35,0.3)]"
          >
            {dict.hero.viewMenu}
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="tel:+38343700217"
            className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium hover:border-blanko-yellow/50 hover:text-blanko-yellow transition-all duration-300"
          >
            <PhoneIcon className="w-5 h-5" />
            043 700 217
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blanko-dark to-transparent" />
    </section>
  );
}

// ─── Marquee ────────────────────────────────────────────────────────────────
function MarqueeSection({ dict }: { dict: Dictionary }) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const inner = marqueeRef.current.querySelector(".marquee-inner");
    if (!inner) return;

    gsap.to(inner, {
      xPercent: -50,
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, []);

  const names = dict.menu.items.map(
    (item: { name: string }) => item.name.toUpperCase()
  );
  const items = names.flatMap((name: string) => [name, "★"]);

  return (
    <div
      ref={marqueeRef}
      className="relative py-6 bg-blanko-yellow overflow-hidden"
    >
      <div className="marquee-inner flex whitespace-nowrap">
        {[...items, ...items].map((item: string, i: number) => (
          <span
            key={i}
            className={`mx-6 text-2xl font-black tracking-wider ${
              item === "★" ? "text-blanko-dark/30" : "text-blanko-dark"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Menu Section ───────────────────────────────────────────────────────────
function MenuSection({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(
      titleRef.current.children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );

    if (!cardsRef.current) return;
    gsap.fromTo(
      cardsRef.current.children,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div data-speed="0.7" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blanko-yellow/3 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-blanko-yellow text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            {dict.menu.sectionTag}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
            {dict.menu.title}
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            {dict.menu.subtitle}
          </p>
        </div>

        {/* Menu grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {dict.menu.items.map(
            (
              item: { name: string; description: string; tag: string },
              index: number
            ) => (
              <div
                key={index}
                className="menu-card group relative bg-blanko-card border border-blanko-card-border rounded-2xl p-6 cursor-default overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-blanko-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Tag */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <span className="text-4xl">{menuEmojis[index]}</span>
                  <span className="text-xs font-semibold text-blanko-yellow/80 bg-blanko-yellow/10 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <h3 className="relative z-10 text-lg font-bold text-white mb-2 group-hover:text-blanko-yellow transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="relative z-10 text-sm text-white/40 leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blanko-yellow/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ──────────────────────────────────────────────────────────
function AboutSection({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const elements = sectionRef.current.querySelectorAll(".reveal-up");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="rreth-nesh"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <div className="reveal-up relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative rings */}
              <div data-speed="0.9" className="absolute inset-0 border border-blanko-yellow/10 rounded-full animate-border-glow" />
              <div data-speed="0.85" className="absolute inset-6 border border-blanko-yellow/5 rounded-full" />
              <div data-speed="0.8" className="absolute inset-12 border border-blanko-yellow/5 rounded-full" />

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div data-speed="0.95" className="text-8xl mb-4">🍔</div>
                  <div className="flex items-center gap-1 justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-5 h-5 text-blanko-yellow"
                      />
                    ))}
                  </div>
                  <p className="text-white/50 text-sm">{dict.about.premiumQuality}</p>
                </div>
              </div>

              {/* Floating badges */}
              <div data-lag="0.4" className="absolute top-10 right-0 bg-blanko-card border border-blanko-card-border rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👨‍👩‍👦</span>
                  <div>
                    <p className="text-white text-xs font-semibold">
                      {dict.about.familyBusiness}
                    </p>
                    <p className="text-white/40 text-[10px]">
                      {dict.about.familyBusinessSub}
                    </p>
                  </div>
                </div>
              </div>

              <div data-lag="0.6" className="absolute bottom-10 left-0 bg-blanko-card border border-blanko-card-border rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <div>
                    <p className="text-white text-xs font-semibold">
                      {dict.about.nowOpen}
                    </p>
                    <p className="text-white/40 text-[10px]">
                      {dict.about.nowOpenSub}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div>
            <div className="reveal-up">
              <span className="text-blanko-yellow text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
                {dict.about.sectionTag}
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                {dict.about.title}
                <br />
                <span className="text-gradient">{dict.about.titleHighlight}</span>
              </h2>
            </div>

            <div className="reveal-up">
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                {dict.about.paragraph1}
              </p>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                {dict.about.paragraph2}
              </p>
            </div>

            <div className="reveal-up flex flex-wrap gap-6">
              {[
                { number: "100%", label: dict.about.stats.natural },
                { number: "8+", label: dict.about.stats.products },
                { number: "❤️", label: dict.about.stats.love },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black text-blanko-yellow mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-white/40 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ─────────────────────────────────────────────────────────────
function CTABanner({ dict }: { dict: Dictionary }) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    gsap.fromTo(
      bannerRef.current,
      { y: 60, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div
        ref={bannerRef}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blanko-yellow via-blanko-orange to-blanko-yellow p-[1px]"
      >
        <div className="bg-blanko-dark rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 hero-grid opacity-50" />
          <div data-speed="0.7" className="absolute top-0 right-0 w-96 h-96 bg-blanko-yellow/5 rounded-full blur-[120px]" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              {dict.cta.title} <span className="text-gradient">{dict.cta.titleHighlight}</span>
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
              {dict.cta.subtitle}
            </p>
            <a
              href="tel:+38343700217"
              className="inline-flex items-center gap-3 bg-blanko-yellow text-black px-10 py-5 rounded-full text-xl font-black hover:bg-blanko-orange transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(245,166,35,0.3)]"
            >
              <PhoneIcon className="w-6 h-6" />
              043 700 217
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Contact / Location Section ─────────────────────────────────────────────
function ContactSection({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const elements = sectionRef.current.querySelectorAll(".reveal-up");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="kontakti"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-up">
          <span className="text-blanko-yellow text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            {dict.contact.sectionTag}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
            {dict.contact.title}
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Phone card */}
          <div className="reveal-up group bg-blanko-card border border-blanko-card-border rounded-2xl p-8 text-center hover:border-blanko-yellow/30 transition-all duration-500">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blanko-yellow/10 rounded-2xl mb-5 group-hover:bg-blanko-yellow/20 transition-colors">
              <PhoneIcon className="w-6 h-6 text-blanko-yellow" />
            </div>
            <h3 className="text-white font-bold mb-2">{dict.contact.phone}</h3>
            <a
              href="tel:+38343700217"
              className="text-blanko-yellow text-lg font-semibold hover:underline"
            >
              043 700 217
            </a>
          </div>

          {/* Location card */}
          <div className="reveal-up group bg-blanko-card border border-blanko-card-border rounded-2xl p-8 text-center hover:border-blanko-yellow/30 transition-all duration-500">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blanko-yellow/10 rounded-2xl mb-5 group-hover:bg-blanko-yellow/20 transition-colors">
              <MapPinIcon className="w-6 h-6 text-blanko-yellow" />
            </div>
            <h3 className="text-white font-bold mb-2">{dict.contact.location}</h3>
            <p className="text-white/50">
              {dict.contact.locationText}
              <br />
              <span className="text-blanko-yellow text-sm">Te Blanko</span>
            </p>
          </div>

          {/* Hours card */}
          <div className="reveal-up group bg-blanko-card border border-blanko-card-border rounded-2xl p-8 text-center hover:border-blanko-yellow/30 transition-all duration-500">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blanko-yellow/10 rounded-2xl mb-5 group-hover:bg-blanko-yellow/20 transition-colors">
              <ClockIcon className="w-6 h-6 text-blanko-yellow" />
            </div>
            <h3 className="text-white font-bold mb-2">{dict.contact.hours}</h3>
            <p className="text-white/50 text-sm">
              {dict.contact.hoursText}
              <br />
              <span className="text-blanko-yellow font-semibold">
                10:00 — 23:00
              </span>
            </p>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="reveal-up relative rounded-2xl overflow-hidden border border-blanko-card-border glow-yellow">
          <div className="aspect-[21/9] bg-blanko-card flex items-center justify-center relative">
            <div className="absolute inset-0 hero-grid" />
            <div className="relative z-10 text-center">
              <MapPinIcon className="w-16 h-16 text-blanko-yellow/30 mx-auto mb-4" />
              <p className="text-white/30 text-lg font-medium mb-2">
                {dict.contact.mapPlaceholder}
              </p>
              <p className="text-white/20 text-sm max-w-md mx-auto">
                {dict.contact.mapPlaceholderText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const navItems = [
    { label: dict.nav.home, href: "#ballina" },
    { label: dict.nav.menu, href: "#menu" },
    { label: dict.nav.about, href: "#rreth-nesh" },
    { label: dict.nav.contact, href: "#kontakti" },
  ];

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BurgerIcon className="w-7 h-7 text-blanko-yellow" />
            <div className="flex flex-col">
              <span className="text-[10px] text-blanko-yellow/70 font-medium tracking-[0.2em] uppercase leading-none">
                Te
              </span>
              <span className="text-lg font-bold text-white tracking-wider leading-none">
                BLANKO
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/30 hover:text-blanko-yellow transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Phone */}
          <a
            href="tel:+38343700217"
            className="flex items-center gap-2 text-blanko-yellow/80 hover:text-blanko-yellow transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
            <span className="text-sm font-medium">043 700 217</span>
          </a>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Te Blanko. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function HomePage({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <>
      {/* Navbar stays OUTSIDE the wrapper — it's position:fixed */}
      <Navbar dict={dict} lang={lang} />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroSection dict={dict} />
            <MarqueeSection dict={dict} />
            <MenuSection dict={dict} />
            <AboutSection dict={dict} />
            <CTABanner dict={dict} />
            <ContactSection dict={dict} />
          </main>
          <Footer dict={dict} lang={lang} />
        </div>
      </div>
    </>
  );
}
