import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🏠 ホームページ
        </h1>
        <p className="text-gray-600 mb-4">
          React Router + Tailwind CSS v4が正常に動作しています！
        </p>
        <nav className="space-y-2">
          <Link
            to="/about"
            className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-center"
          >
            Aboutページへ
          </Link>
          <Link
            to="/contact"
            className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-center"
          >
            Contactページへ
          </Link>
        </nav>
      </div>
    </div>
  );
}
