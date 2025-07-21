import type { Article, Author, Category, Series, Tag } from './api';

/**
 * ローディング状態
 */
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

/**
 * ソート順序
 */
export type SortOrder = 'asc' | 'desc';

/**
 * ソートフィールド
 */
export type SortField =
  | 'publishedAt'
  | 'createdAt'
  | 'updatedAt'
  | 'title'
  | 'readingTime';

/**
 * 記事表示モード
 */
export type ArticleDisplayMode = 'card' | 'list' | 'grid';

/**
 * 記事フィルタ状態
 */
export interface ArticleFilters {
  category?: Category;
  tags: Tag[];
  author?: Author;
  series?: Series;
  type?: Article['type'];
  difficulty?: Article['difficulty'];
  dateRange?: {
    start: Date;
    end: Date;
  };
  readingTimeRange?: {
    min: number;
    max: number;
  };
  hasEyecatch?: boolean;
  isPinned?: boolean;
}

/**
 * 記事一覧の表示設定
 */
export interface ArticleListSettings {
  displayMode: ArticleDisplayMode;
  sortField: SortField;
  sortOrder: SortOrder;
  itemsPerPage: number;
  showExcerpt: boolean;
  showAuthor: boolean;
  showCategory: boolean;
  showTags: boolean;
  showReadingTime: boolean;
}

/**
 * 検索クエリ状態
 */
export interface SearchQuery {
  keyword: string;
  filters: ArticleFilters;
  settings: ArticleListSettings;
}

/**
 * ページネーション設定
 */
export interface PaginationSettings {
  page: number;
  limit: number;
  showPageNumbers: boolean;
  showFirstLast: boolean;
  maxVisiblePages: number;
}

/**
 * モーダル状態
 */
export interface ModalState {
  isOpen: boolean;
  type?: 'share' | 'delete' | 'edit';
  data?: unknown;
}

/**
 * トースト通知
 */
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * サイドバー状態
 */
export interface SidebarState {
  isOpen: boolean;
  activeSection?: 'navigation' | 'filters' | 'toc';
}

/**
 * テーマ設定
 */
export interface ThemeSettings {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  fontSize: 'sm' | 'md' | 'lg';
  fontFamily: 'system' | 'serif' | 'mono';
}

/**
 * ユーザー設定
 */
export interface UserSettings {
  theme: ThemeSettings;
  article: ArticleListSettings;
  privacy: {
    showEmail: boolean;
    showActivity: boolean;
  };
}

/**
 * 記事カード用のプロパティ
 */
export interface ArticleCardProps {
  article: Article;
  displayMode: ArticleDisplayMode;
  showAuthor?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  showExcerpt?: boolean;
  onClick?: (article: Article) => void;
  onShare?: (article: Article) => void;
}

/**
 * ページネーション用のプロパティ
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  settings: PaginationSettings;
}

/**
 * 検索バー用のプロパティ
 */
export interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  showFilters?: boolean;
  isLoading?: boolean;
}

/**
 * フィルタパネル用のプロパティ
 */
export interface FilterPanelProps {
  filters: ArticleFilters;
  onFiltersChange: (filters: ArticleFilters) => void;
  availableCategories: Category[];
  availableTags: Tag[];
  availableAuthors: Author[];
  onReset: () => void;
}

/**
 * ブレッドクラム項目
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

/**
 * ナビゲーションメニュー項目
 */
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
  children?: NavigationItem[];
}

/**
 * チャート用のデータポイント
 */
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, unknown>;
}

/**
 * チャート設定
 */
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: ChartDataPoint[];
  xAxis?: {
    label: string;
    type: 'category' | 'time' | 'number';
  };
  yAxis?: {
    label: string;
    min?: number;
    max?: number;
  };
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
}

/**
 * 無限スクロール用の状態
 */
export interface InfiniteScrollState {
  hasMore: boolean;
  isLoading: boolean;
  error?: string;
  items: Article[];
}

/**
 * ドラッグ&ドロップ用の状態
 */
export interface DragDropState {
  isDragging: boolean;
  draggedItem?: unknown;
  dropTarget?: string;
  dropPosition?: 'before' | 'after' | 'inside';
}

/**
 * フォーム状態
 */
export interface FormState<T = Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

/**
 * フォームフィールド設定
 */
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date' | 'number';
  placeholder?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: unknown) => string | undefined;
  };
  options?: Array<{ label: string; value: string | number }>;
  dependencies?: string[]; // 他のフィールドとの依存関係
}

/**
 * キーボードショートカット
 */
export interface KeyboardShortcut {
  key: string;
  modifiers?: ('ctrl' | 'cmd' | 'shift' | 'alt')[];
  description: string;
  action: () => void;
  disabled?: boolean;
}

/**
 * コンテキストメニュー項目
 */
export interface ContextMenuItem {
  label: string;
  icon?: string;
  action: () => void;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
}

/**
 * ツールチップ設定
 */
export interface TooltipConfig {
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
}

/**
 * レスポンシブ表示設定
 */
export interface ResponsiveSettings {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

/**
 * アニメーション設定
 */
export interface AnimationConfig {
  duration: number;
  easing: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  delay?: number;
  disabled?: boolean;
}

/**
 * アクセシビリティ設定
 */
export interface AccessibilityConfig {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  screenReader: boolean;
  keyboardNavigation: boolean;
}
