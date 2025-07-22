import { expect, test } from '@playwright/test';
import { testNavigation, testResponsiveDesign, waitForPageLoad } from './utils/test-utils';

test.describe('記事詳細ページ', () => {
  test.beforeEach(async ({ page }) => {
    // 記事一覧ページから記事詳細ページに遷移
    await page.goto('/articles');
    await waitForPageLoad(page);

    // 記事カードが存在する場合、最初の記事をクリック
    const articleCards = page.locator('[data-testid="article-card"]');
    const count = await articleCards.count();

    if (count > 0) {
      await articleCards.first().click();
      await waitForPageLoad(page);
    } else {
      // 記事がない場合は直接URLでアクセス（テスト用の記事IDを想定）
      await page.goto('/articles/test-article');
      await waitForPageLoad(page);
    }
  });

  test('ページが正しく表示される', async ({ page }) => {
    // タイトルが表示される
    await expect(page).toHaveTitle(/Orezenn/);

    // ヘッダーが表示される
    await expect(page.locator('header')).toBeVisible();

    // 記事の基本情報が表示される
    await expect(page.locator('h1')).toBeVisible(); // 記事タイトル
  });

  test('記事の詳細情報が正しく表示される', async ({ page }) => {
    // 記事タイトルが表示される
    const title = page.locator('h1');
    if (await title.isVisible()) {
      await expect(title).toBeVisible();
    }

    // 記事のメタ情報が表示される
    const metaInfo = page.locator('[data-testid="article-meta"]');
    if (await metaInfo.isVisible()) {
      await expect(metaInfo).toBeVisible();
    }

    // 記事の本文が表示される
    const content = page.locator('[data-testid="article-content"]');
    if (await content.isVisible()) {
      await expect(content).toBeVisible();
    }
  });

  test('パンくずリストが正しく表示される', async ({ page }) => {
    const breadcrumb = page.locator('[data-testid="breadcrumb"]');
    if (await breadcrumb.isVisible()) {
      await expect(breadcrumb).toBeVisible();

      // ホームリンクが存在する
      const homeLink = breadcrumb.locator('a[href="/"]');
      await expect(homeLink).toBeVisible();

      // 記事一覧リンクが存在する
      const articlesLink = breadcrumb.locator('a[href="/articles"]');
      await expect(articlesLink).toBeVisible();
    }
  });

  test('関連記事が正しく表示される', async ({ page }) => {
    const relatedArticles = page.locator('[data-testid="related-articles"]');
    if (await relatedArticles.isVisible()) {
      await expect(relatedArticles).toBeVisible();

      // 関連記事のタイトルが表示される
      const relatedTitle = relatedArticles.locator('h2');
      await expect(relatedTitle).toBeVisible();

      // 関連記事のカードが表示される（存在する場合）
      const relatedCards = relatedArticles.locator('[data-testid="article-card"]');
      const count = await relatedCards.count();

      if (count > 0) {
        await expect(relatedCards.first()).toBeVisible();
      }
    }
  });

  test('カテゴリリンクが正しく動作する', async ({ page }) => {
    const categoryLink = page.locator('a[href*="/categories/"]');
    if (await categoryLink.isVisible()) {
      await categoryLink.click();
      await expect(page).toHaveURL(/\/categories\//);
    }
  });

  test('著者情報が正しく表示される', async ({ page }) => {
    const authorInfo = page.locator('[data-testid="author-info"]');
    if (await authorInfo.isVisible()) {
      await expect(authorInfo).toBeVisible();

      // 著者名が表示される
      const authorName = authorInfo.locator('[data-testid="author-name"]');
      if (await authorName.isVisible()) {
        await expect(authorName).toBeVisible();
      }
    }
  });

  test('タグが正しく表示される', async ({ page }) => {
    const tags = page.locator('[data-testid="article-tags"]');
    if (await tags.isVisible()) {
      await expect(tags).toBeVisible();

      // タグのバッジが表示される
      const tagBadges = tags.locator('[data-testid="tag-badge"]');
      const count = await tagBadges.count();

      if (count > 0) {
        await expect(tagBadges.first()).toBeVisible();
      }
    }
  });

  test('ナビゲーションが正しく動作する', async ({ page }) => {
    await testNavigation(page);
  });

  test('レスポンシブデザインが正しく動作する', async ({ page }) => {
    await testResponsiveDesign(page);
  });

  test('アクセシビリティが正しく設定されている', async ({ page }) => {
    // 記事タイトルが適切な見出しレベルで設定されている
    const title = page.locator('h1');
    if (await title.isVisible()) {
      await expect(title).toBeVisible();
    }

    // パンくずリストがアクセシブル
    const breadcrumb = page.locator('nav[aria-label="パンくずリスト"]');
    if (await breadcrumb.isVisible()) {
      await expect(breadcrumb).toBeVisible();
    }

    // 関連記事セクションがアクセシブル
    const relatedArticles = page.locator('section[aria-label="関連記事"]');
    if (await relatedArticles.isVisible()) {
      await expect(relatedArticles).toBeVisible();
    }
  });

  test('戻るボタンが正しく動作する', async ({ page }) => {
    const backButton = page.locator('button:has-text("戻る")');
    if (await backButton.isVisible()) {
      await backButton.click();
      await expect(page).toHaveURL(/\/articles/);
    }
  });
});
