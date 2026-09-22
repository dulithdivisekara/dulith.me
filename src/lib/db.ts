export interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
  R2_PUBLIC_URL: string;
}

export function getEnv(): Env {
  return {
    DB: process.env.DB as unknown as D1Database,
    MEDIA: process.env.MEDIA as unknown as R2Bucket,
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL || '',
  };
}
