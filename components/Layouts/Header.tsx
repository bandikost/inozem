import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b p-4 bg-green-300">
      <nav className="flex gap-4">
        <Link href="/">Главная</Link>
        <Link href="/blog">Блог</Link>
        <Link href="/about">О нас</Link>
      </nav>
    </header>
  );
}
