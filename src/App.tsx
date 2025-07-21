import './App.css';
import { QueryTest } from './components/QueryTest';

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-4xl mx-auto'>
        <header className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>
            Orezenn - 開発中 🚧
          </h1>
          <p className='text-gray-600'>個人用技術ブログプラットフォーム</p>
        </header>

        <main className='space-y-8'>
          <section className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
              🛠️ 技術スタック
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {[
                { name: 'React 19', status: '✅' },
                { name: 'TypeScript', status: '✅' },
                { name: 'Vite', status: '✅' },
                { name: 'Tailwind CSS v4', status: '✅' },
                { name: 'React Router v7', status: '✅' },
                { name: 'TanStack Query', status: '🎯' },
                { name: 'microCMS', status: '⏳' },
                { name: 'Biome', status: '✅' },
              ].map((tech) => (
                <div key={tech.name} className='flex items-center space-x-2'>
                  <span className='text-lg'>{tech.status}</span>
                  <span className='text-sm text-gray-600'>{tech.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
              🎯 次のステップ
            </h2>
            <ul className='space-y-2 text-gray-600'>
              <li className='flex items-center space-x-2'>
                <span className='text-green-500'>✅</span>
                <span>TanStack Query 導入・設定</span>
              </li>
              <li className='flex items-center space-x-2'>
                <span className='text-yellow-500'>🔄</span>
                <span>microCMS SDK 導入・環境変数設定</span>
              </li>
              <li className='flex items-center space-x-2'>
                <span className='text-gray-400'>⏸️</span>
                <span>共通レイアウト構造作成</span>
              </li>
              <li className='flex items-center space-x-2'>
                <span className='text-gray-400'>⏸️</span>
                <span>記事データ型定義作成</span>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
