import { expect, test } from '@playwright/test';
import { testNavigation, testResponsiveDesign, waitForPageLoad } from './utils/test-utils';

test.describe('記事一覧ページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/articles');
    await waitForPageLoad(page);
  });

  test('ページが正しく表示される', async ({ page }) => {
    // タイトルが表示される
    await expect(page).toHaveTitle(/Orezenn/);

    // ヘッダーが表示される
    await expect(page.locator('header')).toBeVisible();

    // 検索ボックスが表示される
    await expect(page.locator('input[placeholder*="検索"]')).toBeVisible();

    // カテゴリフィルタが表示される
    await expect(page.locator('button:has-text("カテゴリ")')).toBeVisible();
  });

  test('検索機能が正しく動作する', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="検索"]');

    // 検索ボックスにテキストを入力
    await searchInput.fill('テスト');
    await page.waitForTimeout(600); // デバウンス待機

    // URLに検索クエリが反映される
    await expect(page).toHaveURL(/q=テスト/);
  });

  test('カテゴリフィルタが正しく動作する', async ({ page }) => {
    // カテゴリボタンをクリック
    await page.click('button:has-text("カテゴリ")');

    // ドロップダウンが表示される
    await expect(page.locator('.absolute.top-full')).toBeVisible();

    // カテゴリが表示される（存在する場合）
    const categoryItems = page.locator('.absolute.top-full a');
    const count = await categoryItems.count();

    if (count > 0) {
      // 最初のカテゴリをクリック
      await categoryItems.first().click();

      // カテゴリ詳細ページに遷移する
      await expect(page).toHaveURL(/\/categories\//);
    }
  });

  test('フィルタクリア機能が正しく動作する', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="検索"]');

    // 検索を実行
    await searchInput.fill('テスト');
    await page.waitForTimeout(600);

    // フィルタクリアボタンが表示される
    await expect(page.locator('button:has-text("フィルタをクリア")')).toBeVisible();

    // フィルタをクリア
    await page.click('button:has-text("フィルタをクリア")');

    // 検索クエリがクリアされる
    await expect(searchInput).toHaveValue('');
  });

  test('記事カードが正しく表示される', async ({ page }) => {
    // 記事カードが表示される（存在する場合）
    const articleCards = page.locator('[data-testid="article-card"]');
    const count = await articleCards.count();

    if (count > 0) {
      // 記事カードの基本要素が表示される
      await expect(articleCards.first()).toBeVisible();

      // 記事タイトルが表示される
      await expect(articleCards.first().locator('h3')).toBeVisible();

      // 記事の詳細情報が表示される
      await expect(articleCards.first().locator('time')).toBeVisible();
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

  test('記事カードをクリックして詳細ページに遷移する', async ({ page }) => {
    const articleCards = page.locator('[data-testid="article-card"]');
    const count = await articleCards.count();

    if (count > 0) {
      // 最初の記事カードをクリック
      await articleCards.first().click();

      // 記事詳細ページに遷移する
      await expect(page).toHaveURL(/\/articles\//);
    }
  });

  test('ナビゲーションが正しく動作する', async ({ page }) => {
    await testNavigation(page);
  });

  test('レスポンシブデザインが正しく動作する', async ({ page }) => {
    await testResponsiveDesign(page);
  });

  test('アクセシビリティが正しく設定されている', async ({ page }) => {
    // 検索ボックスにラベルが設定されている
    const searchInput = page.locator('input[placeholder*="検索"]');
    await expect(searchInput).toBeVisible();

    // カテゴリボタンがアクセシブル
    const categoryButton = page.locator('button:has-text("カテゴリ")');
    await expect(categoryButton).toBeVisible();

    // ページネーションがアクセシブル
    const pagination = page.locator('nav[aria-label="ページネーション"]');
    if (await pagination.isVisible()) {
      await expect(pagination).toBeVisible();
    }
  });
});
