'use client';

import { useEffect, useRef } from 'react';

const cardsA = [
  { title: 'A1', color: 'from-amber-400 to-orange-500', emoji: '🌸' },
  { title: 'A2', color: 'from-emerald-400 to-teal-500', emoji: '🌿' },
  { title: 'A3', color: 'from-blue-400 to-indigo-500', emoji: '🌊' },
];

const cardsB = [
  { title: 'B1', color: 'from-rose-400 to-pink-500', emoji: '🎀' },
  { title: 'B2', color: 'from-violet-400 to-purple-500', emoji: '✨' },
  { title: 'B3', color: 'from-cyan-400 to-sky-500', emoji: '🫧' },
];

function CardList({
  cards,
  containerRef,
}: {
  cards: typeof cardsA;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={containerRef}
      className="layout-container flex flex-wrap gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50"
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className={`item flex min-w-[100px] flex-col items-center justify-center rounded-xl bg-gradient-to-br ${card.color} px-6 py-4 text-white shadow-md`}
        >
          <span className="text-2xl">{card.emoji}</span>
          <span className="font-medium">{card.title}</span>
        </div>
      ))}
    </div>
  );
}

export default function ToggleLayoutCards() {
  const rootARef = useRef<HTMLDivElement>(null);
  const rootBRef = useRef<HTMLDivElement>(null);
  const buttonARef = useRef<HTMLButtonElement>(null);
  const buttonBRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cleanup: (() => void) | undefined;

    void import('animejs').then(({ createLayout }) => {
      const rootA = rootARef.current;
      const rootB = rootBRef.current;
      const buttonA = buttonARef.current;
      const buttonB = buttonBRef.current;

      if (!rootA || !rootB) return;

      const layoutA = createLayout(rootA);
      const layoutB = createLayout(rootB);

      function animateLayoutA() {
        layoutA.update(({ root }) => root.classList.toggle('row'));
      }
      function animateLayoutB() {
        layoutB.update(({ root }) => root.classList.toggle('row'));
      }

      buttonA?.addEventListener('click', animateLayoutA);
      buttonB?.addEventListener('click', animateLayoutB);

      cleanup = () => {
        buttonA?.removeEventListener('click', animateLayoutA);
        buttonB?.removeEventListener('click', animateLayoutB);
      };
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div id="layout-toggle" className="flex w-full max-w-3xl flex-col gap-10 px-4">
      <section className="flex flex-col gap-3">
        <div className="controls flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            레이아웃 A
          </span>
          <button
            ref={buttonARef}
            type="button"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
          >
            행/열 전환
          </button>
        </div>
        <CardList cards={cardsA} containerRef={rootARef} />
      </section>

      <section className="flex flex-col gap-3">
        <div className="controls flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            레이아웃 B
          </span>
          <button
            ref={buttonBRef}
            type="button"
            className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-600"
          >
            행/열 전환
          </button>
        </div>
        <CardList cards={cardsB} containerRef={rootBRef} />
      </section>
    </div>
  );
}
