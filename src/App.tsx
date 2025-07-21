import { Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <h1 className='text-2xl font-bold text-gray-900'>Orezenn</h1>
            </div>
            <nav className='hidden md:flex space-x-8'>
              <a
                href='/'
                className='text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
              >
                ホーム
              </a>
              <a
                href='/articles'
                className='text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
              >
                記事一覧
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/articles' element={<ArticleListPage />} />
          <Route path='/articles/:slug' element={<ArticleDetailPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className='bg-white border-t mt-auto'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='text-center text-gray-500 text-sm'>
            © 2024 Orezenn - 個人用技術ブログプラットフォーム
          </div>
        </div>
      </footer>
    </div>
  );
};

// 一時的な仮ページコンポーネント（次のIssueで実装）
const HomePage = () => (
  <div className='text-center py-12'>
    <h2 className='text-3xl font-bold text-gray-900 mb-4'>
      技術記事を共有しよう
    </h2>
    <p className='text-xl text-gray-600 mb-8'>
      個人用の技術ブログプラットフォーム
    </p>
    <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto'>
      <p className='text-blue-800'>
        🚧 現在開発中です。記事一覧とレイアウト機能を実装中...
      </p>
    </div>
  </div>
);

const ArticleListPage = () => (
  <div className='text-center py-12'>
    <h2 className='text-2xl font-bold text-gray-900 mb-4'>記事一覧</h2>
    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto'>
      <p className='text-yellow-800'>
        📝 記事一覧機能は次のIssueで実装予定です
      </p>
    </div>
  </div>
);

const ArticleDetailPage = () => (
  <div className='text-center py-12'>
    <h2 className='text-2xl font-bold text-gray-900 mb-4'>記事詳細</h2>
    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto'>
      <p className='text-yellow-800'>
        📖 記事詳細機能は次のIssueで実装予定です
      </p>
    </div>
  </div>
);

const NotFoundPage = () => (
  <div className='text-center py-12'>
    <h2 className='text-2xl font-bold text-gray-900 mb-4'>
      404 - ページが見つかりません
    </h2>
    <p className='text-gray-600 mb-8'>お探しのページは存在しません。</p>
    <a
      href='/'
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    >
      ホームに戻る
    </a>
  </div>
);

export default App;
