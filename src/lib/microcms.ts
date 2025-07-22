import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';
import type {
    Article,
    ArticleSearchParams,
    ArticlesResponse,
    Author,
    AuthorsResponse,
    CategoriesResponse,
    Category,
    CategorySearchParams,
    Series,
    SeriesResponse,
    Tag,
    TagSearchParams,
    TagsResponse
} from '../types/api';

// 環境変数のバリデーション
const serviceDomain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error(
    'microCMS設定が不完全です。以下の環境変数を設定してください:\n' +
    '- VITE_MICROCMS_SERVICE_DOMAIN\n' +
    '- VITE_MICROCMS_API_KEY'
  );
}

// microCMSクライアントを作成
export const microCMSClient = createClient({
  serviceDomain,
  apiKey,
});

/**
 * 型安全なAPI呼び出し用ヘルパー関数
 */
export const fetchFromMicroCMS = async <T>(
  endpoint: string,
  queries?: MicroCMSQueries
): Promise<T> => {
  try {
    const response = await microCMSClient.get<T>({
      endpoint,
      queries,
    });
    return response;
  } catch (error) {
    console.error(`microCMS API Error (${endpoint}):`, error);

    // エラーの種類に応じて適切なメッセージ
    if (error instanceof Error) {
      const statusMatch = error.message.match(/status: (\d+)/);
      const status = statusMatch ? parseInt(statusMatch[1]) : 0;

      switch (status) {
        case 404:
          throw new Error('コンテンツが見つかりません');
        case 401:
          throw new Error('APIキーが無効です');
        case 403:
          throw new Error('このAPIへのアクセス権限がありません');
        case 429:
          throw new Error('リクエスト制限に達しました。しばらく時間をおいて再試行してください');
        case 500:
          throw new Error('microCMSサーバーでエラーが発生しました');
        default:
          throw new Error(`データの取得に失敗しました: ${endpoint}`);
      }
    }

    throw new Error(`データの取得に失敗しました: ${endpoint}`);
  }
};

/**
 * 検索パラメータをmicroCMSクエリに変換
 */
const buildMicroCMSQueries = (params: ArticleSearchParams): MicroCMSQueries => {
  const queries: MicroCMSQueries = {};

  // 基本検索
  if (params.q) {
    queries.q = params.q;
  }

  // フィルタリング
  const filters: string[] = [];

  if (params.categoryId) {
    filters.push(`category[equals]${params.categoryId}`);
  }
  if (params.categorySlug) {
    filters.push(`category.slug[equals]${params.categorySlug}`);
  }
  if (params.tagId) {
    filters.push(`tags[contains]${params.tagId}`);
  }
  if (params.authorId) {
    filters.push(`author[equals]${params.authorId}`);
  }
  if (params.type) {
    filters.push(`type[equals]${params.type}`);
  }
  if (params.status) {
    filters.push(`status[equals]${params.status}`);
  }
  if (params.difficulty) {
    filters.push(`difficulty[equals]${params.difficulty}`);
  }
  if (params.isPinned !== undefined) {
    filters.push(`isPinned[equals]${params.isPinned}`);
  }
  if (params.hasEyecatch !== undefined) {
    filters.push(`eyecatch[${params.hasEyecatch ? 'exists' : 'not_exists'}]`);
  }

  // 日付範囲
  if (params.publishedAfter) {
    filters.push(`publishedAt[greater_than]${params.publishedAfter}`);
  }
  if (params.publishedBefore) {
    filters.push(`publishedAt[less_than]${params.publishedBefore}`);
  }

  // 読書時間範囲
  if (params.minReadingTime) {
    filters.push(`readingTime[greater_than]${params.minReadingTime}`);
  }
  if (params.maxReadingTime) {
    filters.push(`readingTime[less_than]${params.maxReadingTime}`);
  }

  if (filters.length > 0) {
    queries.filters = filters.join('[and]');
  }

  // ページネーション
  if (params.limit) {
    queries.limit = params.limit;
  }
  if (params.offset) {
    queries.offset = params.offset;
  }

  // ソート
  if (params.orders) {
    queries.orders = params.orders;
  }

  // フィールド選択
  if (params.fields) {
    queries.fields = params.fields.join(',');
  }
  if (params.depth) {
    queries.depth = params.depth;
  }

  return queries;
};

/**
 * 記事一覧取得用のヘルパー関数
 */
export const fetchArticles = async (params?: ArticleSearchParams): Promise<ArticlesResponse> => {
  const queries = buildMicroCMSQueries(params || {});
  return fetchFromMicroCMS<ArticlesResponse>('articles', queries);
};

/**
 * 記事詳細取得用のヘルパー関数
 */
export const fetchArticle = async (id: string, queries?: MicroCMSQueries): Promise<Article> => {
  return fetchFromMicroCMS<Article>(`articles/${id}`, queries);
};



/**
 * カテゴリ一覧取得用のヘルパー関数
 */
export const fetchCategories = async (params?: CategorySearchParams): Promise<CategoriesResponse> => {
  const queries: MicroCMSQueries = {};

  if (params?.q) queries.q = params.q;
  if (params?.limit) queries.limit = params.limit;
  if (params?.offset) queries.offset = params.offset;
  if (params?.orders) queries.orders = params.orders;

  const filters: string[] = [];
  if (params?.isPublished !== undefined) {
    filters.push(`isPublished[equals]${params.isPublished}`);
  }

  if (filters.length > 0) {
    queries.filters = filters.join('[and]');
  }

  return fetchFromMicroCMS<CategoriesResponse>('categories', queries);
};

/**
 * カテゴリ詳細取得
 */
export const fetchCategory = async (id: string): Promise<Category> => {
  return fetchFromMicroCMS<Category>(`categories/${id}`);
};



/**
 * タグ一覧取得用のヘルパー関数
 */
export const fetchTags = async (params?: TagSearchParams): Promise<TagsResponse> => {
  const queries: MicroCMSQueries = {};

  if (params?.q) queries.q = params.q;
  if (params?.limit) queries.limit = params.limit;
  if (params?.offset) queries.offset = params.offset;
  if (params?.orders) queries.orders = params.orders;

  return fetchFromMicroCMS<TagsResponse>('tags', queries);
};

/**
 * タグ詳細取得
 */
export const fetchTag = async (id: string): Promise<Tag> => {
  return fetchFromMicroCMS<Tag>(`tags/${id}`);
};



/**
 * 作成者一覧取得
 */
export const fetchAuthors = async (queries?: MicroCMSQueries): Promise<AuthorsResponse> => {
  return fetchFromMicroCMS<AuthorsResponse>('authors', queries);
};

/**
 * 作成者詳細取得
 */
export const fetchAuthor = async (id: string): Promise<Author> => {
  return fetchFromMicroCMS<Author>(`authors/${id}`);
};



/**
 * シリーズ一覧取得
 */
export const fetchSeries = async (queries?: MicroCMSQueries): Promise<SeriesResponse> => {
  return fetchFromMicroCMS<SeriesResponse>('series', queries);
};

/**
 * シリーズ詳細取得
 */
export const fetchSeriesById = async (id: string): Promise<Series> => {
  return fetchFromMicroCMS<Series>(`series/${id}`);
};



/**
 * 関連記事取得
 */
export const fetchRelatedArticles = async (
  articleId: string,
  limit: number = 5
): Promise<Article[]> => {
  // 同じカテゴリやタグの記事を取得
  const article = await fetchArticle(articleId);

  const relatedByCategory = await fetchArticles({
    categoryId: article.category.id,
    filters: [`id[not_equals]${articleId}`],
    limit: Math.ceil(limit / 2),
    orders: '-publishedAt',
  });

  if (article.tags.length > 0) {
    const relatedByTags = await fetchArticles({
      tagId: article.tags[0].id,
      filters: [`id[not_equals]${articleId}`],
      limit: Math.ceil(limit / 2),
      orders: '-publishedAt',
    });

    // 重複除去して結合
    const combined = [...relatedByCategory.contents];
    for (const tagArticle of relatedByTags.contents) {
      if (!combined.find(a => a.id === tagArticle.id)) {
        combined.push(tagArticle);
      }
    }

    return combined.slice(0, limit);
  }

  return relatedByCategory.contents;
};

/**
 * サイトマップ用記事一覧取得
 */
export const fetchSitemapArticles = async () => {
  return fetchArticles({
    status: 'published',
    fields: ['slug', 'publishedAt', 'lastEditedAt'],
    limit: 1000, // 必要に応じて調整
    orders: '-publishedAt',
  });
};

/**
 * RSS/Atom フィード用記事取得
 */
export const fetchFeedArticles = async (limit: number = 20) => {
  return fetchArticles({
    status: 'published',
    fields: ['title', 'slug', 'excerpt', 'content', 'author', 'publishedAt', 'category', 'tags'],
    limit,
    orders: '-publishedAt',
  });
};
