'use client';

import { useEffect, useRef } from 'react';

const cards = [
  {
    id: '1',
    title: '카드 1',
    subtitle: '짧은 애니메이션',
    description: '0.4초 동안 열리는 모달입니다.',
    duration: 400,
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: '2',
    title: '카드 2',
    subtitle: '보통 속도',
    description: '0.6초 동안 열리는 모달입니다.',
    duration: 600,
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: '3',
    title: '카드 3',
    subtitle: '긴 애니메이션',
    description: '1초 동안 열리는 모달입니다.',
    duration: 1000,
    color: 'from-blue-400 to-indigo-500',
  },
];

export default function ModalLayoutCards() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dialog = dialogRef.current;
    const container = containerRef.current;
    if (!dialog || !container) return;

    let cleanup: (() => void) | undefined;

    void import('animejs').then(({ createLayout }) => {
      const modalLayout = createLayout(dialog, {
        children: ['.item', 'h2', 'h3', 'p'],
        properties: ['--overlay-alpha'],
      });

      let placeholder: HTMLElement | null = null;
      let closeDuration = 400;

      const closeModal = () => {
        const item = dialog.querySelector<HTMLElement>('.item');
        const place = container.querySelector<HTMLElement>('.layout-modal-placeholder');
        if (!item) return;

        modalLayout.record();
        if (place && place.parentNode) {
          place.parentNode.replaceChild(item, place);
          placeholder = null;
        }
        dialog.close();
        modalLayout.animate({ duration: closeDuration });
        (item.querySelector('button') ?? item).focus();
      };

      const openModal = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const item = target.closest<HTMLElement>('.item');
        if (!item || placeholder) return;

        const duration = Number(item.dataset.duration ?? 500);
        closeDuration = duration;

        modalLayout.record();

        placeholder = document.createElement('div');
        placeholder.className = 'item layout-modal-placeholder';
        placeholder.setAttribute('aria-hidden', 'true');
        item.parentNode?.insertBefore(placeholder, item);

        dialog.appendChild(item);
        dialog.showModal();

        modalLayout.animate({ duration });
      };

      const buttons = container.querySelectorAll<HTMLElement>('button');
      buttons.forEach((btn) => btn.addEventListener('click', openModal));
      dialog.addEventListener('cancel', closeModal);
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) closeModal();
      });

      cleanup = () => {
        buttons.forEach((btn) => btn.removeEventListener('click', openModal));
        dialog.removeEventListener('cancel', closeModal);
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <div id="layout-modal" className="flex w-full max-w-3xl flex-col gap-4 px-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        카드를 클릭하면 그 자리에서 커지며 모달로 열립니다. 배경 클릭 또는 Esc로 닫으면 다시 제자리로 돌아갑니다.
      </p>
      <div ref={containerRef} className="flex flex-wrap gap-4">
        {cards.map((card) => (
          <article
            key={card.id}
            className="item min-w-[200px] cursor-pointer rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
            data-duration={card.duration}
          >
            <button
              type="button"
              className="flex w-full flex-col items-start gap-1 text-left"
            >
              <h2
                className={`text-lg font-semibold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}
              >
                {card.title}
              </h2>
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {card.subtitle}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {card.description}
              </p>
            </button>
          </article>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        id="layout-dialog"
        className="layout-dialog rounded-2xl border-0 bg-white p-0 shadow-xl backdrop:bg-black/50 dark:bg-zinc-900"
      />
    </div>
  );
}
