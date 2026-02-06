'use client';

import { useEffect, useRef } from 'react';

const cards = [
  { title: '카드 A', color: 'from-amber-400 to-orange-500', emoji: '🌸' },
  { title: '카드 B', color: 'from-emerald-400 to-teal-500', emoji: '🌿' },
  { title: '카드 C', color: 'from-blue-400 to-indigo-500', emoji: '🌊' },
  { title: '카드 D', color: 'from-rose-400 to-pink-500', emoji: '🎀' },
];

export default function LayoutCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    let cancelled = false;

    void import('animejs').then(({ createLayout, stagger }) => {
      if (!el || cancelled || !el.isConnected) return;
      const container = el;

      const layout = createLayout(container);
      const sequence = [1, 2, 3, 4, 3, 2];
      // 0부터 시작하면 첫 프레임이 1→1이라 변화 없음 → 애니메이션/onComplete 미실행. 1부터 시작해 1→2로 바꿈.
      let i = 1;

      function runNext() {
        if (cancelled || !container.isConnected) return;
        const nextGrid = String(sequence[i++ % sequence.length]);

        layout.record();
        container.dataset.grid = nextGrid;
        layout.animate({
          duration: 1000,
          delay: stagger(150),
          onComplete: () => {
            if (!cancelled) runNext();
          },
        });
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) runNext();
        });
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div id="layout" className="flex min-h-[420px] w-full max-w-2xl items-center justify-center p-4">
      <div
        ref={containerRef}
        className="layout-container grid-layout h-[380px] w-full gap-3"
        data-grid="1"
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className={`item flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white shadow-lg transition-shadow`}
          >
            <span className="text-4xl mb-2">{card.emoji}</span>
            <span className="font-semibold text-lg">{card.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
