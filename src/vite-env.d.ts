/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_MICROCMS_SERVICE_DOMAIN: string
  readonly VITE_MICROCMS_API_KEY: string
  // 他の環境変数をここに追加
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
