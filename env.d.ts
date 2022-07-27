declare namespace NodeJS {
  export interface ProcessEnv {
    CACHE_URL: string;
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    SENTRY_DSN: string;
  }
}
