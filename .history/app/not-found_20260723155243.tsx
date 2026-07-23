import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-gray-200">404</p>

        <h1 className="mt-4 text-2xl font-semibold">
          Страница не найдена
        </h1>

        <p className="mt-3 text-gray-500">
          Возможно, страница была удалена или вы перешли по неверной ссылке.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
        >
          <Home size={18} />
          На главную
        </Link>
      </div>
    </main>
  );
}