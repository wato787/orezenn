import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">
          📖 Aboutページ
        </h1>
        <p className="text-gray-600 mb-6">
          このアプリはReact + TypeScript + Vite + Tailwind CSS v4 + React
          Routerで構築されています。
        </p>
        <div className="bg-blue-100 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">使用技術</h2>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>React 19</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>Tailwind CSS v4</li>
            <li>React Router v7</li>
            <li>Biome (Linter & Formatter)</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            ← ホームへ戻る
          </Link>
          <Link
            to="/contact"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Contactへ
          </Link>
        </div>
      </div>
    </div>
  );
}
