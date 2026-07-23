import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        <div className="mb-6 text-8xl font-bold tracking-tight">
          404
        </div>

        <h1 className="text-2xl font-semibold">
          Страница не найдена
        </h1>

        <p className="mt-3 text-muted-foreground">
          Похоже, такой страницы не существует или она была перемещена.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-80"
        >
          <ArrowLeft size={18} />
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}