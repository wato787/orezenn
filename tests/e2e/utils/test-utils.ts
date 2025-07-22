import { Page, expect } from '@playwright/test';

/**
 * ページが完全に読み込まれるまで待機
 */
export const waitForPageLoad = async (page: Page) => {
  await page.waitForLoadState('networkidle');
};

/**
 * ローディング状態が終了するまで待機
 */
export const waitForLoadingToFinish = async (page: Page) => {
  await page.waitForSelector('[data-testid="loading"]', { state: 'hidden', timeout: 10000 });
};

/**
 * エラー状態をチェック
 */
export const checkForErrors = async (page: Page) => {
  const errorElement = page.locator('[data-testid="error"]');
  await expect(errorElement).not.toBeVisible();
};

/**
 * ナビゲーションが正しく動作することをテスト
 */
export const testNavigation = async (page: Page) => {
  // ホームページに移動
  await page.click('text=ホーム');
  await expect(page).toHaveURL('/');

  // 記事一覧に移動
  await page.click('text=記事一覧');
  await expect(page).toHaveURL('/articles');

  // カテゴリに移動
  await page.click('text=カテゴリ');
  await expect(page).toHaveURL('/categories');
};

/**
 * レスポンシブデザインをテスト
 */
export const testResponsiveDesign = async (page: Page) => {
  // デスクトップサイズ
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.locator('header')).toBeVisible();

  // タブレットサイズ
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.locator('header')).toBeVisible();

  // モバイルサイズ
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('header')).toBeVisible();
};
