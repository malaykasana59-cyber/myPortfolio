"use client";

import { useEffect, useState, useRef } from "react";

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
  className?: string;
}

export function TypewriterText({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  delayBetweenWords = 1800,
  className = "",
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentFullWord = words[currentWordIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentFullWord.substring(0, currentText.length + 1);
          setCurrentText(nextText);

          if (nextText === currentFullWord) {
            pauseTimerRef.current = setTimeout(() => setIsDeleting(true), delayBetweenWords);
          }
        } else {
          const nextText = currentFullWord.substring(0, currentText.length - 1);
          setCurrentText(nextText);

          if (nextText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => {
      clearTimeout(timer);
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{currentText}</span>
      <span className="inline-block w-[3px] h-[1.1em] ml-1 bg-primary align-middle animate-pulse rounded-full" />
    </span>
  );
}
