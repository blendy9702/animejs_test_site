'use client';

import { useEffect, useRef } from 'react';

const cards = [
  { title: '카드 1', color: 'from-amber-400 to-orange-500', emoji: '🌸' },
  { title: '카드 2', color: 'from-emerald-400 to-teal-500', emoji: '🌿' },
  { title: '카드 3', color: 'from-blue-400 to-indigo-500', emoji: '🌊' },
  { title: '카드 4', color: 'from-rose-400 to-pink-500', emoji: '🎀' },
  { title: '카드 5', color: 'from-violet-400 to-purple-500', emoji: '✨' },
];

export default function StaggerFromCards() {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cleanup: (() => void) | undefined;

    void import('animejs').then(({ createLayout, stagger }) => {
      const root = rootRef.current;
      const button = buttonRef.current;
      if (!root || !button) return;

      const layout = createLayout(root, { ease: 'outExpo' });

      function animateLayout() {
        const el = rootRef.current;
        if (!el) return;
        // 토글 전 상태로 stagger 방향 결정: row → column 이면 'last', column → row 이면 'first'
        const fromLast = el.classList.contains('row');
        layout.update(
          () => {
            el.classList.toggle('row');
          },
          {
            delay: stagger(50, { from: fromLast ? 'last' : 'first' }),
          }
        );
      }

      button.addEventListener('click', animateLayout);
      cleanup = () => button.removeEventListener('click', animateLayout);
    });

    return () => cleanup?.();
  }, []);

  return (
    <div id="layout-stagger-from" className="flex w-full max-w-3xl flex-col gap-3 px-4">
      <div className="controls flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          stagger from first / last
        </span>
        <button
          ref={buttonRef}
          type="button"
          className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
        >
          행/열 전환
        </button>
      </div>
      <div
        ref={rootRef}
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
    </div>
  );
}
