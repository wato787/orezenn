import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Logo */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/favicon.svg" alt="Orezenn Logo" className="h-6 w-6" />
              <span className="font-bold text-xl">Orezenn</span>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="font-semibold mb-3">コンテンツ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/articles"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  記事一覧
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
