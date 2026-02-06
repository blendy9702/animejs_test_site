import LayoutCards from './components/LayoutCards';
import StaggerFromCards from './components/StaggerFromCards';
import ToggleLayoutCards from './components/ToggleLayoutCards';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-100 font-sans dark:bg-zinc-900">
      <main className="flex w-full flex-col items-center py-12 px-4">
        <p className="mb-8 text-center text-zinc-600 dark:text-zinc-400">
          카드들이 4가지 그리드 배치를 순환하며 자리를 바꿉니다.
        </p>
        <LayoutCards />

        <h2 className="mb-2 mt-16 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          버튼으로 행/열 전환
        </h2>
        <p className="mb-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          각 버튼을 누르면 해당 카드 레이아웃이 열 → 행으로 애니메이션됩니다.
        </p>
        <ToggleLayoutCards />

        <h2 className="mb-2 mt-16 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          stagger from first / last
        </h2>
        <p className="mb-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          열→행은 첫 번째 카드부터, 행→열은 마지막 카드부터 순서대로 움직입니다. (ease: outExpo)
        </p>
        <StaggerFromCards />
      </main>
    </div>
  );
}
