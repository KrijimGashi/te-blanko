"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { Dictionary } from "./dictionaries";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type Locale = "sq" | "en";

const menuEmojis = ["🍔", "⭐", "🔥", "🐔", "🥩", "🧀", "🍟", "🫙"];

// ScrollSmoother intercepts native scroll — use its scrollTo for anchor links
function smoothScrollTo(hash: string, e?: React.MouseEvent) {
  e?.preventDefault();
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(hash, true, "top 80px");
  }
}

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
        <a href="#ballina" onClick={(e) => smoothScrollTo("#ballina", e)} className="flex items-center gap-3 group">
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
              onClick={(e) => smoothScrollTo(item.href, e)}
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
              onClick={(e) => {
                setMenuOpen(false);
                smoothScrollTo(item.href, e);
              }}
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
            onClick={(e) => smoothScrollTo("#menu", e)}
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
              item: { name: string; description: string; tag: string; price: string },
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
                <p className="relative z-10 text-sm text-white/40 leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="relative z-10 inline-flex items-center bg-blanko-yellow/10 border border-blanko-yellow/20 rounded-full px-3 py-1">
                  <span className="text-blanko-yellow font-bold text-sm">{item.price} €</span>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blanko-yellow/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            )
          )}
        </div>

        {/* Official menu image */}
        <div className="mt-16 flex justify-center reveal-up">
          <div className="relative group rounded-3xl overflow-hidden border border-blanko-card-border glow-yellow max-w-md">
            <Image
              src="/images/menu-official.png"
              alt="Te Blanko - Menu Official"
              width={500}
              height={700}
              className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-3xl border border-blanko-yellow/0 group-hover:border-blanko-yellow/20 transition-all duration-500" />
          </div>
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

// ─── Gallery Section ────────────────────────────────────────────────────────
const galleryItems = [
  { emoji: "🍔", label: "Blanko Burger", span: "col-span-2 row-span-2" },
  { emoji: "🍟", label: "Pomfrit", span: "col-span-1 row-span-1" },
  { emoji: "🔥", label: "Double Burger", span: "col-span-1 row-span-1" },
  { emoji: "🥩", label: "Qebapa", span: "col-span-1 row-span-2" },
  { emoji: "🐔", label: "Chicken Burger", span: "col-span-1 row-span-1" },
  { emoji: "🧀", label: "Tost", span: "col-span-1 row-span-1" },
];

function GallerySection({
  dict,
  onOpenLightbox,
}: {
  dict: Dictionary;
  onOpenLightbox: (index: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      }
    );
  }, []);

  return (
    <section id="galeria" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-up">
          <span className="text-blanko-yellow text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            {dict.gallery.sectionTag}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
            {dict.gallery.title}
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            {dict.gallery.subtitle}
          </p>
        </div>

        {/* Masonry-style grid — replace bg + emoji with real <Image> later */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3 sm:gap-4"
        >
          {galleryItems.map((item, i) => (
            <div
              key={i}
              onClick={() => onOpenLightbox(i)}
              className={`${item.span} group relative rounded-2xl overflow-hidden bg-blanko-card border border-blanko-card-border cursor-pointer`}
            >
              {/* Replace this div with <Image> when photos are ready */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blanko-card to-blanko-dark">
                <span className={`${item.span.includes("col-span-2") ? "text-8xl" : "text-5xl"} transition-transform duration-500 group-hover:scale-125`}>
                  {item.emoji}
                </span>
              </div>

              {/* Hover overlay with label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 sm:p-5">
                <span className="text-white font-bold text-sm sm:text-base tracking-wide">
                  {item.label}
                </span>
              </div>

              {/* Expand icon on hover */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border border-blanko-yellow/0 group-hover:border-blanko-yellow/30 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Helper note — remove in production */}
        <p className="text-center text-white/10 text-xs mt-6">
          📸 Placeholder — swap emojis with real photos in /public/gallery/
        </p>
      </div>
    </section>
  );
}

// ─── Lightbox (rendered outside scroll wrapper) ─────────────────────────────
function Lightbox({
  index,
  onClose,
}: {
  index: number;
  onClose: () => void;
}) {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    if (!lightboxRef.current) return;
    gsap.fromTo(
      lightboxRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      lightboxRef.current.querySelector(".lightbox-content"),
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  }, []);

  const close = () => {
    if (!lightboxRef.current) return;
    gsap.to(lightboxRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  const navigate = (dir: -1 | 1) => {
    setCurrent((prev) => (prev + dir + galleryItems.length) % galleryItems.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
      onClick={close}
    >
      {/* Close button */}
      <button
        onClick={close}
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate(-1); }}
        className="absolute left-4 sm:left-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-blanko-yellow/20 transition-colors"
        aria-label="Previous"
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate(1); }}
        className="absolute right-4 sm:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-blanko-yellow/20 transition-colors"
        aria-label="Next"
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Content */}
      <div
        className="lightbox-content flex flex-col items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Replace with real <Image> later */}
        <div className="w-[80vw] h-[60vh] max-w-3xl rounded-3xl bg-blanko-card border border-blanko-card-border flex items-center justify-center">
          <span className="text-[120px] sm:text-[180px]">
            {galleryItems[current].emoji}
          </span>
        </div>

        {/* Label + counter */}
        <div className="text-center">
          <p className="text-white text-xl sm:text-2xl font-bold mb-1">
            {galleryItems[current].label}
          </p>
          <p className="text-white/30 text-sm">
            {current + 1} / {galleryItems.length}
          </p>
        </div>
      </div>
    </div>
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
                onClick={(e) => smoothScrollTo(item.href, e)}
                className="text-sm text-white/30 hover:text-blanko-yellow transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Phone + Social */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+38343700217"
              className="flex items-center gap-2 text-blanko-yellow/80 hover:text-blanko-yellow transition-colors"
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="text-sm font-medium">043 700 217</span>
            </a>
            <a
              href="https://www.instagram.com/teblanko.burger/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-blanko-yellow/40 hover:bg-blanko-yellow/10 transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 text-white/60 hover:text-blanko-yellow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  // Pause/resume ScrollSmoother when lightbox opens/closes
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (!smoother) return;
    smoother.paused(lightboxIndex !== null);
  }, [lightboxIndex]);

  return (
    <>
      {/* Fixed elements stay OUTSIDE the wrapper */}
      <Navbar dict={dict} lang={lang} />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/38343700217"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.5)] transition-all duration-300"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Lightbox — OUTSIDE scroll wrapper so it's truly fixed */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroSection dict={dict} />
            <MarqueeSection dict={dict} />
            <MenuSection dict={dict} />
            <AboutSection dict={dict} />
            <GallerySection dict={dict} onOpenLightbox={setLightboxIndex} />
            <CTABanner dict={dict} />
            <ContactSection dict={dict} />
          </main>
          <Footer dict={dict} lang={lang} />
        </div>
      </div>
    </>
  );
}
