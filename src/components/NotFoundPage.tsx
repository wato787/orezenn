import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-red-800 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          ページが見つかりません
        </h2>
        <p className="text-gray-600 mb-6">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition duration-300"
        >
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
