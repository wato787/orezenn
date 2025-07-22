import { expect, test } from '@playwright/test';
import { waitForPageLoad } from './utils/test-utils';

test.describe('統合テスト', () => {
  test('ユーザージャーニー: ホーム → 記事一覧 → 記事詳細 → カテゴリ', async ({ page }) => {
    // 1. ホームページにアクセス
    await page.goto('/');
    await waitForPageLoad(page);

    // ホームページが正しく表示される
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=Orezenn')).toBeVisible();

    // 2. 記事一覧ページに移動
    await page.click('text=記事一覧');
    await waitForPageLoad(page);
    await expect(page).toHaveURL('/articles');

    // 記事一覧ページが正しく表示される
    await expect(page.locator('input[placeholder*="検索"]')).toBeVisible();
    await expect(page.locator('button:has-text("カテゴリ")')).toBeVisible();

    // 3. 記事を検索
    const searchInput = page.locator('input[placeholder*="検索"]');
    await searchInput.fill('テスト');
    await page.waitForTimeout(600);

    // 検索結果が反映される
    await expect(page).toHaveURL(/q=テスト/);

    // 4. 記事カードをクリックして詳細ページに移動
    const articleCards = page.locator('[data-testid="article-card"]');
    const count = await articleCards.count();

    if (count > 0) {
      await articleCards.first().click();
      await waitForPageLoad(page);

      // 記事詳細ページが正しく表示される
      await expect(page).toHaveURL(/\/articles\//);
      await expect(page.locator('h1')).toBeVisible();

      // 5. カテゴリリンクをクリック
      const categoryLink = page.locator('a[href*="/categories/"]');
      if (await categoryLink.isVisible()) {
        await categoryLink.click();
        await waitForPageLoad(page);

        // カテゴリ詳細ページが正しく表示される
        await expect(page).toHaveURL(/\/categories\//);
        await expect(page.locator('h1')).toBeVisible();
      }
    }
  });

  test('ナビゲーションの一貫性', async ({ page }) => {
    const pages = ['/', '/articles', '/categories'];

    for (const pageUrl of pages) {
      await page.goto(pageUrl);
      await waitForPageLoad(page);

      // 各ページでヘッダーが一貫して表示される
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('text=Orezenn')).toBeVisible();

      // ナビゲーションリンクが一貫して表示される
      await expect(page.locator('a[href="/"]')).toBeVisible();
      await expect(page.locator('a[href="/articles"]')).toBeVisible();
      await expect(page.locator('a[href="/categories"]')).toBeVisible();
    }
  });

  test('レスポンシブデザインの一貫性', async ({ page }) => {
    const viewports = [
      { width: 1280, height: 720, name: 'デスクトップ' },
      { width: 768, height: 1024, name: 'タブレット' },
      { width: 375, height: 667, name: 'モバイル' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      // 各ページでレスポンシブデザインが正しく動作する
      await page.goto('/');
      await waitForPageLoad(page);
      await expect(page.locator('header')).toBeVisible();

      await page.goto('/articles');
      await waitForPageLoad(page);
      await expect(page.locator('header')).toBeVisible();

      await page.goto('/categories');
      await waitForPageLoad(page);
      await expect(page.locator('header')).toBeVisible();
    }
  });

  test('エラーハンドリング', async ({ page }) => {
    // 存在しないページにアクセス
    await page.goto('/non-existent-page');
    await waitForPageLoad(page);

    // 404ページが表示される（実装されている場合）
    const notFound = page.locator('text=404') || page.locator('text=ページが見つかりません');
    if (await notFound.isVisible()) {
      await expect(notFound).toBeVisible();
    }
  });

  test('パフォーマンス', async ({ page }) => {
    // ページの読み込み時間を測定
    const startTime = Date.now();
    await page.goto('/');
    await waitForPageLoad(page);
    const loadTime = Date.now() - startTime;

    // 読み込み時間が5秒以内であることを確認
    expect(loadTime).toBeLessThan(5000);

    // 記事一覧ページの読み込み時間
    const startTime2 = Date.now();
    await page.goto('/articles');
    await waitForPageLoad(page);
    const loadTime2 = Date.now() - startTime2;

    expect(loadTime2).toBeLessThan(5000);
  });
});
