import { Button } from "@/components/ui/button";
import { BookOpen, Github, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Orezenn</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              個人用技術ブログプラットフォーム。技術記事の共有とナレッジの蓄積を通じて、開発者の成長を支援します。
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  to="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  to="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="mailto:contact@example.com">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Contact</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">コンテンツ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/articles"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  記事一覧
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  カテゴリ
                </Link>
              </li>
              <li>
                <Link
                  to="/trending"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  トレンド
                </Link>
              </li>
              <li>
                <Link
                  to="/archive"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  アーカイブ
                </Link>
              </li>
            </ul>
          </div>

          {/* About links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © 2024 Orezenn. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
              Built with React, TypeScript, Vite & shadcn/ui
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
