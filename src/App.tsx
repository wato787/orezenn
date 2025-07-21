import './App.css';

function App() {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Hello World</h1>
        <p className='text-gray-600'>Tailwind CSS v4が正常に導入されました！</p>
        <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300'>
          テストボタン
        </button>
      </div>
    </div>
  );
}

export default App;
