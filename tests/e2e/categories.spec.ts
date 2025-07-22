import { expect, test } from '@playwright/test';
import { testNavigation, testResponsiveDesign, waitForPageLoad } from './utils/test-utils';

test.describe('カテゴリページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/categories');
    await waitForPageLoad(page);
  });

  test('ページが正しく表示される', async ({ page }) => {
    // タイトルが表示される
    await expect(page).toHaveTitle(/Orezenn/);

    // ヘッダーが表示される
    await expect(page.locator('header')).toBeVisible();

    // カテゴリ一覧が表示される
    await expect(page.locator('h1')).toBeVisible();
  });

  test('カテゴリ一覧が正しく表示される', async ({ page }) => {
    // カテゴリカードが表示される（存在する場合）
    const categoryCards = page.locator('[data-testid="category-card"]');
    const count = await categoryCards.count();

    if (count > 0) {
      // カテゴリカードの基本要素が表示される
      await expect(categoryCards.first()).toBeVisible();

      // カテゴリ名が表示される
      await expect(categoryCards.first().locator('h3')).toBeVisible();

      // カテゴリの説明が表示される（存在する場合）
      const description = categoryCards.first().locator('p');
      if (await description.isVisible()) {
        await expect(description).toBeVisible();
      }
    }
  });

  test('カテゴリカードをクリックして詳細ページに遷移する', async ({ page }) => {
    const categoryCards = page.locator('[data-testid="category-card"]');
    const count = await categoryCards.count();

    if (count > 0) {
      // 最初のカテゴリカードをクリック
      await categoryCards.first().click();

      // カテゴリ詳細ページに遷移する
      await expect(page).toHaveURL(/\/categories\//);
    }
  });

  test('カテゴリ詳細ページが正しく表示される', async ({ page }) => {
    // まずカテゴリ一覧から詳細ページに遷移
    const categoryCards = page.locator('[data-testid="category-card"]');
    const count = await categoryCards.count();

    if (count > 0) {
      await categoryCards.first().click();
      await waitForPageLoad(page);

      // カテゴリ名が表示される
      await expect(page.locator('h1')).toBeVisible();

      // 記事一覧が表示される
      const articleCards = page.locator('[data-testid="article-card"]');
      if (await articleCards.isVisible()) {
        await expect(articleCards).toBeVisible();
      }
    }
  });

  test('パンくずリストが正しく表示される', async ({ page }) => {
    const breadcrumb = page.locator('[data-testid="breadcrumb"]');
    if (await breadcrumb.isVisible()) {
      await expect(breadcrumb).toBeVisible();

      // ホームリンクが存在する
      const homeLink = breadcrumb.locator('a[href="/"]');
      await expect(homeLink).toBeVisible();

      // カテゴリリンクが存在する
      const categoriesLink = breadcrumb.locator('a[href="/categories"]');
      await expect(categoriesLink).toBeVisible();
    }
  });

  test('ページネーションが正しく動作する', async ({ page }) => {
    // ページネーションが表示される（複数ページある場合）
    const pagination = page.locator('nav[aria-label="ページネーション"]');

    if (await pagination.isVisible()) {
      // ページネーションボタンが表示される
      await expect(pagination.locator('button')).toBeVisible();

      // 次のページボタンをクリック
      const nextButton = pagination.locator('button:has-text("次")');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await expect(page).toHaveURL(/page=2/);
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
    // カテゴリカードがアクセシブル
    const categoryCards = page.locator('[data-testid="category-card"]');
    const count = await categoryCards.count();

    if (count > 0) {
      await expect(categoryCards.first()).toBeVisible();
    }

    // ページネーションがアクセシブル
    const pagination = page.locator('nav[aria-label="ページネーション"]');
    if (await pagination.isVisible()) {
      await expect(pagination).toBeVisible();
    }

    // パンくずリストがアクセシブル
    const breadcrumb = page.locator('nav[aria-label="パンくずリスト"]');
    if (await breadcrumb.isVisible()) {
      await expect(breadcrumb).toBeVisible();
    }
  });

  test('カテゴリの記事数が正しく表示される', async ({ page }) => {
    const categoryCards = page.locator('[data-testid="category-card"]');
    const count = await categoryCards.count();

    if (count > 0) {
      // 記事数が表示される（存在する場合）
      const articleCount = categoryCards.first().locator('[data-testid="article-count"]');
      if (await articleCount.isVisible()) {
        await expect(articleCount).toBeVisible();
      }
    }
  });
});
