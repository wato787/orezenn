import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          📞 Contactページ
        </h1>
        <p className="text-gray-600 mb-6">
          お問い合わせやご質問がございましたら、お気軽にご連絡ください。
        </p>
        <div className="bg-green-100 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-green-800 mb-2">連絡先</h2>
          <div className="text-green-700 space-y-1">
            <p>📧 Email: contact@example.com</p>
            <p>📱 Tel: 03-1234-5678</p>
            <p>🏢 住所: 東京都渋谷区...</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to="/"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            ← ホームへ戻る
          </Link>
          <Link
            to="/about"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Aboutへ
          </Link>
        </div>
      </div>
    </div>
  );
}
