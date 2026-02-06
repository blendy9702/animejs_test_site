import Link from "next/link";

export default function Header() {
  return (
    <header className='sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80'>
      <div className='mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6'>
        <Link
          href='/'
          className='text-lg font-semibold text-zinc-800 transition-colors hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400'
        >
          그리드 레이아웃
        </Link>
        {/* <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            홈
          </Link>
        </nav> */}
      </div>
    </header>
  );
}
