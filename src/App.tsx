import { Layout } from '@/components/layout/Layout';
import { ArticleList } from '@/components/articles';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, Code, Sparkles } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

// 一時的な仮ページコンポーネント（次のIssueで実装）
const HomePage = () => (
  <div className='container py-8'>
    {/* Hero Section */}
    <div className='text-center py-12 mb-8'>
      <div className='flex justify-center mb-6'>
        <div className='p-3 bg-primary/10 rounded-full'>
          <BookOpen className='h-12 w-12 text-primary' />
        </div>
      </div>
      <h1 className='text-4xl font-bold tracking-tight mb-4'>
        技術記事を共有しよう
      </h1>
      <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
        個人用の技術ブログプラットフォーム。学びを記録し、知識を共有し、開発者として成長しよう。
      </p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <Button size='lg' className='w-full sm:w-auto'>
          記事を読む
        </Button>
        <Button variant='outline' size='lg' className='w-full sm:w-auto'>
          投稿を始める
        </Button>
      </div>
    </div>

    {/* Feature Cards */}
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
      <Card>
        <CardHeader>
          <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
            <Code className='h-6 w-6 text-blue-600' />
          </div>
          <CardTitle className='text-xl'>技術記事</CardTitle>
          <CardDescription>
            プログラミング、開発ツール、アーキテクチャなど様々な技術トピックを扱います
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
            <Sparkles className='h-6 w-6 text-green-600' />
          </div>
          <CardTitle className='text-xl'>モダンUI</CardTitle>
          <CardDescription>
            Zenn/Qiitaライクな美しいデザインで快適な読書体験を提供します
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
            <BookOpen className='h-6 w-6 text-purple-600' />
          </div>
          <CardTitle className='text-xl'>ナレッジベース</CardTitle>
          <CardDescription>
            学習記録とナレッジの蓄積で継続的な成長をサポートします
          </CardDescription>
        </CardHeader>
      </Card>
    </div>

    {/* Status */}
    <Card className='text-center'>
      <CardHeader>
        <CardTitle>🚧 開発中</CardTitle>
        <CardDescription>
          現在、記事一覧とレイアウト機能を実装中です。 shadcn/uiとTanStack
          Queryを使用したモダンなアーキテクチャを構築しています。
        </CardDescription>
      </CardHeader>
    </Card>
  </div>
);

const ArticleDetailPage = () => (
  <div className='container py-8'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold mb-4'>記事詳細</h1>
      <Card className='max-w-2xl mx-auto'>
        <CardContent className='pt-6'>
          <p className='text-muted-foreground'>
            📖 記事詳細機能は次のIssueで実装予定です
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const CategoriesPage = () => (
  <div className='container py-8'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold mb-4'>カテゴリ</h1>
      <Card className='max-w-2xl mx-auto'>
        <CardContent className='pt-6'>
          <p className='text-muted-foreground'>
            🏷️ カテゴリ機能は次のIssueで実装予定です
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const NotFoundPage = () => (
  <div className='container py-8'>
    <div className='text-center'>
      <h1 className='text-4xl font-bold mb-4'>404</h1>
      <p className='text-xl text-muted-foreground mb-8'>
        お探しのページは見つかりません
      </p>
      <Button asChild>
        <a href='/'>ホームに戻る</a>
      </Button>
    </div>
  </div>
);

export default App;
