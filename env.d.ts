declare namespace NodeJS {
  export interface ProcessEnv {
    AUTH0_CLIENT_ID: string;
    AUTH0_DOMAIN: string;
    CACHE_URL: string;
    DATABASE_URL: string;
    SENTRY_DSN: string;
  }
}