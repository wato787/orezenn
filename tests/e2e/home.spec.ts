import { expect, test } from '@playwright/test';
import { testNavigation, testResponsiveDesign, waitForPageLoad } from './utils/test-utils';

test.describe('ホームページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
  });

  test('ページが正しく表示される', async ({ page }) => {
    // タイトルが表示される
    await expect(page).toHaveTitle(/Orezenn/);

    // ヘッダーが表示される
    await expect(page.locator('header')).toBeVisible();

    // ロゴが表示される
    await expect(page.locator('img[alt="Orezenn Logo"]')).toBeVisible();
    await expect(page.locator('text=Orezenn')).toBeVisible();
  });

  test('ナビゲーションが正しく動作する', async ({ page }) => {
    await testNavigation(page);
  });

  test('レスポンシブデザインが正しく動作する', async ({ page }) => {
    await testResponsiveDesign(page);
  });

  test('アクセシビリティが正しく設定されている', async ({ page }) => {
    // ロゴのalt属性が設定されている
    await expect(page.locator('img[alt="Orezenn Logo"]')).toBeVisible();

    // ナビゲーションリンクが正しく設定されている
    const homeLink = page.locator('a[href="/"]');
    const articlesLink = page.locator('a[href="/articles"]');
    const categoriesLink = page.locator('a[href="/categories"]');

    await expect(homeLink).toBeVisible();
    await expect(articlesLink).toBeVisible();
    await expect(categoriesLink).toBeVisible();
  });

  test('ページの基本構造が正しい', async ({ page }) => {
    // メインコンテンツエリアが存在する
    await expect(page.locator('main')).toBeVisible();

    // フッターが表示される（存在する場合）
    const footer = page.locator('footer');
    if (await footer.isVisible()) {
      await expect(footer).toBeVisible();
    }
  });
});
