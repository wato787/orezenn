import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArticleDetailPage,
  ArticleListPage,
  CategoriesPage,
  CategoryArticlesPage,
  HomePage,
  LinksPage,
} from "@/pages";
import { Link, Route, Routes } from "react-router-dom";
import NewArticle from "./pages/new-article";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route
          path="/categories/:categoryId"
          element={<CategoryArticlesPage />}
        />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

const NotFoundPage = () => (
  <div className="py-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        お探しのページは見つかりません
      </p>
      <Button asChild>
        <Link to="/">ホームに戻る</Link>
      </Button>
    </div>
  </div>
);

export default App;
