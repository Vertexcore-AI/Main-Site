"use client";

import { useEffect, useState } from "react";

const phrases = [
  { text: "Technology", color: "text-emerald-400", cursor: "bg-emerald-400" },
  { text: "Digital Solutions", color: "text-blue-400", cursor: "bg-blue-400" },
  { text: "AI Solutions", color: "text-orange-400", cursor: "bg-orange-400" },
];

const baseText = "Let's create tomorrow's";

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const DELAY_BETWEEN_WORDS = 2000;

// Longest phrase reserves the line width so layout never shifts as it types.
const longestPhrase = phrases.reduce(
  (a, b) => (b.text.length > a.text.length ? b : a),
  phrases[0]
);

export function TypingHero() {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const current = phrases[wordIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typing / deleting loop
  useEffect(() => {
    if (!mounted) return;

    const word = current.text;
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < word.length) {
      timeout = setTimeout(() => {
        setDisplayText(word.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, TYPING_SPEED);
    } else if (!isDeleting && charIndex === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN_WORDS);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(word.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, DELETING_SPEED);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [mounted, charIndex, isDeleting, current.text]);

  // Cursor blink
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(id);
  }, [mounted]);

  return (
    <h1 className="font-display font-bold tracking-tight text-center text-5xl sm:text-7xl lg:text-8xl leading-[1.1]">
      {/* Line 1 — static */}
      <span className="block text-white">{baseText}</span>

      {/* Line 2 — typewriter word, width + height reserved so layout never shifts */}
      <span className="relative block">
        {/* invisible spacer reserves space for the longest phrase + cursor */}
        <span aria-hidden="true" className="invisible whitespace-nowrap">
          {longestPhrase.text}
          <span className="ml-1">|</span>
        </span>

        <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
          <span className={current.color}>{displayText}</span>
          <span
            className={`ml-1 inline-block w-[0.08em] h-[0.95em] self-center ${current.cursor}`}
            style={{ opacity: mounted && showCursor ? 1 : 0 }}
            aria-hidden="true"
          />
        </span>
      </span>
    </h1>
  );
}
