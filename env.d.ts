declare namespace NodeJS {
  export interface ProcessEnv {
    CACHE_URL: string;
    DATABASE_URL: string;
    SENTRY_DSN: string;
  }
}
